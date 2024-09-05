import { useState, useEffect, React } from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../layout/Layout";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");

  const params = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios
      .get(`/api/contact/edit/${params.id}`)
      .then(({ data }) => {
        const alldata = data.data;
        setName(alldata._name);
        setMobile(alldata._mobile);
        setEmail(alldata._email);
        setTopic(alldata._topic);
        setMessage(alldata._message);

        toast("Data Found");
      })
      .catch(({ response: { data } }) => {
        toast("No Data Found");
      });
  };

  return (
    <Layout>
      <Box
        sx={{
          padding: "20px 60px",
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <Typography
          variant="h4"
          sx={{ marginBottom: 4, textAlign: "center", color: "#3f51b5" }}
        >
          Message Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" color="textSecondary">
                  Full Name
                </Typography>
                <Typography variant="h6">{name}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" color="textSecondary">
                  Email
                </Typography>
                <Typography variant="h6">{email}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" color="textSecondary">
                  Mobile
                </Typography>
                <Typography variant="h6">{mobile}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" color="textSecondary">
                  Topic
                </Typography>
                <Typography variant="h6">{topic}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" color="textSecondary">
                  Message
                </Typography>
                <Typography variant="h6">{message}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Edit;
