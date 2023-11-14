import React, { useState } from "react";
import { api } from "~/utils/api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CartTableRow from "./CartTableRow";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TRPCClientError } from "@trpc/client";

interface Props {
  id: number;
}

export default function CartTable({ id }: Props) {
  const [cursor, setCursor] = useState(1);
  const cartData = api.cartItem.getCartItem.useQuery({
    page: cursor,
    userId: id,
  });
  const deleteMutation = api.cartItem.deleteCartItem.useMutation();
  const quantityMutation = api.cartItem.editCartItemQuantity.useMutation();

  const editQuantity = (id: number, quantity: number) => {
    quantityMutation
      .mutateAsync({
        cartId: id,
        quantity: quantity,
      })
      .then(async () => {
        cartData.refetch();
      })
      .catch((err: any) => {
        if (!(err instanceof TRPCClientError)) throw err;
      });
  };
  const deleteCartItem = (id: number) => {
    deleteMutation
      .mutateAsync({
        cartId: id,
      })
      .then(async () => {
        cartData.refetch();
      })
      .catch((err: any) => {
        if (!(err instanceof TRPCClientError)) throw err;
      });
  };

  return cartData.data?.totalPrice !== 0 ? (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 1200 }}>
          <TableHead className="text-[#AB8A67]">
            <TableRow>
              <TableCell width={"55%"} className="text-[#AB8A67]">
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
                  Produk
                </Typography>
              </TableCell>
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
                  Harga
                </Typography>
              </TableCell>
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
                  Jumlah
                </Typography>
              </TableCell>
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
                  Total
                </Typography>
              </TableCell>
              <TableCell width={"2%"} className="text-[#AB8A67]"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartData.data?.data.map((item) => {
              return (
                <CartTableRow
                  key={item.id}
                  cartItem={item}
                  editQuantity={editQuantity}
                  deleteCartItem={deleteCartItem}
                ></CartTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className="mt-8 flex justify-end">
        <IconButton
          size="medium"
          onClick={() => setCursor(cursor - 1)}
          disabled={cursor === 1}
        >
          <KeyboardArrowLeftIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          size="medium"
          onClick={() => setCursor(cursor + 1)}
          disabled={cartData.data?.totalPage === cursor}
        >
          <KeyboardArrowRightIcon fontSize="inherit" />
        </IconButton>
      </Box>
    </>
  ) : (
    <>
      <Typography
        className="flex justify-center md:text-lg lg:text-2xl"
        align="center"
        sx={{
          fontSize: "15px",
          fontFamily: "Nunito",
          fontWeight: 700,
          color: "inherit",
        }}
      >
        Tidak ada produk dalam keranjang
      </Typography>
    </>
  );
}
