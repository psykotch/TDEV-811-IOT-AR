import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import  mqtt  from "mqtt";

import pool from "./config/db.js";
import trashcanRoutes from "./routes/trashcanRoutes.js"; 
import errorHandling from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

const client = mqtt.connect("mqtt://192.168.4.1:1883", {
    username: "API",
    password: "secret"
});

client.on('connect', () => {
  console.log('Connected')

  client.subscribe(["picomqtt/esp-00:00:00:00:00:00"], () => {
    console.log("subscribed to topic bonjour");
    client.publish("picomqtt/esp-00:00:00:00:00:00", 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
      if (error) {
        console.error(error)
      }
    })
  })
})


client.on('message', (topic, payload) => {
  console.log('Received Message:', topic, payload.toString())
})

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
