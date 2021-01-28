import React, { useState } from "react";

import { ChoroplethMapPage } from "./ChoroplethMap";

const App = () => {
  const [mouseOverData, setMouseOverData] = useState({
    台風名: "",
    緯度: "",
    経度: "",
    年: "",
  });

  return (
    <body bgcolor="#e0ffff">
      <section className="hero is-primary">
        <div className="hero-body">
          <h1 className="title">Japanese-typhoon </h1>
        </div>
      </section>

      <div className="container">
        <section className="section">
          <div className="columns">
            <div className="column is-one-quarter">
              {/*プルダウンメニュー 画面3分の1*/}
              <div className="box" style={{ height: "50%" }}>
                <b>
                  <font size="5">Memu</font>
                </b>
                <div className="field">
                  <label className="label">2008,2020は上陸なし</label>
                </div>

                <div className="field">
                  <label className="label">
                    <p>緯度:{mouseOverData.緯度}</p>
                    <p>経度:{mouseOverData.経度}</p>
                    <p>台風名:{mouseOverData.名前}</p>
                    <p>年:{mouseOverData.年}</p>
                  </label>
                </div>

                <div className="field">
                  <div className="control"></div>
                </div>
              </div>
            </div>
            <div className="column">
              <ChoroplethMapPage setMouseOverData={setMouseOverData} />
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
