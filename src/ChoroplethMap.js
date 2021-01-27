import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import Jsondata from "./tyhoon-data.json";

function App2() {
  const [val, setVal] = React.useState(["js"]);

  const handleChange = (e) => {
    console.log(e.target.value);
    // change したのはいいとして、ON なのか OFF なのか判定する必要がある
    if (val.includes(e.target.value)) {
      // console.log()
      // すでに含まれていれば OFF したと判断し、
      // イベント発行元を除いた配列を set し直す
      setVal(val.filter((item) => item !== e.target.value));
    } else {
      // そうでなければ ON と判断し、
      // イベント発行元を末尾に加えた配列を set し直す
      setVal([...val, e.target.value]);
      // state は直接は編集できない
      // つまり val.push(e.target.value) はNG ❌
    }
  };

  return (
    <>
      <label>
        <input
          type="checkbox"
          value="js"
          onChange={handleChange}
          checked={val.includes("js")}
        />
        JavaScript
      </label>
      <label>
        <input
          type="checkbox"
          value="python"
          onChange={handleChange}
          checked={val.includes("python")}
        />
        Python
      </label>
      <label>
        <input
          type="checkbox"
          value="java"
          onChange={handleChange}
          checked={val.includes("java")}
        />
        Java
      </label>
      <p>選択値：{val.join(", ")}</p>
    </>
  );
}

const ChoroplethMap = ({
  features,
  setMouseOverData,
  setMouseOverDataNumber,
}) => {
  const width = 960;
  const height = 2000;
  const standardScale = 1000;
  const datas = Jsondata[0];
  console.log(datas[2001]);
  let year = [];
  for (let i = 2001; i < 2021; i++) {
    year.push(i);
  }
  let x1, x2, y1, y2;
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [detailData, setDetailData] = useState("");
  const [val, setVal] = useState([2001]);
  console.log(val);

  const projection = d3
    .geoMercator()
    .scale(standardScale)
    .center([139.69167, 40.68944]);

  const path = d3.geoPath().projection(projection);

  // const color = d3
  //   .scaleLinear()
  //   .domain(d3.extent(features, (feature) => feature.properties.value))
  //   .range(["#ccc", "#f00"]);

  const detailDatas = (data, number) => {
    setMouseOverData(data);
    setMouseOverDataNumber(number);
    setIsMouseOver(true);
  };

  // チェックボックスの判定部分
  const handleChange = (e) => {
    console.log(e.target.value + "");
    // change したのはいいとして、ON なのか OFF なのか判定する必要がある
    if (val.includes(String(e.target.value))) {
      // すでに含まれていれば OFF したと判断し、
      // イベント発行元を除いた配列を set し直す
      setVal(val.filter((item) => item !== e.target.value));
    } else {
      // そうでなければ ON と判断し、
      // イベント発行元を末尾に加えた配列を set し直す
      setVal([...val, e.target.value]);
      // state は直接は編集できない
      // つまり val.push(e.target.value) はNG ❌
    }
  };

  return (
    <div className="container">
      <App2 />
      <div className="box">
        <b>
          {year.map((year, i) => {
            return (
              <label>
                <input
                  type="checkbox"
                  value={String(year)}
                  onChange={handleChange}
                  checked={val.includes(year)}
                />
                {year + " "}
              </label>
            );
          })}
        </b>
      </div>

      <svg width={width} height={height}>
        <g>
          {features.map((feature, i) => {
            return (
              <path key={i} d={path(feature)} fill="green" stroke="white" />
            );
          })}
          {/* 線引くコードはいったん置いといて、 */}
          {/* {val.map((year, k) => {
            datas[year].map((data, i) => {
              if (i == 0) {
                x2 = projection([data.経度, data.緯度])[0];
                y2 = projection([data.経度, data.緯度])[1];
              } else {
                x2 = x1;
                y2 = y1;
              }
              x1 = projection([datas[i].経度, datas[i].緯度])[0];
              y1 = projection([datas[i].経度, datas[i].緯度])[1];
              return (
                <line
                  key={i}
                  x1={x1}
                  x2={x2}
                  y1={y1}
                  y2={y2}
                  stroke="black"
                ></line>
              );
            });
          })} */}

          {val.map((year, k) => {
            return datas[year].map((data, i) => {
              // console.log(data);
              return Array(data.経度.length)
                .fill(0)
                .map((a, m) => {
                  const x = projection([data.経度[m], data.緯度[m]])[0];
                  const y = projection([data.経度[m], data.緯度[m]])[1];
                  // console.log(x, y);

                  if (isMouseOver) {
                  }
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="3"
                      fill="black"
                      onMouseOver={() => detailDatas(data, m)}
                      onMouseLeave={() => setIsMouseOver(false)}
                    />
                  );
                });
            });
          })}
        </g>
      </svg>
    </div>
  );
};

export const ChoroplethMapPage = ({
  setMouseOverData,
  setMouseOverDataNumber,
}) => {
  const [features, setFeatures] = useState(null);
  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.PUBLIC_URL}/data/japan.json`);
      const data = await res.json();
      const { features } = topojson.feature(data, data.objects.japan);
      setFeatures(features);
    })();
  }, []);
  if (features == null) {
    return <p>loading</p>;
  }
  return (
    <ChoroplethMap
      features={features}
      setMouseOverData={setMouseOverData}
      setMouseOverDataNumber={setMouseOverDataNumber}
    />
  );
};
