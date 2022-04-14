import React, { useState } from "react";
import "./Dropdown.css";

function Dropdown({
  fees,
  selectedFee,
  setSelectedFee,
  selectedFeeOption,
  setSelectedFeeOption,
  fromCurrency,
}) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="dropdown">
      <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
        {selectedFeeOption} Transfer
        <img
          alt="img"
          src="https://img.icons8.com/office/16/000000/expand-arrow--v1.png"
        />
      </div>
      {isActive && (
        <div className="dropdown-content">
          {fees &&
            fees.map(({ option, fee }) => (
              <div
                className={`dropdown-item ${
                  selectedFeeOption === option ? "selected" : "not-selected"
                }`}
                key={option}
                onClick={() => {
                  setSelectedFee(Number(fee.toFixed(3)));
                  setSelectedFeeOption(option);
                  setIsActive(false);
                }}
              >
                {option} Transfer - {fee.toFixed(3)} {fromCurrency.value} fee
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
