import React, { useState } from "react";
import { api } from "~/utils/api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ProductTableRow from "./ProductTableRow";
import Pagination from '@mui/material/Pagination';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TRPCClientError } from "@trpc/client";
import { Alert, Container, Grid, Snackbar } from "@mui/material";
import AddProductButton from "./AddProductButton";

export default function ProductTable() {
  const [cursor, setCursor] = useState(1);
  const productData = api.product.getProducts.useQuery({
    page: cursor,
    withZeroStock: true,
  });
  const addProductMutation = api.product.addProduct.useMutation();
  const deleteProductMutation = api.product.deleteProduct.useMutation();
  const editProductMutation = api.product.editProduct.useMutation();

  const addProduct = (
    name: string,
    category: string,
    stock: number,
    price: number,
    image: string,
    imageKey: string
  ) => {
    addProductMutation
      .mutateAsync({
        name: name,
        category: category,
        stock: stock,
        price: price,
        image: image,
        imageKey: imageKey,
      })
      .then(async () => {
        setOpenAddProduct(true);
        productData.refetch();
      })
      .catch((err: any) => {
        if (!(err instanceof TRPCClientError)) throw err;
        setOpenAddProductFailed(true);
      });
  };

  const deleteProduct = (id: number) => {
    deleteProductMutation
      .mutateAsync({
        productid: id,
      })
      .then(async () => {
        setOpenDeleteItem(true);
        productData.refetch();
      })
      .catch((err: any) => {
        if (!(err instanceof TRPCClientError)) throw err;
      });
  };

  const editProduct = (
    id: number,
    name: string,
    category: string,
    stock: number,
    price: number,
    image: string,
    imageKey: string
  ) => {
    editProductMutation
      .mutateAsync({
        id: id,
        name: name,
        category: category,
        stock: stock,
        price: price,
        image: image,
        imageKey: imageKey,
      })
      .then(async () => {
        setOpenEditProduct(true);
        productData.refetch();
      })
      .catch((err: any) => {
        if (!(err instanceof TRPCClientError)) throw err;
        setOpenEditProductFailed(true);
      });
  };

  const [openAddProduct, setOpenAddProduct] = React.useState(false);

  const handleCloseAddProductItem = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAddProduct(false);
  };

  const [openAddProductFailed, setOpenAddProductFailed] = React.useState(false);

  const handleCloseAddProductItemFailed = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAddProductFailed(false);
  };

  const [openEditProduct, setOpenEditProduct] = React.useState(false);

  const handleCloseEditProductItem = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenEditProduct(false);
  };

  const [openEditProductFailed, setOpenEditProductFailed] =
    React.useState(false);

  const handleCloseEditProductItemFailed = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenEditProductFailed(false);
  };

  const [openDeleteItem, setOpenDeleteItem] = React.useState(false);

  const handleCloseDeleteProductItem = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenDeleteItem(false);
  };

  const [openDeleteItemFailed, setOpenDeleteItemFailed] = React.useState(false);

  const handleCloseDeleteProductItemFailed = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenDeleteItemFailed(false);
  };

  return (productData.data?.data.length as never as number) > 0 ? (
    <>
      <Container maxWidth={false} className="mt-8 px-16 md:px-16 lg:px-28">
        <div className="flex justify-between">
          <Typography
            className="mb-8 flex md:text-3xl lg:text-4xl"
            noWrap
            sx={{
              fontSize: "20px",
              fontFamily: "Nunito",
              fontWeight: 700,
              color: "inherit",
            }}
          >
            Produk Bormi
          </Typography>
          <AddProductButton addProduct={addProduct}></AddProductButton>
        </div>

        <Grid container spacing={5}>
          <Grid xs={12}>
            <TableContainer className="mt-8">
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
                        #ID Produk
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
                        Nama
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
                        Kategori
                      </Typography>
                    </TableCell>
                    <TableCell width={"15%"} className="text-[#AB8A67]">
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
                        Harga
                      </Typography>
                    </TableCell>
                    <TableCell width={"15%"} className="text-[#AB8A67]">
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
                        Stok
                      </Typography>
                    </TableCell>
                    <TableCell
                      width={"10%"}
                      className="text-[#AB8A67]"
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productData.data?.data.map((item) => {
                    return (
                      <>
                        <ProductTableRow
                          key={item.id}
                          productItem={item}
                          editProduct={editProduct}
                          deleteProduct={deleteProduct}
                        ></ProductTableRow>
                      </>
                    );
                  })}
                  <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    open={openEditProductFailed}
                    autoHideDuration={1000}
                    onClose={handleCloseEditProductItemFailed}
                  >
                    <Alert
                      onClose={handleCloseEditProductItemFailed}
                      severity="error"
                      sx={{ width: "100%" }}
                    >
                      Nama produk sudah ada
                    </Alert>
                  </Snackbar>
                  <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    open={openEditProduct}
                    autoHideDuration={1000}
                    onClose={handleCloseEditProductItem}
                  >
                    <Alert
                      onClose={handleCloseEditProductItem}
                      severity="success"
                      sx={{ width: "100%" }}
                    >
                      Berhasil mengedit produk
                    </Alert>
                  </Snackbar>
                  <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    open={openDeleteItem}
                    autoHideDuration={1000}
                    onClose={handleCloseDeleteProductItem}
                  >
                    <Alert
                      onClose={handleCloseDeleteProductItem}
                      severity="success"
                      sx={{ width: "100%" }}
                    >
                      Berhasil menghapus produk
                    </Alert>
                  </Snackbar>
                  <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    open={openDeleteItemFailed}
                    autoHideDuration={1000}
                    onClose={handleCloseDeleteProductItemFailed}
                  >
                    <Alert
                      onClose={handleCloseDeleteProductItemFailed}
                      severity="error"
                      sx={{ width: "100%" }}
                    >
                      Gagal menghapus produk
                    </Alert>
                  </Snackbar>
                  <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    open={openAddProduct}
                    autoHideDuration={1000}
                    onClose={handleCloseAddProductItem}
                  >
                    <Alert
                      onClose={handleCloseAddProductItem}
                      severity="success"
                      sx={{ width: "100%" }}
                    >
                      Berhasil menambah produk
                    </Alert>
                  </Snackbar>
                  <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    open={openAddProductFailed}
                    autoHideDuration={1000}
                    onClose={handleCloseAddProductItemFailed}
                  >
                    <Alert
                      onClose={handleCloseAddProductItemFailed}
                      severity="success"
                      sx={{ width: "100%" }}
                    >
                      Nama produk sudah ada
                    </Alert>
                  </Snackbar>
                </TableBody>
              </Table>
            </TableContainer>
            <Box className="my-6 flex justify-end">
            <Pagination
                size="large"
                count={productData.data?.totalPage}
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
  ) : (
    <>
      <Typography
        className="flex justify-center md:text-lg lg:text-2xl mt-16"
        align="center"
        sx={{
          fontSize: "15px",
          fontFamily: "Nunito",
          fontWeight: 700,
          color: "inherit",
        }}
      >
        Tidak ada produk
      </Typography>
    </>
  );
}
