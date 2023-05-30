import chalk from "chalk";
import { systemLogs } from "../utils/Logger.js";
import mongoose from "mongoose";

const connectionToDB = async () => {
    try {
        const connectionParams = {
            dbName: process.env.DB_NAME
        }
        
        const connect = await mongoose.connect(
            process.env.MONGO_URI,
            connectionParams
        );

        console.log(`${chalk.green.bold(`MongoDB Connected: ${connect.connection.host}`)}`)
        systemLogs.info(`${chalk.green.bold(`MongoDB Connected: ${connect.connection.host}`)}`)
    } catch (error) {
        console.log(`${chalk.red.bold(`Error: ${error.message}`)}`)
        process.exit(1);
    }
}

export default connectionToDB;