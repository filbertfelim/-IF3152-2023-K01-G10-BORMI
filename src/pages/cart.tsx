import CartTable from "~/components/CartTable";
import Navbar from "~/components/Navbar";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { api } from "~/utils/api";
import CheckoutTable from "~/components/CheckoutTable";
import Head from "next/head";
import { withSession } from "~/server/auth/withSession";

export const getServerSideProps = withSession({ type: "KASIR" });

export default function cart() {
  return (
    <>
      <Head>
        <title>CART - BORMI</title>
      </Head>
      <Navbar role="KASIR" username="angie"></Navbar>
      <Container maxWidth={false} className="mt-8 md:px-8 lg:px-16">
        <Typography
          className="mb-8 flex md:text-3xl lg:text-4xl"
          noWrap
          sx={{
            fontSize: "20px",
            fontFamily: "Nunito",
            fontWeight: 700,
            color: "inherit",
          }}
        >
          Keranjang
        </Typography>
        <Grid container spacing={5}>
          <Grid xs={12} sm={12} md={12} xl={9}>
            <CartTable id={2}></CartTable>
          </Grid>
          <Grid xs={6} sm={6} md={6} xl={3}>
            <CheckoutTable id={2}></CheckoutTable>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
