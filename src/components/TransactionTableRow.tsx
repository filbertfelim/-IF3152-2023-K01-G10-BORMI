import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Alert, Box, Button, Divider, Grid, Snackbar } from "@mui/material";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TransactionDetailsRow from "./TransactionDetailsRow";
import { api } from "~/utils/api";

interface Props {
  transaction: {
    CartItem: {
      id: number;
      productId: number;
      quantity: number;
      userId: number;
      isPurchased: boolean;
      transactionId: number | null;
    }[];
  } & {
    id: number;
    createdAt: Date;
    reviewedAt: Date | null;
    userId: number;
    date: Date;
  };
}

export default function TransactionTableRow({ transaction }: Props) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
  let totalPrice = 0;

  for (const item of transaction.CartItem) {
    const productData = api.product.getProductsbyId.useQuery({
      id: item.productId,
    });

    totalPrice += (productData.data?.price as never as number) * item.quantity;
  }

  const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <TableRow
      key={transaction.id}
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
            {transaction.id}
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
            {transaction.userId}
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
            {/* {transaction.date
              .toLocaleDateString("id-ID", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
              .replace(/,/g, "")} */}
            {transaction.date.toString()}
          </Typography>
        </div>
      </TableCell>
      <TableCell>
        <Typography
          noWrap
          sx={{
            textTransform: "none",
            fontSize: "15px",
            fontFamily: "Nunito",
            fontWeight: 500,
            color: "#AB8A67",
            justifyItems: "flex-end",
            cursor: "pointer",
          }}
          onClick={handleClickOpen("paper")}
        >
          Lihat Detail Transaksi
        </Typography>
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          className="w-auto"
          PaperProps={{ sx: { borderRadius: "20px", p : 4 } }}
        >
          <DialogTitle id="scroll-dialog-title" className="my-4 flex flex-col">
            <Typography
              sx={{
                fontSize: "25px",
                fontFamily: "Nunito",
                fontWeight: 800,
                color: "black",
                mb: 4,
              }}
              className="flex items-center justify-center"
            >
              Detail Transaksi
            </Typography>
            <Typography
              noWrap
              sx={{
                fontSize: "15px",
                fontFamily: "Nunito",
                fontWeight: 500,
                color: "#818181",
                justifyItems: "flex-end",
                mb: 2,
              }}
            >
              Transaction {transaction.id} - User ID {transaction.userId}
            </Typography>
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
              {transaction.date
                .toLocaleDateString("id-ID", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
                .replace(/,/g, "")}
            </Typography>
          </DialogTitle>
          <DialogContent
            dividers={scroll === "paper"}
            className="flex flex-col"
          >
            <Box ref={descriptionElementRef}>
              {transaction.CartItem.map((item) => {
                return (
                  <>
                    <TransactionDetailsRow
                      cartItem={item}
                    ></TransactionDetailsRow>
                    <Divider className="mt-4" />
                  </>
                );
              })}
            </Box>
          </DialogContent>
          <DialogActions className="flex justify-start ml-8">
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Typography
                  className="flex justify-start"
                  noWrap
                  sx={{
                    fontSize: "18px",
                    fontFamily: "Nunito",
                    fontWeight: 800,
                    color: "#black",
                    pt: 6,
                  }}
                >
                  Total Harga
                </Typography>
              </Grid>
              <Grid xs={12}>
                <Typography
                  noWrap
                  sx={{
                    fontSize: "25px",
                    fontFamily: "Nunito",
                    fontWeight: 800,
                    color: "black",
                    mt: 1,
                  }}
                >
                  <NumericFormat
                    value={totalPrice}
                    displayType={"text"}
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix={"Rp "}
                  />
                </Typography>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      </TableCell>
      <TableCell>
        <Typography
          noWrap
          sx={{
            fontSize: "15px",
            fontFamily: "Nunito",
            fontWeight: 800,
            color: "#818181",
          }}
        >
          <NumericFormat
            value={totalPrice}
            displayType={"text"}
            thousandSeparator="."
            decimalSeparator=","
            prefix={"Rp "}
          />
        </Typography>
      </TableCell>
    </TableRow>
  );
}
