import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import Jsondata from "./typhoon-example.json";

const ChoroplethMap = ({ features }) => {
  const width = 1060;
  const height = 2000;
  const standardScale = 2000;
  const datas = Jsondata;
  let x1, x2, y1, y2;

  const projection = d3
    .geoMercator()
    .scale(standardScale)
    .center([129.69167, 40.68944]);

  const path = d3.geoPath().projection(projection);

  const color = d3
    .scaleLinear()
    .domain(d3.extent(features, (feature) => feature.properties.value))
    .range(["#ccc", "#f00"]);

  const drawLines = (i) => {
    const x1 = projection([datas[i].経度, datas[i].緯度])[0];
    const y1 = projection([datas[i].経度, datas[i].緯度])[1];
    if (i === datas.length - 1) {
      const x2 = projection([datas[i].経度, datas[i].緯度])[0];
      const y2 = projection([datas[i].経度, datas[i].緯度])[1];
      return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" />;
    }
    const x2 = projection([datas[i + 1].経度, datas[i + 1].緯度])[0];
    const y2 = projection([datas[i + 1].経度, datas[i + 1].緯度])[1];
    return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" />;
  };
  return (
    <svg width={width} height={height}>
      <g>
        {features.map((feature, i) => {
          console.log(feature);
          return <path key={i} d={path(feature)} fill="green" stroke="white" />;
        })}

        {datas.map((data, i) => {
          if (i == 0) {
            x2 = projection([datas[i].経度, datas[i].緯度])[0];
            y2 = projection([datas[i].経度, datas[i].緯度])[1];
          } else {
            x2 = x1;
            y2 = y1;
          }
          x1 = projection([datas[i].経度, datas[i].緯度])[0];
          y1 = projection([datas[i].経度, datas[i].緯度])[1];
          console.log(x1, x2, y1, y2);
          return <line x1={x1} x2={x2} y1={y1} y2={y2} stroke="black"></line>;
        })}
      </g>
    </svg>
  );
};
export const ChoroplethMapPage = () => {
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
  return <ChoroplethMap features={features} />;
};