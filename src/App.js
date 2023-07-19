import { useState } from "react"

export default function App() {
  const [bill, setBill] = useState("")
  const [percentage1, setPercentage1] = useState(0)
  const [percentage2, setPercentage2] = useState(0)

  const averageTips = Math.round(bill * ((percentage1 + percentage2) / 2))

  function handleReset() {
    setBill("")
    setPercentage1(0)
    setPercentage2(0)
  }

  return (
    <div>
      <BillInput bill={bill} onSetBill={setBill} />

      <SelectPercentage percentage={percentage1} onSelect={setPercentage1}>
        <label>How did you like the service?</label>
      </SelectPercentage>

      <SelectPercentage percentage={percentage2} onSelect={setPercentage2}>
        <>How did your friend like the service?</>
      </SelectPercentage>

      {bill ? (
        <>
          <Output bill={bill} averageTips={averageTips} />
          <Reset handleReset={handleReset} />
        </>
      ) : null}
    </div>
  )
}

function BillInput({ bill, onSetBill }) {
  function handleChange(e) {
    if (!isFinite(e.target.value)) return
    onSetBill(Number(e.target.value))
  }
  return (
    <div>
      <label>How much was the bill?</label>
      <input
        type="text"
        placeholder="Bill value"
        value={bill}
        onChange={handleChange}
      ></input>
    </div>
  )
}

function SelectPercentage({ children, percentage, onSelect }) {
  return (
    <div>
      {children}
      <select
        value={percentage}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        <option value={0}>Dissatisfied (0%)</option>
        <option value={0.05}>It was okay (5%)</option>
        <option value={0.1}>It was good (10%)</option>
        <option value={0.2}>Absolutely amazing! (20%)</option>
      </select>
    </div>
  )
}

function Output({ bill, averageTips }) {
  return (
    <div>
      <h2>
        You pay ${bill + averageTips} (${bill} + ${averageTips} tip)
      </h2>
    </div>
  )
}

function Reset({ handleReset }) {
  return <button onClick={handleReset}>Reset</button>
}
