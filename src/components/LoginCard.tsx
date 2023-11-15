import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import TextField from "@mui/material/TextField";
import { type InferGetServerSidePropsType } from "next";
import { type getServerSideProps } from "../pages/login";
import { type SubmitHandler, useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface FormValues {
  username: string;
  password: string;
}

const LoginCard = ({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
    const res = await signIn("username-login", {
      username: data.username,
      password: data.password,
      redirect: false,
      csrfToken,
    });
    if (!res?.ok && res?.error) {
      setOpenLoginFailed(true);
      console.log(res.error);
      setError("root", { message: res.error });
      reset({}, { keepErrors: true, keepValues: true });
      return;
    }
    setOpenLoginSuccess(true);
    await update();
    reset();
  };

  const [openLoginSuccess, setOpenLoginSuccess] = React.useState(false);

  const handleCloseLoginSuccess = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenLoginSuccess(false);
  };

  const [openLoginFailed, setOpenLoginFailed] = React.useState(false);

  const handleCloseLoginFailed = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenLoginFailed(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FFF8EE]">
      <Typography
        variant="h4"
        noWrap
        className="absolute right-8 top-4"
        sx={{
          fontFamily: "Megrim",
          fontWeight: 800,
          letterSpacing: ".1rem",
          color: "inherit",
        }}
      >
        BORMI
      </Typography>
      <Container
        maxWidth={false}
        className="flex flex-col items-center justify-center"
      >
        <Typography
          variant="h4"
          noWrap
          className="mb-4"
          sx={{
            display: "flex",
            fontFamily: "Nunito",
            fontWeight: 800,
            letterSpacing: ".1rem",
            color: "inherit",
          }}
        >
          Log In
        </Typography>
        <Card sx={{ maxWidth: { xs: 380, sm: 400, md: 500, xl: 500 } }}>
          <CardContent className="mx-12 flex flex-col items-center justify-center">
            <Avatar
              className="mb-12 mt-8"
              sx={{ bgcolor: "black", color: "#FFF8EE" }}
            >
              <PersonIcon />
            </Avatar>
            <Typography
              className="mx-8 my-8 text-center"
              sx={{
                display: "flex",
                fontFamily: "Nunito",
                fontWeight: 800,
                color: "inherit",
              }}
            >
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
                className="mb-4 w-full"
                InputProps={{
                  sx: {
                    borderRadius: 4,
                    fontFamily: "Nunito",
                    fontWeight: 800,
                    color: "inherit",
                  },
                }}
              />
              <TextField
                required
                type="password"
                placeholder="Password"
                label="Password"
                className="mb-4 w-full"
                {...register("password", {
                  required: "Password tidak boleh kosong",
                })}
                InputProps={{
                  sx: {
                    borderRadius: 4,
                    fontFamily: "Nunito",
                    fontWeight: 800,
                    color: "inherit",
                  },
                }}
              />
              <Button
                type="submit"
                className="my-8 w-full rounded-3xl border-2 bg-[#FFC887] px-0 py-3 hover:bg-[#897054] disabled:bg-[#c3c3c3]"
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
              <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                open={openLoginFailed}
                autoHideDuration={1000}
                onClose={handleCloseLoginFailed}
              >
                <Alert
                  onClose={handleCloseLoginFailed}
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  Username atau password salah
                </Alert>
              </Snackbar>
              <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                open={openLoginSuccess}
                autoHideDuration={1000}
                onClose={handleCloseLoginSuccess}
              >
                <Alert
                  onClose={handleCloseLoginSuccess}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Log in Berhasil
                </Alert>
              </Snackbar>
            </form>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default LoginCard;
