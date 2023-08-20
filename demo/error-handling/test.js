"use strict";
const express = require("express");
const app = express();

//Lỗi xảy ra trong mã đồng bộ bên trong trình xử lý tuyến và phần mềm trung gian không yêu cầu làm thêm.Nếu mã đồng bộ gây ra lỗi, thì Express sẽ bắt và xử lý nó
app.get("/", (req, res) => {
  throw new Error("Broken"); //Express sẽ bắt lỗi
});

//Đối với các lỗi được trả về từ các hàm không đồng bộ được gọi bởi các trình xử lý tuyến và phần mềm trung gian, bạn phải chuyển chúng đến hàm, nơi Express sẽ bắt và chế biến chúng. Chẳng hạn:next()
app.get("/", (req, res, next) => {
  fs.readFile("/file-does-not-exist", (err, data) => {
    if (err) {
      next(err); // Pass errors to Express.
    } else {
      res.send(data);
    }
  });
});

//Bắt đầu với Express 5, trình xử lý tuyến đường và phần mềm trung gian trả về Lời hứa sẽ gọi tự động khi họ từ chối hoặc ném lỗi. Chẳng hạn:next(value)
app.get("/users/:id", async (req, res, next) => {
  const users = await getUserById(req.params.id);
  res.send(user);
});

//Nếu callback theo trình tự không cung cấp dữ liệu, chỉ có lỗi, bạn có thể đơn giản hóa mã này như sau:
app.get("/", [
  function (req, res, next) {
    fs.writeFile("/inaccessible-path", "data", next);
  },
  function (req, res) {
    res.send("OK"); //Trong ví dụ trên được cung cấp dưới dạng callback cho , được gọi là có hoặc không có lỗi. Nếu không có lỗi thứ hai trình xử lý được thực thi, nếu không Express sẽ bắt và xử lý lỗi.nextfs.writeFile
  },
]);

//Bạn phải bắt lỗi xảy ra trong mã không đồng bộ được gọi bởi trình xử lý tuyến hoặc phần mềm trung gian và chuyển chúng cho Express để xử lý. Chẳng hạn:

app.get("/", (req, res, next) => {
  setTimeout(() => {
    try {
      throw new Error("BROKEN");
    } catch (err) {
      next(err);
    }
  }, 100); //Ví dụ trên sử dụng một khối để bắt lỗi trong mã không đồng bộ và chuyển chúng đến Express. Nếu khối bị bỏ qua, Express sẽ không bắt lỗi vì nó không phải là một phần của đồng bộ mã xử lý.try...catch
});

//Use promises to avoid the overhead of the block or when using functions that return promises. For example:try...catch
app.get("/", (req, res) => {
  Promise.resolve()
    .then(() => {
      throw new Error("BROKEN");
    })
    .catch(next); //Vì lời hứa tự động bắt cả lỗi đồng bộ và lời hứa bị từ chối, bạn có thể chỉ cần cung cấp làm trình xử lý bắt cuối cùng và Express sẽ bắt lỗi, Bởi vì trình xử lý bắt được đưa ra lỗi là đối số đầu tiên.next
});

//Bạn cũng có thể sử dụng một chuỗi các trình xử lý để dựa vào lỗi đồng bộ bắt, bằng cách giảm mã không đồng bộ thành một cái gì đó không đáng kể. Chẳng hạn:
app.get("/", [
  function (req, res, next) {
    fs.readFile("/maybe-valid-file", "utf-8", (err, data) => {
      res.locals.data = data;
      next(err);
    });
  },
  function (req, res) {
    res.locals.data = res.locals.data.split(",")[1];
    res.send(res.locals.data);
  },
]);

//The default error handler
//khi bạn thêm một trình xử lý lỗi tùy chỉnh, bạn phải ủy quyền cho trình xử lý lỗi Express mặc định, khi các tiêu đề đã được gửi đến khách hàng:
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render("error", { error: err });
}

//Writing error handlers
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const bodyParser = require("body-parser");
const methodOverride = require("method-override");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());
app.use(methodOverride());
app.use((err, req, res, next) => {});
// app.use(logErrors);
// app.use(clientErrorHandler);
// app.use(errorHandler);
// function logErrors(err, req, res, next) {
//   console.log(err.stack);
//   next(err);
// }

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: "Something failed!" });
  } else {
    next(err);
  }
}

//Thực hiện chức năng "catch-all" như sau (ví dụ:errorHandler
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render("error", { error: err });
}

//Nếu bạn có một trình xử lý route với nhiều hàm callback, bạn có thể sử dụng tham số để chuyển sang route handler tiếp theo.
app.get(
  "/a_route_behind_paywall",
  (req, res, next) => {
    if (!req.user.hasPaid) {
      next("route");
    } else {
      next();
    }
  },
  (req, res, next) => {
    PaidContent.find((err, doc) => {
      if (err) return next(err);
      res.json(doc);
    });
  }
);
