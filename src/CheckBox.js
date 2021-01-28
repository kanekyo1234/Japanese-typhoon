import React, { useEffect, useState } from "react";

const CheckBox = ({ setSelectedYear, selectedYear, colorStyle }) => {
  const [isChecked, setIsChecked] = useState(new Array(20).fill(false));

  // チェックボックスの判定部分
  const handleChange = (i) => {
    let value = i + 2001;
    let newSelectedYear;
    let newCheckedYear = [...isChecked];
    newCheckedYear[i] = !newCheckedYear[i];
    setIsChecked(newCheckedYear);
    if (selectedYear.includes(value)) {
      newSelectedYear = selectedYear.filter((item) => item !== value);
    } else {
      newSelectedYear = [...selectedYear, value];
    }
    console.log(isChecked);
    setSelectedYear(newSelectedYear);
  };

  const handleDelete = () => {
    setIsChecked(new Array(20).fill(false));
    setSelectedYear([]);
    console.log(isChecked);
  };
  return (
    <div className="box" style={{ width: "1100px" }}>
      <b>
        {[...Array(19)].map((_, i) => {
          let year = i + 2001;
          if (i !== 7) {
            return (
              <label type="checkbox" style={{ borderColor: "red" }}>
                <input
                  type="checkbox"
                  value={i + 2001}
                  onChange={() => handleChange(i)}
                  checked={isChecked[i]}
                />
                <span
                  style={{
                    textDecoration: "underline 3px",
                    textDecorationColor: colorStyle[i],
                  }}
                >
                  {" " + year + " "}
                </span>
              </label>
            );
          }
        })}
      </b>
      <button className="button is-small" onClick={() => handleDelete()}>
        clear
      </button>
    </div>
  );
};

export default CheckBox;
