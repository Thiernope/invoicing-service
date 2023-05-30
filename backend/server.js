import express from "express";
import chalk from "chalk";
import dotenv from "dotenv";
import morgan from "morgan";
import connectionToDB from "./config/connectDB.js";
import { morganMiddleware, systemLogs } from "./utils/Logger.js";
const config = dotenv.config();

await connectionToDB();
const App = express();

App.use(express.json());
App.use(express.urlencoded({extended: false}));


if(process.env.NODE_ENV === "development") {
    App.use(morgan("dev"));
}

App.use(morganMiddleware);

App.get("/api/v1/test", (req, res)=> {
    res.json({message: "Welcome to my invoice app"});
})

const PORT = process.env.PORT || 4000;

App.listen(PORT, () => {
console.log(`${chalk.green.bold("✓")} App running on port ${chalk.blue.bold(`${PORT}`)} and on ${chalk.yellow.bold(`${process.env.NODE_ENV}`)}`)
systemLogs.info(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
);
});