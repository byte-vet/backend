import express, { Request, Response, NextFunction } from 'express';
import "express-async-errors";
import { router } from "./routes";
import { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: '*'
}));

const uri = process.env.DB_URI as string;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


app.use(router);

app.get("/_health_check", (_, res: Response) => res.sendStatus(200))

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message
    })
  }
  return res.status(500).json({
    status: "error",
    message: "Internal Server Error"
  })
});

app.listen(3200)
console.log('Servidor no ar na porta 3200')

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