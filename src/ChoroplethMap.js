import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import Jsondata from "./tyhoon-data-landing3.json";

const ChoroplethMap = ({ features, setMouseOverData }) => {
  const width = 1000;
  const height = 1000;
  const standardScale = 1500;
  const datas = Jsondata[0];
  let year = [];
  for (let i = 2001; i < 2021; i++) {
    if (i != 2008) {
      year.push(i);
    }
  }
  let x1, x2, y1, y2;
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [selectedYear, setSelectedYear] = useState([]);
  const colorStyle = [
    "#000000",
    "#808080",
    "#fffaf0",
    "#00ffff",
    "#0000ff",
    "#00008b",
    "#008080",
    "",
    "#008000",
    "#00ff00",
    " #deb887",
    "#ffff00",
    "#ffa500",
    "#a0522d",
    "#800000",
    "#ff0000",
    "#ff1493",
    "#ff00ff",
    "#800080",
  ];

  const projection = d3
    .geoMercator()
    .scale(standardScale)
    .center([139.69167, 40.68944]);

  const path = d3.geoPath().projection(projection);

  const detailDatas = (data, i) => {
    console.log(data.台風名);
    setMouseOverData({
      名前: data.台風名,
      年: data.年,
      号: data.台風番号,
      緯度: data.緯度[i],
      経度: data.経度[i],
      日: data.日[i],
      月: data.月[i],
      時: data.時[i],
      最大風速: data.最大風速[i],
      階級: data.階級[i],
      中心気圧: data.中心気圧[i],
    });

    setIsMouseOver(true);
  };

  // チェックボックスの判定部分
  const handleChange = (i) => {
    let value = i + 2001;
    let newSelectedYear;
    if (selectedYear.includes(value)) {
      newSelectedYear = selectedYear.filter((item) => item !== value);
    } else {
      newSelectedYear = [...selectedYear, value];
    }
    console.log(newSelectedYear);
    setSelectedYear(newSelectedYear);
    console.log(selectedYear);
  };

  //線のスタイルの変更の変数 一応まとめて作ったんだけどいらなかったら消して元に戻してください(´;ω;｀)
  const lineStyle = {
    strokeWidth: "2.0px",
    // opacity: "", //透度
  };

  //円のスタイルの変更の変数
  const circleStyle = {
    r: "3",
    fill: "black",
    opacity: "0.5", //透度
  };

  return (
    <div className="container">
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
            } else {
              return;
            }
          })}
        </b>
      </div>

      <svg width={width} height={height}>
        <g>
          {features.map((feature, i) => {
            return (
              <path key={i} d={path(feature)} fill="white" stroke="gray" />
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
                    stroke={colorStyle[Number(year) - 2001]}
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
