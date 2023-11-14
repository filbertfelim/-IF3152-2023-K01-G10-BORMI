import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { type InferGetServerSidePropsType } from "next";
import { type getServerSideProps } from "../pages/login";
import { type SubmitHandler, useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { SetStateAction, useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { useRouter } from 'next/router';

interface FormValues {
  username: string;
  password: string;
}

const LoginCard = ({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { addToast } = useToasts();
  const { data: session, update, status } = useSession();
  const router = useRouter();

  const { handleSubmit, register, setError, reset, getValues } =
    useForm<FormValues>({
      mode: "onSubmit",
      defaultValues: {
        username: "",
        password: "",
      },
    });

    useEffect(() => {
      if (status === "authenticated" && session !== null) {
        if (session.user.role === "ADMIN") {
          void router.push("/dashboard-user");
        } else if (session.user.role === "KASIR") {
          void router.push("/cart");
        } else {
          void router.push("/dashboard-product");
        }
      }
    }, [router, session, status]);

    const login: SubmitHandler<FormValues> = async (data: FormValues, e) => {
      e?.preventDefault();
      const res = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
        csrfToken,
      });
      if (!res?.ok && res?.error) {
        addToast("Username atau password salah", { appearance: "error" });
        setError("root", { message: res.error });
        reset({}, { keepErrors: true, keepValues: true });
        return;
      }
      addToast("Log in berhasil!", { appearance: "success" });
      await update();
      reset();
    };

  return (
    <div className="bg-[#FFF8EE] flex min-h-screen items-center justify-center flex-col">
        <Typography
                variant="h4"
                noWrap
                className='absolute top-4 right-12'
                sx={{
                fontFamily: "Megrim",
                fontWeight:800,
                letterSpacing: ".1rem",
                color: "inherit",
                }}
                    >
                  BORMI
                </Typography>
                <Container maxWidth={false} className="flex flex-col justify-center items-center">
                <Typography
                variant="h4"
                noWrap
                className='mb-4'
                sx={{
                display: "flex",
                fontFamily: "Nunito",
                fontWeight:800,
                letterSpacing: ".1rem",
                color: "inherit",
                }}
                    >
                  Log In
                </Typography>
                <Card sx={{ maxWidth: { "xs" : 380 ,"sm" : 400 ,"md" : 500 ,"xl" : 500} }}>
                  <CardContent className='flex flex-col justify-center items-center mx-12'>
                  <Avatar className="mt-8 mb-12" sx={{ bgcolor: "black", color: "#FFF8EE" }}>
                      <PersonIcon />
                    </Avatar>
                    <Typography className="text-center mx-8 my-8" sx={{
                      display: "flex",
                      fontFamily: "Nunito",
                      fontWeight:800,
                      color: "inherit",
                      }}>
                      Hey, please enter your username and password
                    </Typography>
                    <form onSubmit={(e) => void handleSubmit(login)(e)}>
                      <input name="csrfToken" type="hidden" defaultValue={csrfToken!} />
                      <TextField
                        required
                        type="username"
                        placeholder="Username"
                        label="Username"
                        {...register("username", {
                          required: "Username tidak boleh kosong",
                        })}
                        className='w-full mb-4'
                        InputProps={{ sx: { borderRadius: 4,fontFamily: "Nunito",
                        fontWeight:800,
                        color: "inherit", } }}
                      />
                      <TextField
                        required
                        type="password"
                        placeholder="Password"
                        label="Password"
                        className='w-full mb-4'
                        {...register("password", {
                          required: "Password tidak boleh kosong",
                        })}
                        InputProps={{ sx: { borderRadius: 4,fontFamily: "Nunito",
                        fontWeight:800,
                        color: "inherit", } }}
                      />
                      <Button
                          type="submit"
                          className="w-full rounded-3xl border-2 bg-[#FFC887] px-0 py-3 hover:bg-[#897054] disabled:bg-[#c3c3c3] my-8"
                      >
                          <Typography
                              noWrap
                              sx={{
                                fontSize: "15px",
                                fontFamily: "Nunito",
                                fontWeight: 800,
                                color: "black",
                                justifyItems: "flex-end",
                              }}
                          >
                              Log In
                          </Typography>
                      </Button>
                    </form>
                    </CardContent>
                </Card>
                </Container>
    </div>
    
  );
}

export default LoginCard;
