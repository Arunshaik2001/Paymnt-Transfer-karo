import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { RecoilRoot } from "recoil";
import useSyncSessionWithRecoil from "./hooks/useSyncSessionWithRecoil";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <RecoilRoot>
      <SessionProvider>
        <SessionSyncProvider>{children}</SessionSyncProvider>
      </SessionProvider>
    </RecoilRoot>
  );
};

const SessionSyncProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  useSyncSessionWithRecoil();
  return <>{children}</>;
};
