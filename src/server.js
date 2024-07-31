import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import animalRoutes from './routes/animalRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import vetRoutes from './routes/vetRoutes.js'; // Importe as rotas do veterinário

dotenv.config();

const app = express();
app.use(express.json());

// Configuração do CORS para permitir todas as origens
app.use(cors());

app.get('/', (req, res) => res.status(200).send('API - ByteVet'));
app.listen(3000, () => console.log('Server is running on port 3000'));


app.use('/animais', animalRoutes); // http://localhost:3000/animais
app.use('/auth', authRoutes); // http://localhost:3000/auth
app.use('/users', userRoutes); // http://localhost:3000/users
app.use('/vet', vetRoutes); // Utilize as rotas do veterinário

const uri = process.env.DB_URI || "mongodb+srv://admin:bytevet5@cluster0.dqila1o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server    (optional starting in v4.7)
    await mongoose.connect(uri);
    // Send a ping to confirm a successful connection
    await client.db().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
