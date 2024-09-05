import { useState } from "react";
import { Button } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import Grid from "@mui/material/Grid";
import Layout from "../../layout/Layout";
import Datatablecomponent from "../../Datatable";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import { format } from "date-fns";

const List = () => {
  const [delrow, setDelrow] = useState(0);
  const [searchurl, setSearchurl] = useState("/api/newsfeed");
  const columns = [
    {
      name: "Title",
      selector: (row) => row._title,
      center: true,
      width: "300px",
    },
    {
      name: "Sub Title",
      selector: (row) => row._subtitle,
      center: true,
      width: "400px",
    },
    {
      name: "Date",
      selector: (row) => format(new Date(row._date), "do MMM, yyyy"),
      center: true,
      width: "200px",
    },
    {
      name: "Image",
      cell: (row) => <img src={row._image} width={50} alt={"nothing"} />,
      selector: (row) => row.link,
      center: true,
      width: "120px",
    },
    {
      name: "Status",
      cell: (row) => row._status,
      cell: (row) => (row._status === 1 ? "Active" : "Inactive"),
      center: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to={`/app/newsfeed/edit/${row.id}`} className="btn">
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
            <Link to="/app/newsfeed/add" className="btn">
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
