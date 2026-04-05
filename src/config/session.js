import session from "express-session";
import SequelizeStore from "connect-session-sequelize";
import sequelize from "../config/db.js";

const SequelizeStoreInit = SequelizeStore(session.Store);

const store = new SequelizeStoreInit({
  db: sequelize,
});

export const sessionMiddleware = session({
  secret: "mysecretkey",
  resave: false,
  saveUninitialized: false,
  store: store, // ✅ PERSISTENT
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60,
  },
});

store.sync();