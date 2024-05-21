"use client";
import dashboardAtom from "@/store/atoms/dashboardAtom";
import Link from "next/link";
import { useRecoilState, useSetRecoilState } from "recoil";

type AppNameType = {
  title?: string;
  className?: string;
};

export default function AppName({ title, className }: AppNameType) {
  const setDashboard = useSetRecoilState(dashboardAtom);

  return (
    <Link
      href={"/"}
      onClick={() => {
        setDashboard("/");
      }}
    >
      <div className={`text-center ${className}`}>
        <span className="font-bold italic text-venmoBlue text-4xl font-sans">
          {title ?? "PAYMNT"}
        </span>
      </div>
    </Link>
  );
}
