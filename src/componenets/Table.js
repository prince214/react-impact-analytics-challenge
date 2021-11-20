import {
  useExpanded,
  useGroupBy,
  useSortBy,
  useTable,
  useFilters,
  useRowSelect,
  usePagination,
} from "react-table";
import { Checkbox } from "./CheckBox";

function Table({ columns, data }) {
  const tableInstance = useTable(
    {
      columns: columns,
      data: data,
      initialState: {
        pageIndex: 0,
        pageSize: 8,
        sortBy: [
          {
            id: "price",
            desc: true,
          },
          {
            id: "name",
            desc: true,
          },
        ],
      },
    },
    useFilters,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ]);
    }
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    gotoPage,
    pageCount,
    pageOptions,
    state,
    prepareRow,
    selectedFlatRows,
  } = tableInstance;

  const { pageIndex } = state;

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.canGroupBy && column.id === "category" ? (
                    <span {...column.getGroupByToggleProps()}>
                      {" "}
                      {column.isGrouped ? "+ " : "- "}
                    </span>
                  ) : null}

                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                  </span>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.isGrouped ? (
                        <>
                          {cell.render("Cell")} ({row.subRows.length})
                          <span {...row.getToggleRowExpandedProps()}>
                            {" "}
                            {row.isExpanded ? "▼" : "►"}
                          </span>
                        </>
                      ) : cell.isAggregated ? (
                        cell.render("Aggregated")
                      ) : cell.isPlaceholder ? null : (
                        cell.render("Cell")
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="float-right">
        <span>
          <strong>
            Page {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
      </div>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map((row) => row.original),
            },
            null,
            2
          )}
        </code>
      </pre>
    </>
  );
}

export default Table;
