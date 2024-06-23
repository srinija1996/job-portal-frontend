import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/navbar/Navbar";
import Login from "./Components/login/Login";
import { ThemeProvider } from "@mui/material";
import theme from "./utils/theme";
import JobSeeker from "./Components/register/JobSeeker";

const App = () => {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <div
          style={{
            height: "100vh",
            width: "100vw",
            backgroundColor: "whitesmoke",
          }}
        >
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up/job-seeker" element={<JobSeeker />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;
