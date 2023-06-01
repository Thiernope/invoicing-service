import express from "express";
import chalk from "chalk";
import dotenv from "dotenv";
import morgan from "morgan";
import connectionToDB from "./config/connectDB.js";
import { morganMiddleware, systemLogs } from "./utils/Logger.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import mongoSanize from "express-mongo-sanitize";
import authRoutes from "../backend/route/authRoutes.js"
import userRoutes from "../backend/route/userRoutes.js";
const config = dotenv.config();

await connectionToDB();
const App = express();

App.use(express.json());
App.use(express.urlencoded({extended: false}));
App.use(cookieParser());
App.use(mongoSanize());

if(process.env.NODE_ENV === "development") {
    App.use(morgan("dev"));
}

App.use(morganMiddleware);

App.get("/api/v1/test", (req, res)=> {
    res.json({message: "Welcome to my invoice app"});
})

App.use("/api/v1/auth", authRoutes);
App.use("/api/v1/user", userRoutes);

App.use(notFound);
App.use(errorHandler);

const PORT = process.env.PORT || 4000;

App.listen(PORT, () => {
console.log(`${chalk.green.bold("✓")} App running on port ${chalk.blue.bold(`${PORT}`)} and on ${chalk.yellow.bold(`${process.env.NODE_ENV}`)}`)
systemLogs.info(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
);
});