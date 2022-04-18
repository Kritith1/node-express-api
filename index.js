const { response } = require("express");
const { request } = require("express");
const express = require("express");
require("dotenv/config");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (request, response) => {
  response.send("Hello");
});

//get data for mockup data
let accounts = [
  {
    id: 1,
    username: "hello",
    role: "admin",
  },
  {
    id: 2,
    username: "kriti",
    role: "guest",
  },
  {
    id: 3,
    username: "express",
    role: "guest",
  },
];

app.get("/accounts", (request, response) => {
  response.json(accounts);
});

app.get("/accounts/:id", (request, response) => {
  const accountId = Number(request.params.id);
  const getAccount = accounts.find((account) => account.id === accountId);

  if (!getAccount) {
    response.status(500).send("Account not found");
  } else {
    response.json(getAccount);
  }
});

//POST method
app.post("/accounts", (request, response) => {
  const incomingAccount = request.body;

  accounts.push(incomingAccount);

  response.json(accounts);
});

//PUT method for edit and update accounts data
app.put("/accounts/:id", (request, response) => {
  const accountId = Number(request.params.id);
  const body = request.body;
  const account = accounts.find((account) => account.id === accountId);
  const index = accounts.indexOf(account);

  if (!account) {
    response.status(500).send("Account not found.");
  } else {
    const updatedAccount = { ...account, ...body };

    accounts[index] = updatedAccount;

    response.send(updatedAccount);
  }
});

//DELETE method to delete a user from data
app.delete("/accounts/:id", (request, response) => {
  const accountId = Number(request.params.id);
  const newAccounts = accounts.filter((account) => account.id != accountId);

  if (!newAccounts) {
    response.status(500).send("Account not found");
  } else {
    accounts = newAccounts;
    response.send(accounts);
  }
});
app.listen(PORT, () =>
  console.log("Express server currently running on port ${PORT}")
);
