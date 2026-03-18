const express = require("express");
const morgan = require("morgan");
const app = express();


app.use(express.json());
app.use(morgan("tiny"));


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
        response.status(404).end();
    }
})

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id;
    phonebook = phonebook.filter(person => person.id !== id)
    response.status(204).end();
});

app.post("/api/persons/", (request, response) => {
    const id = Math.floor(Math.random() * ((30000 - phonebook.length) + phonebook.length));
    let contact = request.body

    if(!contact.name || !contact.number){
        return response.status(400).json({
            error: 'content missing'
        })
    }

    let ifContactExists = phonebook.find(phone => phone.name === contact.name)
    if(ifContactExists){
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    contact["id"] = id;
    phonebook.push(contact)
    response.json(contact);
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
