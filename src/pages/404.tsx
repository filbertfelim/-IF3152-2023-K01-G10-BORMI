import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

export default function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#FFF8EE",
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={2} className="flex justify-center">
          <Grid
            xs={6}
            md={5}
            className="rounded-3xl border bg-[#FFC887] px-16 py-16"
          >
            <Typography
              className="flex justify-center text-center text-4xl lg:text-7xl"
              sx={{
                fontFamily: "Megrim",
                fontWeight: 800,
                letterSpacing: ".1rem",
                color: "inherit",
                mb: 2,
              }}
            >
              404 Not Found
            </Typography>
            <Typography
              className="mb-4 flex justify-center text-center text-2xl lg:text-4xl"
              sx={{
                display: "flex",
                fontFamily: "Nunito",
                fontWeight: 800,
                letterSpacing: ".1rem",
                color: "inherit",
              }}
            >
              No page found
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
