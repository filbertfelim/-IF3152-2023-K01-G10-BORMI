import React, { useState } from "react";
import { api } from "~/utils/api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TransactionTableRow from "./TransactionTableRow";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TRPCClientError } from "@trpc/client";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Grid } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

export default function TransactionTable() {
  const [cursor, setCursor] = useState(1);
  const [valueStart, setValueStart] = React.useState(null);
  const [valueEnd, setValueEnd] = React.useState(null);
  const transactionData = api.transaction.getTransactions.useQuery({
    page: cursor,
    startDate: valueStart ?? undefined,
    endDate: valueEnd ?? undefined,
  });

  return transactionData.data?.data.length !== 0 ? (
    <>
      <Grid container spacing={4}>
        <Grid xs={12} md={7}>
          <Typography
            className="mb-8 flex"
            noWrap
            sx={{
              fontSize: "30px",
              fontFamily: "Nunito",
              fontWeight: 700,
              color: "inherit",
            }}
          >
            Riwayat Transaksi
          </Typography>
        </Grid>
        <Grid xs={12} md={5}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disableFuture
              label="Tanggal awal"
              openTo="day"
              views={["year", "month", "day"]}
              value={valueStart}
              onChange={(newValue) => {
                setValueStart(newValue);
                console.log("start");
                if (newValue !== null) {
                  console.log(newValue as never as string);
                }
              }}
            />
            <DatePicker
              disableFuture
              label="Tanggal akhir"
              openTo="day"
              views={["year", "month", "day"]}
              value={valueEnd}
              onChange={(newValue) => {
                setValueEnd(newValue);
                console.log("end");
                if (newValue !== null) {
                  console.log(newValue as never as string);
                }
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid xs={12} sm={12} md={12} xl={12}>
          <TableContainer>
            <Table sx={{ minWidth: 1400 }}>
              <TableHead>
                <TableRow>
                  <TableCell width={"9%"} className="text-[#6f6f6f]">
                    <Typography
                      noWrap
                      sx={{
                        fontSize: "15px",
                        fontFamily: "Nunito",
                        fontWeight: 800,
                        justifyItems: "flex-end",
                      }}
                    >
                      #TransactionID
                    </Typography>
                  </TableCell>
                  <TableCell width={"9%"} className="text-[#6f6f6f]">
                    <Typography
                      noWrap
                      sx={{
                        fontSize: "16px",
                        fontFamily: "Nunito",
                        fontWeight: 800,
                        color: "inherit",
                        justifyItems: "flex-end",
                      }}
                    >
                      #UserID
                    </Typography>
                  </TableCell>
                  <TableCell width={"9%"} className="text-[#6f6f6f]">
                    <Typography
                      noWrap
                      sx={{
                        fontSize: "16px",
                        fontFamily: "Nunito",
                        fontWeight: 800,
                        color: "inherit",
                        justifyItems: "flex-end",
                      }}
                    >
                      Tanggal
                    </Typography>
                  </TableCell>
                  <TableCell width={"9%"} className="text-[#6f6f6f]">
                    <Typography
                      noWrap
                      sx={{
                        fontSize: "16px",
                        fontFamily: "Nunito",
                        fontWeight: 800,
                        color: "inherit",
                        justifyItems: "flex-end",
                      }}
                    >
                      Keranjang
                    </Typography>
                  </TableCell>
                  <TableCell width={"9%"} className="text-[#6f6f6f]">
                    <Typography
                      noWrap
                      sx={{
                        fontSize: "16px",
                        fontFamily: "Nunito",
                        fontWeight: 800,
                        color: "inherit",
                        justifyItems: "flex-end",
                      }}
                    >
                      Total Harga
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {transactionData.data?.data.map((item) => {
                  return (
                    <TransactionTableRow
                      key={item.id}
                      transaction={item}
                    ></TransactionTableRow>
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
              disabled={transactionData.data?.totalPage === cursor}
            >
              <KeyboardArrowRightIcon fontSize="inherit" />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </>
  ) : (
    <>
      <Grid container spacing={4}>
        <Grid xs={12} md={7}>
          <Typography
            className="mb-8 flex"
            noWrap
            sx={{
              fontSize: "30px",
              fontFamily: "Nunito",
              fontWeight: 700,
              color: "inherit",
            }}
          >
            Riwayat Transaksi
          </Typography>
        </Grid>
        <Grid xs={12} md={5}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disableFuture
              label="Tanggal awal"
              openTo="day"
              views={["year", "month", "day"]}
              value={valueStart}
              onChange={(newValue) => {
                setValueStart(newValue);
                console.log("start");
                if (newValue !== null) {
                  console.log(newValue as never as Date);
                }
              }}
            />
            <DatePicker
              disableFuture
              label="Tanggal akhir"
              openTo="day"
              views={["year", "month", "day"]}
              value={valueEnd}
              onChange={(newValue) => {
                setValueEnd(newValue);
                console.log("end");
                if (newValue !== null) {
                  console.log(newValue as never as Date);
                }
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid xs={12}>
          <Typography
            className="flex justify-center md:text-lg lg:text-2xl mt-8"
            align="center"
            sx={{
              fontSize: "15px",
              fontFamily: "Nunito",
              fontWeight: 700,
              color: "inherit",
            }}
          >
            Tidak ada riwayat transaksi
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
