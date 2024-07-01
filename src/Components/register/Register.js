import {
  Alert,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Link,
  Snackbar,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Google, Facebook, Apple } from "@mui/icons-material";
import axios from "axios";
import Welcome from "./Welcome";

const activeStyles = (activeTab) => {
  return {
    backgroundColor: activeTab && "#1e81b0",
    color: activeTab ? "#ffffff" : "#1e81b0",
    padding: "10px",
    borderRadius: "8px",
    border: !activeTab && "1px solid #1e81b0",
  };
};

const JobSeeker = () => {
  const [checked, setChecked] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [payload, setPayload] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState({
    firstName: false,
    lastName: false,
    companyName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [openSnackbar, setOpenSnackbar] = useState({
    status: "success",
    open: false,
    message: "",
  });
  const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));

  useEffect(() => {
    const jobSeekerPayload = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
    const employerPayload = {
      companyName: "",
      email: "",
      password: "",
    };
    const userType = JSON.parse(localStorage.getItem("userType"));
    setActiveTab(userType ? userType : "Job Seeker");
    setPayload(activeTab === "Job Seeker" ? jobSeekerPayload : employerPayload);
  }, [activeTab]);

  const onChangeInput = (event) => {
    setPayload({ ...payload, [event.target.name]: event.target.value });
  };
  const onSubmitSignup = async () => {
    try {
      if (confirmPassword === payload.password) {
        const response = await axios.post(
          `http://localhost:4000/${
            activeTab === "Job Seeker" ? "candidate" : "recruiter"
          }/register`,
          payload
        );
        console.log(response);
        switch (response.status) {
          case 200:
            setOpenSnackbar({
              status: "success",
              open: true,
              message: response.data.message,
            });
            break;
          case 201:
            setOpenSnackbar({
              status: "error",
              open: true,
              message: response.data.message,
            });
            break;
          default:
            return;
        }
      } else {
        setErr({ ...err, confirmPassword: true });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Grid
      container
      fullWidth
      display="flex"
      justifyContent={!matches ? "center" : "flex-start"}
      gap={6}
      height="100%"
    >
      <Welcome />
      <Grid
        item
        display="flex"
        justifyContent="center"
        alignItems="center"
        xs={11.5}
        md={7.5}
        height="100%"
      >
        <Box minWidth={matches ? "80%" : "100%"}>
          <Box fullWidth display="flex" mb={3} alignItems="center" gap={2}>
            <Typography variant="h6">Choose your Account Type:</Typography>
            <Stack mr={2}>
              <Typography
                variant="body1"
                style={{
                  ...activeStyles(activeTab === "Job Seeker"),
                  fontWeight: "700",
                  cursor: "pointer",
                }}
                onClick={() => {
                  localStorage.setItem(
                    "userType",
                    JSON.stringify("Job Seeker")
                  );
                  setActiveTab("Job Seeker");
                }}
              >
                JOB SEEKER
              </Typography>
            </Stack>
            <Stack>
              <Typography
                variant="body1"
                style={{
                  ...activeStyles(activeTab === "Employer"),
                  fontWeight: "700",
                  cursor: "pointer",
                }}
                onClick={() => {
                  localStorage.setItem("userType", JSON.stringify("Employer"));
                  setActiveTab("Employer");
                }}
              >
                EMPLOYER
              </Typography>
            </Stack>
          </Box>
          <Typography variant="h5">Sign Up</Typography>
          <FormControl margin="dense" fullWidth>
            {activeTab === "Job Seeker" ? (
              <Box display="flex" gap={2}>
                <TextField
                  margin="dense"
                  name="firstName"
                  label="First Name"
                  fullWidth
                  value={payload.firstName}
                  onChange={onChangeInput}
                  error={err.firstName}
                />
                <TextField
                  margin="dense"
                  name="lastName"
                  label="Last Name"
                  fullWidth
                  value={payload.lastName}
                  error={err.lastName}
                  onChange={onChangeInput}
                />
              </Box>
            ) : (
              <TextField
                margin="dense"
                name="companyName"
                label="Company Name"
                fullWidth
                value={payload.companyName}
                onChange={onChangeInput}
                error={err.firstName}
              />
            )}
            <TextField
              margin="dense"
              type="email"
              name="email"
              label="Email Address"
              value={payload.email}
              onChange={onChangeInput}
              error={err.email}
            />
            <Box display="flex" gap={2}>
              <TextField
                margin="dense"
                label="Password"
                name="password"
                fullWidth
                value={payload.password}
                type="password"
                onChange={onChangeInput}
                error={err.password}
              />
              <TextField
                margin="dense"
                label="Confirm Password"
                name="confirmPassword"
                fullWidth
                type="password"
                error={err.confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={(e) => {
                  setErr({
                    ...err,
                    confirmPassword: e.target.value !== payload.password,
                  });
                }}
                helperText={
                  err.confirmPassword &&
                  "Confirm password should match password"
                }
              />
            </Box>
            <Box display="flex" alignItems="center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={() => setChecked((prevState) => !prevState)}
                  />
                }
              />
              <Typography>
                {" "}
                I agree to all &nbsp;
                <Link
                  variant="body1"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    const isOk = window.confirm(
                      "You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to provide accurate, current, and complete information during the registration process and update such information to keep it accurate, current, and complete."
                    );
                    if (isOk) setChecked(true);
                  }}
                >
                  terms & conditions
                </Link>
              </Typography>
              <FormLabel />
            </Box>
            <Button
              size="large"
              variant="contained"
              style={{
                textTransform: "capitalize",
                alignSelf: "flex-end",
                marginTop: "10px",
              }}
              disabled={!checked}
              onClick={onSubmitSignup}
            >
              Sign Up
            </Button>
          </FormControl>
          <Box display="flex" width="90%" alignItems="center">
            <Divider
              style={{ marginTop: "15px", marginBottom: "15px", width: "45%" }}
            />
            <Typography minWidth="20%" textAlign="center" variant="body2">
              or sign up with
            </Typography>
            <Divider
              style={{ marginTop: "15px", marginBottom: "15px", width: "45%" }}
            />
          </Box>
          <Box display="flex" margin={10} justifyContent="center" gap={3}>
            <IconButton>
              <Google fontSize="large" color="primary" />
            </IconButton>
            <IconButton>
              <Facebook fontSize="large" color="primary" />
            </IconButton>
            <IconButton>
              <Apple fontSize="large" color="primary" />
            </IconButton>
          </Box>
        </Box>
      </Grid>

      <Snackbar
        open={openSnackbar.open}
        autoHideDuration={6000}
        onClose={(e, reason) => {
          if (reason === "clickaway") {
            return;
          }
          setOpenSnackbar(false);
        }}
      >
        <Alert
          onClose={(e, reason) => {
            if (reason === "clickaway") {
              return;
            }
            setOpenSnackbar(false);
          }}
          severity={openSnackbar.status}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {openSnackbar.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default JobSeeker;
