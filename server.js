import express, { response, text } from "express";
import mysql from "mysql";
import cors from "cors";
import http, { request } from "http";
import multer from "multer";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
// import { jwt_secret } from "./env.js";

import { v4 as uuidv4 } from 'uuid';
import { createHash } from 'crypto';



import { ExpressValidator, check, validationResult } from "express-validator";

import { format, parseISO } from 'date-fns';
import cron from 'node-cron';

import bcrypt from "bcrypt";
import mysql2 from "mysql2";
import XLSX from "xlsx";
import { send } from "process";




const app = express();

const server = http.createServer(app);


app.use(cors({
  credentials: true,
  origin: "*"
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// const connection = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "samanta@123",
//   database: "janmadinamdatabase",
//   port: "3306"
// });


const connection = mysql.createPool({
  host: "15.206.228.72",
  user: "admin",
  password: "CEVvDUTX88BY",
  database: "shubadinam_db",
  connectTimeout: 120000,
  acquireTimeout: 120000,
  connectionLimit: 10, // Set your desired maximum connection limit
  queueLimit: 100,     // Set your desired queue limit
  waitForConnections: true, // Enable this to wait for connections when the pool is full
  port: 3306
});

connection.getConnection((error) => {
  if (error) {
    throw error;
    // console.log(error);
  } else {
    console.log("Mysql connection connected successfully");
    // connection.release();
  }
});



const transporter = nodemailer.createTransport({

  // host: "smtpout.secureserver.net", // hostname
  // // host: "outlook.com",
  // secureConnection: false, // TLS requires secureConnection to be false
  // port: 465, // port for secure SMTP
  // auth: {
  //   user: "noreply@shubadinam.com",
  //   pass: "SamcomPEmail@161023"
  // },
  // tls: {
  //   ciphers: 'SSLv3',
  //   rejectUnauthorized: false
  // }


  service: 'Gmail', // Replace with your email service provider, or use custom SMTP settings
  tls: {
    rejectUnauthorized: false
  },
  auth: {
    user: 'shubadinam.com@gmail.com', // Replace with your email address
    pass: 'rsxm phkp apne xcwp', // Replace with your email password or use environment variables
  },


});





app.get("/", (req, res) => {
  res.status(200).send("backend connected success")
})

// const uniqueId = uuidv4();
// const hashedId = createHash('sha256').update(uniqueId).digest('hex').substring(0, 10);

// const userId = `SD_${hashedId}`;

// console.log(userId);




// const allinone = `SELECT *
// FROM emailpassword ep
// LEFT JOIN relativestable st ON ep.userEmail = st.userEmail
// LEFT JOIN userprofiletable up ON ep.userEmail = up.userEmail
// WHERE ep.userEmail = 'offlguy@gmail.com';`

// connection.query(allinone,(err,res)=>{
//   if(err){
//     return(err)
//   }else{
//     console.log(res);
//   }

// })


// console.log('Date one day in advance:', format(parsedDate, 'dd-MM-yyyy HH:mm:ss', { awareOfUnicodeTokens: true }));



// automatic reminder

// Define the cron schedule to send reminders every day at a specific time (e.g., 8:00 AM)
// cron.schedule('57 14 * * *', async () => {   
                               // const today = new Date();
                             // today.setHours(0, 0, 0, 0);

  // const oneDayBeforeToday = new Date();
  // oneDayBeforeToday.setDate(oneDayBeforeToday.getDate() + 1);

  // const formattedDate = format(oneDayBeforeToday, 'dd-MM-yyyy');

  // console.log(formattedDate);

                               // let tdymnth, tdydate;

                                // const dateParts = formattedDate.split('-');
                                // if (dateParts.length === 3) {
                                //   // Parse the date string and convert it to a Date object
                                //   const dateObj = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
                                //   const parsedDate = format(dateObj, 'dd-MM-yyyy');


                                //   // Get the month (0-based index, so add 1 to get the actual month)
                                //   tdymnth = dateObj.getMonth() + 1;
                                //   tdydate = dateObj.getDate();


                                //   console.log(parsedDate);
                                //   console.log(tdymnth);
                                //   console.log(tdydate);
                                // }

//   try {

//     const sqlQuery = ` SELECT * FROM userprofiletable WHERE  userDate =  '${formattedDate}'`;

//     connection.query(sqlQuery, (err, customer) => {
//       if (err) {
//         console.log(err);
//       }

//       else {
//         customer.forEach((customer) => {
//           const userDate = customer.userDate;
//           const userEmail = customer.userEmail;

//           console.log(customer);

//           // const dateParts = userDate.split('-');
//           // if (dateParts.length === 3) {
//             // Parse the date string and convert it to a Date object
//             // const dateObj = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);

//             // Get the month (0-based index, so add 1 to get the actual month)
//             // const customermonth = dateObj.getMonth() + 1;
//             // const customerdate = dateObj.getDate();


//             // Check if the user's birthday is today
//             // if (customermonth === tdymnth && customerdate === tdydate) {

//               // console.log(customermonth);
//               // console.log(customerdate);

//               const reminderMail = {
//                 from: '"Shubadinam Team" <shubadinam.com@gmail.com>',
//                 to: userEmail,
//                 subject: 'Birthday Reminder',
//                 text: `Hello, your birthday is approaching! Remember to celebrate tomorrow!`,
//               };

//               // Send the email
//               transporter.sendMail(reminderMail, function (error, info) {
//                 if (error) {
//                   console.log('Error sending email:', error);
//                 } else {
//                   console.log('Email sent:', info.response);
//                 }
//               });
//             // }
//           // }
//           //  else {
//           //   console.log('Invalid date format');
//           // }
//         });
//       };
//     })

//     const relativeSqlQuery = `SELECT * FROM relativestable WHERE reldate = '${formattedDate}'`;

//     connection.query(relativeSqlQuery, (relativeErr, customerrelatives) => {

//       if (relativeErr) {
//         console.log(relativeErr);
//       }
//        else {

//         console.log(customerrelatives);

//         // Process userCustomers and send reminder emails if necessary
//         customerrelatives.forEach((customerrelatives) => {
//           // const relativesdate = customerrelatives.relDate;
//           const relativesEmail = customerrelatives.userEmail;
//           const relativesName = customerrelatives.relName;

//           // console.log(relativesdate);

//           // const dateParts = relativesdate.split('-');
//           // if (dateParts.length === 3) {
//             // Parse the date string and convert it to a Date object
//             // const dateObj = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);

//             // Get the month (0-based index, so add 1 to get the actual month)
//             // const customerrelativesmonth = dateObj.getMonth() + 1;
//             // const customerrelativesdate = dateObj.getDate();


//             // Check if the user's birthday is today
//             // if (customerrelativesmonth === tdymnth && customerrelativesdate === tdydate) {

//               // console.log(customerrelativesmonth);
//               // console.log(customerrelativesdate);

//               const reminderMail = {
//                 from: '"Shubadinam Team" <shubadinam.com@gmail.com>',
//                 to: relativesEmail,
//                 subject: 'Birthday Reminder',
//                 text: `Hello, ${relativesName}'s birthday is just one day away! Don't forget to celebrate with them tomorrow!`,
//               };

//               // Send the email
//               transporter.sendMail(reminderMail, function (error, info) {
//                 if (error) {
//                   console.log('Error sending email:', error);
//                 } else {
//                   console.log('Email sent:', info.response);
//                 }
//               });
//             // }
//           // } else {
//           //   console.log('Invalid date format');
//           // }
//         });
//       }
//     });


//   } catch (error) {
//     console.error('Error fetching user data:', error);
//   }
// });





// BIRTHDAY REMINDER

  // cron.schedule('57 14 * * *', async () => {
  //   const oneDayBeforeToday = new Date();
  //   oneDayBeforeToday.setDate(oneDayBeforeToday.getDate() + 1);
  
  //   const formattedDate = format(oneDayBeforeToday, 'dd-MM-yyyy');
  
  //   console.log(formattedDate);

  //   try {

  //     const sqlQuery = ` SELECT * FROM userprofiletable WHERE  userDate =  '${formattedDate}'`;
  
  //     connection.query(sqlQuery, (err, customer) => {
  //       if (err) {
  //         console.log(err);
  //       }
  
  //       else {
  //         customer.forEach((customer) => {
  //           const userDate = customer.userDate;
  //           const userEmail = customer.userEmail;
  
  //           console.log(customer);
  
  //           // const dateParts = userDate.split('-');
  //           // if (dateParts.length === 3) {
  //             // Parse the date string and convert it to a Date object
  //             // const dateObj = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
  
  //             // Get the month (0-based index, so add 1 to get the actual month)
  //             // const customermonth = dateObj.getMonth() + 1;
  //             // const customerdate = dateObj.getDate();
  
  
  //             // Check if the user's birthday is today
  //             // if (customermonth === tdymnth && customerdate === tdydate) {
  
  //               // console.log(customermonth);
  //               // console.log(customerdate);
  
  //               const reminderMail = {
  //                 from: '"Shubadinam Team" <shubadinam.com@gmail.com>',
  //                 to: userEmail,
  //                 subject: 'Birthday Reminder',
  //                 text: `Hello, your birthday is approaching! Remember to celebrate tomorrow!`,
  //               };
  
  //               // Send the email
  //               transporter.sendMail(reminderMail, function (error, info) {
  //                 if (error) {
  //                   console.log('Error sending email:', error);
  //                 } else {
  //                   console.log('Email sent:', info.response);
  //                 }
  //               });
  //             // }
  //           // }
  //           //  else {
  //           //   console.log('Invalid date format');
  //           // }
  //         });
  //       };
  //     })
  
  //     const relativeSqlQuery = `SELECT * FROM relativestable WHERE reldate = '${formattedDate}'`;
  
  //     connection.query(relativeSqlQuery, (relativeErr, customerrelatives) => {
  
  //       if (relativeErr) {
  //         console.log(relativeErr);
  //       }
  //        else {
  
  //         console.log(customerrelatives);
  
  //         // Process userCustomers and send reminder emails if necessary
  //         customerrelatives.forEach((customerrelatives) => {
  //           // const relativesdate = customerrelatives.relDate;
  //           const relativesEmail = customerrelatives.userEmail;
  //           const relativesName = customerrelatives.relName;
  
  //           // console.log(relativesdate);
  
  //           // const dateParts = relativesdate.split('-');
  //           // if (dateParts.length === 3) {
  //             // Parse the date string and convert it to a Date object
  //             // const dateObj = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
  
  //             // Get the month (0-based index, so add 1 to get the actual month)
  //             // const customerrelativesmonth = dateObj.getMonth() + 1;
  //             // const customerrelativesdate = dateObj.getDate();
  
  
  //             // Check if the user's birthday is today
  //             // if (customerrelativesmonth === tdymnth && customerrelativesdate === tdydate) {
  
  //               // console.log(customerrelativesmonth);
  //               // console.log(customerrelativesdate);
  
  //               const reminderMail = {
  //                 from: '"Shubadinam Team" <shubadinam.com@gmail.com>',
  //                 to: relativesEmail,
  //                 subject: 'Birthday Reminder',
  //                 text: `Hello, ${relativesName}'s birthday is just one day away! Don't forget to celebrate with them tomorrow!`,
  //               };
  
  //               // Send the email
  //               transporter.sendMail(reminderMail, function (error, info) {
  //                 if (error) {
  //                   console.log('Error sending email:', error);
  //                 } else {
  //                   console.log('Email sent:', info.response);
  //                 }
  //               });
  //             // }
  //           // } else {
  //           //   console.log('Invalid date format');
  //           // }
  //         });
  //       }
  //     });
  
  
  //   } catch (error) {
  //     console.error('Error fetching user data:', error);
  //   }
  // });



 












// OOOOTTTTPPPPP

// const otpStore = new Map();

// app.post('/sendOTP', (req, res) => {
//   const { phoneNumber } = req.body;
//   const otp = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit OTP
//   otpStore.set(phoneNumber, otp);
//   console.log(otp);

//   setTimeout(() => {
//     // Clear the OTP after a set time (e.g., 5 minutes)
//     otpStore.delete(phoneNumber);
//   }, 5 * 60 * 1000);

//   res.json({ message: 'OTP sent successfully' });
// });

// app.post('/verifyOTP', (req, res) => {
//   const { phoneNumber, userOTP } = req.body;

//   if (otpStore.has(phoneNumber)) {
//     const storedOTP = otpStore.get(phoneNumber);

//     console.log(storedOTP);

//     if (userOTP == storedOTP) {
//       res.json({ message: 'OTP verified successfully' });
//     } else {
//       res.status(400).json({ error: 'Invalid OTP' });
//     }
//   } else {
//     res.status(400).json({ error: 'OTP not found or expired' });
//   }
// });





// PANCHANGAM******

// http://localhost:4000/api/upload/tamil
app.post("/api/upload/tamil", (req, res) => {

  const data = req.body.data; // The parsed data from the frontend

  if (!data || !Array.isArray(data) || data.length === 0) {
    return res.status(400).json({ message: "Invalid data format" });
  }

  const dataFrom = data.slice(1).map((item) => [item[0], item[1], item[2], item[3]]);


  const insertQuery = "INSERT INTO tamiltabletest3 (userDate, userMasam,userNakshatra,userCalender) VALUES ?";

  console.log("Data from frontend:", data);
  console.log("Data transformed for insertion:", dataFrom);
  console.log("INSERT query:", insertQuery);

  connection.query(insertQuery, [dataFrom], (err, result) => {
    if (err) {
      console.error("Error inserting data into the database:", err);
      return res.status(500).json({ message: "Error uploading data" });
    }
    console.log("Data inserted into the database!");
    return res.status(200).json({ message: "Data uploaded successfully" });
  });
});

// http://localhost:4000/api/upload/telugu
app.post("/api/upload/telugu", (req, res) => {

  const data = req.body.data; // The parsed data from the frontend

  if (!data || !Array.isArray(data) || data.length === 0) {
    return res.status(400).json({ message: "Invalid data format" });
  }

  const dataFrom = data.slice(1).map((item) => [item[0], item[1], item[2], item[3]]);


  const insertQuery = "INSERT INTO telugupanchangam (userDate, userMasam,userNakshatra,userCalender) VALUES ?";

  console.log("Data from frontend:", data);
  console.log("Data transformed for insertion:", dataFrom);
  console.log("INSERT query:", insertQuery);

  connection.query(insertQuery, [dataFrom], (err, result) => {
    if (err) {
      console.error("Error inserting data into the database:", err);
      return res.status(500).json({ message: "Error uploading data" });
    }
    console.log("Data inserted into the database!");
    return res.status(200).json({ message: "Data uploaded successfully" });
  });
});

// http://localhost:4000/api/upload/gujarati
app.post("/api/upload/gujarati", (req, res) => {

  const data = req.body.data; // The parsed data from the frontend

  if (!data || !Array.isArray(data) || data.length === 0) {
    return res.status(400).json({ message: "Invalid data format" });
  }

  const dataFrom = data.slice(1).map((item) => [item[0], item[1], item[2], item[3]]);

  const insertQuery = "INSERT INTO gujaratipanchangam (userDate, userMasam,userNakshatra,userCalender) VALUES ?";

  console.log("Data from frontend:", data);
  console.log("Data transformed for insertion:", dataFrom);
  console.log("INSERT query:", insertQuery);

  connection.query(insertQuery, [dataFrom], (err, result) => {
    if (err) {
      console.error("Error inserting data into the database:", err);
      return res.status(500).json({ message: "Error uploading data" });
    }
    console.log("Data inserted into the database!");
    return res.status(200).json({ message: "Data uploaded successfully" });
  });
});

// http://localhost:4000/api/upload/malayalam
app.post("/api/upload/malayalam", (req, res) => {

  const data = req.body.data; // The parsed data from the frontend

  if (!data || !Array.isArray(data) || data.length === 0) {
    return res.status(400).json({ message: "Invalid data format" });
  }

  const dataFrom = data.slice(1).map((item) => [item[0], item[1], item[2], item[3]]);


  const insertQuery = "INSERT INTO malayalapanchangam (userDate, userMasam,userNakshatra,userCalender) VALUES ?";

  console.log("Data from frontend:", data);
  console.log("Data transformed for insertion:", dataFrom);
  console.log("INSERT query:", insertQuery);

  connection.query(insertQuery, [dataFrom], (err, result) => {
    if (err) {
      console.error("Error inserting data into the database:", err);
      return res.status(500).json({ message: "Error uploading data" });
    }
    console.log("Data inserted into the database!");
    return res.status(200).json({ message: "Data uploaded successfully" });
  });
});

// http://localhost:4000/api/upload/kannadam
app.post("/api/upload/kannadam", (req, res) => {

  const data = req.body.data; // The parsed data from the frontend

  if (!data || !Array.isArray(data) || data.length === 0) {
    return res.status(400).json({ message: "Invalid data format" });
  }

  const dataFrom = data.slice(1).map((item) => [item[0], item[1], item[2], item[3]]);

  const insertQuery = "INSERT INTO kannadampanchangam (userDate, userMasam,userNakshatra,userCalender) VALUES ?";

  console.log("Data from frontend:", data);
  console.log("Data transformed for insertion:", dataFrom);
  console.log("INSERT query:", insertQuery);

  connection.query(insertQuery, [dataFrom], (err, result) => {
    if (err) {
      console.error("Error inserting data into the database:", err);
      return res.status(500).json({ message: "Error uploading data" });
    }
    console.log("Data inserted into the database!");
    return res.status(200).json({ message: "Data uploaded successfully" });
  });
});

// http://localhost:4000/api/upload/hindi
app.post("/api/upload/hindi", (req, res) => {

  const data = req.body.data; // The parsed data from the frontend

  if (!data || !Array.isArray(data) || data.length === 0) {
    return res.status(400).json({ message: "Invalid data format" });
  }

  const dataFrom = data.slice(1).map((item) => [item[0], item[1], item[2], item[3]]);

  const insertQuery = "INSERT INTO hindipanchangam (userDate, userMasam,userNakshatra,userCalender) VALUES ?";

  console.log("Data from frontend:", data);
  console.log("Data transformed for insertion:", dataFrom);
  console.log("INSERT query:", insertQuery);

  connection.query(insertQuery, [dataFrom], (err, result) => {
    if (err) {
      console.error("Error inserting data into the database:", err);
      return res.status(500).json({ message: "Error uploading data" });
    }
    console.log("Data inserted into the database!");
    return res.status(200).json({ message: "Data uploaded successfully" });
  });
});

// http://localhost:4000/api/upload/bengali
app.post("/api/upload/bengali", (req, res) => {

  const data = req.body.data; // The parsed data from the frontend

  if (!data || !Array.isArray(data) || data.length === 0) {
    return res.status(400).json({ message: "Invalid data format" });
  }

  const dataFrom = data.slice(1).map((item) => [item[0], item[1], item[2], item[3]]);


  const insertQuery = "INSERT INTO bengalipanchangam (userDate, userMasam,userNakshatra,userCalender) VALUES ?";

  console.log("Data from frontend:", data);
  console.log("Data transformed for insertion:", dataFrom);
  console.log("INSERT query:", insertQuery);

  connection.query(insertQuery, [dataFrom], (err, result) => {
    if (err) {
      console.error("Error inserting data into the database:", err);
      return res.status(500).json({ message: "Error uploading data" });
    }
    console.log("Data inserted into the database!");
    return res.status(200).json({ message: "Data uploaded successfully" });
  });
});

// Tithi**********

// http://localhost:4000/api/upload/tamiltithi
app.post("/api/upload/tamiltithi", (req, res) => {

  const data = req.body.data; // The parsed data from the frontend

  if (!data || !Array.isArray(data) || data.length === 0) {
    return res.status(400).json({ message: "Invalid data format" });
  }

  const dataFrom = data.slice(1).map((item) => [item[0], item[1], item[2], item[3]]);


  const insertQuery = "INSERT INTO tamiltithi (tithiDate, tithiMasam,tithiPaksham,tithiName) VALUES ?";

  console.log("Data from frontend:", data);
  console.log("Data transformed for insertion:", dataFrom);
  console.log("INSERT query:", insertQuery);

  connection.query(insertQuery, [dataFrom], (err, result) => {
    if (err) {
      console.error("Error inserting data into the database:", err);
      return res.status(500).json({ message: "Error uploading data" });
    }
    console.log("Data inserted into the database!");
    return res.status(200).json({ message: "Tithi uploaded successfully" });
  });
});

// http://localhost:4000/api/upload/telugutithi
app.post("/api/upload/telugutithi", (req, res) => {

  const data = req.body.data; // The parsed data from the frontend

  if (!data || !Array.isArray(data) || data.length === 0) {
    return res.status(400).json({ message: "Invalid data format" });
  }

  const dataFrom = data.slice(1).map((item) => [item[0], item[1], item[2], item[3]]);


  const insertQuery = "INSERT INTO telugutithi (tithiDate, tithiMasam,tithiPaksham,tithiName) VALUES ?";

  console.log("Data from frontend:", data);
  console.log("Data transformed for insertion:", dataFrom);
  console.log("INSERT query:", insertQuery);

  connection.query(insertQuery, [dataFrom], (err, result) => {
    if (err) {
      console.error("Error inserting data into the database:", err);
      return res.status(500).json({ message: "Error uploading data" });
    }
    console.log("Data inserted into the database!");
    return res.status(200).json({ message: "Tithi uploaded successfully" });
  });
});

// http://localhost:4000/api/upload/kannadamtithi
app.post("/api/upload/kannadamtithi", (req, res) => {

  const data = req.body.data; // The parsed data from the frontend

  if (!data || !Array.isArray(data) || data.length === 0) {
    return res.status(400).json({ message: "Invalid data format" });
  }

  const dataFrom = data.slice(1).map((item) => [item[0], item[1], item[2], item[3]]);


  const insertQuery = "INSERT INTO kannadamtithi (tithiDate, tithiMasam,tithiPaksham,tithiName) VALUES ?";

  console.log("Data from frontend:", data);
  console.log("Data transformed for insertion:", dataFrom);
  console.log("INSERT query:", insertQuery);

  connection.query(insertQuery, [dataFrom], (err, result) => {
    if (err) {
      console.error("Error inserting data into the database:", err);
      return res.status(500).json({ message: "Error uploading data" });
    }
    console.log("Data inserted into the database!");
    return res.status(200).json({ message: "Tithi uploaded successfully" });
  });
});

// http://localhost:4000/api/upload/malayalatithi
app.post("/api/upload/malayalatithi", (req, res) => {

  const data = req.body.data; // The parsed data from the frontend

  if (!data || !Array.isArray(data) || data.length === 0) {
    return res.status(400).json({ message: "Invalid data format" });
  }

  const dataFrom = data.slice(1).map((item) => [item[0], item[1], item[2], item[3]]);


  const insertQuery = "INSERT INTO malayalatithi (tithiDate, tithiMasam,tithiPaksham,tithiName) VALUES ?";

  console.log("Data from frontend:", data);
  console.log("Data transformed for insertion:", dataFrom);
  console.log("INSERT query:", insertQuery);

  connection.query(insertQuery, [dataFrom], (err, result) => {
    if (err) {
      console.error("Error inserting data into the database:", err);
      return res.status(500).json({ message: "Error uploading data" });
    }
    console.log("Data inserted into the database!");
    return res.status(200).json({ message: "Tithi uploaded successfully" });
  });
});

// http://localhost:4000/api/upload/hinditithi
app.post("/api/upload/hinditithi", (req, res) => {

  const data = req.body.data; // The parsed data from the frontend

  if (!data || !Array.isArray(data) || data.length === 0) {
    return res.status(400).json({ message: "Invalid data format" });
  }

  const dataFrom = data.slice(1).map((item) => [item[0], item[1], item[2], item[3]]);


  const insertQuery = "INSERT INTO hinditithi (tithiDate, tithiMasam,tithiPaksham,tithiName) VALUES ?";

  console.log("Data from frontend:", data);
  console.log("Data transformed for insertion:", dataFrom);
  console.log("INSERT query:", insertQuery);

  connection.query(insertQuery, [dataFrom], (err, result) => {
    if (err) {
      console.error("Error inserting data into the database:", err);
      return res.status(500).json({ message: "Error uploading data" });
    }
    console.log("Data inserted into the database!");
    return res.status(200).json({ message: "Tithi uploaded successfully" });
  });
});

// http://localhost:4000/api/upload/gujaratitithi
app.post("/api/upload/gujaratitithi", (req, res) => {

  const data = req.body.data; // The parsed data from the frontend

  if (!data || !Array.isArray(data) || data.length === 0) {
    return res.status(400).json({ message: "Invalid data format" });
  }

  const dataFrom = data.slice(1).map((item) => [item[0], item[1], item[2], item[3]]);


  const insertQuery = "INSERT INTO gujaratitithi (tithiDate, tithiMasam,tithiPaksham,tithiName) VALUES ?";

  console.log("Data from frontend:", data);
  console.log("Data transformed for insertion:", dataFrom);
  console.log("INSERT query:", insertQuery);

  connection.query(insertQuery, [dataFrom], (err, result) => {
    if (err) {
      console.error("Error inserting data into the database:", err);
      return res.status(500).json({ message: "Error uploading data" });
    }
    console.log("Data inserted into the database!");
    return res.status(200).json({ message: "Tithi uploaded successfully" });
  });
});

// http://localhost:4000/api/upload/bengalitithi
app.post("/api/upload/bengalitithi", (req, res) => {

  const data = req.body.data; // The parsed data from the frontend

  if (!data || !Array.isArray(data) || data.length === 0) {
    return res.status(400).json({ message: "Invalid data format" });
  }

  const dataFrom = data.slice(1).map((item) => [item[0], item[1], item[2], item[3]]);


  const insertQuery = "INSERT INTO bengalitithi (tithiDate, tithiMasam,tithiPaksham,tithiName) VALUES ?";

  console.log("Data from frontend:", data);
  console.log("Data transformed for insertion:", dataFrom);
  console.log("INSERT query:", insertQuery);

  connection.query(insertQuery, [dataFrom], (err, result) => {
    if (err) {
      console.error("Error inserting data into the database:", err);
      return res.status(500).json({ message: "Error uploading data" });
    }
    console.log("Data inserted into the database!");
    return res.status(200).json({ message: "Tithi uploaded successfully" });
  });
});











// const oneDayBeforeToday = new Date();
// oneDayBeforeToday.setDate(oneDayBeforeToday.getDate() + 1);

// // Assuming you are using a library like date-fns for formatting
// const formattedDate = format(oneDayBeforeToday, 'dd-MM-yyyy');

// console.log(formattedDate);

// let tdymnth, tdydate; // These variables are declared here

// try {
//   const sqlQuery = `SELECT * FROM userprofiletable WHERE userDate = '${formattedDate}'`;

//   connection.query(sqlQuery, (err, customer) => {
//     if (err) {
//       console.log(err);
//     } else {
//       customer.forEach((customer) => {
//         const userDate = customer.userDate;
//         const userEmail = customer.userEmail;



//         const dateParts = userDate.split('-');
//         if (dateParts.length === 3) {
//           // Parse the date string and convert it to a Date object
//           const dateObj = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);

//           // Get the month (0-based index, so add 1 to get the actual month)
//           const customermonth = dateObj.getMonth() + 1;
//           const customerdate = dateObj.getDate();

//           // Check if the user's birthday is today
//           if (customermonth === tdymnth && customerdate === tdydate) {
//             const reminderMail = {
//               from: '"Shubadinam Team" <shubadinam.com@gmail.com>',
//               to: userEmail,
//               subject: 'Birthday Reminder',
//               text: `Hi, your birthday is one day away! Don't forget to celebrate tomorrow!`,
//             };

//             // Send the email using a configured transporter
//             transporter.sendMail(reminderMail, function (error, info) {
//               if (error) {
//                 console.log('Error sending email:', error);
//               } else {
//                 console.log('Email sent:', info.response);
//               }
//             });
//           }
//         } else {
//           console.log('Invalid date format');
//         }
//       });
//     }
//   });
// } catch (error) {
//   console.error('Error fetching user data:', error);
// }











// http://localhost:4000/add
app.post("/add", (request, response) => {

  const fromData = request.body

  let sqlQuery = "";

  if (fromData.nakshatraTithi == "Nakshatra") {
    sqlQuery = `insert into relativestable (relName,userEmail,relGender,relRelation,relCalender,relMonth,nakshatratithi,relNakshathra) values ('${fromData.userName}','${fromData.userEmail}','${fromData.userGender}','${fromData.userRelation}','${fromData.userCalender}','${fromData.userMonth}','${fromData.nakshatraTithi}','${fromData.userNakshathra}')`

  } else {

    sqlQuery = `insert into relativestable (relName,userEmail,relGender,relRelation,relCalender,relMonth,nakshatratithi,relPaksham,relTithi) values ('${fromData.userName}','${fromData.userEmail}','${fromData.userGender}','${fromData.userRelation}','${fromData.userCalender}','${fromData.userMonth}','${fromData.nakshatraTithi}','${fromData.userPaksham}','${fromData.userTithi}')`

  }

  connection.query(sqlQuery, (error, result) => {
    if (error) {
      response.status(500).send(error)
    } else {

      const insertedId = result.insertId; // Get the inserted ID
      response.status(200).json({ insertedId, message: "Row inserted successfully" });






    }
  })
})

app.get("/list", (req, res) => {

  const { userEmail, userMonth, nakshatraTithi, userNakshathra, userPaksham, userTithi, userCalender, calenderCode, impId } = req.query;

  console.log(userEmail, userMonth, nakshatraTithi, userNakshathra, userPaksham, userTithi, userCalender);

  if (nakshatraTithi === "Nakshatra") {

    let sqlTable = "";
    switch (userCalender) {
      case "Tamil":
        sqlTable = "tamiltabletest3";
        break;
      case "Telugu":
        sqlTable = "telugupanchangam";
        break;
      case "Kannada":
        sqlTable = "kannadampanchangam";
        break;
      case "Malayalam":
        sqlTable = "malayalapanchangam";
        break;
      case "Hindi":
        sqlTable = "hindipanchangam";
        break;
      case "Gujarati":
        sqlTable = "gujaratipanchangam";
        break;
      case "Bengali":
        sqlTable = "bengalipanchangam";
        break;
      default:
        res.status(400).send("Invalid userCalender.");
        return;
    }

    const sqlQuery = `SELECT * FROM ${sqlTable} WHERE userMasam = ? AND userNakshatra = ?`;

    connection.query(sqlQuery, [userMonth, userNakshathra], (error, result) => {
      if (error) {
        console.error('Error executing MySQL query: ', error);
        res.status(500).send(error);
      }
      else {

        let userDate = "";

        if (result.length == 0) {
          userDate = "-- Not Found --";
        } else {

          const date = new Date(result[0].userDate);
          userDate = format(date, 'dd-MM-yyyy', { awareOfUnicodeTokens: true });

          // userDate = result[0].userDate;
        }
        // const userDate = result[0].userDate;
        console.log(userDate);

        const updateQuery = "UPDATE relativestable SET relDate = ? WHERE profileId = ?";

        connection.query(updateQuery, [userDate, impId], (error, result) => {
          if (error) {
            res.status(500).send(error);
          } else {

          //   const sqlQuery = `SELECT *
          // FROM relativestable st
          // INNER JOIN emailpassword ep ON st.userEmail = ep.userEmail WHERE ep.userEmail = '${userEmail}'`;

          const sqlQuery = `SELECT *
          FROM relativestable  WHERE userEmail = '${userEmail}'`;


            connection.query(sqlQuery, (error, result) => {
              if (error) {
                console.error('Error executing MySQL query: ', error);
                res.status(500).send(error);
              } else {
                res.status(200).send(result);
                console.log(result);
              }
            });

          }
        });

      }
    });

  } else {
    // CREATE TABLE bengalitithi (tithiDate varchar(255),tithiMasam VARCHAR(255),tithiPaksham VARCHAR(255),tithiName VARCHAR(255),tithiid INT not null auto_increment,primary key(tithiid));

    let tithiTable = "";
    switch (userCalender) {
      case "Tamil":
        tithiTable = "tamiltithi";
        break;
      case "Telugu":
        tithiTable = "telugutithi";
        break;
      case "Kannada":
        tithiTable = "kannadamtithi";
        break;
      case "Malayalam":
        tithiTable = "malayalatithi";
        break;
      case "Hindi":
        tithiTable = "hinditithi";
        break;
      case "Gujarati":
        tithiTable = "gujaratitithi";
        break;
      case "Bengali":
        tithiTable = "bengalitithi";
        break;

      default:
        res.status(400).send("Invalid userCalender.");
        return;
    }

    const sqlQuery = `SELECT * FROM ${tithiTable} WHERE tithiMasam = ? AND tithiPaksham = ? AND tithiName = ?`;

    connection.query(sqlQuery, [userMonth, userPaksham, userTithi], (error, result) => {
      console.log(userMonth, userPaksham, userTithi);
      if (error) {
        console.error('Error executing MySQL query: ', error);
        res.status(500).send(error);
      } else {
        let tithiDatefrom = "";

        if (result.length == 0) {
          tithiDatefrom = "-- Not Found --";
        } else {
          const date = new Date(result[0].tithiDate);
          tithiDatefrom = format(date, 'dd-MM-yyyy', { awareOfUnicodeTokens: true });
        }

        // const tithiDatefrom = result[0].tithiDate;
        console.log(tithiDatefrom);

        const updateQuery = "UPDATE relativestable SET relDate = ? WHERE profileId = ?";

        connection.query(updateQuery, [tithiDatefrom, impId], (error, result) => {
          if (error) {
            res.status(500).send(error);
          } else {

            // const sqlQuery = `SELECT *
            // FROM relativestable st
            // INNER JOIN emailpassword ep ON st.userEmail = ep.userEmail WHERE ep.userEmail = '${userEmail}';
            // `;

            const sqlQuery = `SELECT *
            FROM relativestable WHERE userEmail = '${userEmail}';
            `;



            connection.query(sqlQuery, (error, result) => {
              if (error) {
                console.error('Error executing MySQL query: ', error);
                res.status(500).send(error);
              } else {
                res.status(200).send(result);
                console.log(result);
              }
            });
            // res.status(200).send(result);
            // console.log(result);
          }
        });

      }
    });

  }
});





// http://localhost:4000/add/userprofile
app.post("/add/userprofile", (request, response) => {

  const fromData = request.body    //dynamic state

  const fromData2 = request.body.emailPass   //emailpass object inside the dynamicstate.


  console.log(fromData);
  console.log(fromData2);



  bcrypt.hash(fromData2.userPassword, 12, (err, hashedPassword) => {
    if (err) {
      response.status(500).send("Error while hashing password");
      return; // Exit the function in case of an error
    }
    else {
      const emailPassEntry = `insert into emailpassword (userEmail,userPassword,userPhone) values ('${fromData2.userEmail}','${hashedPassword}','${fromData2.userPhone}')`

      connection.query(emailPassEntry, (err, res) => {
        if (err) {
          response.sendStatus(500).send(err)
        }

        else {

          let sqlQuery = "";


          if (fromData.nakshatraTithi === "Nakshatra") {

            sqlQuery = `insert into userprofiletable (userName,userEmail,userGender,userRelation,userCalender,userMonth,nakshatratithi,userNakshathra) values ('${fromData.userName}','${fromData.userEmail}','${fromData.userGender}','${fromData.userRelation}','${fromData.userCalender}','${fromData.userMonth}','${fromData.nakshatraTithi}','${fromData.userNakshathra}')`;

          }
          else {

            sqlQuery = `insert into userprofiletable (userName,userEmail,userGender,userRelation,userCalender,userMonth,nakshatratithi,userPaksham,userTithi) values ('${fromData.userName}','${fromData.userEmail}','${fromData.userGender}','${fromData.userRelation}','${fromData.userCalender}','${fromData.userMonth}','${fromData.nakshatraTithi}','${fromData.userPaksham}','${fromData.userTithi}')`

          }

          connection.query(sqlQuery, (error, result) => {
            if (error) {
              response.status(500).send(error)
            } else {

              // console.log("****************");

              const welcomeMail = {



                from: '"Shubadinam Team" <shubadinam.com@gmail.com>',
                to: fromData2.userEmail,
                subject: 'Welcome To Shubadinam',

                html: `<div style="background-color: #06a6ff1a; color: black;">
                <h2 style="color: black;">Welcome to Shubadinam - Your Cosmic Journey Begins Here! 🌟</h2>
            
                <p style="color: black;">Dear ${fromData.userName},</p>
            
                <p style="color: black;">We are delighted to welcome you to the Shubadinam community! 🎉</p>
            
                <p style="color: black;">At Shubadinam, we're all about celebrating our unique cosmic identity and embracing the rich heritage of our Hindu culture.</p>
            
                <h3 style="color: black;">Here's what you can look forward to as a Shubadinam member:</h3>
            
                <ul>
                    <li style="color: black;">Discover your Nakshatra/Tithi and its profound significance.</li>
                    <li style="color: black;">Connect with your roots by celebrating birthdays in the Indian calendar.</li>
                    <li style="color: black;">Engage with a community of like-minded individuals by sharing this incredible journey.</li>
                </ul>
            
                <h3 style="color: black;">Getting Started:</h3>
            
                <ol>
                    <li style="color: black;"><strong>Complete Your Profile:</strong> Add your birth details to unlock the full potential of Shubadinam.</li>
                    <li style="color: black;"><strong>Explore Your Nakshatra:</strong> Dive into the rich traditions and wisdom of Indian astrology.</li>
                </ol>
            
                <h3 style="color: black;">Important Links:</h3>
            
                <ul>
                    <li style="color: black;"><a href="https://www.shubadinam.com/blogs">Link to Explore Blogs</a></li>
                </ul>
            
                <p style="color: black;">Remember, this is just the beginning. Your journey with Shubadinam is sure to be filled with meaningful experiences and cultural discoveries.</p>
            
                <p style="color: black;">Stay tuned for exciting updates, unique gift shopping, services to help you and your family enjoy birthdays more meaningfully, and a vibrant community of like-minded individuals who, like you, are on a journey to connect with our Cosmic Identity.</p>
            
                <p style="color: black;">Once again, welcome to Shubadinam, where the stars align for an extraordinary experience.</p>
            
                <p style="color: black;">Best regards,<br>The Shubadinam Team</p>
            
                <p style="color: black;">Connect with us on
                    <a href="https://www.instagram.com/shubadinam/">Instagram</a>,
                    <a href="https://www.youtube.com/channel/UCsNbE7QqnpgjI7cXOTM1mXA">Youtube</a>,
                    <a href="https://twitter.com/Shubadinam">Twitter</a>,
                    <a href="https://www.facebook.com/profile.php?id=61551460127861">Facebook</a>
                    for the latest updates and to join the conversation!
                </p>
            </div>
            `

                //  html: `<div style="background-color: #06a6ff1a; color:black">
                //  <h2 style="color:black">Welcome to Shubadinam - Your Cosmic Journey Begins Here! 🌟</h2>
 
                //  <p style="color:black">Dear ${fromData.userName},</p>
             
                //  <p style="color:black">We are thrilled to welcome you to the Shubadinam community! 🎉</p>
             
                //  <p style="color:black">At Shubadinam, we're all about celebrating our unique cosmic identity and embracing the rich heritage of our Hindu culture.</p>
             
                //  <h3 style="color:black">Here's what you can look forward to as a Shubadinam member:</h3>
             
                //  <ul>
                //      <li style="color:black">Discover your Nakshatra/Tithi and its profound significance.</li>
                //      <li style="color:black">Connect with your roots by celebrating birthdays in the Indian calendar.</li>
                //      <li style="color:black">Engage with a community of like-minded individuals by sharing this incredible journey.</li>
                //  </ul>
             
                //  <h3 style="color:black">Getting Started:</h3>
             
                //  <ol>
                //      <li style="color:black"><strong>Complete Your Profile:</strong> Add your birth details to unlock the full potential of Shubadinam.</li>
                //      <li style="color:black"><strong>Explore Your Nakshatra:</strong> Dive into the rich traditions and wisdom of Indian astrology.</li>
                //  </ol>
             
                //  <h3 style="color:black">Important Links:</h3>
             
                //      <li style="color:black"><a href="https://www.shubadinam.com/blogs">Link to Explore Blogs</a></li>
                //  </ul>
             
                //  <p style="color:black">Remember, this is just the beginning. Your journey with Shubadinam is sure to be filled with meaningful experiences and cultural discoveries.</p>
             
                //  <p style="color:black">Stay tuned for exciting updates, Unique Gift Shopping, services to help you and your family enjoy the birthdays more meaningfully and a vibrant community of like-minded individuals who, like you, are on a journey to connect with our Cosmic Identity.</p>
             
                //  <p style="color:black">Once again, welcome to Shubadinam, where the stars align for an extraordinary experience.</p>
             
                //  <p style="color:black">Best regards,<br>The Shubadinam Team</p>
             
                //  <p style="color:black">Connect with us on
                //  <a href="https://www.instagram.com/shubadinam/">Instagram</a>,
                //  <a href="https://www.youtube.com/channel/UCsNbE7QqnpgjI7cXOTM1mXA">Youtube</a>,
                //  <a href="https://twitter.com/Shubadinam">Twitter</a>
                //  <a href="https://www.facebook.com/profile.php?id=61551460127861">Facebook</a>
                //   for the latest updates and to join the conversation!</p>
                  
                //   </div>`
 


              }

              transporter.sendMail(welcomeMail, function (error, info) {
                if (error) {
                  throw Error(error)
                } else {
                  console.log("mail sent", info);
                }
              })
              // ////////////          //

              const insertedId = result.insertId; // Get the inserted ID
              response.status(200).json({ insertedId, message: "Row inserted successfully" });



            }
          })

        }


      })

    }
  })



})


app.get("/list/userprofile", (req, res) => {

  const { userEmail, userMonth, nakshatraTithi, userNakshathra, userPaksham, userTithi, userCalender, calenderCode, impId } = req.query;

  console.log(userEmail, userMonth, nakshatraTithi, userNakshathra, userPaksham, userTithi, userCalender);

  if (nakshatraTithi === "Nakshatra") {

    let sqlTable = "";
    switch (userCalender) {
      case "Tamil":
        sqlTable = "tamiltabletest3";
        break;
      case "Telugu":
        sqlTable = "telugupanchangam";
        break;
      case "Kannada":
        sqlTable = "kannadampanchangam";
        break;
      case "Malayalam":
        sqlTable = "malayalapanchangam";
        break;
      case "Hindi":
        sqlTable = "hindipanchangam";
        break;
      case "Gujarati":
        sqlTable = "gujaratipanchangam";
        break;
      case "Bengali":
        sqlTable = "bengalipanchangam";
        break;

      default:
        res.status(400).send("Invalid userCalender.");
        return;
    }

    const sqlQuery = `SELECT * FROM ${sqlTable} WHERE userMasam = ? AND userNakshatra = ?`;

    connection.query(sqlQuery, [userMonth, userNakshathra], (error, result) => {
      if (error) {
        console.error('Error executing MySQL query: ', error);
        res.status(500).send(error);
      } else {

        let userDate = "";

        if (result.length == 0) {
          userDate = "-- Not Found --";
        } else {

          const date = new Date(result[0].userDate);
          userDate = format(date, 'dd-MM-yyyy', { awareOfUnicodeTokens: true });

          // userDate = result[0].userDate;
        }
        // const userDate = result[0].userDate;
        console.log(userDate);

        const updateQuery = "UPDATE userprofiletable SET userDate = ? WHERE firstuserid = ?";

        connection.query(updateQuery, [userDate, impId], (error, result) => {
          if (error) {
            res.status(500).send(error);
          } else {

          //   const sqlQuery = `SELECT *
          // FROM userprofiletable up
          // INNER JOIN emailpassword ep ON up.userEmail = ep.userEmail WHERE ep.userEmail = '${userEmail}';
          // `;

          const sqlQuery = `SELECT *
          FROM userprofiletable  WHERE userEmail = '${userEmail}';
          `;


            connection.query(sqlQuery, (error, result) => {
              if (error) {
                console.error('Error executing MySQL query: ', error);
                res.status(500).send(error);
              } else {
                res.status(200).send(result);
                console.log(result);
              }
            })

          }
        });

      }
    });

  }
  else {

    let tithiTable = "";
    switch (userCalender) {
      case "Tamil":
        tithiTable = "tamiltithi";
        break;
      case "Telugu":
        tithiTable = "telugutithi";
        break;
      case "Kannada":
        tithiTable = "kannadamtithi";
        break;
      case "Malayalam":
        tithiTable = "malayalatithi";
        break;
      case "Hindi":
        tithiTable = "hinditithi";
        break;
      case "Gujarati":
        tithiTable = "gujaratitithi";
        break;
      case "Bengali":
        tithiTable = "bengalitithi";
        break;

      default:
        res.status(400).send("Invalid userCalender.");
        return;
    }

    const sqlQuery = `SELECT * FROM ${tithiTable} WHERE tithiMasam = ? AND tithiPaksham = ? AND tithiName = ?`;

    connection.query(sqlQuery, [userMonth, userPaksham, userTithi], (error, result) => {
      console.log(userMonth, userPaksham, userTithi);
      if (error) {
        console.error('Error executing MySQL query: ', error);
        res.status(500).send(error);
      } else {

        let tithiDatefrom = "";

        if (result.length == 0) {
          tithiDatefrom = "-- Not Found --";
        } else {
          const date = new Date(result[0].tithiDate);
          tithiDatefrom = format(date, 'dd-MM-yyyy', { awareOfUnicodeTokens: true });
        }

        // const tithiDatefrom = result[0].tithiDate;
        console.log(tithiDatefrom);

        const updateQuery = "UPDATE userprofiletable SET userDate = ? WHERE firstuserid = ?";

        connection.query(updateQuery, [tithiDatefrom, impId], (error, result) => {
          if (error) {
            res.status(500).send(error);
          } else {

            // const sqlQuery = `SELECT *
            // FROM userprofiletable up
            // INNER JOIN emailpassword ep ON up.userEmail = ep.userEmail WHERE ep.userEmail = '${userEmail}';
            // `;

            const sqlQuery = `SELECT *
            FROM userprofiletable  WHERE userEmail = '${userEmail}';
            `;


            connection.query(sqlQuery, (error, result) => {
              if (error) {
                console.error('Error executing MySQL query: ', error);
                res.status(500).send(error);
              } else {


                res.status(200).send(result);
                console.log(result);





              }
            });
            // res.status(200).send(result);
            // console.log(result);
          }
        });

      }
    });


  }
});





// http://localhost:4000/upload/mailpass
app.post("/upload/mailpass", [

  check('userEmail', "Email is invalid").isEmail().isLength({ min: 10, max: 30 }),
  check('userPassword', "password length 8-10").isLength({ min: 8, max: 10 })

], (req, response) => {

  const setMail = req.body
  console.log(setMail);

  const dataCheck = `select * from emailpassword where userEmail = '${setMail.userEmail}'`
  connection.query(dataCheck, (err, data) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return response.json(errors)
    } else {
      if (err) {
        response.json(err)
      } if (data.length > 0) {

        response.status(400).send("User Already Exist")
      } else {

        bcrypt.hash(setMail.userPassword, 12, (err, hashedPassword) => {
          if (err) {
            response.status(500).send("Error while hashing password");
            return; // Exit the function in case of an error
          }


          const sqlQuery = `insert into emailpassworddup (userEmail,userPassword,userPhone) values ('${setMail.userEmail}','${hashedPassword}','${setMail.userPhone}')`

          connection.query(sqlQuery, (err, result) => {
            if (err) {
              response.status(500).send(err)
            } else {


              const token = jwt.sign(
                {
                  data: {
                    mailPhPass: {
                      userEmail: setMail.userEmail,
                      userPhone: setMail.userPhone,
                      userPassword: setMail.userPassword
                    }                                           // Include mailPhPass in the data object
                  }
                }, 'ourSecretKey', { expiresIn: '120m' }
              );

              const mailConfigurations = {

                // It should be a string of sender/server email
                // from: 'shubadinam.com@gmail.com',

                from: '"Shubadinam Team" <shubadinam.com@gmail.com>',
                // from: 'noreply@shubadinam.com',


                to: setMail.userEmail,

                // Subject of Email
                subject: 'Email Verification',


                html: ` <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center; background-color: #27baba21;">
                <p style="font-size: 24px; font-weight: bold;">Welcome to Shubadinam!</p>
                <p>We're pleased that you visited our website and provided your email address. 🎉</p>
                <p>To continue, please click the button below to verify your email and proceed further:</p>
                <a href="https://www.shubadinam.com/verify/${token}"
                   style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #fff; font-size: 16px; text-decoration: none; border-radius: 5px;">
                   Verify Email
                </a>
                <p>If the button doesn't work, you can also click the following link to proceed:</p>
                <p><a href="https://www.shubadinam.com/verify/${token}">https://www.shubadinam.com/verify/${token}</a></p>
                <p>Your support is highly valued. Thank you for being a part of our community!</p>
                <p>Best regards,</p>
                <p>Shubadinam team</p>
            </div>
            `

              //   html: ` <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center; background-color: #27baba21;">
              //   <p style="font-size: 24px; font-weight: bold;">Welcome to Shubadinam!</p>
              //   <p>We're excited that you visited our website and provided your email address. 🎉</p>
              //   <p>To proceed, please click the button below to verify your email and continue further:</p>


                
              //   <a href="https://www.shubadinam.com/verify/${token}"
              //     style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #fff; font-size: 16px; text-decoration: none; border-radius: 5px;">
              //     Continue
              //   </a>
              //   <p>If the button doesn't work, you can also click the following link to continue:</p>
              //   <p><a href="https://www.shubadinam.com/verify/${token}">https://www.shubadinam.com/verify/${token}</a></p>
              //   <p>Your support means a lot to us. Thank you for being a part of our community!</p>
              //   <p>Best regards,</p>
              //   <p>Shubadinam team</p>
              // </div>`

              };

              transporter.sendMail(mailConfigurations, function (error, info) {
                if (error) {
                  throw Error(error)
                } else {


                  // const sqlQuery1 = `SELECT * FROM relativestable st INNER JOIN emailpassword ep ON st.userEmail = ep.userEmail WHERE ep.userEmail = ?`;

                  const sqlQuery1 = `SELECT * FROM relativestable  WHERE userEmail = ?`;

                  connection.query(sqlQuery1, [setMail.userEmail], (error1, result1) => {
                    if (error1) {
                      console.error('Error executing MySQL query 1: ', error1);
                      response.status(500).send(error1);
                    } else {
                      // const sqlQuery2 = `SELECT * FROM userprofiletable up INNER JOIN emailpassword ep ON up.userEmail = ep.userEmail WHERE ep.userEmail = ?`;

                      const sqlQuery2 = `SELECT * FROM userprofiletable  WHERE userEmail = ?`;

                      connection.query(sqlQuery2, [setMail.userEmail], (error2, result2) => {
                        if (error2) {
                          console.error('Error executing MySQL query 2: ', error2);
                          response.status(500).send(error2);
                        } else {
                          response.status(200).send({
                            data1: result1,
                            data2: result2,
                            success: "An link has been sent to your registered Email.Please verify to continue."
                          });
                          console.log(result1);
                          console.log(result2);
                        }
                      });
                    }
                  });

                }

              });
            }
          })
        })

      }


      app.get('/verify/:token', (req, res) => {
        const { token } = req.params;

        jwt.verify(token, 'ourSecretKey', function (err, decoded) {
          if (err) {
            console.log(err);
            res.status(500).send("Email verification failed, possibly the link is invalid or expired");
          }
          else {

            const mailPhPass = decoded.data; // Assuming user email is stored in decoded data
            console.log(mailPhPass);

            res.status(200).send({
              message: "Email verifified successfully",
              mailPhPassObj: mailPhPass
            })

          }
        });


      }
      )
    }
  })
})




app.post("/logged/user", [

  check('userEmail', "Email is invalid").isEmail().isLength({ min: 10, max: 30 }),
  check('userPassword', "password length 8-10").isLength({ min: 8, max: 10 })

], async (request, response) => {
  try {
    const userEmail = request.body.userEmail;
    const userPassword = request.body.userPassword;

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.json(errors)
    } else {
      const sqlQuery = `select * from emailpassword where userEmail = ?`;

      connection.query(sqlQuery, [userEmail], (err, data) => {
        if (err) {
          response.status(500).send({
            backendstop: "backend stop"
            // norecords :"No Records Existed.Please Sign up!"
          });
        }
        else if (data.length > 0) {
          const hashedPassword = data[0].userPassword;

          // Compare hashed password using bcrypt
          const passwordMatch = bcrypt.compare(userPassword, hashedPassword)
            .then(passwordMatch => {
              if (passwordMatch) {

                // const sqlQuery1 = `SELECT * FROM relativestable st INNER JOIN emailpassword ep ON st.userEmail = ep.userEmail WHERE ep.userEmail = ?`;

                const sqlQuery1 = `SELECT * FROM relativestable WHERE userEmail = ?`;

                connection.query(sqlQuery1, [userEmail], (error1, result1) => {
                  if (error1) {
                    console.error('Error executing MySQL query 1: ', error1);
                    response.status(500).send(error1);
                  } else {
                    // const sqlQuery2 = `SELECT * FROM userprofiletable up INNER JOIN emailpassword ep ON up.userEmail = ep.userEmail WHERE ep.userEmail = ?`;

                    const sqlQuery2 = `SELECT * FROM userprofiletable  WHERE userEmail = ?`;

                    connection.query(sqlQuery2, [userEmail], (error2, result2) => {
                      if (error2) {
                        console.error('Error executing MySQL query 2: ', error2);
                        response.status(500).send(error2);
                      } else {
                        response.status(200).send({
                          data1: result1,
                          data2: result2,
                          success: "Success"
                        });
                        console.log(result1);
                        console.log(result2);
                      }
                    });
                  }
                });
              } else {
                response.status(400).send({
                  passfailure: "Failure",
                  message: "Please enter valid password"
                })
              }
            })
            .catch((error) => {
              response.status(400).send(error)
            })
        } else {
          response.status(400).send({
            norecords: "Failure",
            message: "No Records Exist! Please Sign up."
          });
        }
      });
    }
  } catch (error) {
    response.status(500).send({
      backendstop: "backend stop"
    });
  }
});



