import nodemailer from "nodemailer";
import { EMAILAPPKEY, EMAILHOST } from "./constant.js";
export const notify = async (params) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      // user: "shresthaaashish84@gmail.com",
      // pass: "plej proe xcgk qbau",
      user: EMAILHOST,
      pass: EMAILAPPKEY,
    },
  });

  transporter
    .sendMail({
      from: '"MoonGazer" <no-reply.moongazer.com.uk>', // sender address
      to: params?.send_to, // list of receivers
      subject: params?.subject, // Subject line
      //   text: "Hello world?", // plain text body
      cc: params?.email_cc,
      html: params?.body, // html body
    })
    .then((res) => {
      console.log("email success message:  ", JSON.stringify(res));
    })
    .catch((err) => {
      console.log("email error message:  ", JSON.stringify(err));
    });
};
