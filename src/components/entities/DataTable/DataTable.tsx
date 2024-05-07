import React from "react";
import { columns } from "./columns.ts";
import { dataElementT } from "../../../utils/data.ts";
import DataTableSticky from "../DataTableSticky/DataTableSticky.tsx";

interface DataTableI {
  data: dataElementT[];
}

export const DataTable = ({ data }: DataTableI) => {
  return <DataTableSticky rows={data} columns={columns} />;
};
