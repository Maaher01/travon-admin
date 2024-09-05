import { useState, useEffect, React } from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../layout/Layout";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

function Edit() {
  const navigate = useNavigate();
  const params = useParams();
  const [qualification, setQualification] = useState("");
  const [name, setName] = useState("");
  const [fathername, setFatherName] = useState("");
  const [mothername, setMotherName] = useState("");
  const [mobile, setMobile] = useState("");
  const [parentmobile, setParentMobile] = useState("");
  const [dob, setDob] = useState(dayjs());
  const [email, setEmail] = useState("");
  const [tribal, setTribal] = useState("");
  const [freedom, setFreedom] = useState("");
  const [interest, setInterest] = useState("");
  const [passyear, setPassYear] = useState("");
  const [group, setGroup] = useState("");
  const [board, setBoard] = useState("");
  const [sscroll, setSSCRoll] = useState("");
  const [sscnum, setSSCNum] = useState("");
  const [gpa, setGPA] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios
      .get(`/api/studentregistration/edit/${params.id}`)
      .then(({ data }) => {
        const alldata = data.data;
        setName(alldata._name);
        setFatherName(alldata._fathername);
        setMotherName(alldata._mothername);
        setMobile(alldata._mobile);
        setParentMobile(alldata._parentmobile);
        setEmail(alldata._email);
        setTribal(alldata._tribal);
        setFreedom(alldata._freedom);
        setInterest(alldata._interest);
        setQualification(alldata._qualification);
        setPassYear(alldata._passyear);
        setDob(dayjs(alldata._dob)); // Convert to dayjs object
        setGroup(alldata._group);
        setBoard(alldata._board);
        setSSCRoll(alldata._sscroll);
        setSSCNum(alldata._sscnumber);
        setGPA(alldata._gpa);
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
          Student Details
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
                  Father's Name
                </Typography>
                <Typography variant="h6">{fathername}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" color="textSecondary">
                  Mother's Name
                </Typography>
                <Typography variant="h6">{mothername}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" color="textSecondary">
                  Date of Birth
                </Typography>
                <Typography variant="h6">
                  {dob.isValid() ? dob.format("DD-MM-YYYY") : ""}
                </Typography>
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
                  Parent's Mobile
                </Typography>
                <Typography variant="h6">{parentmobile}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" color="textSecondary">
                  Tribal
                </Typography>
                <Typography variant="h6">
                  {tribal ? 1 === "Yes" : "No"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" color="textSecondary">
                  Freedom Fighter's Child/Grandchild
                </Typography>
                <Typography variant="h6">
                  {freedom ? 1 === "Yes" : "No"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" color="textSecondary">
                  Interested in Studying
                </Typography>
                <Typography variant="h6">{interest}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" color="textSecondary">
                  Qualification
                </Typography>
                <Typography variant="h6">{qualification}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" color="textSecondary">
                  Passing Year
                </Typography>
                <Typography variant="h6">{passyear}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" color="textSecondary">
                  Group
                </Typography>
                <Typography variant="h6">{group}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" color="textSecondary">
                  Board
                </Typography>
                <Typography variant="h6">{board}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" color="textSecondary">
                  SSC Roll
                </Typography>
                <Typography variant="h6">{sscroll}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" color="textSecondary">
                  SSC No.
                </Typography>
                <Typography variant="h6">{sscnum}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" color="textSecondary">
                  GPA
                </Typography>
                <Typography variant="h6">{gpa}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}

export default Edit;
