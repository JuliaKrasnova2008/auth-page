import React from "react";
import { data } from "../../utils/data.ts";
import { DataTable } from "../entities/DataTable/DataTable.tsx";

function Main() {
  return (
    <div>
      <DataTable data={data} />
    </div>
  );
}
export default Main;
