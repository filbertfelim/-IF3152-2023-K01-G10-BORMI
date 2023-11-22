import CartTable from "~/components/CartTable";
import Navbar from "~/components/Navbar";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { api } from "~/utils/api";
import CheckoutTable from "~/components/CheckoutTable";
import Head from "next/head";
import { withSession } from "~/server/auth/withSession";
import { useSession } from "next-auth/react";
import UserTable from "~/components/UserTable";

export const getServerSideProps = withSession({ type: "ADMIN" });

export default function dashboarduser() {
  const { data, status } = useSession();
  const userData = api.user.getUserbyId.useQuery({ id : data?.user.id as number})
  return (
    <>
      <Head>
        <title>DASHBOARD KARYAWAN - BORMI</title>
      </Head>
      <Navbar role={data?.user.role} username={userData.data?.username as string}></Navbar>
      <Container maxWidth={false} className="mt-8 md:px-8 lg:px-16">
        <UserTable></UserTable>
      </Container>
    </>
  );
}
