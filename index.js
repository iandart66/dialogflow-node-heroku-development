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
    "The General Election will take place on Thursday 12th December 2020"
  );
}

function WebhookProcessing(req, res) {
  const agent = new WebhookClient({ request: req, response: res });

  let intentMap = new Map();
  intentMap.set("When is the General Election", gedate);
  agent.handleRequest(intentMap);
}

app.post("/", (req, res) => {
  console.log("DialogFlow Server Reached!!!");

  WebhookProcessing(req, res);
});

//app.intent("Default Welcome Intent", conv => {
//  conv.ask("How are you?");
//});

//app.intent("when is the general election", conv => {
//  conv.ask(
//    "The General Election is to take the place on Thursday 12th December 2020"
//  );
//});

const port = process.env.port || 5000;
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
