const express = require("express");
const bodyParser = require("body-parser");
const { WebhookClient } = require("dialogflow-fulfillment");

require("dotenv").config();

const {
  dialogflow,
  actionsdk,
  Image,
  Table,
  Carousel
} = require("actions-on-google");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function gedate(agent) {
  agent.add(
    "The General Election will take place on Thursday 12th December 2019"
  );
  agent.add(
    `The next General Election is planned to take place on the 12th December 2019`
  );
}

function welcome(agent) {
  agent.add(
    `My name is Simon Fell and I am your parliamentary candidate for Barrow and the surrounding Furness area.`
  );
}

function broadband(agent) {
  agent.add(
    `Investment in rural broadband is vital. Broadband is not just essential for businesses across the United Kingdom, but it also makes areas more attractive places to live and work. High quality broadband also helps rejuvenate otherwise more isolated communities that feel left behind.`
  );
}

function WebhookProcessing(req, res) {
  const agent = new WebhookClient({ request: req, response: res });

  let intentMap = new Map();
  intentMap.set("When is the General Election", gedate);
  intentMap.set("Default Welcome Intent", welcome);
  intentMap.set("What Gigabit Broadband Upgrade", broadband);
  agent.handleRequest(intentMap);
}

app.post("/", (req, res) => {
  console.log("DialogFlow Server Reached!!!");

  WebhookProcessing(req, res);
});

//app.intent("when is the general election", conv => {
//  conv.ask(
//    "The General Election is to take the place on Thursday 12th December 2020"
//  );
//});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
