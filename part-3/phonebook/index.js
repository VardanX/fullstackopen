require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

morgan.token('post', (request) => {
  'use strict'
  if (request.method === 'POST') {
    return JSON.stringify(request.body)
  } else return ''
})

morgan.format(
  'postFormat',
  ':method :url :status :res[content-length] - :response-time ms | :post',
)

app.use(morgan('postFormat'))


const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if(error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  }else if(error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}


app.use(express.json())

app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(person => {
    response.json(person)
  })
    .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
  'use strict'
  Person.countDocuments({})
    .then((results) => {
      response.send(`
    <p>Phonebook has info for ${results} people</p>
    <p>${new Date()}</p>
    `)
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  // const contact = phonebook.find((person) => person.id === id);
  Person.findById(id).then((person) => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))

})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body
  Person.findById(request.params.id, { runValidators: true })
    .then((contact) => {
      if (!contact) {
        response.status(404).end()
      }

      contact.name = name
      contact.number = number

      return contact.save().then((updatedContact) => {
        response.json(updatedContact)
      })
    })
    .catch((error) => {
      next(error)
    })

})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons/', (request, response, next) => {
  let contact = request.body

  if (!contact.name || !contact.number) {
    return response.status(400).json({
      error: 'content missing',
    })
  }

  let ifContactExists = ''

  Person.find(contact).then(savedContact => {
    savedContact ? ifContactExists = true : ifContactExists = false
  })
  if (ifContactExists) {
    return response.status(400).json({
      error: 'name must be unique',
    })
  }else{
    const newContact = new Person({
      name : contact.name,
      number : contact.number,
    })

    newContact.save().then(savedContact => {
      response.json(savedContact)
    }).catch(error => {next(error)})
  }
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
