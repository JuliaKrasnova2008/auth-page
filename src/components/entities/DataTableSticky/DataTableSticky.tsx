import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Box, Button, Input, InputBase } from "@material-ui/core";
import { useAppSelector } from "../../../redux/store.ts";
import { dataElementT } from "../../../utils/data.ts";
import map from "lodash.map";
import { useStyles } from "./styles.ts";

interface DataTableStickyI {
  rows: dataElementT[];
  columns: any;
}

export default function DataTableSticky({ rows, columns }: DataTableStickyI) {
  const { currentUser } = useAppSelector((state) => state.user);

  const classes = useStyles();

  const [sortField, setSortField] = useState<string>("");
  const [order, setOrder] = useState<string>("asc");

  const [tableData, setTableData] = useState<dataElementT[]>(rows);

  const [minValue, setMinValue] = useState<string>("");
  const [maxValue, setMaxValue] = useState<string>("");

  //sorting
  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...tableData].sort((a, b) => {
        return (
          a[sortField].localeCompare(b[sortField]) *
          (sortOrder === "asc" ? 1 : -1)
        );
      });
      setTableData(sorted);
    }
  };

  //filter
  const filterRange = (min, max) => {
    //@ts-ignore
    let filtered = [...rows].filter((item) => {
      return min <= item.salary && item.salary <= max;
    });
    setTableData(filtered);
  };

  const handleClearForm = () => {
    setTableData(rows);
    setMinValue("");
    setMaxValue("");
  };

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setTableData((prev) =>
      map(prev, (elem) => {
        if (elem._id === id) {
          return { ...elem, [name]: value };
        } else {
          return elem;
        }
      })
    );
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {map(columns, ({ accessor, align, minWidth, label }) => {
                return (
                  <TableCell
                    key={accessor}
                    align={align}
                    style={{ minWidth: minWidth }}
                  >
                    {accessor === "createTime" ? (
                      <Button
                        className={classes.button}
                        onClick={() => handleSortingChange(accessor)}
                      >
                        {label}&#8645;
                      </Button>
                    ) : accessor === "salary" ? (
                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "20px",
                        }}
                      >
                        {label}
                        <Input
                          className={classes.input}
                          name="min"
                          placeholder="min"
                          value={minValue}
                          onChange={(e) => setMinValue(e.target.value)}
                        />
                        <Input
                          className={classes.input}
                          name="max"
                          placeholder="max"
                          value={maxValue}
                          onChange={(e) => setMaxValue(e.target.value)}
                        ></Input>
                        <Button
                          style={{ minWidth: "25px" }}
                          onClick={() => filterRange(minValue, maxValue)}
                        >
                          &#10003;
                        </Button>
                        <Button
                          style={{ minWidth: "25px" }}
                          onClick={() => handleClearForm()}
                        >
                          &#10007;
                        </Button>
                      </Box>
                    ) : (
                      label
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {map(tableData, (row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  {map(columns, ({ accessor, align, minWidth, label }) => {
                    const value = row[accessor];

                    return (
                      <TableCell key={accessor} align={align}>
                        {accessor === "address" ? (
                          `${value.street} ${value.town}${value.postode}`
                        ) : accessor === "pets" ? (
                          value.join(", ")
                        ) : accessor === "verified" ? (
                          value ? (
                            <span>&#10003;</span>
                          ) : (
                            <span>&#10007;</span>
                          )
                        ) : //@ts-ignore
                        currentUser.role === "admin" && accessor === "email" ? (
                          <InputBase
                            name="email"
                            placeholder="email"
                            value={value}
                            style={{
                              color: "rgb(63, 81, 181)",
                              fontSize: "14px",
                              width: "100%",
                            }}
                            inputProps={{
                              ariaLabel: "naked",
                            }}
                            onChange={(e) => handleChange(e, row._id)}
                          />
                        ) : //@ts-ignore
                        currentUser.role === "admin" &&
                          accessor === "telephone" ? (
                          <InputBase
                            name="telephone"
                            placeholder="telephone"
                            value={value}
                            style={{
                              border: "none",
                              color: "rgb(63, 81, 181)",
                              fontSize: "14px",
                              width: "100%",
                            }}
                            onChange={(e) => handleChange(e, row._id)}
                          />
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
