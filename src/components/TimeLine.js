import React from "react";
import "./TimeLine.css";
import {
  Popover,
  Button,
  Position,
  ControlType,
  Priority,
} from "@transferwise/components";
import Dropdown from "./Dropdown";
function TimeLine({
  fees,
  selectedFee,
  setSelectedFee,
  selectedFeeOption,
  setSelectedFeeOption,
  fromCurrency,
  amount,
  rate,
}) {
  console.log(amount);
  console.log(selectedFee);
  console.log(amount - selectedFee, "convert amount");
  return (
    <ul className="timeline-area">
      <li className="first">
        <span className="fee-details">
          {selectedFee && selectedFee} {fromCurrency.value}
        </span>
        <span className="fee-options">
          {/* <select name="w" id="1">
            <option value="a">1</option>
            <option value="b">2</option>
            <option value="c">3</option>
          </select> */}
          <Dropdown
            fees={fees}
            selectedFee={selectedFee}
            setSelectedFee={setSelectedFee}
            selectedFeeOption={selectedFeeOption}
            setSelectedFeeOption={setSelectedFeeOption}
            fromCurrency={fromCurrency}
          />
        </span>

        <span className="fee-text">fee</span>
      </li>
      <li className="second">
        <span className="amount-details">
          {(amount - selectedFee).toFixed(2)} {fromCurrency.value}
        </span>

        <span className="fee-amount">Amount we’ll convert</span>
      </li>
      <li className="three">
        <span className="generated-rate">{rate}</span>
        <span className="fee-rate">
          <Popover
            content="You’ll get this rate as long as we receive your 10 EUR within the next 51 hours."
            preferredPlacement={Position.BOTTOM}
            title="Guaranteed rate"
          >
            <Button
              type={ControlType.ACCENT}
              priority={Priority.TERTIARY}
              onClick={() => console.log(`I'm also triggered`)}
            >
              Guaranteed rate
            </Button>
          </Popover>
        </span>
      </li>
    </ul>
  );
}

export default TimeLine;
