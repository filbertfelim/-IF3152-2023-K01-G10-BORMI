import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Alert,
  Button,
  CardActionArea,
  Container,
  Snackbar,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { TRPCClientError } from "@trpc/client";

interface Props {
  item: {
    id: number;
    name: string;
    category: string;
    stock: number;
    price: number;
    image: string;
    imageKey: string;
  };
  userId: number;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function ProductCard({ item, userId }: Props) {
  const router = useRouter();
  const inCart = api.product.isProductInCartItem.useQuery({
    id: userId,
    productId: item.id,
  });

  const addCartItemMutation = api.cartItem.addNewCartItem.useMutation();

  const addCartItem = (userId: number, productId: number) => {
    addCartItemMutation
      .mutateAsync({
        userId: userId,
        productId: productId,
      })
      .then(async () => {
        setOpenAddCartItem(true);
        await delay(1000);
        inCart.refetch();
      })
      .catch((err: any) => {
        if (!(err instanceof TRPCClientError)) throw err;
      });
  };

  const [openAddCartItem, setOpenAddCartItem] = React.useState(false);

  const handleCloseAddCartItem = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAddCartItem(false);
  };

  return (
    <>
      <Card className="mx-4 w-full">
          <CardContent className="flex flex-col items-center justify-center py-4">
            <CardMedia
              component="img"
              className="mb-4 h-48 w-48 object-scale-down"
              image={item.image}
              alt="green iguana"
            />
            <Typography
              className="mb-1 w-full justify-start"
              sx={{
                fontSize: "20px",
                fontFamily: "Nunito",
                fontWeight: 800,
                color: "inherit",
              }}
            >
              {item.name}
            </Typography>
            <Typography
              className="mb-1 w-full justify-start"
              sx={{
                fontSize: "18px",
                fontFamily: "Nunito",
                fontWeight: 500,
                color: "inherit",
              }}
            >
              {item.category}
            </Typography>
            <Typography
              className="mb-1 w-full justify-start"
              sx={{
                fontSize: "18px",
                fontFamily: "Nunito",
                fontWeight: 800,
                color: "inherit",
              }}
            >
              <NumericFormat
                value={item.price}
                displayType={"text"}
                thousandSeparator="."
                decimalSeparator=","
                prefix={"Rp "}
              />
            </Typography>
            <Typography
              className="mb-1 w-full justify-start"
              sx={{
                fontSize: "18px",
                fontFamily: "Nunito",
                fontWeight: 500,
                color: "inherit",
              }}
            >
              Stok : {item.stock} pcs
            </Typography>
            {inCart.data?.isInCart ? (
              <>
                <Container className="flex justify-end">
                  <Button
                    className="my-4 rounded-2xl border-2 bg-[#FFC887] px-4 py-3 hover:bg-[#897054] disabled:bg-[#c3c3c3]"
                    onClick={() => {
                      void router.push("/cart");
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontFamily: "Nunito",
                        fontWeight: 800,
                        color: "black",
                      }}
                    >
                      Lihat keranjang
                    </Typography>
                  </Button>
                </Container>
              </>
            ) : (
              <>
                <Container className="flex justify-end">
                  <Button
                    className="my-4 rounded-2xl border-2 bg-[#FFC887] px-4 py-3 hover:bg-[#897054] disabled:bg-[#c3c3c3]"
                    onClick={() => {
                      addCartItem(userId, item.id);
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontFamily: "Nunito",
                        fontWeight: 800,
                        color: "black",
                      }}
                    >
                      Tambah ke keranjang
                    </Typography>
                  </Button>
                  <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    open={openAddCartItem}
                    autoHideDuration={2000}
                    onClose={handleCloseAddCartItem}
                  >
                    <Alert
                      onClose={handleCloseAddCartItem}
                      severity="success"
                      sx={{ width: "100%" }}
                    >
                      Berhasil menambah produk ke keranjang
                    </Alert>
                  </Snackbar>
                </Container>
              </>
            )}
          </CardContent>
      </Card>
    </>
  );
}
