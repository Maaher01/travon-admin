import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Grid from "@mui/material/Grid";
import Layout from "../../layout/Layout";
import Datatablecomponent from "../../Datatable";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const List = () => {
  const [delrow, setDelrow] = useState(0);
  const [searchurl, setSearchurl] = useState("/api/contact");
  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to={`/app/contact/edit/${row.id}`} className="btn">
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
      center: true,
    },
    {
      name: "Mobile",
      selector: (row) => row._mobile,
      width: "150px",
      center: true,
    },
    {
      name: "Email",
      selector: (row) => row._email,
      width: "200px",
      center: true,
    },
    {
      name: "Topic",
      selector: (row) => row._topic,
      width: "200px",
      center: true,
    },
    {
      name: "Message",
      selector: (row) => row._message,
      width: "450px",
      center: true,
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
          <Grid item xs={10}>
            {renderDatatable()}
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default List;
