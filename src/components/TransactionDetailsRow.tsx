import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import { NumericFormat } from "react-number-format";
import { api } from "~/utils/api";

interface Props {
  cartItem: {
    id: number;
    productId: number;
    quantity: number;
    userId: number;
    isPurchased: boolean;
    transactionId: number | null;
  };
}

export default function TransactionDetailsRow({
  cartItem
}: Props) {
  const productData = api.product.getProductsbyId.useQuery({
    id: cartItem.productId,
  });

  return (
    <>
      <Grid container spacing={2} className="my-4 px-4">
        <Grid 
         xs={3} 
         style={{ maxHeight: '130px', maxWidth: '130px' }} 
         className="flex justify-center"
        >
          <img
            src={productData.data?.image}
            alt={"Signature Image"}
            style={{ maxHeight: '100%', maxWidth: '100%' }}
          />
        </Grid>
        <Grid xs={9} className="flex items-center px-2">
          <Grid container spacing={1} className="pl-4">
            <Grid xs={12}>
              <Typography
                sx={{
                  fontSize: "17px",
                  fontFamily: "Nunito",
                  fontWeight: 600,
                  color: "black",
                  pb: "14px"
                }}
              >
                {productData.data?.name}
              </Typography>
            </Grid>
            <Grid xs={12} md={7}>
              <Typography
                noWrap
                sx={{
                  fontSize: "15px",
                  fontFamily: "Nunito",
                  fontWeight: 500,
                  color: "#818181",
                  pb: "4px"
                }}
              >
                {cartItem.quantity} x {" "}
                <NumericFormat
                  value={productData.data?.price}
                  displayType={"text"}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix={"Rp "}
                />
              </Typography>
            </Grid>
            <Grid xs={12} md={5} className="flex justify-left md:justify-end">
              <Typography
                noWrap
                sx={{
                  fontSize: "15px",
                  fontFamily: "Nunito",
                  fontWeight: 500,
                  color: "#818181",
                }}
              >
                <NumericFormat
                  value={
                    cartItem.quantity *
                    (productData.data?.price as never as number)
                  }
                  displayType={"text"}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix={"Rp "}
                />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
