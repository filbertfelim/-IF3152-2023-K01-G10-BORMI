import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { NumericFormat } from "react-number-format";
import { api } from "~/utils/api";
import Button from "@mui/material/Button";
import { TRPCClientError } from "@trpc/client";
import { useToasts } from "react-toast-notifications";

interface Props {
  id: number;
}

export default function CheckoutTable({ id }: Props) {
  const { addToast } = useToasts();
  const cartPriceData = api.cartItem.getCartItem.useQuery({
    page: 1,
    userId: id,
  });

  const addTransactionMutation = api.transaction.addTransactions.useMutation();

  const addTransaction = (id: number) => {
    addTransactionMutation
      .mutateAsync({
        userId: id,
      })
      .then(async () => {
        addToast("Checked out Successfully", { appearance: "success" });
        cartPriceData.refetch();
      })
      .catch((err: any) => {
        if (!(err instanceof TRPCClientError)) throw err;
        addToast(err.message, { appearance: "error" });
      });
  };
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="bg-[#FFF8EE]">
              <Typography
                noWrap
                sx={{
                  fontSize: "20px",
                  fontFamily: "Nunito",
                  fontWeight: 800,
                  color: "inherit",
                }}
              >
                Ringkasan Pesanan
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            key="totalprice"
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell className="flex justify-between bg-[#FFF8EE]">
              <Typography
                noWrap
                sx={{
                  fontSize: "15px",
                  fontFamily: "Nunito",
                  fontWeight: 800,
                  color: "inherit",
                }}
              >
                Total{" "}
              </Typography>
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
                  value={cartPriceData.data?.totalPrice}
                  displayType={"text"}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix={"Rp "}
                />
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow
            key="checkout"
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell className="mt-2 flex justify-center px-0">
              <Button
                className="w-full rounded-2xl border-2 bg-[#AB8A67] px-0 py-3 hover:bg-[#897054] disabled:bg-[#c3c3c3]"
                onClick={() => addTransaction(id)}
                disabled={cartPriceData.data?.totalPrice === 0}
              >
                <Typography
                  noWrap
                  sx={{
                    fontSize: "15px",
                    fontFamily: "Nunito",
                    fontWeight: 800,
                    color: "white",
                    justifyItems: "flex-end",
                  }}
                >
                  Checkout
                </Typography>
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
