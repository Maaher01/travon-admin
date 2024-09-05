import { useState, useEffect, React } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import TuneIcon from "@mui/icons-material/Tune";
import WidgetsIcon from "@mui/icons-material/Widgets";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SegmentIcon from "@mui/icons-material/Segment";
import ShareIcon from "@mui/icons-material/Share";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const drawerWidth = 230;

const ClippedDrawer = () => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    await axios
      .get(`/api/companysetup`)
      .then(({ data }) => {
        const alldata = data.data[0];
        setName(alldata._name);
        setImageUrl(alldata._image);
      })
      .catch(({ response: { data } }) => {
        toast("No Data Found");
      });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar
          style={{ minHeight: "69px", borderBottom: "1px solid #d8dbe0" }}
        >
          <Link style={{ textDecoration: "none" }} to="/app/dashboard">
            <img
              src={imageUrl}
              alt="nothing"
              style={{ marginTop: "2px", width: "100%", height: "auto" }}
            />
          </Link>
        </Toolbar>
        <Box sx={{ overflow: "auto" }}>
          <List>
            <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/dashboard/companysetup"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Company Setup"} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/image"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <CameraAltIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Gallery Image"} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/slider"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TuneIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Slider"} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/menu"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <WidgetsIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Menu"} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/section"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AddRoadIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Section"} />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/component"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <SegmentIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Component"} />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/review"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <RemoveRedEyeIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Reviews"} />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/counter"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AddCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Counters"} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/sociallink"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ShareIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Social Link"} />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default ClippedDrawer;
