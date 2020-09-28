import {
  Avatar,
  Box,
  Container,
  Grid,
  GridList,
  GridListTile,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import { withStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CloseIcon from "@material-ui/icons/Close";
import FacebookIcon from "@material-ui/icons/Facebook";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import DialogSignInLogin from "./DialogSignInLogin";
import { Link } from "react-router-dom";
// import logo from "./../image/Capture.JPG";
function TransitionLeft(props) {
  // console.log(props);
  return <Slide {...props} direction="left" />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  bgMenu: {
    width: "100%",
    height: "100%",
    top: "0",
    position: "fixed",
    backgroundColor: "rgba(161, 161, 161, 0.85)",
    right: "0",
    zIndex: "-1",
  },
  bgalert: {
    // border: "1px solid red",
    backgroundColor: "black",
    height: "100%",
  },
  txtMenu: {
    color: "white",
  },
  iconMenu: {
    color: "white",
    display: "flex",
    justifyContent: "center",
  },
  sectionUser: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

export default function Navbar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [transition, setTransition] = React.useState(undefined);
  const [cartDrawer, setcartDrawer] = useState(false);
  const myaccount = useSelector((state) => state.myaccount);
  const cartList = useSelector((state) => state.cartList);
  const datacartNumber = Object.keys(cartList).length;
  const handleClick = (Transition) => () => {
    setTransition(() => Transition);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  const openCartDrawer = () => {
    setcartDrawer(true);
  };

  const [
    SignInandLoginOpenandClose,
    setSignInandLoginOpenandClose,
  ] = React.useState(false);

  const handleClickOpenSignInandLogin = () => {
    setSignInandLoginOpenandClose(true);
  };

  const handleCloseSignInandLogin = () => {
    setSignInandLoginOpenandClose(false);
  };
  return (
    <div>
      <Container maxWidth="lg" className={classes.root}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          lg={12}
        >
          <Grid item lg={5} xs={5}>
            <img src="/images/Capture.JPG" />
          </Grid>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
            lg={6}
            xs={7}
          >
            <Grid>
              <Link to="/paymentcart">
                <IconButton aria-label="cart" onClick={openCartDrawer}>
                  <StyledBadge badgeContent={datacartNumber} color="secondary">
                    <ShoppingCartIcon />
                  </StyledBadge>
                </IconButton>
              </Link>
            </Grid>
            <Grid>
              <Box className={classes.sectionUser}>
                <Avatar>
                  {myaccount.account.length >= 1 &&
                  myaccount.account[0].avatar !== "" ? (
                    <Avatar
                      alt="Remy Sharp"
                      src={myaccount.account[0].avatar}
                    />
                  ) : (
                    <AccountCircleIcon />
                  )}
                </Avatar>
                {/* <Box>Đăng Nhập | Đăng Ký</Box> */}
                {myaccount.account.length >= 1 ? (
                  <Button variant="outlined" color="primary">
                    <Link to="/my-account">
                      {myaccount.account[0].email !== undefined &&
                        myaccount.account[0].email.split("@")[0]}
                    </Link>
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleClickOpenSignInandLogin}
                  >
                    Đăng Nhập | Đăng Ký
                  </Button>
                )}
              </Box>
            </Grid>
            <Grid>
              <Button onClick={handleClick(TransitionLeft)}>
                <MenuIcon />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      {/* FROM ĐĂNG KÝ ĐĂNG NHÂP */}
      <Dialog
        open={SignInandLoginOpenandClose}
        onClose={handleCloseSignInandLogin}
        maxWidth="md"
        // fullWidth={true}
        aria-describedby="alert-dialog-description"
        aria-labelledby="customized-dialog-title"
      >
        <DialogSignInLogin />
      </Dialog>
      {/*END FROM ĐĂNG KÝ ĐĂNG NHÂP  */}
      {/* MENU */}
      <Snackbar
        open={open}
        onClose={handleClose}
        TransitionComponent={transition}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Grid xs={12}>
          <div className={classes.bgMenu}></div>
          <GridList cols={12} cellHeight={50} className={classes.bgalert}>
            <GridListTile cols={12}>
              <Typography align="right">
                <IconButton
                  aria-label="close"
                  color="inherit"
                  className={(classes.iconMenu, classes.txtMenu)}
                  onClick={handleClose}
                >
                  <CloseIcon />
                </IconButton>
              </Typography>
            </GridListTile>
            <GridListTile cols={12}>
              <Typography align="center" className={classes.txtMenu}>
                <Link to="/">Home</Link>
              </Typography>
            </GridListTile>
            <GridListTile cols={12}>
              <Typography align="center" className={classes.txtMenu}>
                <Link to="/shop"> Shop</Link>
              </Typography>
            </GridListTile>
            <GridListTile cols={12}>
              <Typography align="center" className={classes.txtMenu}>
                <Link to="/about">About Us</Link>
              </Typography>
            </GridListTile>
            <GridListTile cols={12}>
              <Typography align="center" className={classes.txtMenu}>
                <Link to="/contact">Contact</Link>
              </Typography>
            </GridListTile>
            <GridListTile cols={12} rows={5}></GridListTile>
            <GridListTile cols={12} className={classes.iconMenu}>
              <Box>
                <FacebookIcon /> <FacebookIcon /> <FacebookIcon />
                <FacebookIcon /> <FacebookIcon />
              </Box>
            </GridListTile>
          </GridList>
        </Grid>
      </Snackbar>
      {/* END MENU */}
    </div>
  );
}