// changes on home login

app.get("/loginLocalEmail", (request, response) => {
  // Extract the localEmail query parameter from the request
  const localEmail = request.query.localEmail; // Use request.query.localEmail to access the value

  console.log(localEmail);

  const sqlQuery = `SELECT * FROM emailpassword WHERE userEmail = ?`;

  connection.query(sqlQuery, [localEmail], (err, data) => {
    if (err) {
      response.status(500).send(err);
    } else {
      // response.status(200).send(data);
      console.log("yes");
      // console.log(localEmail);


      // const welcomeMail = {

      //   from: 'shubadinam.com@gmail.com',
      //   to: localEmail,
      //   subject : 'Welcome To Shubadinam',
      //   html :  '<p style="font-size: 24px; font-weight: bold;">Welcome to Shubadinam!</p>'
      // }

      // transporter.sendMail(welcomeMail, function (error, info) {
      //   if (error) {
      //     throw Error(error)
      //   } else {
      //     console.log("mail sent");
      //   }
      // })



      // const sqlQuery1 = `SELECT * FROM relativestable st INNER JOIN emailpassword ep ON st.userEmail = ep.userEmail WHERE ep.userEmail = ?`;

      const sqlQuery1 = `SELECT * FROM relativestable WHERE userEmail = ?`;

      connection.query(sqlQuery1, [localEmail], (error1, result1) => {
        if (error1) {
          console.error('Error executing MySQL query 1: ', error1);
          response.status(500).send(error1);
        } else {
          // const sqlQuery2 = `SELECT * FROM userprofiletable up INNER JOIN emailpassword ep ON up.userEmail = ep.userEmail WHERE ep.userEmail = ?`;

          const sqlQuery2 = `SELECT * FROM userprofiletable WHERE userEmail = ?`;

          connection.query(sqlQuery2, [localEmail], (error2, result2) => {
            if (error2) {
              console.error('Error executing MySQL query 2: ', error2);
              response.status(500).send(error2);
            } else {
              response.status(200).send({
                data1: result1,
                data2: result2,
                success: "Success"
              });
              console.log(result1);
              console.log(result2);
            }
          });
        }
      });

      // response.status(200).send({
      //   success: "Success",
      // });
    }


  }
  );
});







