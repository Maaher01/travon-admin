import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Grid from "@mui/material/Grid";
import Layout from "../../layout/Layout";
import Datatablecomponent from "../../Datatable";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { format } from "date-fns";

function List() {
  const [delrow, setDelrow] = useState(0);
  const [searchurl, setSearchurl] = useState("/api/studentregistration");
  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to={`/app/studentregistration/edit/${row.id}`} className="btn">
            <i className="material-icons text-warning">
              <RemoveRedEyeIcon sx={{ color: "blue" }} />
            </i>
          </Link>
        </div>
      ),
      selector: (row) => row.id,
      width: "100px",
    },
    {
      name: "Name",
      selector: (row) => row._name,
      width: "200px",
    },
    {
      name: "Father's Name",
      selector: (row) => row._fathername,
      width: "200px",
    },
    {
      name: "Mother's Name",
      selector: (row) => row._mothername,
      width: "200px",
    },
    {
      name: "Date of Birth",
      selector: (row) => format(new Date(row._dob), "dd-MM-yyyy"),
      width: "125px",
    },
    {
      name: "Mobile",
      selector: (row) => row._mobile,
      width: "150px",
    },
    {
      name: "Parent's Mobile",
      selector: (row) => row._parentmobile,
      width: "150px",
    },
    {
      name: "Email",
      selector: (row) => row._email,
      width: "200px",
    },
    {
      name: "Address",
      selector: (row) => row._address,
      width: "350px",
    },
    {
      name: "Qualification",
      selector: (row) => row._qualification,
      width: "125px",
    },
    {
      name: "Pass Year",
      selector: (row) => row._passyear,
      width: "100px",
    },
    {
      name: "Group",
      selector: (row) => row._group,
      width: "100px",
    },
    {
      name: "Board",
      selector: (row) => row._board,
      width: "100px",
    },
    {
      name: "SSC Roll",
      selector: (row) => row._sscroll,
      width: "100px",
    },
    {
      name: "SSC No.",
      selector: (row) => row._sscnumber,
      width: "100px",
    },
    {
      name: "GPA",
      selector: (row) => row._gpa,
      width: "100px",
    },
  ];

  const renderDatatable = () => {
    return (
      <Datatablecomponent
        columns={columns}
        url={searchurl}
        delrow={delrow}
      ></Datatablecomponent>
    );
  };
  return (
    <>
      <Layout>
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs={11}></Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            {renderDatatable()}
          </Grid>
        </Grid>
      </Layout>
    </>
  );
}

export default List;
