import React, { useState } from "react";
import { api } from "~/utils/api";
import {
  Box,
  Checkbox,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ProductCard from "./ProductCard";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Props {
  id: number;
}

export default function ProductGrid({ id }: Props) {
  const categoryList = [
    "MAKANAN DAN MINUMAN",
    "PERALATAN RUMAH",
    "ELEKTRONIK",
    "KOSMETIK",
    "PERLENGKAPAN MANDI",
  ];
  const [search, setSearch] = useState("");
  const [cursor, setCursor] = useState(1);
  const [category, setCategory] = React.useState<string[]>([]);
  const productData = api.product.getProducts.useQuery({
    page: cursor,
    category: category.length === 0 ? undefined : category,
    searchQuery: search === "" ? undefined : search,
    withZeroStock: false,
  });

  const handleChange = (event: SelectChangeEvent<typeof category>) => {
    const {
      target: { value },
    } = event;
    setCategory(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
    setCursor(1);
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid sm={12} md={6} className="mb-8 ml-8 md:ml-0">
          <Typography
            className=" flex"
            noWrap
            sx={{
              fontSize: "30px",
              fontFamily: "Nunito",
              fontWeight: 700,
              color: "inherit",
            }}
          >
            Daftar Produk
          </Typography>
        </Grid>
        <Grid
          sm={12}
          md={6}
          className="justify-left mb-8 flex-row sm:flex lg:justify-end ml-8 md:ml-0"
        >
          <TextField
            type="text"
            placeholder="Nama produk"
            InputProps={{
              sx: {
                borderRadius: 4,
                fontFamily: "Nunito",
                fontWeight: 800,
                color: "inherit",
                minWidth: "150px",
                mr: 2,
                mb: 2,
              },
              startAdornment: (
                <InputAdornment position="end" className="mr-2">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <FormControl
            sx={{
              minWidth: "120px",
              maxWidth: "200px",
            }}
          >
            <InputLabel
              htmlFor="grouped-native-select"
              sx={{
                fontFamily: "Nunito",
                fontWeight: 800,
                color: "gray",
              }}
            >
              Kategori
            </InputLabel>
            <Select
              className=" rounded-xl border"
              id="grouped-native-select"
              label="Kategori"
              multiple
              value={category}
              onChange={handleChange}
              input={
                <OutlinedInput
                  label="Kategori"
                  sx={{
                    fontFamily: "Nunito",
                    fontWeight: 800,
                    color: "inherit",
                  }}
                />
              }
              renderValue={(selected) => selected.join(", ")}
            >
              {categoryList.map((item) => (
                <MenuItem key={item} value={item}>
                  <Checkbox checked={category.indexOf(item) > -1} />
                  <Typography
                    sx={{
                      fontFamily: "Nunito",
                      fontWeight: 800,
                      color: "inherit",
                    }}
                  >
                    {item}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid container>
          {productData.data?.data.map((item) => (
            <Grid
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="mb-8 flex justify-center"
            >
              <ProductCard item={item} userId={id}></ProductCard>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Box className="mb-4 mt-6 flex justify-end">
        <Pagination
          size="large"
          count={productData.data?.totalPage}
          page={cursor}
          onChange={(event, value) => setCursor(value)}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#6f6f6f",
            },
          }}
        />
      </Box>
    </>
  );
}