// dont delete this
app.delete("/delete/userdetails/:id", (request, response) => {
  const uniqueId = request.params.id;

  const deleteprofile = `select * from relativestable where profileid = ${uniqueId}`;

  connection.query(deleteprofile, (error, deletersProfile) => {

    if (error) {
      response.status(500).send(error);
    }
    else {

      if (deletersProfile.length === 0) {
        response.status(404).send({
          message: "Profile not found."
        })
      }

      else {
        const profile = deletersProfile[0];
        console.log(profile);

        let insertDeleted, insertValues;

        if (profile.nakshatratithi === 'Nakshatra') {
          insertDeleted = `INSERT INTO deletedtable (deletedname, deleteuseremail, deletedgender, deletedcalender, deletednakshtratithi, deletedmonth, deletednakshahra, deleteddate, deletedrelation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
          insertValues = [
            profile.relName,
            profile.userEmail,
            profile.relGender,
            profile.relCalender,
            profile.nakshatratithi,
            profile.relMonth,
            profile.relNakshathra,
            profile.relDate,
            profile.relRelation
          ];
        }
        else {
          insertDeleted = `INSERT INTO deletedtable (deletedname, deleteuseremail, deletedgender, deletedcalender, deletednakshtratithi, deletedmonth, deletedpaksham, deletedtithi, deleteddate, deletedrelation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
          insertValues = [
            profile.relName,
            profile.userEmail,
            profile.relGender,
            profile.relCalender,
            profile.nakshatratithi,
            profile.relMonth,
            profile.relPaksham,
            profile.relTithi,
            profile.relDate,
            profile.relRelation
          ];
        }


        connection.query(insertDeleted, insertValues, (error, result) => {
          if (error) {
            response.status(500).send(error);
          } else {
            console.log(result);

            const sqlQuery = `DELETE FROM relativestable WHERE profileid = ?`;

            connection.query(sqlQuery, [uniqueId], (error, result) => {
              if (error) {
                response.status(500).send(error);
              } else {
                response.status(200).send({
                  message: "The profile has been deleted successfully."
                });
              }
            });
          }
        });
      }
    }
  });


})




// http://localhost:4000/edit/reldetails/1

app.put("/edit/reldetails/:id", (request, response) => {
  const uniqueId = request.params.id;

  // const { editRGender, editRRelation, editRnakshatraTithi, editRrelNakshathra, editRMonth, editRPaksham, editRTithi, editRCalender, profileid } = request.body

  // console.log(editRMonth);

  const fromData = request.body;

  console.log(fromData);

  let sqlQuery = "";

  if (fromData.editRnakshatraTithi == "Nakshatra") {
    sqlQuery = `UPDATE relativestable 
                SET 
                  relGender = '${fromData.editRGender}',
                  relRelation = '${fromData.editRRelation}',
                  relCalender = '${fromData.editRCalender}',
                  relMonth = '${fromData.editRMonth}',
                  nakshatratithi = '${fromData.editRnakshatraTithi}',
                  relNakshathra = '${fromData.editRrelNakshathra}',
                  relPaksham = '',
                  relTithi = ''
                WHERE profileid = '${fromData.profileid}'`;
  } else {
    sqlQuery = `UPDATE relativestable 
                SET 
                  relGender = '${fromData.editRGender}',
                  relRelation = '${fromData.editRRelation}',
                  relCalender = '${fromData.editRCalender}',
                  relMonth = '${fromData.editRMonth}',
                  nakshatratithi = '${fromData.editRnakshatraTithi}',
                  relNakshathra = '',
                  relPaksham = '${fromData.editRPaksham}',
                  relTithi = '${fromData.editRTithi}'
                WHERE profileid = '${fromData.profileid}'`;
  }

  connection.query(sqlQuery, (error, result) => {
    if (error) {
      response.status(500).send(error);
    }
    else {
      if (fromData.editRnakshatraTithi === "Nakshatra") {

        let sqlTable = "";
        switch (fromData.editRCalender) {
          case "Tamil":
            sqlTable = "tamiltabletest3";
            break;
          case "Telugu":
            sqlTable = "telugupanchangam";
            break;
          case "Kannada":
            sqlTable = "kannadampanchangam";
            break;
          case "Malayalam":
            sqlTable = "malayalapanchangam";
            break;
          case "Hindi":
            sqlTable = "hindipanchangam";
            break;
          case "Gujarati":
            sqlTable = "gujaratipanchangam";
            break;
          case "Bengali":
            sqlTable = "bengalipanchangam";
            break;
          default:
            response.status(400).send("Invalid userCalender.");
            return;
        }

        const sqlQuery = `SELECT * FROM ${sqlTable} WHERE userMasam = ? AND userNakshatra = ?`;

        connection.query(sqlQuery, [fromData.editRMonth, fromData.editRrelNakshathra], (error, result) => {
          if (error) {
            console.error('Error executing MySQL query: ', error);
            response.status(500).send(error);
          }
          else {

            let userDate = "";

            if (result.length == 0) {
              userDate = "-- Not Found --";
            } else {

              const date = new Date(result[0].userDate);
              userDate = format(date, 'dd-MM-yyyy', { awareOfUnicodeTokens: true });

              // userDate = result[0].userDate;
            }
            // const userDate = result[0].userDate;
            console.log(userDate);

            const updateQuery = "UPDATE relativestable SET relDate = ? WHERE profileId = ?";

            connection.query(updateQuery, [userDate, fromData.profileid], (error, result) => {
              if (error) {
                response.status(500).send(error);
              } else {
                response.status(200).json({ message: "Profile has been edited successfully." });
                console.log("Row updated successfully");

              }
            });

          }
        });

      }
      else if (fromData.editRnakshatraTithi === "Tithi") {

        let tithiTable = "";
        switch (fromData.editRCalender) {
          case "Tamil":
            tithiTable = "tamiltithi";
            break;
          case "Telugu":
            tithiTable = "telugutithi";
            break;
          case "Kannada":
            tithiTable = "kannadamtithi";
            break;
          case "Malayalam":
            tithiTable = "malayalatithi";
            break;
          case "Hindi":
            tithiTable = "hinditithi";
            break;
          case "Gujarati":
            tithiTable = "gujaratitithi";
            break;
          case "Bengali":
            tithiTable = "bengalitithi";
            break;

          default:
            response.status(400).send("Invalid userCalender.");
            return;
        }

        const sqlQuery = `SELECT * FROM ${tithiTable} WHERE tithiMasam = ? AND tithiPaksham = ? AND tithiName = ?`;

        connection.query(sqlQuery, [fromData.editRMonth, fromData.editRPaksham, fromData.editRTithi], (error, result) => {
          // console.log(userMonth, userPaksham, userTithi);
          if (error) {
            console.error('Error executing MySQL query: ', error);
            response.status(500).send(error);
          } else {

            let tithiDatefrom = "";

            if (result.length == 0) {
              tithiDatefrom = "-- Not Found --";
            } else {
              const date = new Date(result[0].tithiDate);
              tithiDatefrom = format(date, 'dd-MM-yyyy', { awareOfUnicodeTokens: true });
            }

            // const tithiDatefrom = result[0].tithiDate;
            console.log(tithiDatefrom);

            // const updateQuery = "UPDATE relativestable SET userDate = ? WHERE profileid = ?";

            const updateQuery = "UPDATE relativestable SET relDate = ? WHERE profileId = ?";

            connection.query(updateQuery, [tithiDatefrom, fromData.profileid], (error, result) => {
              if (error) {
                response.status(500).send(error);
              } else {
                response.status(200).json({ message: "Profile has been edited successfully." });
                console.log("Row updated successfully");

              }
            });

          }
        });


      }

    }


  });

})




// http://localhost:4000/edit/userdetails/1

app.put("/edit/userdetails/:id", (request, response) => {
  const uniqueId = request.params.id;

  // const { editUGender, editURelation, editUnakshatraTithi, editUrelNakshathra, editUMonth, editUPaksham, editUTithi, editUCalender, firstuserid } = request.body

  // console.log(editRMonth);

  const fromData = request.body;

  console.log(fromData);

  let sqlQuery = "";

  if (fromData.editUnakshatraTithi == "Nakshatra") {
    sqlQuery = `UPDATE userprofiletable 
                SET 
                  userGender = '${fromData.editUGender}',
                  userRelation = '${fromData.editURelation}',
                  userCalender = '${fromData.editUCalender}',
                  userMonth = '${fromData.editUMonth}',
                  nakshatratithi = '${fromData.editUnakshatraTithi}',
                  userNakshathra = '${fromData.editUrelNakshathra}',
                  userPaksham = ' ',
                  userTithi = ' '
                WHERE firstuserid = '${fromData.firstuserid}'`;
  } else {
    sqlQuery = `UPDATE userprofiletable 
                SET 
                userGender = '${fromData.editUGender}',
                userRelation = '${fromData.editURelation}',
                userCalender = '${fromData.editUCalender}',
                userMonth = '${fromData.editUMonth}',
                  nakshatratithi = '${fromData.editUnakshatraTithi}',
                  userNakshathra = ' ',
                  userPaksham = '${fromData.editUPaksham}',
                  userTithi = '${fromData.editUTithi}'
                WHERE firstuserid = '${fromData.firstuserid}'`;
  }

  connection.query(sqlQuery, (error, result) => {
    if (error) {
      response.status(500).send(error);
    }
    else {
      if (fromData.editUnakshatraTithi === "Nakshatra") {

        let sqlTable = "";
        switch (fromData.editUCalender) {
          case "Tamil":
            sqlTable = "tamiltabletest3";
            break;
          case "Telugu":
            sqlTable = "telugupanchangam";
            break;
          case "Kannada":
            sqlTable = "kannadampanchangam";
            break;
          case "Malayalam":
            sqlTable = "malayalapanchangam";
            break;
          case "Hindi":
            sqlTable = "hindipanchangam";
            break;
          case "Gujarati":
            sqlTable = "gujaratipanchangam";
            break;
          case "Bengali":
            sqlTable = "bengalipanchangam";
            break;
          default:
            response.status(400).send("Invalid userCalender.");
            return;
        }

        const sqlQuery = `SELECT * FROM ${sqlTable} WHERE userMasam = ? AND userNakshatra = ?`;

        connection.query(sqlQuery, [fromData.editUMonth, fromData.editUrelNakshathra], (error, result) => {
          if (error) {
            console.error('Error executing MySQL query: ', error);
            response.status(500).send(error);
          }
          else {

            let userDate = "";

            if (result.length == 0) {
              userDate = "-- Not Found --";
            } else {

              const date = new Date(result[0].userDate);
              userDate = format(date, 'dd-MM-yyyy', { awareOfUnicodeTokens: true });

              // userDate = result[0].userDate;
            }
            // const userDate = result[0].userDate;
            console.log(userDate);

            const updateQuery = "UPDATE userprofiletable SET  userDate = ? WHERE firstuserid = ?";

            connection.query(updateQuery, [userDate, fromData.firstuserid], (error, result) => {
              if (error) {
                response.status(500).send(error);
              } else {
                response.status(200).json({ message: "Profile has been edited successfully." });
                console.log("Row updated successfully");

              }
            });

          }
        });

      }
      else if (fromData.editUnakshatraTithi === "Tithi") {

        let tithiTable = "";
        switch (fromData.editUCalender) {
          case "Tamil":
            tithiTable = "tamiltithi";
            break;
          case "Telugu":
            tithiTable = "telugutithi";
            break;
          case "Kannada":
            tithiTable = "kannadamtithi";
            break;
          case "Malayalam":
            tithiTable = "malayalatithi";
            break;
          case "Hindi":
            tithiTable = "hinditithi";
            break;
          case "Gujarati":
            tithiTable = "gujaratitithi";
            break;
          case "Bengali":
            tithiTable = "bengalitithi";
            break;

          default:
            response.status(400).send("Invalid userCalender.");
            return;
        }

        const sqlQuery = `SELECT * FROM ${tithiTable} WHERE tithiMasam = ? AND tithiPaksham = ? AND tithiName = ?`;

        connection.query(sqlQuery, [fromData.editUMonth, fromData.editUPaksham, fromData.editUTithi], (error, result) => {
          // console.log(userMonth, userPaksham, userTithi);
          if (error) {
            console.error('Error executing MySQL query: ', error);
            response.status(500).send(error);
          } else {

            let tithiDatefrom = "";

            if (result.length == 0) {
              tithiDatefrom = "-- Not Found --";
            } else {
              const date = new Date(result[0].tithiDate);
              tithiDatefrom = format(date, 'dd-MM-yyyy', { awareOfUnicodeTokens: true });
            }

            // const tithiDatefrom = result[0].tithiDate;
            console.log(tithiDatefrom);

            // const updateQuery = "UPDATE relativestable SET userDate = ? WHERE profileid = ?";

            const updateQuery = "UPDATE userprofiletable SET  userDate = ? WHERE firstuserid = ?";

            connection.query(updateQuery, [tithiDatefrom, fromData.firstuserid], (error, result) => {
              if (error) {
                response.status(500).send(error);
              } else {
                response.status(200).json({ message: "Profile has been edited successfully." });
                console.log("Row updated successfully");

              }
            });

          }
        });


      }

    }


  });

})



// forgot mail 

app.get("/forgotmail", (request, response) => {

  const data = request.query
  console.log("yes");
  console.log(data.forgotmail);

  const sqlQuery = `select * from emailpassword where userEmail = '${data.forgotmail}'`

  connection.query(sqlQuery, (error, result) => {
    if (error) {
      response.status(500).send(error);
    } else {

      if (result.length === 0) {
        // If the result is empty, send a 500 error response
        response.status(500).send({
          message: "Please enter your Login Email/Sign Up!"
        });
      }

      else {


        const passwordtoken = jwt.sign(
          {
            data: {
              mail: data.forgotmail
            }
          }, 'ourSecretKey2', { expiresIn: '10m' }
        );


        const forgotmailconfig = {

          from: '"Shubadinam Team" <shubadinam.com@gmail.com>',
          to: data.forgotmail,
          subject: "Forgot Password Mail",
          html: ` <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center; background-color: #27baba21;">
          <p>To proceed, please click the button below to change your password and continue further:</p>
          <a href="https://www.shubadinam.com/verifyforgetpassword/${passwordtoken}"
            style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #fff; font-size: 16px; text-decoration: none; border-radius: 5px;">
            Continue
          </a>
          <p>If the button doesn't work, you can also click the following link to continue:</p>
          <p><a href="https://www.shubadinam.com/verifyforgetpassword/${passwordtoken}">https://www.shubadinam.com/verifyforgetpassword/${passwordtoken}</a></p>
          <p>Your support means a lot to us. Thank you for being a part of our community!</p>
          <p>Best regards,</p>
          <p>Shubadinam team</p>
        </div>`
        }


        transporter.sendMail(forgotmailconfig, function (error, info) {
          if (error) {
            throw Error(error)
          } else {
            response.status(200).send({
              message: "Mail has been sent to the below Email.",
              info: info
            })
          }

        })



      }
    }
  })


})


app.get('/verifyforgetpassword/:passwordtoken', (req, res) => {

  const { passwordtoken } = req.params;

  jwt.verify(passwordtoken, 'ourSecretKey2', function (err, decoded) {
    if (err) {
      console.log(err);
      console.log("fhfhdlhffhdsh");
      res.status(500).send("Email verification failed, possibly the link is invalid or expired");
    }
    else {
      const forgotmail = decoded.data;
      res.status(200).send(forgotmail)

    }
  });

}
)

// http://localhost:4000/confrimpassword/

app.post("/confrimpassword", [

  check('newpass', "password length 8-10").isLength({ min: 8, max: 10 }),
  check('confirmpass', "password length 8-10").isLength({ min: 8, max: 10 })

], (request, response) => {

  const Password = request.body
  console.log(Password);

  const forgotEmail = Password.forgotEmail
  console.log(forgotEmail);

  const newPassword = Password.confirmpass
  console.log(newPassword);



  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.json(errors)
  }
  else {
    const sqlQuery = `select * from emailpassword where userEmail= ? `

    connection.query(sqlQuery, [forgotEmail], (error, result) => {
      if (error) {
        response.status(500).send({
          error: error,
          message: "Something Went Wrong ! Please Login After Sometime."
        })
      }
      else {

        const firstRow = result[0];
        const userId = firstRow.userid;
        console.log(userId);

        bcrypt.hash(newPassword, 12, (err, hashedPassword) => {
          if (err) {
            response.status(500).send("Error while hashing password");
            return;
          }
          else {
            const updateQuery = "UPDATE emailpassword SET userPassword  = ? WHERE userid = ?";

            connection.query(updateQuery, [hashedPassword, userId], (error, result) => {
              if (error) {
                response.status(500).send(error);
              } else {
                response.status(200).send({
                  message: "Password has been updated successfully."
                });


              }
            })
          }

        })




      }
    })

  }



})







