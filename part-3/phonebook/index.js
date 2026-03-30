require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Person = require("./models/person");

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

morgan.token("post", (request, _response) => {
  "use strict";
  if (request.method === "POST") {
    return JSON.stringify(request.body);
  } else return "";
});

morgan.format(
  "postFormat",
  ":method :url :status :res[content-length] - :response-time ms | :post",
);

app.use(morgan("postFormat"));

let phonebook = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};


app.use(express.json());

app.get("/api/persons", (request, response) => {
  Person.find({}).then(person => {
    response.json(person);
  });
});

app.get("/info", (request, response) => {
  const entries = `Phonebook has info for ${phonebook.length} people`;
  let now = new Date();
  response.send(`<h4>${entries}</h4><h4>${now}</h4>`);
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;

  // const contact = phonebook.find((person) => person.id === id);
  Person.findById(id).then((person) => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  })
    .catch(error => next(error));

});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;

  Person.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end();
    })
    .catch(error => next(error))
});

app.post("/api/persons/", (request, response) => {
  let contact = request.body;

  if (!contact.name || !contact.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  let ifContactExists = "";

  Person.find(contact).then(savedContact => {
    savedContact ? ifContactExists = true : ifContactExists = false;
  })
  if (ifContactExists) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }else{
    const newContact = new Person({
      name : contact.name,
      number : contact.number,
    })

    newContact.save().then(savedContact => {
      response.json(savedContact)
    })
  }
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
