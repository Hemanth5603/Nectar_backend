require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const userAuthRouter = require("./routes/User/userAuthRouter");
const adminRouter = require("./routes/Admin/adminRoute");
const adminUser = require("./routes/Admin/user");
const diaryRouter = require("./routes/User/diaryRoute");
const photoRoute = require("./routes/User/photoRoute");
const albumRoute = require("./routes/User/albumRoute");
const userRoutes = require("./routes/User/userRoute");
const plansRouter = require("./routes/Plans/plansRouter");
const questionsRouter = require("./routes/User/questionsRouter");
const userMatchRouter = require("./routes/User/userMatchRouter");
const userActivityRouter = require("./routes/User/realTimeActivityRoute");
const userLikeAndMatchRouter = require("./routes/User/userLikeAndMatchRouter");
const communityQuestionRouter = require("./routes/User/communityQuestionRouter");
const bodyParser = require("body-parser");

const blogRouter = require("./routes/Admin/blogRouter");
const notificationsRouter = require("./routes/Admin/notificationsRouter");

const adminUserRouters = require("./routes/Admin/adminUserRouters");
const adminMedia = require("./routes/media/adminProfileRoute");
const userMedia = require("./routes/User/userMediaRoute");
const transactionRouter = require("./routes/User/transactionRouter");

const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerJSDocs = YAML.load("./api.yaml");

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));
// app.use(cookieParser());
const DB = process.env.DATABASE;
mongoose
  .connect(
    "mongodb+srv://demodata:123@cluster0.p5xvkx8.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("DB connection successful!"))
  .catch((e) => {
    console.log(`SomeThing went wrong with DataBase. and the error is =  ${e}`);
  });

app.use(bodyParser.json());
app.use(bodyParser.text());

// app.get("/", (req, res) => res.send("<h1>Server is running</h1>"));
// admin router
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/admin/user", adminUser);
app.use("/api/v1/admin/user", adminUserRouters);
app.use("/api/v1/admin/blog", blogRouter);
app.use("/api/v1/admin/notifications", notificationsRouter);

// user Router
app.use("/api/v1/users", userAuthRouter);
app.use("/api/v1/users", diaryRouter);
app.use("/api/v1/users", photoRoute);
app.use("/api/v1/users", albumRoute);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/users", transactionRouter);

// user questionsRouter
app.use("/api/v1/users", questionsRouter);

// user userMatchRouter
app.use("/api/v1/users", userMatchRouter);

// Media Router
app.use("/api/v1/user-media", userMedia);
app.use("/api/v1/media", adminMedia);

// Plans Router
app.use("/api/v1/plans", plansRouter);

// User Activity Router
app.use("/api/v1/activity", userActivityRouter);

app.use("/api/v1/users/new", userLikeAndMatchRouter);
app.use("/api/v1/users/", communityQuestionRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("*", (req, res) => {
  res.status(404).json({
    status: "success",
    message: "Url not found",
  });
});
app.post("*", (req, res) => {
  // console.log(req);
  res.status(404).json({
    status: "success",
    message: "Url not found",
  });
});

const port = process.env.PORT || 8081;

app.listen(port, () => console.log(`Server is running on port ${port}!`));
