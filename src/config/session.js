import session from "express-session";

export const sessionMiddleware = session({
  secret: "super_secret_key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // true in production (https)
    maxAge: 1000 * 60 * 60 // 1 hour
  }
});