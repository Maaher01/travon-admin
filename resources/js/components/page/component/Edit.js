import { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Layout from "../../layout/Layout";
import BackupIcon from "@mui/icons-material/Backup";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Edit = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [status, setStatus] = useState("");
  const [menuid, setMenuid] = useState("");
  const [sectionid, setSectionid] = useState("");
  const [menulist, setMenulist] = useState([]);
  const [sectionlist, setSectionlist] = useState([]);
  const [menuSelected, setMenuSelected] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [link, setLink] = useState("");
  const [from, setFrom] = useState("");
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState("");
  const [groupsize, setGroupsize] = useState("");
  const [date, setDate] = useState("");
  const [latlong, setLatlong] = useState("");
  const [description, setDescription] = useState("");
  const [videourl, setVideourl] = useState("");
  const [position, setPosition] = useState("");
  const [img, setImg] = useState("");

  const handleChangestatus = (event) => {
    setStatus(event.target.value);
  };

  const handleChangemenu = (event) => {
    setMenuid(event.target.value);
    setMenuSelected(!!event.target.value);

    axios
      .get(`/api/section/${event.target.value}`)
      .then((response) => {
        setSectionlist(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangesection = (event) => {
    setSectionid(event.target.value);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
      [{ color: [] }, { background: [] }],
    ],
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    formData.append("status", status);
    formData.append("menu", menuid);
    formData.append("section", sectionid);
    formData.append("image", img);
    formData.append("description", description);

    axios
      .post(`/api/component/update/${params.id}`, formData)
      .then(function (response) {
        if (response.data.errors) {
          toast(response.data.message);
        } else {
          toast("Data Updated Successful");
        }
        // navigate("/app/dashboard");
      })
      .catch(function (error) {
        console.log(error.message);
        toast("An Error Occured");
      });
  };

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

  const fetchSection = async () => {
    axios
      .get("/api/section")
      .then((response) => {
        setSectionlist(response.data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchMenu();
    fetchSection();
    fetchData();
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setImg(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const fetchData = async () => {
    await axios
      .get(`/api/component/edit/${params.id}`)
      .then(({ data }) => {
        const alldata = data.data;
        console.log(alldata);
        setTitle(alldata._title);
        setSubtitle(alldata._subtitle);
        setLink(alldata._link);
        setVideourl(alldata._videourl);
        setFrom(alldata._from);
        setDuration(alldata._duration);
        setLocation(alldata._location);
        setGroupsize(alldata._groupsize);
        setDate(alldata._date);
        setLatlong(alldata._latlong);
        setPosition(alldata._sort);
        setMenuid(alldata._menuid);
        setSectionid(alldata._sectionid);
        setStatus(alldata._status);
        setImageUrl(alldata._image);
        setDescription(alldata._description);
        toast("Data Found");
      })
      .catch(({ response: { data } }) => {
        toast("No Data Found");
      });
  };

  return (
    <>
      <Layout>
        <Box
          component={"form"}
          onSubmit={handleSubmit}
          sx={{ padding: "20px 60px" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="standard-basic"
                fullWidth
                name="title"
                value={title}
                label="Title"
                variant="outlined"
                onChange={(e) => setTitle(e.target.value)}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-basic"
                fullWidth
                name="subtitle"
                value={subtitle}
                label="Sub Title"
                variant="outlined"
                onChange={(e) => setSubtitle(e.target.value)}
                multiline
                maxRows={10}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                fullWidth
                name="videourl"
                value={videourl}
                label="Video Url"
                variant="outlined"
                onChange={(e) => setVideourl(e.target.value)}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                fullWidth
                name="link"
                value={link}
                label="Link"
                variant="outlined"
                onChange={(e) => setLink(e.target.value)}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                fullWidth
                name="from"
                value={from}
                label="From"
                variant="outlined"
                onChange={(e) => setFrom(e.target.value)}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                fullWidth
                name="duration"
                value={duration}
                label="Duration"
                variant="outlined"
                onChange={(e) => setDuration(e.target.value)}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                fullWidth
                name="location"
                value={location}
                label="Location"
                variant="outlined"
                onChange={(e) => setLocation(e.target.value)}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                fullWidth
                name="groupsize"
                value={groupsize}
                label="Group Size"
                variant="outlined"
                onChange={(e) => setGroupsize(e.target.value)}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                fullWidth
                name="date"
                value={date}
                label="Date"
                variant="outlined"
                onChange={(e) => setDate(e.target.value)}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                fullWidth
                name="latlong"
                value={latlong}
                label="Link"
                variant="outlined"
                onChange={(e) => setLatlong(e.target.value)}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>

            <Grid item xs={12}>
              <ReactQuill
                name="description"
                label="Description"
                multiline
                value={description}
                onChange={(value) => setDescription(value)}
                style={{ backgroundColor: "white", height: "200px" }}
                modules={modules}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                fullWidth
                name="position"
                value={position}
                label="Position"
                variant="outlined"
                onChange={(e) => setPosition(e.target.value)}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>

            <Grid item xs={6}>
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
            <Grid item xs={6}>
              <FormControl variant="outlined" sx={{ minWidth: 725 }}>
                <InputLabel>Section</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  value={sectionid}
                  onChange={handleChangesection}
                  label="Section"
                  name="section"
                  sx={{ backgroundColor: "white" }}
                >
                  <MenuItem value="0">
                    <em>None</em>
                  </MenuItem>
                  {sectionlist.map((section_list) => (
                    <MenuItem value={section_list.id}>
                      {section_list._title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" sx={{ minWidth: 725 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  value={status}
                  onChange={handleChangestatus}
                  label="Status"
                  name="status"
                  sx={{ backgroundColor: "white" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="1">Active</MenuItem>
                  <MenuItem value="2">In Active</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={6} sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              startIcon={<BackupIcon />}
              component="label"
              sx={{ marginBottom: "30px" }}
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
          <Grid item xs={6}>
            {imageUrl && (
              <img src={imageUrl} alt="Uploaded Image" height="150" />
            )}
          </Grid>
          <Grid item xs={6}>
            <Button variant={"contained"} type={"submit"} sx={{ mt: 3, mb: 2 }}>
              Submit
            </Button>
          </Grid>
        </Box>
      </Layout>
    </>
  );
};

export default Edit;
