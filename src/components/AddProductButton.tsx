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

interface FormValues {
  name: string;
  category: string;
  stock: number;
  price: number;
  image: string;
  imageKey: string;
}

interface Props {
  addProduct: (
    name: string,
    category: string,
    stock: number,
    price: number,
    image: string,
    imageKey: string,
  ) => void;
}

export default function AddProductButton({ addProduct }: Props) {
  const { handleSubmit, setValue, getValues, register, reset } =
    useForm<FormValues>({
      mode: "onSubmit",
      defaultValues: {
        name: "Nama Produk",
        category: "MAKANAN DAN MINUMAN",
        stock: 0,
        price: 0,
        image: "",
        imageKey: "",
      },
    });
  const [openAddDialog, setOpenAddDialog] = React.useState(false);

  const handleClickOpenAddProduct = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddProduct = () => {
    setOpenAddDialog(false);
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

  const [stock, setStock] = useState(0);

  const [price, setPrice] = useState(0);

  const [name, setName] = useState("Nama Produk");

  const nameInputHandler = (e: string) => {
    const setValue = e.length > 0 ? e : name;
    setName(setValue);
  };

  const addProductItem: SubmitHandler<FormValues> = (data: FormValues, e) => {
    e?.preventDefault();
    console.log(data);
    try {
      addProduct(
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
    <>
      <Button
        onClick={handleClickOpenAddProduct}
        className="h-8 bg-[#AB8A67] px-4 text-white hover:bg-[#493b2c] md:h-12"
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
          Tambah produk baru
        </Typography>
      </Button>
      <Dialog
        open={openAddDialog}
        onClose={() => {
          handleCloseAddProduct();
          setStock(0);
          setPrice(0);
          setName("Nama Produk");
          reset(() => ({
            name: "Nama Produk",
            category: "MAKANAN DAN MINUMAN",
            stock: 0,
            price: 0,
            image: "",
            imageKey: "",
          }));
        }}
        PaperProps={{ sx: { borderRadius: "20px" } }}
      >
        <form onSubmit={(e) => void handleSubmit(addProductItem)(e)}>
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
                button:
                  "ut-uploading:cursor-not-allowed rounded-r-none bg-[#FFC887] bg-none after:bg-[#c79960] text-black font-nunito font-bold",
                allowedContent: "text-black font-nunito font-bold",
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
              defaultValue={"MAKANAN DAN MINUMAN"}
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
              <MenuItem key={"PERLENGKAPAN MANDI"} value={"PERLENGKAPAN MANDI"}>
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
          <DialogActions className="mx-12 my-4 flex justify-end space-x-2">
            <Button
              onClick={() => {
                handleCloseAddProduct();
                setStock(0);
                setPrice(0);
                setName("Nama Produk");
                reset(() => ({
                  name: "Nama Produk",
                  category: "MAKANAN DAN MINUMAN",
                  stock: 0,
                  price: 0,
                  image: "",
                  imageKey: "",
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
              disabled={getValues("image") === ""}
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
