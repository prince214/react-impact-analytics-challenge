import React, { useMemo, useState, useEffect } from "react";
import { COLUMNS } from "./componenets/columns.js";
import Table from "./componenets/Table.js";
import "./App.css";

function App() {
  const [state, setState] = useState([]);
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => state, [state]);

  useEffect(() => {
    async function getMockData() {
      await fetch(
        "https://s3-ap-southeast-1.amazonaws.com/he-public-data/reciped9d7b8c.json"
      )
        .then((res) => res.json())
        .then((data) => {
          setState(data);
        });
    }
    getMockData();
  }, []);

  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
}

export default App;
