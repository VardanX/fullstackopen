const express = require("express");
const app = express();

const phonebook = [
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

app.use(express.json());

app.get("/api/persons", (request, response) => {
  response.json(phonebook);
});

app.get("/info", (request, response) => {
    const entries = `Phonebook has info for ${phonebook.length} people`;
    let now = new Date();
    response.send(`<h4>${entries}</h4><h4>${now}</h4>`);
});

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const contact = phonebook.find(person => person.id === id)
    if (contact){
        response.json(contact)
    }else{
        response.status(404).end()
    }
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
