import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Head from "next/head";

export default function Forbidden() {
  return (
    <>
      <Head>
        <title>FORBIDDEN- BORMI</title>
      </Head>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#FFF8EE",
        }}
      >
        <Container maxWidth={false} className="">
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
                403 Forbidden
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
                You are not allowed to access this page
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
