"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSetRecoilState } from "recoil";
import sessionAtom from "@/store/atoms/sessionAtom";
import { redirect, usePathname } from "next/navigation";
import { toast } from "sonner";
import { RampTransactionType, Status } from "@prisma/client";
import dashboardAtom from "@/store/atoms/dashboardAtom";

const useSyncSessionWithRecoil = () => {
  const { data: session, update } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });
  const setSession = useSetRecoilState(sessionAtom);

  const pathname = usePathname();
  const setDashboardAtom = useSetRecoilState(dashboardAtom);

  useEffect(() => {
    setDashboardAtom(pathname);
  }, [pathname]);

  useEffect(() => {
    let ws: WebSocket;
    if (session?.user.userId) {
      const userSession = session.user;
      setSession(userSession);

      ws = new WebSocket(process.env.NEXT_PUBLIC_PAYMNT_WEBSOCKET_URL!);
      console.log(`ws ${process.env.NEXT_PUBLIC_PAYMNT_WEBSOCKET_URL!}`);

      ws.onerror = (ev) => {
        console.log(`ws.onerror ${process.env.NEXT_PUBLIC_PAYMNT_WEBSOCKET_URL!}`);
      }
      ws.onopen = (ev: Event) => {
        console.log('WebSocket connection established.');
        ws.send(
          JSON.stringify({
            type: "identifier",
            content: {
              data: {
                clientId: userSession?.userId,
              },
            },
          })
        );
      };

      ws.onclose = (ev: CloseEvent) => {
        console.log('WebSocket connection closed.');
      };

      ws.onmessage = async (ev: MessageEvent) => {
        const txData = JSON.parse(ev.data);

        if (txData.status == Status.SUCCESS) {
          if (txData.rampType == RampTransactionType.OnRamp) {
            toast.success("Successfully added money.");
          } else {
            toast.success("Successfully withdrawn money.");
          }

          await update({
            ...session,
            user: {
              ...session.user,
              userId: session.user?.userId,
            },
          });
        } else if (txData.status == Status.INITIATED) {
          toast.success("Initiated transaction");
        } else if (txData.status == Status.FAILED) {
          toast.error("failed transaction");
        }
      };
    } else {
      setSession(null);
    }

    return () => {
      if (ws && ws.OPEN) {
        ws.close();
      }

    };
  }, [session]);
};

export default useSyncSessionWithRecoil;
