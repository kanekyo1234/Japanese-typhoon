import React, { useEffect, useState } from "react";

const CheckBox = ({ setSelectedYear, selectedYear, colorStyle }) => {
  const [isChecked, setIsChecked] = useState(new Array(20).fill(false));
  const years = [
    [2001, 2002],
    [2003, 2004],
    [2005, 2006],
    [2007, 2009],
    [2010, 2011],
    [2012, 2013],
    [2014, 2015],
    [2016, 2017],
    [2018, 2019],
  ];

  // チェックボックスの判定部分
  const handleChange = (i, year) => {
    let newSelectedYear;
    let newCheckedYear = [...isChecked];
    newCheckedYear[i] = !newCheckedYear[i];
    setIsChecked(newCheckedYear);
    if (selectedYear.includes(year)) {
      newSelectedYear = selectedYear.filter((item) => item !== year);
    } else {
      newSelectedYear = [...selectedYear, year];
    }
    setSelectedYear(newSelectedYear);
    console.log(selectedYear);
  };

  const handleDelete = () => {
    setIsChecked(new Array(20).fill(false));
    setSelectedYear([]);
    console.log(isChecked);
  };
  return (
    <div className="containar">
      <b>
        {years.map((_, i) => {
          let index = i * 2;
          return (
            <div style={{ padding: "4px 0" }}>
              <label
                type="checkbox"
                style={{
                  paddingLeft: "30px",
                }}
              >
                <input
                  type="checkbox"
                  value={years[i][0]}
                  onChange={() => handleChange(index, years[i][0])}
                  checked={isChecked[index]}
                />
                <span
                  style={{
                    textDecoration: "underline 3px",
                    textDecorationColor: colorStyle[years[i][0] - 2001],
                  }}
                >
                  {" " + years[i][0] + " "}
                </span>
              </label>
              <label
                type="checkbox"
                style={{
                  paddingLeft: "40px",
                  //   textAlign: "center",
                }}
              >
                <input
                  type="checkbox"
                  value={years[i][1]}
                  onChange={() => handleChange(index + 1, years[i][1])}
                  checked={isChecked[index + 1]}
                />
                <span
                  style={{
                    textDecoration: "underline 3px",
                    textDecorationColor: colorStyle[years[i][1] - 2001],
                  }}
                >
                  {" " + years[i][1] + " "}
                </span>
              </label>
            </div>
          );
        })}
      </b>
      <button
        className="button is-small"
        onClick={() => handleDelete()}
        style={{ marginTop: "12px" }}
      >
        <span style={{ padding: "0 60px", fontSize: "25px" }}>CREAR</span>
      </button>
    </div>
  );
};

export default CheckBox;
