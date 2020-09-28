const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const postsRoute = require("./routers/posts");
const jwtfile = require("./jsonwebtoken/jsonwebtoken");
const productsRoute = require("./routers/products");
const emailRoute = require("./routers/email");
const usernameRoute = require("./routers/username");
const paymentCartRoute = require("./routers/paymentCart");

// Hình ảnh start products
const multer = require("multer");
const path = require("path");
// Hình ảnh end

const cors = require("cors");
require("dotenv/config");
//Inport Routes
app.use(cors());
app.use(bodyParser.json());
app.use("/api/posts", postsRoute);
app.use("/api/products", productsRoute);
app.use("/api/email", emailRoute);
app.use("/api/username", usernameRoute);
app.use("/api/paymentcart", paymentCartRoute);

//Hình ảnh sroudce
// storage engine

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000000,
  },
});
//Đường link thư mục
app.use("/profile", express.static("upload/images"));
app.use("/productImage", express.static("uploads/images"));
//
app.use("/avatar", express.static("uploads/images"));
app.post(
  "/upload",
  upload.fields([{ name: "profile", maxCount: 3 }]),
  (req, res) => {
    var file = req.files;
    // console.log(req)
    res.json({
      success: 1,
      profile_url1: `http://localhost:8080/profile/${file["profile"][0].filename}`,
      profile_url2: `http://localhost:8080/profile/${file["profile"][1].filename}`,
      profile_url3: `http://localhost:8080/profile/${file["profile"][2].filename}`,
    });
  }
);

app.use(errHandler);

function errHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    res.json({
      success: 0,
      message: err.message,
    });
  }
}
app.get("/", (req, res) => {
  res.send("Welcome to Daily Code Buffer in Heroku Auto Deployment!!");
});
//Code sroudce

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to db")
);
//How to we start Listening to the server
const port = process.env.PORT || "5000";
app.listen(port, () => console.log(`Server started on Port ${port}`));
