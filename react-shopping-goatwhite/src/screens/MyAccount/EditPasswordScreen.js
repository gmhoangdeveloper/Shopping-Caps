import {
  Container,
  Grid,
  GridList,
  Button,
  GridListTile,
  Typography,
  Box,
  TextField,
  Avatar,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { AccountUserEdit, logout } from "../../actions/myaccountAction";
const useStyles = makeStyles((theme) => ({
  paddingrow: {
    paddingBottom: "40px",
  },
}));
function EditAddressScreen(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.myaccount);
  const accountUser = account[0];

  const [UpdateAccountPassword, setUpdateAccountPassword] = useState({
    currentpassword: "",
    newpassword: "",
    confirmnewpassword: "",
  });
  const [WrongPassword, setWrongPassword] = useState({
    wrongPassword: false,
    successPassword: false,
  });
  const handleUpdateAccount = (event) => {
    const { name, value } = event.target;
    console.log("name,value", name, value);

    setUpdateAccountPassword((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmitUpdateAccount = () => {
    if (
      UpdateAccountPassword.newpassword ===
        UpdateAccountPassword.confirmnewpassword &&
      accountUser.password === UpdateAccountPassword.currentpassword
    ) {
      setWrongPassword({
        wrongPassword: false,
        successPassword: true,
      });
      const newPasswordUser = {
        ...accountUser,
        password: UpdateAccountPassword.newpassword,
      };
      dispatch(AccountUserEdit(newPasswordUser));
    } else {
      setWrongPassword({
        wrongPassword: true,
        successPassword: false,
      });
    }
  };
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <Navbar />
      <Grid
        lg={10}
        style={{ margin: "auto" }}
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid lg={3}>
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
            <Button variant="outlined" fullWidth={true} onClick={handleLogout}>
              Đăng Xuất
            </Button>
          </Typography>
        </Grid>
        <Grid lg={9}>
          <Box pl={5} pt={1}>
            <Typography variant="h6" className={classes.paddingrow}>
              Thông tin sửa địa chỉ
            </Typography>

            {WrongPassword.wrongPassword && (
              <p style={{ color: "red", marginBottom: "20px" }}>
                Vui lòng kiểm tra lại Mật Khẩu
              </p>
            )}
            {WrongPassword.successPassword && (
              <p style={{ color: "blue", marginBottom: "20px" }}>
                Thay đổi mật khẩu thành công
              </p>
            )}

            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="flex-start"
              lg={12}
            >
              <Grid lg={12} className={classes.paddingrow}>
                <TextField
                  label="Mật khẩu hiện tại (bỏ trống nếu không đổi)"
                  variant="outlined"
                  fullWidth={true}
                  name="currentpassword"
                  onChange={handleUpdateAccount}
                  // defaultValue={UpdateAccount.password}
                />
              </Grid>
              <Grid lg={12} className={classes.paddingrow}>
                <TextField
                  id="outlined-basic"
                  label="Mật khẩu mới (bỏ trống nếu không đổi)"
                  variant="outlined"
                  name="newpassword"
                  fullWidth={true}
                  onChange={handleUpdateAccount}
                />
              </Grid>
              <Grid lg={12} className={classes.paddingrow}>
                <TextField
                  label="Xác nhận mật khẩu mới"
                  variant="outlined"
                  name="confirmnewpassword"
                  fullWidth={true}
                  onChange={handleUpdateAccount}
                />
              </Grid>
              <Grid lg={12} className={classes.paddingrow}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmitUpdateAccount}
                >
                  Lưu Thay Đổi
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default EditAddressScreen;
