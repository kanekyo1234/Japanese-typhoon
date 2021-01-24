import React from "react";

import { ChoroplethMapPage } from "./ChoroplethMap";

const App = () => {
  return (
    // <Router>
    <body bgcolor="#e0ffff">
      <section className="hero is-primary">
        <div className="hero-body">
          <h1 className="title">Japanese-typhoon</h1>
        </div>
      </section>

      <div className="container">
        <section className="section">
          <div className="columns">
            <div className="column is-one-quarter">
              {/*プルダウンメニュー 画面3分の1*/}
              <div className="box" style={{ height: "100%" }}>
                <b>
                  <font size="5">Filter memu</font>
                </b>
                <div className="field">
                  <label className="label">台風何号の説明とか？</label>
                  <div className="control">
                    <p>23tyhg</p>
                  </div>
                </div>

                <div className="field">
                  <label className="label">
                    ここらへんで点の説明とかするかなー？
                  </label>
                </div>

                <div className="field">
                  <label className="label">。。。。</label>
                  <div className="control">
                    {/* <div className="select is-fullwidth"></div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <ChoroplethMapPage />
            </div>
          </div>
        </section>
      </div>
    </body>
  );
};

export default App;
