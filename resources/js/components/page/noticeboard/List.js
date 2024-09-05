import { useState, React } from "react";
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
  const [searchurl, setSearchurl] = useState("/api/noticeboard");
  const columns = [
    {
      name: "Title",
      selector: (row) => row._title,
      width: "225px",
    },
    {
      name: "Sub Title",
      selector: (row) => row._subtitle,
      width: "300px",
    },
    {
      name: "Description",
      selector: (row) => row._description,
      width: "400px",
    },
    {
      name: "Image",
      cell: (row) => {
        const isPdf = row._image.endsWith(".pdf");
        return isPdf ? (
          <object
            data={row._image}
            type="application/pdf"
            width="50"
            height="50"
          >
            <a href={row._image} target="_blank" rel="noopener noreferrer">
              View PDF
            </a>
          </object>
        ) : (
          <img src={row._image} width={50} alt="nothing" />
        );
      },
      selector: (row) => row.link,
      center: true,
      width: "120px",
    },
    {
      name: "Latitude & Longitude",
      selector: (row) => row._latlong,
      width: "150px",
    },
    {
      name: "Date",
      selector: (row) => format(new Date(row._date), "do MMM, yyyy"),
      width: "150px",
    },
    {
      name: "Time",
      selector: (row) => row._time,
      width: "120px",
    },
    {
      name: "Location",
      selector: (row) => row._location,
      width: "250px",
    },
    {
      name: "Status",
      cell: (row) => (row._status === 1 ? "Active" : "Inactive"),
      center: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to={`/app/noticeboard/edit/${row.id}`} className="btn">
            <i className="material-icons text-warning">
              <CreateIcon sx={{ color: "green" }} />
            </i>
          </Link>
        </div>
      ),
      selector: (row) => row.id,
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
            <Link to="/app/noticeboard/add" className="btn">
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
