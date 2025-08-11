import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pool from "./config/db.js";
import trashcanRoutes from "./routes/trashcanRoutes.js"; 
import errorHandling from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// Routes 
app.use("/api", trashcanRoutes);

// error
app.use(errorHandling);

const port = process.env.APP_PORT || 3000;

// testing POSTGRES connection 

app.get("/", async(req, res) => {
    console.log("start");
    const result = await pool.query("SELECT current_database()");
    console.log("end");
    res.send(`the database name is : ${result.rows[0].current_database}`)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/status', (request, response) => {
   const status = {
      'Status': 'Running'
   };
   
   response.send(status);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
