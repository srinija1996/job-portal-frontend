import React from "react";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import { Stack, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <Stack
      display="flex"
      flexDirection="row"
      alignItems="center"
      style={{
        backgroundColor: "#1e81b0",
        padding: "15px",
        fontWeight: "700",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        borderBottomWidth:1,
        borderBottomStyle: 'solid',
        borderBottomColor:'whitesmoke',
        position:'sticky',
        top:'0px', zIndex:100
      }}
      gap={2}
    >
      <Diversity1Icon fontSize="large" color="secondary" />
      <Typography variant="h4" color="secondary">
        Job-Portal
      </Typography>
    </Stack>
  );
};

export default Navbar;
