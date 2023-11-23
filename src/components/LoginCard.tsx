import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from '@mui/material/IconButton';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextField from "@mui/material/TextField";
import { type InferGetServerSidePropsType } from "next";
import { type getServerSideProps } from "../pages/login";
import { type SubmitHandler, useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Slide from '@mui/material/Slide';

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
      console.log(res);
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

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
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
        <Card sx={{ maxWidth: { xs: 380, sm: 400, md: 500, xl: 500 }, borderRadius: 8 }}>
          <CardContent className="mx-4 sm:mx-12 flex-col items-center justify-center">
            <AccountCircleIcon className="w-full mb-12 mt-8" sx={{ width: 60, height: 60 }}/>
            <Typography
              className="mx-8 mb-10 text-center"
              sx={{
                fontFamily: "Nunito",
                fontWeight: 800,
                fontSize: "18px",
                color: "inherit",
              }}
            >
              Hey, please enter your username and password
            </Typography>
            <form onSubmit={(e) => void handleSubmit(login)(e)}>
              <input name="csrfToken" type="hidden" defaultValue={csrfToken!} />
              <Typography
                noWrap
                sx={{
                  fontSize: "15px",
                  fontFamily: "Nunito",
                  fontWeight: 800,
                  color: "black",
                  pb: "5px",
                  pl: "5px",
                }}
              >
                Username
              </Typography>
              <TextField
                required
                type="username"
                placeholder="Enter your username"
                {...register("username", {
                  required: "Username tidak boleh kosong",
                })}
                className="mb-4 w-full"
                InputProps={{
                  sx: {
                    borderRadius: 4,
                    fontFamily: "Nunito",
                    fontWeight: 500,
                    color: "inherit",
                  },
                }}
              />
              <Typography
                noWrap
                sx={{
                  fontSize: "15px",
                  fontFamily: "Nunito",
                  fontWeight: 800,
                  color: "black",
                  pb: "5px",
                  pl: "5px",
                  pt: "12px",
                }}
              >
                Password
              </Typography>
              <FormControl 
                className="mb-4 w-full" 
                variant="outlined"
              >
                <OutlinedInput
                  required
                  id="outlined-adornment-password"
                  placeholder="Enter your password"
                  type={showPassword ? 'text' : 'password'}
                  {...register("password", {
                    required: "Password tidak boleh kosong",
                  })}
                  sx={{
                    borderRadius: 4,
                    fontFamily: "Nunito",
                    fontWeight: 500,
                    color: "inherit",
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        className="pr-3"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Button
                type="submit"
                className="mt-8 mb-10 w-full rounded-3xl border-2 bg-[#FFC887] px-0 py-3 hover:bg-[#897054] disabled:bg-[#c3c3c3]"
              >
                <Typography
                  noWrap
                  sx={{
                    textTransform: "none",
                    fontSize: "18px",
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
                autoHideDuration={1500}
                onClose={handleCloseLoginFailed}
                TransitionComponent={(props) => (
                  <Slide {...props} direction="up" />
                )}
              >
                <Alert
                  onClose={handleCloseLoginFailed}
                  severity="error"
                  sx={{ width: "100%", backgroundColor: "#930000" }}
                  variant="filled"
                >
                  Username atau password salah
                </Alert>
              </Snackbar>
              <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                open={openLoginSuccess}
                autoHideDuration={1500}
                onClose={handleCloseLoginSuccess}
                TransitionComponent={(props) => (
                  <Slide {...props} direction="up" />
                )}
              >
                <Alert
                  onClose={handleCloseLoginSuccess}
                  severity="success"
                  sx={{ width: "100%", backgroundColor: "#004f00" }}
                  variant="filled"
                >
                  Log in berhasil
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
