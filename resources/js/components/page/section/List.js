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
  const [searchurl, setSearchurl] = useState("/api/section");
  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to={`/app/section/edit/${row.id}`} className="btn">
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
      width: "225px",
    },
    {
      name: "Sub Title",
      selector: (row) => row._subtitle,
      center: true,
      width: "225px",
    },
    {
      name: "Heading",
      selector: (row) => row._heading,
      center: true,
      width: "200px",
    },
    {
      name: "Sub Heading",
      selector: (row) => row._subheading,
      center: true,
      width: "200px",
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
      name: "Video URL",
      selector: (row) => row._videourl,
      center: true,
      width: "225px",
    },
    {
      name: "Description",
      selector: (row) => row._description,
      center: true,
      width: "225px",
    },
    {
      name: "Sort",
      selector: (row) => row._sort,
      center: true,
      width: "225px",
    },
    {
      name: "Status",
      cell: (row) => row._status,
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
            <Link to="/app/section/add" className="btn">
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
