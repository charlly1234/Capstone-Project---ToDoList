import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public")); //used to grab all the static files like images and css styles
app.use(bodyParser.urlencoded({ extended: true }));

//task item storage
var todaysTasks = [];
var workTasks = [];

//grab current day to display as the header
const date = new Date();
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let weekDay = date.getDay();
let month = date.getMonth() + 1;
let day = date.getDate();

var currentDate = `${weekDays[weekDay]}, ${months[month]} ${day}`;

app.get("/", (req, res) => {
  res.render("index.ejs", {
    todaysDate: currentDate,
    tasks: todaysTasks,
   
  });
});

app.get("/work", (req, res) => {
  res.render("work.ejs", {
    tasks: workTasks
  });
});

app.post("/", (req, res) => {
  console.log(req.body["newItem"]);
  todaysTasks.push(req.body["newItem"]);
  res.render("index.ejs", {
    todaysDate: currentDate,
    tasks: todaysTasks,

  });
});

app.post("/work", (req, res) => {
  console.log(req.body["newItem"]);
  workTasks.push(req.body["newItem"]);
  res.render("work.ejs", {
    tasks: workTasks,

  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
