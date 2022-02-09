const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
// const cookieParser = require("cookie-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("welcome to form");
});

app.post("/api/sendMail", (req, res) => {
  console.log(req);
  let data = req.body;
  let smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    auth: {
      user: "toroev.ajybek@gmail.com",
      pass: "GoRGoNCiTy221",
    },
  });

  let mailOptions = {
    from: data.email,
    to: "toroev.ajybek@gmail.com",
    subject: `Message from ${data.name}`,
    html: `
        <h3>Info</h3>
        <ul>
            <li>Name: ${data.name}</li>
            <li>Email: ${data.email}</li>
        </ul>

        <h3>Message</h3>
        <p>${data.message}</p>

      `,
  };
  smtpTransport.sendMail(mailOptions, (error, res) => {
    if (error) {
      res.send(error);
    } else {
      res.send("Success");
    }
    smtpTransport.close();
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`server is started on port ${PORT}`);
});
