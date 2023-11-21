import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import { NumericFormat } from "react-number-format";
import Typography from "@mui/material/Typography";
import {
  Alert,
  Button,
  InputAdornment,
  MenuItem,
  Snackbar,
  TextField,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import { UploadButton } from "~/utils/uploadthing";
import { TRPCClientError } from "@trpc/client";

interface Props {
  productItem: {
    id: number;
    name: string;
    category: string;
    stock: number;
    price: number;
    image: string;
    imageKey: string;
  };
  editProduct: (
    id: number,
    name: string,
    category: string,
    stock: number,
    price: number,
    image: string,
    imageKey: string,
  ) => void;
  deleteProduct: (id: number) => void;
}

interface FormValues {
  name: string;
  category: string;
  stock: number;
  price: number;
  image: string;
  imageKey: string;
}

export default function ProductTableRow({
  productItem,
  editProduct,
  deleteProduct,
}: Props) {
  const { handleSubmit, setValue, getValues, register, reset } =
    useForm<FormValues>({
      mode: "onSubmit",
      defaultValues: {
        name: productItem.name,
        category: productItem.category,
        stock: productItem.stock,
        price: productItem.price,
        image: productItem.image,
        imageKey: productItem.imageKey,
      },
    });
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);

  const handleClickOpenEditProduct = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditProduct = () => {
    setOpenEditDialog(false);
  };

  const handleClickOpenDeleteProduct = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteProduct = () => {
    setOpenDeleteDialog(false);
  };

  const [openUploadSuccess, setOpenUploadSuccess] = React.useState(false);

  const handleCloseUploadSuccess = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenUploadSuccess(false);
  };

  const [openUploadFailed, setOpenUploadFailed] = React.useState(false);

  const handleCloseUploadFailed = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenUploadFailed(false);
  };

  const [stock, setStock] = useState(productItem.stock);

  const [price, setPrice] = useState(productItem.price);

  const [name, setName] = useState(productItem.name);

  const nameInputHandler = (e: string) => {
    const setValue = e.length > 0 ? e : name;
    setName(setValue);
  };

  const editProductItem: SubmitHandler<FormValues> = (data: FormValues, e) => {
    e?.preventDefault();
    try {
      editProduct(
        productItem.id,
        data.name,
        data.category,
        data.stock,
        data.price,
        data.image,
        data.imageKey,
      );
    } catch (error) {
      if (!(error instanceof TRPCClientError)) {
      }
    }
  };

  return (
    <TableRow
      key={productItem.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell>
        <Typography
          noWrap
          className="align-center ml-8 flex items-center justify-center"
          sx={{
            fontSize: "15px",
            fontFamily: "Nunito",
            fontWeight: 800,
            color: "inherit",
            justifyItems: "flex-end",
          }}
        >
          {productItem.id}
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
          {productItem.name}
        </Typography>
      </TableCell>
      <TableCell>
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
          {productItem.category}
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
            value={productItem.price}
            displayType={"text"}
            thousandSeparator="."
            decimalSeparator=","
            prefix={"Rp "}
          />
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
          {productItem.stock} pcs
        </Typography>
      </TableCell>
      <TableCell align="center" className="flex">
        <IconButton size="medium" onClick={handleClickOpenEditProduct}>
          <EditIcon fontSize="inherit" color="inherit" />
        </IconButton>

        <Dialog
          open={openEditDialog}
          onClose={() => {
            handleCloseEditProduct();
            setStock(productItem.stock);
            setPrice(productItem.price);
            setName(productItem.name);
            reset(() => ({
              name: productItem.name,
              category: productItem.category,
              stock: productItem.stock,
              price: productItem.price,
              image: productItem.image,
              imageKey: productItem.imageKey,
            }));
          }}
          PaperProps={{ sx: { borderRadius: "20px" } }}
        >
          <form onSubmit={(e) => void handleSubmit(editProductItem)(e)}>
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
              {getValues("image") ? (
                <>
                  <img
                    src={getValues("image")}
                    alt="product image"
                    className="scale-50"
                  ></img>
                </>
              ) : (
                <></>
              )}

              <UploadButton
                className="uploadimage"
                appearance={{
                  button({ ready, isUploading }) {
                    return {
                      fontSize: "1rem",
                      color: "black",
                      ...(ready && { color: "black" }),
                      ...(isUploading && { color: "black" }),
                    };
                  },
                  container: {
                    marginTop: "1rem",
                  },
                  allowedContent: {
                    color: "#a1a1aa",
                  },
                }}
                content={{ allowedContent: "Maksimal 1 MB" }}
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  // Do something with the response
                  if (res) {
                    const file = res[0];
                    if (file !== undefined) {
                      setValue("image", file.url);
                      setValue("imageKey", file.key);
                    }
                  }
                  console.log("Files: ", res);
                  setOpenUploadSuccess(true);
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  setOpenUploadFailed(true);
                }}
              />
              <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                open={openUploadSuccess}
                autoHideDuration={1000}
                onClose={handleCloseUploadSuccess}
              >
                <Alert
                  onClose={handleCloseUploadSuccess}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Gambar sukses diunggah
                </Alert>
              </Snackbar>
              <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                open={openUploadFailed}
                autoHideDuration={1000}
                onClose={handleCloseUploadFailed}
              >
                <Alert
                  onClose={handleCloseUploadFailed}
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  Error mengunggah gambar
                </Alert>
              </Snackbar>
              <TextField
                required
                type="text"
                placeholder="Nama Produk"
                label="Nama Produk"
                value={name}
                onChange={(e) => {
                  nameInputHandler(e.target.value);
                  setValue("name", e.target.value);
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
                placeholder="Kategori"
                label="Kategori"
                defaultValue={productItem.category}
                InputProps={{
                  sx: {
                    borderRadius: 4,
                    fontFamily: "Nunito",
                    fontWeight: 800,
                    color: "inherit",
                  },
                }}
                onChange={(e) => {
                  setValue("category", e.target.value);
                }}
              >
                <MenuItem
                  key={"MAKANAN DAN MINUMAN"}
                  value={"MAKANAN DAN MINUMAN"}
                >
                  {"MAKANAN DAN MINUMAN"}
                </MenuItem>
                <MenuItem key={"PERALATAN RUMAH"} value={"PERALATAN RUMAH"}>
                  {"PERALATAN RUMAH"}
                </MenuItem>
                <MenuItem key={"ELEKTRONIK"} value={"ELEKTRONIK"}>
                  {"ELEKTRONIK"}
                </MenuItem>
                <MenuItem key={"KOSMETIK"} value={"KOSMETIK"}>
                  {"KOSMETIK"}
                </MenuItem>
                <MenuItem
                  key={"PERLENGKAPAN MANDI"}
                  value={"PERLENGKAPAN MANDI"}
                >
                  {"PERLENGKAPAN MANDI"}
                </MenuItem>
              </TextField>
              <TextField
                required
                type="number"
                placeholder="Stok"
                inputProps={{ min: 0 }}
                label="Stok"
                className="my-4 w-full"
                InputProps={{
                  sx: {
                    borderRadius: 4,
                    fontFamily: "Nunito",
                    fontWeight: 800,
                    color: "inherit",
                  },
                  endAdornment: (
                    <InputAdornment position="end">pcs</InputAdornment>
                  ),
                }}
                value={getValues("stock")}
                onChange={(e) => {
                  if (Number.isNaN(parseInt(e.target.value))) {
                    setValue("stock", 0);
                    setStock(0);
                  } else {
                    setValue("stock", parseInt(e.target.value));
                    setStock(parseInt(e.target.value));
                  }
                }}
              />
              <TextField
                required
                type="number"
                placeholder="Harga"
                inputProps={{ min: 0 }}
                label="Harga"
                className="my-4 w-full"
                InputProps={{
                  sx: {
                    borderRadius: 4,
                    fontFamily: "Nunito",
                    fontWeight: 800,
                    color: "inherit",
                  },
                  startAdornment: (
                    <InputAdornment position="start">Rp</InputAdornment>
                  ),
                }}
                value={getValues("price")}
                onChange={(e) => {
                  if (Number.isNaN(parseInt(e.target.value))) {
                    setValue("price", 0);
                    setPrice(0);
                  } else {
                    setValue("price", parseInt(e.target.value));
                    setPrice(parseInt(e.target.value));
                  }
                }}
              />
            </DialogContent>
            <DialogActions className="mx-12 my-4 flex justify-end space-x-4">
              <Button
                onClick={() => {
                  handleCloseEditProduct();
                  setStock(productItem.stock);
                  setPrice(productItem.price);
                  setName(productItem.name);
                  reset(() => ({
                    name: productItem.name,
                    category: productItem.category,
                    stock: productItem.stock,
                    price: productItem.price,
                    image: productItem.image,
                    imageKey: productItem.imageKey,
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

        <IconButton size="medium" onClick={handleClickOpenDeleteProduct}>
          <DeleteIcon fontSize="inherit" color="error" />
        </IconButton>
        <Dialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteProduct}
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
                Apakah anda ingin menghapus produk {productItem.name}?
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions className="my-4 flex justify-center space-x-4">
            <Button
              onClick={handleCloseDeleteProduct}
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
                deleteProduct(productItem.id);
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
      </TableCell>
    </TableRow>
  );
}
