import React, { useState } from "react";
import { api } from "~/utils/api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TRPCClientError } from "@trpc/client";
import { Alert, Container, Grid, Pagination, Snackbar } from "@mui/material";
import AddUserButton from "./AddUserButton";
import UserTableRow from "./UserTableRow";
import { $Enums } from "@prisma/client";

export default function UserTable() {
  const [cursor, setCursor] = useState(1);
  const userData = api.user.getUser.useQuery({ page: cursor });

  const [openAddUser, setOpenAddUser] = React.useState(false);

  const handleCloseAddUser = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAddUser(false);
  };

  const [openAddUserFailed, setOpenAddUserFailed] = React.useState(false);

  const handleCloseAddUserFailed = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAddUserFailed(false);
  };

  const [openEditUser, setOpenEditUser] = React.useState(false);

  const handleCloseEditUser = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenEditUser(false);
  };

  const [openEditUserFailed, setOpenEditUserFailed] = React.useState(false);

  const handleCloseEditUserFailed = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenEditUserFailed(false);
  };

  const [openDeleteUser, setOpenDeleteUser] = React.useState(false);

  const handleCloseDeleteUser = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenDeleteUser(false);
  };

  const [openDeleteUserFailed, setOpenDeleteUserFailed] = React.useState(false);

  const handleCloseDeleteUserFailed = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenDeleteUserFailed(false);
  };

  const editUserMutation = api.user.editUser.useMutation();

  const editUser = (
    id: number,
    username: string,
    password: string,
    role: $Enums.UserRole,
  ) => {
    editUserMutation
      .mutateAsync({
        id: id,
        username: username,
        password: password,
        role: role,
      })
      .then(async () => {
        setOpenEditUser(true);
        userData.refetch();
      })
      .catch((err: any) => {
        if (!(err instanceof TRPCClientError)) throw err;
        setOpenEditUserFailed(true);
      });
  };

  const deleteUserMutation = api.user.deleteUser.useMutation();

  const deleteUser = (id: number) => {
    deleteUserMutation
      .mutateAsync({
        id: id,
      })
      .then(async () => {
        setOpenDeleteUser(true);
        userData.refetch();
      })
      .catch((err: any) => {
        if (!(err instanceof TRPCClientError)) throw err;
      });
  };

  const addUserMutation = api.user.addUser.useMutation();

  const addUser = (
    username: string,
    password: string,
    role: $Enums.UserRole,
  ) => {
    addUserMutation
      .mutateAsync({
        username: username,
        password: password,
        role: role,
      })
      .then(async () => {
        setOpenAddUser(true);
        userData.refetch();
      })
      .catch((err: any) => {
        if (!(err instanceof TRPCClientError)) throw err;
        setOpenAddUserFailed(true);
      });
  };

  return (
    <>
      <Container maxWidth={false} className="mt-8 px-8">
        <div className="mb-8 flex-row  sm:flex justify-between">
          <Typography
            className=" flex"
            noWrap
            sx={{
              fontSize: "30px",
              fontFamily: "Nunito",
              fontWeight: 700,
              color: "inherit",
            }}
          >
            Karyawan
          </Typography>
          <AddUserButton addUser={addUser}></AddUserButton>
        </div>
        <Grid container>
          <Grid xs={12}>
            <TableContainer>
              <Table sx={{ minWidth: 1400 }}>
                <TableHead className="text-[#AB8A67]">
                  <TableRow>
                    <TableCell width={"10%"} className="text-[#AB8A67]">
                      <Typography
                        noWrap
                        sx={{
                          fontSize: "15px",
                          fontFamily: "Nunito",
                          fontWeight: 800,
                          color: "inherit",
                          justifyItems: "flex-end",
                        }}
                      >
                        #User ID
                      </Typography>
                    </TableCell>
                    <TableCell width={"30%"} className="text-[#AB8A67]">
                      <Typography
                        noWrap
                        sx={{
                          fontSize: "15px",
                          fontFamily: "Nunito",
                          fontWeight: 800,
                          color: "inherit",
                          justifyItems: "flex-end",
                        }}
                      >
                        Username
                      </Typography>
                    </TableCell>
                    <TableCell width={"20%"} className="text-[#AB8A67]">
                      <Typography
                        noWrap
                        sx={{
                          fontSize: "15px",
                          fontFamily: "Nunito",
                          fontWeight: 800,
                          color: "inherit",
                          justifyItems: "flex-end",
                        }}
                      >
                        Role
                      </Typography>
                    </TableCell>
                    <TableCell
                      width={"10%"}
                      className="text-[#AB8A67]"
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userData.data?.data.map((item) => {
                    return (
                      <>
                        <UserTableRow
                          key={item.id}
                          item={item}
                          editUser={editUser}
                          deleteUser={deleteUser}
                        ></UserTableRow>
                      </>
                    );
                  })}
                  <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    open={openEditUserFailed}
                    autoHideDuration={1000}
                    onClose={handleCloseEditUserFailed}
                  >
                    <Alert
                      onClose={handleCloseEditUserFailed}
                      severity="error"
                      sx={{ width: "100%" }}
                    >
                      Username sudah ada
                    </Alert>
                  </Snackbar>
                  <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    open={openEditUser}
                    autoHideDuration={1000}
                    onClose={handleCloseEditUser}
                  >
                    <Alert
                      onClose={handleCloseEditUser}
                      severity="success"
                      sx={{ width: "100%" }}
                    >
                      Berhasil mengedit user
                    </Alert>
                  </Snackbar>
                  <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    open={openDeleteUser}
                    autoHideDuration={1000}
                    onClose={handleCloseDeleteUser}
                  >
                    <Alert
                      onClose={handleCloseDeleteUser}
                      severity="success"
                      sx={{ width: "100%" }}
                    >
                      Berhasil menghapus user
                    </Alert>
                  </Snackbar>
                  <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    open={openDeleteUserFailed}
                    autoHideDuration={1000}
                    onClose={handleCloseDeleteUserFailed}
                  >
                    <Alert
                      onClose={handleCloseDeleteUserFailed}
                      severity="error"
                      sx={{ width: "100%" }}
                    >
                      Gagal menghapus user
                    </Alert>
                  </Snackbar>
                  <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    open={openAddUser}
                    autoHideDuration={1000}
                    onClose={handleCloseAddUser}
                  >
                    <Alert
                      onClose={handleCloseAddUser}
                      severity="success"
                      sx={{ width: "100%" }}
                    >
                      Berhasil menambah user
                    </Alert>
                  </Snackbar>
                  <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    open={openAddUserFailed}
                    autoHideDuration={1000}
                    onClose={handleCloseAddUserFailed}
                  >
                    <Alert
                      onClose={handleCloseAddUserFailed}
                      severity="success"
                      sx={{ width: "100%" }}
                    >
                      Username sudah ada
                    </Alert>
                  </Snackbar>
                </TableBody>
              </Table>
            </TableContainer>
            <Box className="mt-8 flex justify-end">
              <Pagination
                size="large"
                count={userData.data?.totalPage}
                page={cursor}
                onChange={(event, value) => setCursor(value)}
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "#6f6f6f",
                  },
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
