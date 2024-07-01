import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const activeStyles = (activeTab) => {
  return {
    backgroundColor: activeTab && "#1e81b0",
    color: activeTab && "#ffffff",
    padding: "10px",
    borderRadius: "8px",
  };
};

const Login = () => {
  const [activeTab, setActiveTab] = useState("Job Seeker");
  const [open, setOpen] = useState(false);
  const [userToRegister, setUserToRegister] = useState("Job Seeker");
  const navigate = useNavigate();

  const redirectToRegister = () => {
    if (userToRegister === "Job Seeker") {
      localStorage.setItem("userType", JSON.stringify("Job Seeker"));
      navigate("/sign-up");
    } else {
      localStorage.setItem("userType", JSON.stringify("Employer"));
      navigate("/sign-up");
    }
    setOpen(false);
  };
  console.log({ userToRegister });

  return (
    <>
      <Grid
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "93%",
        }}
        container
      >
        <Grid
          style={{
            padding: "30px",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            borderRadius: "8px",
          }}
          item
          xs={11}
          sm={9}
          md={7}
          lg={5}
          xl={3.5}
        >
          <Box fullWidth display="flex" mb={3}>
            <Stack mr={2}>
              <Typography
                variant="body1"
                style={{
                  ...activeStyles(activeTab === "Job Seeker"),
                  fontWeight: "700",
                  cursor: "pointer",
                }}
                onClick={() => setActiveTab("Job Seeker")}
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
                onClick={() => setActiveTab("Employer")}
              >
                EMPLOYER
              </Typography>
            </Stack>
          </Box>
          <Typography variant="h5" color="black">
            {activeTab === "Job Seeker" ? "Job Seeker" : "Employer"} Login
          </Typography>

          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            component="form"
            mt={3}
          >
            <TextField label="Email Address" fullWidth autoFocus size="small" />
            <TextField
              label="Password"
              type="password"
              fullWidth
              size="small"
            />
          </Box>
          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button variant="contained">Login</Button>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography variant="body2"> Don't have an account?</Typography>
            <Button
              variant="text"
              style={{ textTransform: "capitalize" }}
              onClick={() => setOpen(true)}
            >
              Sign Up
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
              <DialogTitle>Are you a Job Seeker or Employer?</DialogTitle>
              <DialogContent>
                <FormControl>
                  <RadioGroup
                    defaultValue="Job Seeker"
                    name="user-type"
                    value={userToRegister}
                    onChange={(e) => {
                      setUserToRegister(e.target.value);
                    }}
                  >
                    <FormControlLabel
                      value="Job Seeker"
                      control={<Radio />}
                      label="Job Seeker"
                    />
                    <FormControlLabel
                      value="Employer"
                      control={<Radio />}
                      label="Employer"
                    />
                  </RadioGroup>
                </FormControl>
                <DialogActions>
                  <Button variant="contained" onClick={redirectToRegister}>
                    OK
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setOpen(false)}
                  >
                    CLOSE
                  </Button>
                </DialogActions>
              </DialogContent>
            </Dialog>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
