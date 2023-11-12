import * as React from 'react';
import { api } from "~/utils/api";
import type {
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
  } from "next";
  import { getCsrfToken } from "next-auth/react";
import LoginCard from '~/components/LoginCard';

export default function login({
    csrfToken,
  }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <>
            <LoginCard csrfToken={csrfToken}></LoginCard>
        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return {
      props: {
        csrfToken: await getCsrfToken(context),
      },
    };
  }