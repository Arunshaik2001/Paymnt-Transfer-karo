import OffRampTransactions from "./OffRampTransactions";
import WithdrawMoney from "./WithdrawMoney";

const WithdrawTab: React.FC = () => {
  return (
    <div className="flex w-full justify-around flex-row ">
      <WithdrawMoney />
      <OffRampTransactions />
    </div>
  );
};

export default WithdrawTab;
