
import express from 'express'

const app = express()

app.get('/', (request, response) => {
    response.send('Hello World')
})

app.get('/about', (request, response) => {
    response.send('Hello, this is about page')
})

app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`)
})