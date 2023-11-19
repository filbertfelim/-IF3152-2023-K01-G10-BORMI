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
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import RemoveIcon from '@mui/icons-material/Remove';
import Pagination from '@mui/material/Pagination';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Grid } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Moment } from "moment";

export default function TransactionTable() {
  const [cursor, setCursor] = useState(1);
  const [valueStart, setValueStart] = React.useState<Moment | string | null>(null);
  const [valueEnd, setValueEnd] = React.useState<Moment | string | null>(null);
  const [clearedStart, setClearedStart] = React.useState<boolean>(false);
  const [clearedEnd, setClearedEnd] = React.useState<boolean>(false);
  const transactionData = api.transaction.getTransactions.useQuery({
    page: cursor,
    startDate: (valueStart as string) ?? undefined,
    endDate: (valueEnd as string) ?? undefined,
  });

  React.useEffect(() => {
    if (clearedStart) {
      setValueStart(null);
      setCursor(1);
      const timeout = setTimeout(() => {
        setClearedStart(false);
      }, 1500);
  
      return () => clearTimeout(timeout);
    }
    if (clearedEnd) {
      setValueEnd(null);
      setCursor(1);
      const timeout = setTimeout(() => {
        setClearedEnd(false);
      }, 1500);
  
      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [clearedStart, clearedEnd]);

  return transactionData.data?.data.length !== 0 ? (
    <>
      <Grid container spacing={1}>
        <Grid xs={12} md={6}>
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
        <Grid xs={12} md={6} pb={3} className="flex justify-end lg:justify-end">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disableFuture
              label="Tanggal awal"
              openTo="day"
              views={["year", "month", "day"]}
              format="DD/MM/YYYY"
              sx={{
                width: 260,
                '.MuiOutlinedInput-root': {
                  borderRadius: '10px',
                },
              }}
              slotProps={{
                field: { clearable: true, onClear: () => setClearedStart(true) },
              }}
              value={valueStart}
              onChange={(newValue) => {
                if (newValue !== null) {
                  setValueStart((newValue as Moment).endOf("day"));
                } else {
                  setValueStart(null);
                  setCursor(1);
                }
              }}
              maxDate={valueEnd}
            />
            <Box px={1} pt={1.5}>
              <IconButton 
                size="small" 
                sx={{ pointerEvents: 'none' }}
              >
                <RemoveIcon fontSize="inherit" />
              </IconButton>
            </Box>
            <DatePicker
              disableFuture
              label="Tanggal akhir"
              openTo="day"
              views={["year", "month", "day"]}
              format="DD/MM/YYYY"
              sx={{
                width: 260,
                '.MuiOutlinedInput-root': {
                  borderRadius: '10px',
                },
              }}
              slotProps={{
                field: { clearable: true, onClear: () => setClearedEnd(true) },
              }}
              value={valueEnd}
              onChange={(newValue) => {
                if (newValue !== null) {
                  setValueEnd((newValue as Moment).endOf("day"));
                } else {
                  setValueEnd(null);
                  setCursor(1);
                }
              }}
              minDate={valueStart}
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
          <Box className="mt-6 mb-4 flex justify-end">
            <Pagination 
              size="large"
              count={transactionData.data?.totalPage}
              page={cursor} 
              onChange={(event, value) => setCursor(value)}
              sx={{
                '& .MuiPaginationItem-root': {
                  color: '#6f6f6f',
                },
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  ) : (
    <>
      <Grid container spacing={1}>
      <Grid xs={12} md={6}>
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
        <Grid xs={12} md={6} pb={3} className="flex justify-end lg:justify-end">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disableFuture
              label="Tanggal awal"
              openTo="day"
              views={["year", "month", "day"]}
              format="DD/MM/YYYY"
              sx={{
                width: 260,
                '.MuiOutlinedInput-root': {
                  borderRadius: '10px',
                },
              }}
              slotProps={{
                field: { clearable: true, onClear: () => setClearedStart(true) },
              }}
              value={valueStart}
              onChange={(newValue) => {
                if (newValue !== null) {
                  setValueStart((newValue as Moment).endOf("day"));
                } else {
                  setValueStart(null);
                  setCursor(1);
                }
              }}
              maxDate={valueEnd}
            />
            <Box px={1} pt={1.5}>
              <IconButton 
                size="small" 
                sx={{ pointerEvents: 'none' }}
              >
                <RemoveIcon fontSize="inherit" />
              </IconButton>
            </Box>
            <DatePicker
              disableFuture
              label="Tanggal akhir"
              openTo="day"
              views={["year", "month", "day"]}
              format="DD/MM/YYYY"
              sx={{
                width: 260,
                '.MuiOutlinedInput-root': {
                  borderRadius: '10px',
                },
              }}
              slotProps={{
                field: { clearable: true, onClear: () => setClearedEnd(true) },
              }}
              value={valueEnd}
              onChange={(newValue) => {
                if (newValue !== null) {
                  setValueEnd((newValue as Moment).endOf("day"));
                } else {
                  setValueEnd(null);
                  setCursor(1);
                }
              }}
              minDate={valueStart}
            />
          </LocalizationProvider>
        </Grid>
        <Grid xs={12}>
          <Typography
            className="flex justify-center md:text-lg lg:text-xl mt-8"
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
