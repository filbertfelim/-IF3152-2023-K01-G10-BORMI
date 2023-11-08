import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
  cartItem: {
    product: {
      id: number;
      name: string;
      category: string;
      stock: number;
      price: number;
      image: string;
      imageKey: string;
    };
  } & {
    id: number;
    productId: number;
    quantity: number;
    userId: number;
    isPurchased: boolean;
    transactionId: number | null;
  };
  editQuantity: (id: number, quantity: number) => void;
  deleteCartItem: (id: number) => void;
}

export default function CartTableRow({
  cartItem,
  editQuantity,
  deleteCartItem,
}: Props) {
  const [quantity, setQuantity] = useState(cartItem.quantity || 0);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (quantity === cartItem.quantity) return;
    editQuantity(cartItem.id, quantity);
    return;
  }, [quantity]);

  const decQuantityHandler = () => {
    setQuantity(quantity - 1);
  };

  const incQuantityHandler = () => {
    setQuantity(quantity + 1);
  };

  return (
    <TableRow
      key={cartItem.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell>
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
          {cartItem.product.name}
        </Typography>
      </TableCell>
      <TableCell>
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
          <NumericFormat
            value={cartItem.product.price}
            displayType={"text"}
            thousandSeparator="."
            decimalSeparator=","
            prefix={"Rp "}
          />
        </Typography>
      </TableCell>
      <TableCell>
        <Box className="flex justify-start rounded-2xl border-2 border-[#FFC887] bg-[#FFC887]">
          <IconButton
            size="small"
            className="ml-3"
            onClick={decQuantityHandler}
            disabled={cartItem.quantity === 1}
          >
            <RemoveIcon fontSize="inherit" />
          </IconButton>
          <Typography
            sx={{
              fontSize: "15px",
              fontFamily: "Nunito",
              fontWeight: 700,
              color: "inherit",
              pt: 0.4,
              px: 3,
            }}
          >
            {cartItem.quantity}
          </Typography>
          <IconButton
            size="small"
            onClick={incQuantityHandler}
            disabled={cartItem.quantity === cartItem.product.stock}
          >
            <AddIcon fontSize="inherit" />
          </IconButton>
        </Box>
      </TableCell>
      <TableCell>
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
          <NumericFormat
            value={cartItem.product.price * cartItem.quantity}
            displayType={"text"}
            thousandSeparator="."
            decimalSeparator=","
            prefix={"Rp "}
          />
        </Typography>
      </TableCell>
      <TableCell align="center">
        <IconButton size="medium" onClick={handleClickOpen}>
          <DeleteIcon fontSize="inherit" color="error" />
        </IconButton>
        <Dialog
          open={open}
          onClose={handleClose}
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
                Apakah anda ingin menghapus produk {cartItem.product.name} dari
                keranjang?
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions className="my-4 flex justify-center space-x-4">
            <Button
              onClick={handleClose}
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
              onClick={() => deleteCartItem(cartItem.id)}
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
      </TableCell>
    </TableRow>
  );
}
