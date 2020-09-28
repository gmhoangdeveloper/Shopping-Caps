import {
  Box,
  Grid,
  GridList,
  GridListTile,
  Paper,
  TableCell,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { oderDetail, updateStatusCart } from "../actions/checkoutcartAction";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const useStyles = makeStyles((theme) => ({}));
export default function OrderDetailsScreen(props) {
  const paymentCart = useSelector((state) => state.paymentCart);
  const { orderDetail } = paymentCart;
  // console.log("orderDetail.dosc", paymentCart);
  const { id, date } = props.match.params;
  const classes = useStyles();
  const dispatch = useDispatch();
  console.log("props", paymentCart);
  /*Thanh toán thành công momo*/
  const string = props.location.search;
  const substring = "message=Success";
  //   if (Object.keys(orderDetail).length > 1) {
  //     if (string.includes(substring)) {
  //       const updateStatus = { ...orderDetail, status: "Đang xử lý" };
  //       console.log("kkkkkkkkkk", string.includes(substring), updateStatus);
  //       dispatch(updateStatusCart(id, updateStatus));
  //     }
  //   }
  const test = () => {
    console.log("one two three");
  };
  /*END Thanh toán thành công momo*/
  //   console.log(id, orderDetail);
  const subtotalTamTinh = () => {
    var subtotalTamTinh = 0;
    if (orderDetail !== undefined) {
      for (var i = 0; i < orderDetail.productCart.length; i++) {
        subtotalTamTinh +=
          orderDetail.productCart[i].quantity *
          orderDetail.productCart[i].price;
      }
      return (
        <TableCell align="right" id="subtotalTamTinh">
          {subtotalTamTinh} VNĐ
        </TableCell>
      );
    }
  };
  useEffect(() => {
    if (string.includes(substring)) {
      const updateStatus = "Đang xử lý";
      dispatch(oderDetail(id, updateStatus));
      console.log("Câp nhap")
    } else {console.log("Không Câp nhap")
      dispatch(oderDetail(id));
    }
  }, []);

  return (
    <>
      {" "}
      <Navbar />
      {Object.keys(orderDetail).length > 1 && (
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
          lg={10}
          style={{
            height: "620px",
            margin: "40px auto auto auto",
          }}
        >
          {test()}
          <Grid lg={7} style={{ height: "550px" }}>
            <Typography variant="h5">Chi tiết đơn hàng</Typography>
            <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Sản Phẩm</TableCell>
                    <TableCell align="right">Tạm Tính</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderDetail.productCart.map((cart, key) => {
                    return (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          {cart.title}x{cart.quantity}
                        </TableCell>
                        <TableCell align="right">
                          {cart.price * cart.quantity} VNĐ
                        </TableCell>
                      </TableRow>
                    );
                  })}

                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ fontWeight: "bold" }}
                    >
                      Tổng số phụ
                    </TableCell>
                    {subtotalTamTinh()}
                  </TableRow>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ fontWeight: "bold" }}
                    >
                      Giao Hàng
                    </TableCell>
                    <TableCell align="right">FREE SHIP</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ fontWeight: "bold" }}
                    >
                      Phương Thức Thanh toán
                    </TableCell>
                    <TableCell align="right">{orderDetail.payment}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ fontWeight: "bold" }}
                    >
                      Tổng
                    </TableCell>
                    {subtotalTamTinh()}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="h5" paragraph={true}>
              Địa Chỉ Thanh Toán
            </Typography>
            <Grid
              container
              lg={12}
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
            >
              <GridList>
                <GridListTile cols={2}>
                  <Typography>
                    {orderDetail.lastName}
                    {" " + orderDetail.firstName}
                  </Typography>
                  <Typography>{orderDetail.address}</Typography>
                  <Typography>{orderDetail.city}</Typography>
                  <Typography>{orderDetail.phoneNumber}</Typography>
                  <Typography>{orderDetail.email}</Typography>
                  <Typography>{orderDetail.note}</Typography>
                </GridListTile>
              </GridList>
            </Grid>
          </Grid>
          <Grid lg={4}>
            <Paper elevation={3}>
              <Box p={2}>
                <Typography variant="h5" paragraph={true}>
                  Đơn Hàng Của Bạn
                </Typography>
                {orderDetail.status === "Tạm Giữ" &&
                  orderDetail.orderPayment === "Thanh toán khi nhận hàng" && (
                    <Typography paragraph={true} style={{ color: "green" }}>
                      Cảm Ơn Bạn Bạn Chúng tôi sẽ liên hệ để xác nhận
                    </Typography>
                  )}
                {orderDetail.status === "Đang xử lý" &&
                  orderDetail.orderPayment === "Thanh toán ví điện tử Momo" && (
                    <Typography paragraph={true} style={{ color: "green" }}>
                      Cảm Ơn Bạn Bạn Đã Thanh Toán thành Công
                    </Typography>
                  )}
                {orderDetail.status === "Tạm Giữ" &&
                  orderDetail.orderPayment === "Thanh toán ví điện tử Momo" && (
                    <Typography paragraph={true} style={{ color: "red" }}>
                      Thanh toán không thành công
                    </Typography>
                  )}
                <Typography paragraph={true}>
                  Mã đơn hàng: {orderDetail.codeorders}
                </Typography>
                <Typography paragraph={true}>
                  Date: {new Date(orderDetail.date).toDateString()}
                </Typography>
                <Typography paragraph={true}>
                  Email: {orderDetail.email}
                </Typography>
                <Typography paragraph={true}>
                  Tổng cộng: {orderDetail.subtotalCart}
                </Typography>
                <Typography paragraph={true}>
                  Phương Thức Thanh Toán: {orderDetail.orderPayment}
                </Typography>{" "}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}
      <Footer />
    </>
  );
}
