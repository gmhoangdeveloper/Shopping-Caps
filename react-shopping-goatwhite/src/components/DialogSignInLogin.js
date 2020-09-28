import {
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  makeStyles,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  registrationEmail,
  loginEmail,
  loginGoogle,
} from "../actions/signupforloginAction";
import CustomizedSnackbars from "./Alert";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import FacebookIcon from "@material-ui/icons/Facebook";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
function DialogSignInLogin(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const signupforlogin = useSelector((state) => state.signupforlogin);
  const alertReducer = useSelector((state) => state.alertReducer);
  const [emailRegistration, setemailRegistration] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    city: "",
    avatar: "",
    dateofbirth: "0",
  });
  function randomPassword(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  const handleChangeRegistration = (e) => {
    const { name, value } = e.target;
    setemailRegistration((prevState) => ({
      ...prevState,
      [name]: value,
      password: randomPassword(10),
    }));
  };
  const [login, setlogin] = useState({
    emaillogin: "",
    passwordlogin: "",
  });
  const submitregistration = () => {
    console.log(emailRegistration);
    dispatch(registrationEmail(emailRegistration));
  };
  //   Login

  const handleChangelogin = (e) => {
    const { name, value } = e.target;
    setlogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const submitlogin = () => {
    // console.log(login, "Login");
    dispatch(loginEmail(login));
  };
  const handleCloseBackdrop = () => {
    // setOpen(false);
  };
  const loginSuccessGoogle = (respone) => {
    if (respone) {
      const profileObjgoogle = {
        ...emailRegistration,
        email: respone.profileObj.email,
        firstName: respone.profileObj.givenName,
        lastName: respone.profileObj.familyName,
        avatar: respone.profileObj.imageUrl,
      };
      console.log(respone, "--------", profileObjgoogle);
      dispatch(loginGoogle(profileObjgoogle));
      /**
       * profileObj:
email: "giangminhhoang999@gmail.com"
familyName: "Minh"
givenName: "Hoang"
googleId: "105728887916412513021"
imageUrl: "https://lh3.googleusercontent.com/a-/AOh14GhJOWV6NQsK9SP9gdHtmbk11qiJzJG09Nb0Enfoig=s96-c"
name: "Hoang Minh"
       */
    }
  };
  const loginSuccessFacebook = (response) => {
    if (response) {
      const profileObjgoogle = {
        ...emailRegistration,
        email: response.email,
        firstName: response.name,

        avatar: response.picture.data.url,
      };
      console.log(response, "--------", profileObjgoogle);
      dispatch(loginGoogle(profileObjgoogle));
    }
    // console.log(response);
    /*accessToken: "EAAEuTONsoGQBAEJhfdIGwITTVy2NgZCl96fhZBpJEOLGb8lfR35W071aw2DA2C1hz4pJwveBpvfMfI0IAx7FwEWdgObFZA21e3xZAX5ZAsCOxeEI0WBq1bqy4o6V5u0UjgvZByMHTHxDwPyZAUMZCiGZAPE7j6cXYZAYCRXsdcKBKFe4RizLVtta90VPcPRxOiZBx0F0yoQ1YqkfgZDZD"
data_access_expiration_time: 1609018215
email: "giangminhhoang999@gmail.com"
expiresIn: 5385
graphDomain: "facebook"
id: "1665589066949287"
name: "Giang Minh Hoàng"
picture:
data:
height: 50
is_silhouette: false
url: "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1665589066949287&height=50&width=50&ext=1603834216&hash=AeRA-Zh0gwAprRXF"
width: 50
__proto__: Object
__proto__: Object
signedRequest: "1XPdxhvPSKPoUbIextPRtqfsqntaIzSjKabGtG3Kg4U.eyJ1c2VyX2lkIjoiMTY2NTU4OTA2Njk0OTI4NyIsImNvZGUiOiJBUUIwcUhVR2N0clBucGZrSTZoUVFmZk1Wc3o4c01CNF9MN3NmQW12Sko4WkdIOW9QQ1JEaGhhMWFzTHlRaXNoU0J1S3RBS1ZLRVVSMWNkcFk4Tmg0OV9ZeEp3QlBHWG8zSkxnTkp4RVJYaE5PSm5iZXBYSXl2MTI4eUxqTTJjbi11TUVCZW8wem9UcEFpdVZqWE8yZlA5V1AtdTdJeTBvU1hCc0pjeEdKMUJJN1J4cUFtWlBnYXJGSFppM0YtQjFuajFWcmlUUjBINkVVMFBoX2ZpdFJTQUFHR2xNMUNzNXNTTjA2aksxZDNYMG1PUkxWRm43TE1xeTZEWmNtcGd3UDBUdElZbWdRMFl0WGRnVnNfcHRWRXVaRm4yemlkS2o5RjQzZzlzQkFIMGxFQ3J4TG45U3BRc2hndElSMGd5SC1GelR2MWdtOURxLVpUMm1JSUNPQUpTcSIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNjAxMjQyMjE1fQ"
userID: "1665589066949287" */
  };
  return (
    <DialogContent>
      <Backdrop
        className={classes.backdrop}
        open={signupforlogin.loading}
        onClick={handleCloseBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <CustomizedSnackbars alertOpenandClose={alertReducer.loading}>
        Tài khoản email đã được đăng ký
      </CustomizedSnackbars>{" "}
      <CustomizedSnackbars alertOpenandClose={alertReducer.loadingFailPassword}>
        Mật khẩu Tài khoản Email Không tồn tại
      </CustomizedSnackbars>
      <Grid container lg={12}>
        <Grid item lg={6}>
          <Typography variant="h6" color="initial">
            Đăng Nhập
          </Typography>
          <Typography>Tên tài khoản hoặc địa chỉ email *</Typography>
          <TextField
            required
            label="UserName or Email"
            name="emaillogin"
            onChange={handleChangelogin}
          />
          <Typography>Mật khẩu *</Typography>
          <TextField
            label="Password"
            type="password"
            name="passwordlogin"
            autoComplete="current-password"
            onChange={handleChangelogin}
          />
          <Typography>Login with your Social ID</Typography>
          <FacebookLogin
            appId="332382744649828"
            autoLoad={false}
            fields="name,email,picture"
            // onClick={responseFacebook}
            callback={loginSuccessFacebook}
            size="small"
            textButton=""
            icon={<FacebookIcon />}
          />
          <GoogleLogin
            clientId="826712529309-nhqe5u0q901g9qshm8l3m3b8c1oug2c9.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={loginSuccessGoogle}
            // onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
          <RadioGroup
            aria-label="gender"
            name="gender1"
            // value={value}
            // onChange={handleChange}
          >
            <FormControlLabel
              // value="female"
              control={<Radio />}
              label="Ghi Nhớ Đăng Nhập"
            />
          </RadioGroup>
          <Button variant="contained" color="primary" onClick={submitlogin}>
            Đăng nhập
          </Button>
          <Typography>
            <Link>Quên Mật Khẩu</Link>
          </Typography>
        </Grid>
        <Grid item lg={6}>
          <Typography variant="h6" color="initial">
            Đăng ký
          </Typography>
          <Typography>Địa Chỉ Email</Typography>
          <TextField
            required
            id="standard-required"
            label="Email"
            name="email"
            onChange={handleChangeRegistration}
          />
          <Typography>
            Một mật khẩu sẽ được gửi đến địa chỉ email của bạn.
          </Typography>
          <Typography>
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our <Link>chính sách riêng tư</Link>.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={submitregistration}
          >
            Đăng ký
          </Button>
        </Grid>
      </Grid>
    </DialogContent>
  );
}

export default DialogSignInLogin;
