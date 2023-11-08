import { Button } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Navbar from "~/components/Navbar";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Create T3 App</title>
      </Head>
      <Navbar role="ADMIN" username="angie"></Navbar>
      <Button onClick={() => void router.push("/cart")}>Cart</Button>
    </>
  );
}
