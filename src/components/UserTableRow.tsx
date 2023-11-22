import { $Enums, UserRole } from "@prisma/client";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React, { useState } from "react";
import { NumericFormat } from "react-number-format";
import Typography from "@mui/material/Typography";
import {
  Alert,
  Box,
  Button,
  DialogContentText,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Snackbar,
  TextField,
} from "@mui/material";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { api } from "~/utils/api";
import { UploadButton } from "@uploadthing/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TRPCClientError } from "@trpc/client";

interface Props {
  item: {
    id: number;
    username: string;
    password: string;
    role: $Enums.UserRole;
  };
  editUser: (
    id: number,
    username: string,
    password: string,
    role: $Enums.UserRole,
  ) => void;
  deleteUser: (id: number) => void;
}

interface FormValues {
  username: string;
  password: string;
  role: $Enums.UserRole;
}

export default function UserTableRow({ item, editUser, deleteUser }: Props) {
  const { handleSubmit, setValue, getValues, register, reset } =
    useForm<FormValues>({
      mode: "onSubmit",
      defaultValues: {
        username: item.username,
        password: "",
        role: item.role,
      },
    });

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);

  const handleClickOpenEditUser = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditUser = () => {
    setOpenEditDialog(false);
  };

  const handleClickOpenDeleteUser = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteUser = () => {
    setOpenDeleteDialog(false);
  };

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(item.username);

  const editUserItem: SubmitHandler<FormValues> = (data: FormValues, e) => {
    e?.preventDefault();
    try {
      editUser(item.id, data.username, data.password, data.role);
    } catch (error) {
      if (!(error instanceof TRPCClientError)) {
      }
    }
    handleCloseEditUser();
    setPassword("");
    setUsername(username);
    reset(() => ({
      username: item.username,
      password: "",
      role: item.role,
    }));
  };

  return (
    <TableRow
      key={item.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell>
        <div className="flex">
          <Typography
            noWrap
            sx={{
              fontSize: "15px",
              fontFamily: "Nunito",
              fontWeight: 500,
              color: "#818181",
              justifyItems: "flex-end",
            }}
          >
            {item.id}
          </Typography>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex">
          <Typography
            noWrap
            sx={{
              fontSize: "15px",
              fontFamily: "Nunito",
              fontWeight: 500,
              color: "#818181",
              justifyItems: "flex-end",
            }}
          >
            {item.username}
          </Typography>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex">
          <Typography
            noWrap
            sx={{
              fontSize: "15px",
              fontFamily: "Nunito",
              fontWeight: 500,
              color: "#818181",
              justifyItems: "flex-end",
            }}
          >
            {item.role}
          </Typography>
        </div>
      </TableCell>
      <TableCell align="center" className="flex">
        <IconButton size="medium" onClick={handleClickOpenEditUser}>
          <EditIcon fontSize="inherit" color="inherit" />
        </IconButton>

        <Dialog
          open={openEditDialog}
          onClose={() => {
            handleCloseEditUser();
            setPassword("");
            setUsername(item.username);
            reset(() => ({
              username: item.username,
              password: "",
              role: item.role,
            }));
          }}
          PaperProps={{ sx: { borderRadius: "20px" } }}
        >
          <form onSubmit={(e) => void handleSubmit(editUserItem)(e)}>
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
                Edit Karyawan
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
              {item.role === "ADMIN" ? (
                <></>
              ) : (
                <TextField
                  className="my-4 w-full"
                  required
                  select
                  placeholder="Role"
                  label="Role"
                  defaultValue={item.role}
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
              )}
            </DialogContent>
            <DialogActions className="mx-12 my-4 flex justify-end space-x-4">
              <Button
                onClick={() => {
                  handleCloseEditUser();
                  setPassword("");
                  setUsername(item.username);
                  reset(() => ({
                    username: item.username,
                    password: "",
                    role: item.role,
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
                  <EditIcon fontSize="inherit" sx={{ color: "black" }} />
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
                  Edit
                </Typography>
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        {item.role === "ADMIN" ? (
          <></>
        ) : (
          <>
            <IconButton size="medium" onClick={handleClickOpenDeleteUser}>
              <DeleteIcon fontSize="inherit" color="error" />
            </IconButton>
            <Dialog
              open={openDeleteDialog}
              onClose={handleCloseDeleteUser}
              PaperProps={{ sx: { borderRadius: "20px" } }}
            >
              <DialogTitle
                id="alert-dialog-title"
                className="my-4 flex justify-center"
              >
                <Typography
                  sx={{
                    fontSize: "23px",
                    fontFamily: "Nunito",
                    fontWeight: 800,
                    color: "black",
                    justifyItems: "flex-end",
                  }}
                >
                  <img src={`/images/Vector.png`} className="scale-75" />
                </Typography>
              </DialogTitle>
              <DialogContent className="mx-8">
                <DialogContentText>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontFamily: "Nunito",
                      fontWeight: 800,
                      color: "black",
                      textAlign: "center",
                    }}
                  >
                    Apakah anda ingin menghapus user {item.username}?
                  </Typography>
                </DialogContentText>
              </DialogContent>
              <DialogActions className="my-4 flex justify-center space-x-4">
                <Button
                  onClick={handleCloseDeleteUser}
                  className="bg-[#FFC887] px-4 font-[1100] text-black hover:bg-[#c79960]"
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
                  className="bg-red-500 px-4 text-white hover:bg-red-700"
                  endIcon={
                    <DeleteIcon fontSize="inherit" sx={{ color: "white" }} />
                  }
                  onClick={() => {
                    deleteUser(item.id);
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "13px",
                      fontFamily: "Nunito",
                      fontWeight: 800,
                      mt: 0.5,
                    }}
                  >
                    Hapus
                  </Typography>
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </TableCell>
    </TableRow>
  );
}
