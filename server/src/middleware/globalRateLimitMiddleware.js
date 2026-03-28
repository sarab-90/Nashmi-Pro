import rateLimit from "express-rate-limit";

export const globalRateLimitMiddleware = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 500, // limit each IP to 500 requests per windowMs
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after an hour.",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
