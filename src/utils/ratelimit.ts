const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 250, // limit each IP to 250 requests per windowMs
  message: "Too many requests, please try again later.",
  standardizeError: true,
  legacyBehavior: false,
});

export default limiter;