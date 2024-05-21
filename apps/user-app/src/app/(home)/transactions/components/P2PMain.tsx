import P2PTransactions from "./P2PTransactions";
import P2PTransfer from "./P2PTransfer";


export default function P2PMain(){
    return <>
        <div className="flex flex-row justify-around">
            <P2PTransfer />
            <P2PTransactions />
        </div>
    </>
}