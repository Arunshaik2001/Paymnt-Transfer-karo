import Balance from "../components/Balance";
import P2PMain from "./components/P2PMain";

export default function Transactions() {
  return (
    <>
      <div className="pt-10 w-full">
        <div className="text-primaryText text-2xl font-bold text-center md:text-start md:pl-5">Transactions</div>
        <Balance />
        <P2PMain />
      </div>
    </>
  );
}
