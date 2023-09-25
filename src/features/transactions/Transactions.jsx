import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./transactions.scss";
import { deposit, withdrawal, transfer } from "./transactionsSlice"

/**
 * Allows users to deposit to, withdraw from, and transfer money from their account.
 */
export default function Transactions() {
  // TODO: Get the balance from the Redux store using the useSelector hook
  const balance = useSelector(state=>state.transactions.balance);
  const dispatch = useDispatch();
  const [amountStr, setAmountStr] = useState("0.00");

  /** Dispatches a transaction action based on the form submission. */
  const onTransaction = (e) => {
    e.preventDefault();

    // This changes depending on which button the user clicked to submit the form.
    // It will be either "deposit", "withdraw", or "transfer".
    const action = e.nativeEvent.submitter.name;
    const recipient = e.target.recipient.value
    const amount = +amountStr;

    // TODO: Dispatch the appropriate transaction action based on `action`
  switch (action) {
    case "deposit":
   dispatch(deposit({ amount }));
   case "withdrawal":
   dispatch(withdrawal({ amount }));
   case "transfer":
   dispatch(transfer({ amount, recipient }));
   default:
 }
 setAmountStr("0.00");
 
  };

  return (
    <section className="transactions container">
      <h2>Transactions</h2>
      <figure>
        <figcaption>Current Balance &nbsp;</figcaption>
        <strong>${balance.toFixed(2)}</strong>
      </figure>
      <form onSubmit={onTransaction}>
        <div className="form-row">
          <label>
            Amount
            <input
              type="number"
              inputMode="decimal"
              min={0}
              step="0.01"
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)}
            />
          </label>
          <div>
            <button name="deposit">
              Deposit
            </button>
            <button name="withdrawal">Withdrawal</button>
          </div>
        </div>
        <div className="form-row">
          <label>
            Transfer to
            <input type="text" placeholder="Recipient Name" name="recipient" />
          </label>
          <button name="transfer">Transfer</button>
        </div>
      </form>
    </section>
  );
}