// app.post("/adminpanel", (request, response) => {

//   const actualPassword = "SAMANTA123"; // Replace with your actual password

//   const password = request.body.adminPassword;
//   // console.log(password);

//   if (password === actualPassword) {
//     response.status(200).send({
//       message: "success"
//     })
//   } else {
//     response.status(400).send({
//       message: "Authorization Revoked"
//     })
//   }

// })

app.get("/adminaccess", (request, response) => {


  const verifyAdmin = request.query
  console.log(verifyAdmin);

  const sqlQuery = `select * from admintable where adminUserId='${verifyAdmin.adminUserId}'`

  connection.query(sqlQuery, (err, result) => {

    if (result) {
      const adminPassword = result[0].adminPassword
      if (adminPassword === verifyAdmin.adminPassword) {
        response.status(200).send(result)
        console.log(result);
      } else {
        response.status(400).send(err)
        console.log(err);
      }
    } else {
      response.status(400).send(err)
      console.log(err);
    }
  })

})


// http://localhost:4000/adminaccess/upt/password

app.post("/adminaccess/upt/password", (request, response) => {

  const updatePassword = request.body
  console.log(updatePassword.oldPwd);

  const sqlQuery = `select * from admintable where adminPassword='${updatePassword.oldPwd}'`

  connection.query(sqlQuery, (err, res) => {
    if (res) {
      const adminId = parseInt(res[0].adminid)
      const changePassword = `update admintable set adminPassword ='${updatePassword.reconfirmPwd}' where adminid='${adminId}'`


      connection.query(changePassword, (err2, res2) => {
        if (res2) {
          response.status(200).send(res2)
        } else {
          response.status(500).send(err2)
        }
      })


    } else {
      response.status(500).send(err)
    }
  })

})


app.get("/test", (req, res) => {
  const testdata = req.query.testemail
  const truedata = atob(testdata)
  console.log(truedata);
})





const port = process.env.PORT | 4000;
server.listen(port, () => {
  console.log("Node js is running on the port", port);
});

