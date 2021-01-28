import React, { useState } from "react";
import { ChoroplethMapPage } from "./ChoroplethMap";
import CheckBox from "./CheckBox";
import { color } from "d3";

const App = () => {
  const [selectedYear, setSelectedYear] = useState([]);
  const [mouseOverData, setMouseOverData] = useState({
    台風名: "",
    緯度: "",
    経度: "",
    日: "",
    時: "",
    月: "",
    最大風速: "",
    号: "",
    年: "",
  });

  const colorStyle = [
    "#000000",
    "#808080",
    "#fffaf0",
    "#00ffff",
    "#0000ff",
    "#00008b",
    "#00ff00",
    "#008000",
    "#008000",
    "#deb887",
    "#ffff00",
    "#ffa500",
    "#a0522d",
    "#800000",
    "#ff0000",
    "#ff1493",
    "#ff00ff",
    "#800080",
    "#fd8072",
  ];

  return (
    <body bgcolor="#e0ffff">
      <section className="hero is-primary">
        <div className="hero-body">
          <h1 className="title">Japanese-typhoon </h1>
        </div>
      </section>
      <div className="container">
        <br></br>
        <section className="section">
          <article class="message is-dark">
            <div class="message-header">
              <p>このサイトについて</p>
            </div>
            <div class="message-body">
              上陸した台風の経路図を年ごとに表しているサイトです。年を指定して経路の違いを見てみましょう。
              <p />
              経路の点にマウスを合わせるとその時の情報が出てきます。
              <p />
              気象庁「台風位置表」 (
              <a href="https://www.data.jma.go.jp/fcd/yoho/typhoon/position_table/index.html">
                https://www.data.jma.go.jp/fcd/yoho/typhoon/position_table/index.html
              </a>
              )を加工して作成
            </div>
          </article>
        </section>
      </div>

      <div className="container">
        <section className="section">
          <div className="columns">
            <div className="column is-one-quarter">
              <div className="box" style={{ height: "40%" }}>
                <b>
                  <font size="5">CheckBox MENU</font>
                </b>
                <CheckBox
                  setSelectedYear={setSelectedYear}
                  selectedYear={selectedYear}
                  colorStyle={colorStyle}
                />
              </div>

              <div className="box" style={{ height: "30%" }}>
                <b>
                  <font size="5">MENU</font>
                </b>
                <div className="field">
                  <label className="label">
                    <p>緯度:{mouseOverData.緯度}</p>
                    <p>経度:{mouseOverData.経度}</p>
                    <p>台風名:{mouseOverData.名前}</p>
                    <p>
                      {mouseOverData.月}月{mouseOverData.日}日{mouseOverData.時}
                      時
                    </p>
                    <p>最大風速{mouseOverData.最大風速}</p>
                    <p>号:{mouseOverData.号}</p>
                  </label>
                </div>

                <div className="field">
                  <div className="control"></div>
                </div>
              </div>
            </div>
            <div className="column">
              <ChoroplethMapPage
                setMouseOverData={setMouseOverData}
                selectedYear={selectedYear}
                colorStyle={colorStyle}
              />
            </div>
          </div>
        </section>
      </div>
      <footer className="footer">
        <div className="content has-text-centered">
          <p>&copy; 2020 Tatsumi Ito , Yuki Hatasa , Kyohei Kaneko</p>
        </div>
      </footer>
    </body>
  );
};

export default App;
