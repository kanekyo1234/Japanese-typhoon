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
      <ChoroplethMapPage />
    </body>
    // </Router>
  );
};

export default App;
