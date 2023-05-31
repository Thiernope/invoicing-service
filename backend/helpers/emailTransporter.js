import "dotenv/config";
import nodemailer from "nodemailer";

let transporter;

if(process.env.NODE_ENV === "developement") {
    transporter = nodemailer.createTransport({
        host: "mailhog",
        port: 1025
    })
} else {
    //To do later whne working for production
}

export default transporter;