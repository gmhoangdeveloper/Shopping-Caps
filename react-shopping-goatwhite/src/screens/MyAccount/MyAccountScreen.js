import DateFnsUtils from "@date-io/date-fns";
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import "date-fns";
// import "date-fns";?
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AccountUserEdit, logout } from "../../actions/myaccountAction";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
// import "date-fns";
const useStyles = makeStyles((theme) => ({
  paddingrow: {
    paddingBottom: "40px",
  },
  input: {
    display: "none",
  },
}));
const MyAccountscreen = (props) => {
  const { account, loading } = useSelector((state) => state.myaccount);
  const classes = useStyles();
  const dispatch = useDispatch();
  const accountUser = account[0];
  const [selectedDate, setSelectedDate] = useState(accountUser.dateofbirth);
  const [UpdateAccount, setupdateUserAccount] = useState(accountUser);

  const handleDateChange = (date) => {
    setSelectedDate(`${date}`);
    setupdateUserAccount((prevState) => ({
      ...prevState,
      dateofbirth: `${date}`,
    }));
  };
  const handleUpdateAccount = (event) => {
    const { name, value } = event.target;
    setupdateUserAccount((prevState) => ({
      ...prevState,
      [name]: value,
      dateofbirth: selectedDate,
    }));
  };
  const handleSubmitUpdateAccount = () => {
    dispatch(AccountUserEdit(UpdateAccount));
  };
  const handleLogout = () => {
    dispatch(logout());
  };

  var loadFile = function (e) {
    // var image = document.getElementById("output");
    // image.src = URL.createObjectURL(e.target.files[0]);

    setupdateUserAccount((prevState) => ({
      ...prevState,
      avatar: e.target.files[0],
    }));
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
        <Grid lg={3} style={{ height: "400px" }}>
          <Box pr={2}>
            {account[0].email !== undefined && (
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
                <Typography>
                  {account[0].email.split("@", 1)}
                  {/* {console.log(
                    "++++++++++++sss+++eeeeeeeeee+++",
                    account[0].email.split("@",1)
                  )} */}
                </Typography>
              </Grid>
            )}
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
          <Box pl={5}>
            <Typography variant="h6" className={classes.paddingrow}>
              Thông tin tài khoản
            </Typography>
            {loading && account !== undefined && (
              <Grid lg={12} className={classes.paddingrow}>
                <Typography
                  style={{ color: "blue" }}
                  className={classes.paddingrow}
                >
                  Cập Nhập Thông Tin Thành Công
                </Typography>
              </Grid>
            )}
            {account && (
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="flex-start"
              >
                <Grid lg={5} className={classes.paddingrow}>
                  <TextField
                    label="Tên"
                    variant="outlined"
                    fullWidth={true}
                    defaultValue={UpdateAccount.firstName}
                    name="firstName"
                    onChange={handleUpdateAccount}
                  />
                </Grid>
                <Grid lg={5} className={classes.paddingrow}>
                  <TextField
                    label="Họ"
                    variant="outlined"
                    fullWidth={true}
                    defaultValue={UpdateAccount.lastName}
                    name="lastName"
                    onChange={handleUpdateAccount}
                  />
                </Grid>
                <Grid lg={12} className={classes.paddingrow}>
                  <TextField
                    label="Email"
                    defaultValue={UpdateAccount.email}
                    variant="outlined"
                    name="email"
                    onChange={handleUpdateAccount}
                    fullWidth={true}
                  />
                </Grid>
                <Grid className={classes.paddingrow}>
                  <Typography>
                    <p style={{ marginBottom: "10px" }}>Ảnh Đại Diện</p>
                    {console.log("UpdateAccount.avatar", UpdateAccount.avatar)}
                    <Grid
                      container
                      direction="row"
                      justify="flex-start"
                      alignItems="flex-end"
                    >
                      {UpdateAccount.avatar !== "" ? (
                        <Box>
                          {console.log(`-------${UpdateAccount.avatar}-----`)}
                          <img
                            src={
                              // UpdateAccount.avatar.constructor !== Object
                              Object.keys(UpdateAccount.avatar).length === 0
                                ? URL.createObjectURL(UpdateAccount.avatar)
                                : UpdateAccount.avatar
                            }
                            style={{
                              height: "80px",
                              width: "80px",
                              borderRadius: "50%",
                            }}
                          />
                        </Box>
                      ) : (
                        <Box>
                          <Avatar
                            alt="Remy Sharp"
                            src={account[0].avatar}
                            style={{ width: "80px", height: "80px" }}
                          />
                        </Box>
                      )}

                      {/* <input type="file" name="file" onChange={loadFile} /> */}
                      <Box>
                        <input
                          accept="image/*"
                          className={classes.input}
                          id="icon-button-file"
                          type="file"
                          name="file"
                          onChange={loadFile}
                        />
                        <label htmlFor="icon-button-file">
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                          >
                            <PhotoCamera />
                          </IconButton>
                        </label>
                      </Box>
                    </Grid>
                  </Typography>
                </Grid>
                <Grid lg={8}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <KeyboardDatePicker
                        margin="normal"
                        label="Date picker dialog"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid lg={6} className={classes.paddingrow}>
                  <TextField
                    id="outlined-basic"
                    label="Số điện thoại"
                    variant="outlined"
                    name="phoneNumber"
                    defaultValue={UpdateAccount.phoneNumber}
                    onChange={handleUpdateAccount}
                    fullWidth={true}
                  />
                </Grid>{" "}
                <Grid lg={5} className={classes.paddingrow}>
                  <TextField
                    id="outlined-basic"
                    label="Thành Phố"
                    variant="outlined"
                    defaultValue={UpdateAccount.address}
                    name="address"
                    onChange={handleUpdateAccount}
                  />
                </Grid>
                <Grid lg={12} className={classes.paddingrow}>
                  <TextField
                    label="Địa chỉ"
                    defaultValue={UpdateAccount.city}
                    multiline
                    rows={4}
                    name="city"
                    onChange={handleUpdateAccount}
                    // defaultValue="Default Value"
                    variant="outlined"
                    fullWidth={true}
                  />
                </Grid>
              </Grid>
            )}
            <Grid lg={12} className={classes.paddingrow}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitUpdateAccount}
              >
                Lưu Thay Đổi
              </Button>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      <Footer />
    </>
  );
};

export default MyAccountscreen;
