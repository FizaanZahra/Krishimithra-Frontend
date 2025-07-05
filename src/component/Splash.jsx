// src/component/Splash.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import Logo from "../assets/logo.jpg"; // ✅ Ensure this file exists in src/assets/

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Wait for 10 seconds and navigate to /home
    const timer = setTimeout(() => {
      navigate("/home");
    }, 10000); // 10 seconds

    return () => clearTimeout(timer); // Clean up
  }, [navigate]);

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={Logo}
        alt="Krishimithra Logo"
        style={{ width: "200px", height: "auto", marginBottom: 20 }}
      />
      <Typography variant="h5" fontFamily="Segoe UI" color="text.primary">
        Welcome to Krishimithra
      </Typography>
    </Box>
  );
};

export default Splash;
