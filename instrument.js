// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node";

const Sentry = require("@sentry/node");

Sentry.init({
  dsn: "https://a1dc4862de365ae068633b20c4ec8a3b@o4509141664595968.ingest.de.sentry.io/4509210441613392",

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});
