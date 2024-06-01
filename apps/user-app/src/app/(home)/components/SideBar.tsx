"use client";

import {
  faUser,
  faExchangeAlt,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";
import SideBarItem from "./SideBarItem";
import dashboardAtom from "@/store/atoms/dashboardAtom";
import { useRecoilState } from "recoil";

export default function SideBar() {
  const [dashboard, setDashboard] = useRecoilState(dashboardAtom);

  return (
    <div className="flex flex-row justify-around md:flex-col w-full md:w-auto">
      <SideBarItem
        href="/"
        name="Home"
        icon={faUser}
        isSelected={dashboard === "/"}
        onClick={() => setDashboard("/")}
      />
      <SideBarItem
        href="/transfer"
        name="Add Money"
        icon={faExchangeAlt}
        isSelected={dashboard === "/transfer"}
        onClick={() => setDashboard("/transfer")}
      />
      <SideBarItem
        href="/transactions"
        name="Transactions"
        icon={faHistory}
        isSelected={dashboard === "/transactions"}
        onClick={() => setDashboard("/transactions")}
      />
    </div>
  );
}
