import { Box, Button, Grid, Typography, Avatar } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UserOrderCart, logout } from "../../actions/myaccountAction";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import RowTableOrder from "../../components/RowTableOrder";
import Pagination from "@material-ui/lab/Pagination";
const useStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
    paddingrow: {
      paddingBottom: "40px",
    },
  },
});
const OrdersScreen = (props) => {
  const classes = useStyles();
  const [state, setstate] = useState();
  const dispatch = useDispatch();
  const { account, userordercart } = useSelector((state) => state.myaccount);

  const pagination = () => {
    if (userordercart !== undefined) {
      // console.log(userordercart);
      // const _total_page = userordercart.headers["x-total-count"];
      // //.headers.link x-total-count
      // var totalPages = Math.ceil(_total_page / 5);
      // console.log(totalPages);

      return (
        <Pagination
          count={userordercart.totalPages}
          onChange={handleChangePagination}
          showFirstButton
          showLastButton
          size="large"
        />
      );
    }
  };
  //message=Success
  useEffect(() => {
    if (account.length >= 1) {
      dispatch(UserOrderCart(account[0].email));
    }
  }, []);
  const handleLogout = () => {
    dispatch(logout());
  };
  const [page, setPage] = React.useState(1);
  const handleChangePagination = (event, value) => {
    // setPage(value);
    if (account.length >= 1) {
      dispatch(UserOrderCart(account[0].email, value));
    }
    // console.log("handleChangePagination", value);
  };
  return (
    <>
      <Navbar />

      <Grid
        lg={10}
        style={{ margin: "auto" }}
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
      >
        <Grid lg={3} style={{ height: "400px" }}>
          <Box pr={2}>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
              className={classes.paddingrow}
            >
              <Avatar
                alt="Remy Sharp"
                src={account[0].avatar}
                style={{ width: "80px", height: "80px" }}
              />
              <Typography> {account[0].email.split("@", 1)}</Typography>
            </Grid>
            <Typography variant="h6" color="initial" align="right">
              <Button variant="outlined" fullWidth={true}>
                <Link to="/my-account">Thông tin tài khoản</Link>
              </Button>
            </Typography>
            <Typography variant="h6" color="initial" align="right">
              <Button variant="outlined" fullWidth={true}>
                <Link to="/my-account/edit-password">Thay Đổi Mật Khẩu</Link>
              </Button>
            </Typography>
            <Typography variant="h6" color="initial" align="right">
              <Button variant="outlined" fullWidth={true}>
                <Link to="/my-account/orders">Đơn hàng</Link>
              </Button>
            </Typography>
            <Typography variant="h6" color="initial" align="right">
              <Button
                variant="outlined"
                fullWidth={true}
                onClick={handleLogout}
              >
                Đăng Xuất
              </Button>
            </Typography>
          </Box>
        </Grid>
        <Grid lg={9}>
          <Typography variant="h6" className={classes.paddingrow}>
            Thông tin Đơn Hàng
          </Typography>
          <Box>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Mã Đơn Hàng</TableCell>
                    <TableCell align="right">
                      {/* {new Date(dataodercart.date).toDateString()}
                       */}
                      Ngày
                    </TableCell>
                    <TableCell align="right">Tình Trạng</TableCell>
                    <TableCell align="right">Thanh Toán</TableCell>
                    <TableCell align="right">Tổng</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userordercart !== undefined &&
                    userordercart.docs.map((dataodercart, key) => (
                      <RowTableOrder row={dataodercart} key={dataodercart.id} />
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            {userordercart === undefined && (
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Box mt={8}>
                  <Button variant="contained" color="primary">
                    <Link to="/shop" style={{ color: "white" }}>
                      Đi đến trang mua hàng
                    </Link>
                  </Button>
                </Box>
              </Grid>
            )}
          </Box>
          <Grid container direction="row" justify="center" alignItems="center">
            <Box p={4}> {pagination()}</Box>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default OrdersScreen;
