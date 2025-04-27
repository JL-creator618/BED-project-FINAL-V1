import express from "express";
import log from "../middleware/logMiddleware.js";
import errorHandler from "../middleware/errorHandler.js";
import "dotenv/config";
import * as Sentry from "@sentry/node";

import usersRouter from "./routes/users.js";
import amenitiesRouter from "./routes/amenities.js";
import bookingsRouter from "./routes/bookings.js";
import hostsRouter from "./routes/hosts.js";
import propertiesRouter from "./routes/properties.js";
import reviewsRouter from "./routes/reviews.js";
import loginRouter from "./routes/login.js";

const app = express();

Sentry.init({
  dsn: "https://a1dc4862de365ae068633b20c4ec8a3b@o4509141664595968.ingest.de.sentry.io/4509210441613392",

  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),

    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
// All controllers should be above the error handler
app.use(Sentry.Handlers.tracingHandler());
// The request handler must be the first middleware on the app

app.use(express.json());

app.use(log); // Middleware to log the request method and URL

//Routes
app.use("/users", usersRouter);
app.use("/amenities", amenitiesRouter);
app.use("/bookings", bookingsRouter);
app.use("/hosts", hostsRouter);
app.use("/properties", propertiesRouter);
app.use("/reviews", reviewsRouter);
app.use("/login", loginRouter);

//1. Root route
app.get("/", (req, res) => {
  res.send("Welcome to Our Booking API App!");
});
// The error handler must be before any other error middleware and after all controllers
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
  console.log("Server is available at http://localhost:3000");
});
