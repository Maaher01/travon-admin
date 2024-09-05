import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Layout from "../../layout/Layout";
import BackupIcon from "@mui/icons-material/Backup";
import { useParams } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Edit = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);
  const [img, setImg] = useState(null);
  const [menuid, setMenuid] = useState("");
  const [menulist, setMenulist] = useState([]);
  const params = useParams();
  const fetchMenu = async () => {
    axios
      .get("/api/menu")
      .then((response) => {
        setMenulist(response.data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchMenu();
    fetchData();
  }, []);


  const fetchData = async () => {
    await axios
      .get(`/api/image/edit/${params.id}`)
      .then(({ data }) => {
        const alldata = data.data;
        setImageUrl(alldata._image);
        setUniversityid(alldata._universityid);
        toast("Data Found");
      })
      .catch(({ response: { data } }) => {
        toast("No Data Found");
      });
  };

  const handleChangemenu = (event) => {
    setMenuid(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("image", img);
    formData.append("menuid", menuid);
    axios
      .post(`/api/image/update/${params.id}`, formData)
      .then(function (response) {
        if (response.data.errors) {
          toast(response.data.message);
        } else {
          toast("Data Updated Successful");
        }
      })
      .catch(function (error) {
        console.log(error);
        //toast("problem");
      });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setImg(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  
  return (
    <>
      <Layout>
        <Box component={"form"} onSubmit={handleSubmit}>
          <Grid container>
          <Grid item xs={1}></Grid>
            <Grid item xs={11}>
              <FormControl variant="outlined" sx={{ minWidth: 725 }}>
                <InputLabel>Menu</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  value={menuid}
                  onChange={handleChangemenu}
                  label="Menu"
                  name="menu"
                  sx={{ backgroundColor: "white" }}
                >
                  <MenuItem value="0">
                    <em>None</em>
                  </MenuItem>
                  {menulist.map((menu_list) => (
                    <MenuItem value={menu_list.id}>{menu_list._title}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={11} sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                startIcon={<BackupIcon />}
                component="label"
              >
                {" "}
                Upload Logo
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileUpload}
                />
              </Button>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={11}>
              {imageUrl && (
                <img src={imageUrl} alt="Uploaded Image" height="150" />
              )}
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={11}>
              <Button
                variant={"outlined"}
                type={"submit"}
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Layout>
    </>
  );
};

export default Edit;
