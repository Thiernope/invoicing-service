import express from "express";
import chalk from "chalk";
import dotenv from "dotenv";
import morgan from "morgan";
const config = dotenv.config();

const App = express();

App.use(express.json());
App.use(express.urlencoded({extended: false}));


if(process.env.NODE_ENV === "development") {
    App.use(morgan("dev"));
}

App.get("/api/v1/test", (req, res)=> {
    res.json({message: "Welcome to my invoice app"});
})

const PORT = process.env.PORT || 4000;

App.listen(PORT, () => console.log(`${chalk.green.bold("✓")} App running on port ${chalk.blue.bold(`${PORT}`)} and on ${chalk.yellow.bold(`${process.env.NODE_ENV}`)}`));