const express = require("express");
const app = express();

//hàm middleware k có đường dẫn. hàm thực thi khi có yêu cầu
app.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});

//hàm middleware có đường dẫn. thực thi các yêu cầu https
app.use("/user/:id", (req, res, next) => {
  console.log("Request Type:", req.method);
  next();
});

//middleware system.Hàm xử lý các yêu cầu GET đến đường dẫn./user/:id
app.get("/user/:id", (req, res, next) => {
  res.send("USER");
});

//middleware in thông tin yêu cầu cho bất kỳ loại yêu cầu HTTP nào đến đường dẫn./user/:id
app.use(
  "/user/:id",
  (req, res, next) => {
    console.log("Request URL:", req.originalUrl);
    next();
  },
  (req, res, next) => {
    console.log("Request Type:", req.method);
    next();
  }
);

//middleware xử lý các yêu cầu GET đến đường dẫn./user/:id
app.get(
  "/user/:id",
  (req, res, next) => {
    console.log("ID:", req.params.id);
    next();
  },
  (req, res, next) => {
    res.send("User Info");
  }
);
app.get("/user/:id", (req, res, next) => {
  //Trình xử lý tuyến đường cho phép bạn xác định nhiều tuyến đường cho một đường dẫn. Ví dụ dưới đây xác định hai tuyến cho các yêu cầu GET đến đường dẫn. Tuyến thứ hai sẽ không gây ra bất kỳ vấn đề nào, nhưng nó sẽ không bao giờ được gọi vì tuyến đầu tiên kết thúc chu kỳ yêu cầu-phản hồi./user/:id
  res.send(req.params.id);
});

//To skip the rest of the middleware functions from a router middleware stack, call to pass control to the next route. NOTE: will work only in middleware functions that were loaded by using the or functions.next('route')next('route')app.METHOD()router.METHOD()
app.get(
  "/user/:id",
  (req, res, next) => {
    if (req.params.id === "0") next("route");
    else next();
  },
  (req, res, next) => {
    res.send("regular");
  }
);

app.get("/user/:id", (req, res, next) => {
  res.send("special");
});

//Middleware can also be declared in an array for reusability.
function logOriginalUrl(req, res, next) {
  console.log("Request URL:", req.originalUrl);
}

function logMethod(req, res, next) {
  console.log("Request Type:", req.method);
}

const logStuff = [logOriginalUrl, logMethod];

app.get("/user/:id", logStuff, (req, res, next) => {
  res.send("User Info");
});
