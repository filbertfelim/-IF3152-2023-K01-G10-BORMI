import Navbar from "~/components/Navbar";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { api } from "~/utils/api";
import TransactionTable from "~/components/TransactionTable";
import { withSession } from "~/server/auth/withSession";
import { useSession } from "next-auth/react";
import Head from "next/head";

export const getServerSideProps = withSession({ type: "ADMIN" });

export default function transaction() {
  const { data, status } = useSession();
  const userData = api.user.getUserbyId.useQuery({
    id: data?.user.id as number,
  });
  return (
    <>
      <Head>
        <title>DASHBOARD TRANSAKSI - BORMI</title>
      </Head>
      <Navbar
        role={data?.user.role}
        username={userData.data?.username as string}
      ></Navbar>
      <Container maxWidth={false} className="mt-10 px-8 md:px-16">
        <TransactionTable></TransactionTable>
      </Container>
    </>
  );
}
