import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import { UserRole } from "@prisma/client";
import { useRouter } from "next/router";

interface Props {
  role: UserRole | undefined;
  username: string;
}

function Navbar({ role, username }: Props) {
  const router = useRouter();
  let pages: { title: string; href: string }[] = [];
  if (role === "ADMIN") {
    pages = [
      { title: "Daftar Karyawan", href: "/dashboard-user" },
      { title: "Riwayat Transaksi", href: "/transaction" },
    ];
  } else if (role === "KASIR") {
    pages = [
      { title: "Daftar Produk", href: "/product-list" },
      { title: "Keranjang", href: "/cart" },
    ];
  }
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" elevation={0}>
      <Container maxWidth={false} className="bg-[#FFF8EE] text-black">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 40, display: "flex" }}>
            <Avatar sx={{ bgcolor: "black", color: "#FFF8EE" }}>
              <PersonIcon />
            </Avatar>
            <Typography
              variant="body2"
              noWrap
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                fontFamily: "Nunito",
                fontWeight: 700,
                color: "inherit",
                mt: 1.3,
                mx: 1,
              }}
            >
              Hello, User {username}
            </Typography>
          </Box>
          <Typography
            variant="h5"
            noWrap
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              fontFamily: "Megrim",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
            }}
          >
            BORMI
          </Typography>
          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page["title"]}
                  onClick={() => {
                    handleCloseNavMenu();
                    void router.push(page["href"]);
                  }}
                >
                  <Typography
                    textAlign="center"
                    sx={{
                      color: "black",
                      display: "block",
                      fontFamily: "Nunito",
                      fontWeight: 800,
                    }}
                  >
                    {page["title"]}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 10000, display: { xs: "none", md: "flex" } }}>
            <Typography
              variant="body2"
              noWrap
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                fontFamily: "Nunito",
                fontWeight: 700,
                color: "inherit",
                mt: 1.1,
                mx: 1,
              }}
            >
              Hello, User {username}
            </Typography>
            {pages.map((page) => (
              <Button
                key={page["title"]}
                onClick={() => {
                  handleCloseNavMenu();
                  void router.push(page["href"]);
                }}
                sx={{
                  mr: 2,
                  flexGrow: 0,
                  color: "black",
                  display: "block",
                  px: 3,
                  fontFamily: "Nunito",
                  fontWeight: 800,
                  borderRadius: 4,
                  "&:hover": {
                    backgroundColor: "#FFC887",
                    borderColor: "#FFC887",
                    boxShadow: "none",
                  },
                }}
              >
                {page["title"]}
              </Button>
            ))}
          </Box>
          <Typography
            variant="h5"
            noWrap
            sx={{
              display: { xs: "none", md: "flex" },
              fontFamily: "Megrim",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
            }}
          >
            BORMI
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
