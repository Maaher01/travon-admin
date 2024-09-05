import { useState } from "react";
import { Button } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import Grid from "@mui/material/Grid";
import Layout from "../../layout/Layout";
import Datatablecomponent from "../../Datatable";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";

const List = () => {
  const [delrow, setDelrow] = useState(0);
  const [searchurl, setSearchurl] = useState("/api/component");
  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to={`/app/component/edit/${row.id}`} className="btn">
            <i className="material-icons text-warning">
              <CreateIcon sx={{ color: "green" }} />
            </i>
          </Link>
        </div>
      ),
      selector: (row) => row.id,
      center: true,
      width: "120px",
    },
    {
      name: "Title",
      selector: (row) => row._title,
      center: true,
      width: "250px",
    },
    {
      name: "Sub Title",
      selector: (row) => row._subtitle,
      center: true,
      width: "250px",
    },
    {
      name: "Image",
      cell: (row) => <img src={row._image} width={50} alt={"nothing"} />,
      selector: (row) => row.link,
      center: true,
      width: "120px",
    },
    {
      name: "Video URL",
      selector: (row) => row._videourl,
      center: true,
      width: "225px",
    },
    {
      name: "Link",
      selector: (row) => row._link,
      center: true,
      width: "200px",
    },
    {
      name: "Description",
      selector: (row) => row._description,
      center: true,
      width: "200px",
    },
    {
      name: "Sort",
      selector: (row) => row._sort,
      center: true,
    },
    {
      name: "Status",
      cell: (row) => (row._status === 1 ? "Active" : "Inactive"),
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
          <Grid item xs={11}>
            <Link to="/app/component/add" className="btn">
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ marginBottom: "30px" }}
              >
                ADD
              </Button>
            </Link>
          </Grid>
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
