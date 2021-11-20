import React from "react";

function ColumnFilter({ column }) {
  const { filterValue, setFilter } = column;
  return (
    <div>
      <span>
        <input
          value={filterValue || ""}
          placeholder="Search"
          onChange={(e) => setFilter(e.target.value)}
        />
      </span>
    </div>
  );
}

export default ColumnFilter;
