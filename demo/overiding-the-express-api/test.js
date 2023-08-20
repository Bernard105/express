//1. The global prototypes at and .express.requestexpress.response
//2. App-specific prototypes at and .app.requestapp.response
//methods
app.response.sendStatus = function (statusCode, type, message) {
  return this.contentType(type).status(statuscode).send(message);
};

//tương đương

res.sendStatus(404, "application/json", '{"error":"resource not found"}');

//Properties
Object.defineProperty(app.request, "ip", {
  configurable: true,
  enumerable: true,
  get() {
    return this.get("Client-IP");
  },
});

//Prototype
// Use FakeRequest and FakeResponse in place of http.IncomingRequest and http.ServerResponse
// for the given app reference
Object.setPrototypeOf(
  Object.getPrototypeOf(app.request),
  FakeRequest.prototype
);
Object.setPrototypeOf(
  Object.getPrototypeOf(app.response),
  FakeResponse.prototype
);
