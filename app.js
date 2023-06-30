const { MongoClient, ServerApiVersion } = require('mongodb')

require('dotenv').config()
const mongodbKey = process.env.MONGODB_KEY
const mongodbUser = process.env.MONGODB_USER

const express = require('express')
const app = express()
const port = 4000
const url = `mongodb+srv://${mongodbUser}:${mongodbKey}@cluster0.pj88ulm.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect()
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 })
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!',
    )

    c
  } catch (error) {
    console.error(error)
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
