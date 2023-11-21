import React from 'react'
import ProductTable from "~/components/ProductTable";
import Navbar from "~/components/Navbar";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { api } from "~/utils/api";
import CheckoutTable from "~/components/CheckoutTable";
import Head from "next/head";
import { withSession } from "~/server/auth/withSession";
import { useSession } from "next-auth/react";

export const getServerSideProps = withSession({ type: "INVENTARIS" });

export default function dashboardproduct() {
    const { data, status } = useSession();
    const userData = api.user.getUserbyId.useQuery({ id : data?.user.id as number})
    return (
      <>
        <Head>
          <title>DASHBOARD PRODUK - BORMI</title>
        </Head>
        <Navbar role={data?.user.role} username={userData.data?.username as string}></Navbar>
        <ProductTable></ProductTable>
      </>
    );
  }
