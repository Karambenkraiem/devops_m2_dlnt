"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../app/theme";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}