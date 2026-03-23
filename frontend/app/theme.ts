"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#0d47a1",
    },
    background: {
      default: "#f4f6f8",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

export default theme;