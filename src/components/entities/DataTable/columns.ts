enum accessorName {
  NAME = "name",
  CREATETIME = "createTime",
  ADDRESS = "address",
  TELEPHONE = "telephone",
  PETS = "pets",
  SCORE = "score",
  EMAIL = "email",
  URL = "url",
  DESCRIPTION = "description",
  VERIFIED = "verified",
  SALARY = "salary",
}
enum alignName {
  RIGHT = "right",
  LEFT = "left",
  CENTER = "center",
}
interface ColumnI {
  accessor: accessorName;
  label: string;
  minWidth?: number;
  align?: alignName;
}

export const columns: ColumnI[] = [
  { accessor: accessorName.NAME, label: "Name", minWidth: 170 },
  { accessor: accessorName.CREATETIME, label: "Create Time", minWidth: 150 },
  {
    accessor: accessorName.ADDRESS,
    label: "Address",
    minWidth: 170,
  },
  {
    accessor: accessorName.TELEPHONE,
    label: "Telephone",
    minWidth: 170,
  },
  {
    accessor: accessorName.PETS,
    label: "Pets",
    minWidth: 120,
  },
  {
    accessor: accessorName.SCORE,
    label: "Score",
    minWidth: 120,
  },
  {
    accessor: accessorName.EMAIL,
    label: "Email",
    minWidth: 270,
  },
  {
    accessor: accessorName.URL,
    label: "URL",
    minWidth: 170,
  },
  {
    accessor: accessorName.DESCRIPTION,
    label: "Description",
    minWidth: 370,
  },
  {
    accessor: accessorName.VERIFIED,
    label: "Verified",
    minWidth: 170,
    align: alignName.RIGHT,
  },
  {
    accessor: accessorName.SALARY,
    label: "Salary",
    minWidth: 290,
    align: alignName.RIGHT,
  },
];
