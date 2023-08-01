const express = require('express')
const app = express()
const cors = require('cors');
const port = 8000;

app.use(cors())
app.get('/', (req, res) =>  res.json({ message: 'Hello, World!' }))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))