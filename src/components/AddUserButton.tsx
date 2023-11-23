import {
  IconButton,
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  Snackbar,
  Alert,
  TextField,
  MenuItem,
  InputAdornment,
  DialogActions,
  Button,
} from "@mui/material";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TRPCClientError } from "@trpc/client";
import { UploadButton } from "~/utils/uploadthing";
import { $Enums, UserRole } from "@prisma/client";

interface FormValues {
  username: string;
  password: string;
  role: $Enums.UserRole;
}

interface Props {
  addUser: (username: string, password: string, role: $Enums.UserRole) => void;
}

export default function AddUserButton({ addUser }: Props) {
  const { handleSubmit, setValue, getValues, register, reset } =
    useForm<FormValues>({
      mode: "onSubmit",
      defaultValues: {
        username: "",
        password: "",
        role: "KASIR",
      },
    });

  const [openAddDialog, setOpenAddDialog] = React.useState(false);

  const handleClickOpenAddUser = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddUser = () => {
    setOpenAddDialog(false);
  };

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const addUserItem: SubmitHandler<FormValues> = (data: FormValues, e) => {
    e?.preventDefault();
    try {
      addUser(data.username, data.password, data.role);
    } catch (error) {
      if (!(error instanceof TRPCClientError)) {
      }
    }
    handleCloseAddUser();
    setPassword("");
    setUsername("");
    reset(() => ({
      username: "",
      password: "",
      role: "KASIR",
    }));
  };
  return (
    <>
      <Button
        onClick={handleClickOpenAddUser}
        className="mt-2 h-8 rounded-xl border bg-[#AB8A67] px-4 text-white hover:bg-[#493b2c] md:h-12"
        endIcon={
          <AddBoxRoundedIcon fontSize="inherit" sx={{ color: "white" }} />
        }
      >
        <Typography
          sx={{
            fontSize: "13px",
            fontFamily: "Nunito",
            fontWeight: 800,
            mt: 0.5,
          }}
        >
          Tambah karyawan
        </Typography>
      </Button>
      <Dialog
        open={openAddDialog}
        onClose={() => {
          handleCloseAddUser();
          setPassword("");
          setUsername("");
          reset(() => ({
            username: "",
            password: "",
            role: "KASIR",
          }));
        }}
        PaperProps={{ sx: { borderRadius: "20px" } }}
      >
        <form onSubmit={(e) => void handleSubmit(addUserItem)(e)}>
          <DialogTitle
            id="alert-dialog-title"
            className="mx-8 flex justify-start"
          >
            <Typography
              sx={{
                fontSize: "26px",
                fontFamily: "Nunito",
                fontWeight: 800,
                mt: 0.5,
              }}
            >
              Edit Produk
            </Typography>
          </DialogTitle>
          <DialogContent className="mx-8 flex flex-col">
            <TextField
              required
              type="text"
              placeholder="Username"
              label="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setValue("username", e.target.value);
              }}
              className="my-4 w-full"
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
              placeholder="password"
              label="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setValue("password", e.target.value);
              }}
              className="my-4 w-full"
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
              className="my-4 w-full"
              required
              select
              placeholder="Role"
              label="Role"
              defaultValue={"KASIR"}
              InputProps={{
                sx: {
                  borderRadius: 4,
                  fontFamily: "Nunito",
                  fontWeight: 800,
                  color: "inherit",
                },
              }}
              onChange={(e) => {
                setValue("role", e.target.value as UserRole);
              }}
            >
              <MenuItem key={"KASIR"} value={"KASIR"}>
                {"KASIR"}
              </MenuItem>
              <MenuItem key={"INVENTARIS"} value={"INVENTARIS"}>
                {"INVENTARIS"}
              </MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions className="mx-12 my-4 justify-end space-x-2">
            <Button
              onClick={() => {
                handleCloseAddUser();
                setPassword("");
                setUsername("");
                reset(() => ({
                  username: "",
                  password: "",
                  role: "KASIR",
                }));
              }}
              className="px-4 text-black outline  outline-2 outline-[#FFC887]"
            >
              <Typography
                sx={{
                  fontSize: "13px",
                  fontFamily: "Nunito",
                  fontWeight: 800,
                  mt: 0.5,
                }}
              >
                Batal
              </Typography>
            </Button>
            <Button
              type="submit"
              disabled={password === "" || username === ""}
              className="bg-[#FFC887] px-4 text-black hover:bg-[#c79960]"
              endIcon={
                <AddBoxRoundedIcon
                  fontSize="inherit"
                  sx={{ color: "black" }}
                  className="hidden sm:flex"
                />
              }
            >
              <Typography
                sx={{
                  fontSize: "13px",
                  fontFamily: "Nunito",
                  fontWeight: 800,
                  mt: 0.5,
                  ml: 0.2,
                }}
              >
                Tambah
              </Typography>
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
