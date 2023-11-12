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
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Megrim&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Navbar role="ADMIN" username="angie"></Navbar>
      <Button onClick={() => void router.push("/login")}>login</Button>
    </>
  );
}
