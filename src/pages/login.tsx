import * as React from 'react';
import type {
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
  } from "next";
  import { getCsrfToken } from "next-auth/react";
import LoginCard from '~/components/LoginCard';
import Head from 'next/head';

export default function login({
    csrfToken,
  }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <>
        <Head>
          <title>LOGIN - BORMI</title>
        </Head>
        <LoginCard csrfToken={csrfToken}></LoginCard>
        </>
    );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken: csrfToken ? csrfToken : null }
  };
};