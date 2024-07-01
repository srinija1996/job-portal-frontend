import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import React from "react";

const Welcome = () => {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));
  return (
    <Grid
      display={matches ? "flex" : "none"}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      style={{
        backgroundColor: "#1e81b0",
        color: "#ffffff",
        padding: "20px",
      }}
      md={4}
    >
      <Box>
        <Typography align="center" variant="h4">
          Welcome to Job Portal
        </Typography>
        <Typography align="center" variant="h6">
          Let's get you all set up so you can verify your account and begin
          setting up your profile
        </Typography>
      </Box>
    </Grid>
  );
};

export default Welcome;
