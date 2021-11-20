import ColumnFilter from "./ColumnFilter";

export const COLUMNS = [
  {
    Header: "Category",
    accessor: "category",
    Filter: ColumnFilter,
  },
  {
    Header: "Name",
    accessor: "name",
    Filter: ColumnFilter,
  },
  {
    Header: "Image",
    accessor: "image",
    Filter: ColumnFilter,
    Cell: ({ cell: { value } }) => <img width="60px" src={value} alt={"img"} />,
  },
  {
    Header: "Label",
    accessor: "label",
    Filter: ColumnFilter,
  },
  {
    Header: "Price",
    accessor: "price",
    Filter: ColumnFilter,
    aggregate: 'sum',
    Aggregated: ({ value }) => `${value} (sum)`,
  },
  {
    Header: "Description",
    accessor: "description",
    Filter: ColumnFilter,
  },
];

export const GROUPED_COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id",
  },
  {
    Header: "Name",
    Footer: "Name",
    columns: [
      {
        Header: "First Name",
        Footer: "First Name",
        accessor: "first_name",
      },
      {
        Header: "Last Name",
        Footer: "Last Name",
        accessor: "last_name",
      },
    ],
  },
  {
    Header: "Info",
    Footer: "Info",
    columns: [
      {
        Header: "Date of Birth",
        Footer: "Date of Birth",
        accessor: "date_of_birth",
      },
      {
        Header: "Country",
        Footer: "Country",
        accessor: "country",
      },
      {
        Header: "Phone",
        Footer: "Phone",
        accessor: "phone",
      },
    ],
  },
];
