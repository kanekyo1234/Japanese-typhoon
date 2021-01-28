import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import Jsondata from "./tyhoon-data-landing2.json";

const ChoroplethMap = ({ features, setMouseOverData }) => {
  const width = 1000;
  const height = 1000;
  const standardScale = 1000;
  const datas = Jsondata[0];
  let year = [];
  for (let i = 2001; i < 2021; i++) {
    if (i != 2008) {
      year.push(i);
    }
  }
  let x1, x2, y1, y2;
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [val, setVal] = useState([2001, 2002, 2003]);

  // const [years, setYears] = useState(Array(20).fill(false));
  const [selectedYear, setSelectedYear] = useState([]);

  const projection = d3
    .geoMercator()
    .scale(standardScale)
    .center([139.69167, 40.68944]);

  const path = d3.geoPath().projection(projection);

  const detailDatas = (data, i) => {
    console.log(data.台風名);
    setMouseOverData({
      名前: data.台風名,
      緯度: data.緯度[i],
      経度: data.経度[i],
      年: data.年,
    });

    setIsMouseOver(true);
  };

  // チェックボックスの判定部分
  const handleChange = (i) => {
    let value = i + 2001;
    let index = selectedYear.indexOf(value);
    console.log(index);
    let newSelectedYear;
    if (selectedYear.includes(value)) {
      newSelectedYear = selectedYear.filter((item) => item !== value);
    } else {
      newSelectedYear = [...selectedYear, value];
    }
    console.log(newSelectedYear);
    setSelectedYear(newSelectedYear);
    console.log(selectedYear);
    // let newSelectedYears = years;
    // newSelectedYears[i] = !newSelectedYears[i];
    // setYears(newSelectedYears);
  };

  //線のスタイルの変更の変数 一応まとめて作ったんだけどいらなかったら消して元に戻してください(´;ω;｀)
  const lineStyle = {
    stroke: "black", //色
    strokeWidth: "1.0px",
    opacity: "0.5", //透度
  };

  //円のスタイルの変更の変数
  const circleStyle = {
    r: "3",
    fill: "black",
    opacity: "0.5", //透度
  };

  return (
    <div className="container">
      <div className="box">
        <b>
          {[...Array(19)].map((_, i) => {
            if (i !== 7) {
              return (
                <label type="checkbox">
                  <input
                    type="checkbox"
                    value={i + 2001}
                    onChange={() => handleChange(i)}
                  />
                  {i + 2001 + " "}
                </label>
              );
            } else {
              return;
            }
          })}
        </b>
      </div>
      {/* <div className="box">
        <b>
          {year.map((year, i) => {
            return (
              <label>
                <input
                  type="checkbox"
                  value={String(year)}
                  onChange={handleChange}
                />
                {year + " "}
              </label>
            );
          })}
        </b>
      </div> */}

      <svg width={width} height={height}>
        <g>
          {features.map((feature, i) => {
            return (
              <path key={i} d={path(feature)} fill="green" stroke="white" />
            );
          })}

          {/* ここから線の描画 */}

          {selectedYear.map((year, k) => {
            return datas[year].map((data, index) => {
              let len = data.経度.length;
              return [...Array(len)].map((d, i) => {
                if (i === 0) {
                  x2 = projection([data.経度[i], data.緯度[i]])[0];
                  y2 = projection([data.経度[i], data.緯度[i]])[1];
                } else {
                  x2 = x1;
                  y2 = y1;
                }
                x1 = projection([data.経度[i], data.緯度[i]])[0];
                y1 = projection([data.経度[i], data.緯度[i]])[1];
                return (
                  <line
                    key={i}
                    x1={x1}
                    x2={x2}
                    y1={y1}
                    y2={y2}
                    style={lineStyle}
                  ></line>
                );
              });
            });
          })}

          {/* ここからは点の描画 */}

          {selectedYear.map((year, index) => {
            return datas[year].map((data, index) => {
              let len = data.経度.length;
              return [...Array(len)].map((d, i) => {
                const x = projection([data.経度[i], data.緯度[i]])[0];
                const y = projection([data.経度[i], data.緯度[i]])[1];
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    style={circleStyle}
                    onMouseOver={() => detailDatas(data, i)}
                    onMouseLeave={() => setIsMouseOver(false)}
                  ></circle>
                );
              });
            });
          })}
        </g>
      </svg>
    </div>
  );
};

export const ChoroplethMapPage = ({ setMouseOverData }) => {
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
    <ChoroplethMap features={features} setMouseOverData={setMouseOverData} />
  );
};
