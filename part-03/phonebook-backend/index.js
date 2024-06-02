const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(express.static('dist'))

const Phonebook = require('./models/phonebook')
const mongoose = require('mongoose')

app.use(express.json())
app.use(cors())

morgan.token('post_data', function (req) {
    if (req.method === 'POST') {
        return JSON.stringify(req.body);
    } else {
        return '';
    }
});

const requestLogger = morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.post_data(req, res)
    ].join(' ')
});

app.use(requestLogger)

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

app.get('/info', (request, response) => {
    const date = new Date();
    const optionsShort = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    };

    const optionsLong = {
        timeZoneName: 'long'
    };

    const formatterShort = new Intl.DateTimeFormat('en-US', optionsShort)
    const formatterLong = new Intl.DateTimeFormat('en-US', optionsLong)
    let formattedDateShort = formatterShort.format(date);
    let formattedDateLong = formatterLong.format(date);
    // Remove commas
    formattedDateShort = formattedDateShort.replace(/,/g, '')
    formattedDateLong = formattedDateLong.replace(/,/g, '')

    formattedDateLong = formattedDateLong.split(' ').slice(1).join(' ')

    const formattedDate = `${formattedDateShort} (${formattedDateLong})`
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${formattedDate}</p>`)
})

app.get('/', (request, response) => {
    response.send('nothing here :)')
})

app.get('/api/persons', (request, response) => {
    Phonebook.find({}).then(persons => {
        response.json(persons)
    })
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number is missing'
        })
    }

    const person = new Phonebook({
        name: body.name,
        number: body.number,
    })

    person.save()
    .then(savedPerson => {
        response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body

    Phonebook.findByIdAndUpdate(request.params.id, 
        { name, number }, 
        { new: true, runValidators: true, context: 'query' }
    )
        .then(updatedPerson => {
            if (updatedPerson) {
                response.json(updatedPerson)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Phonebook.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Phonebook.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})