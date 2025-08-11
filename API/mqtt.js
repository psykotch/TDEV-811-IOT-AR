import  mqtt  from "mqtt";
const client = mqtt.connect("mqtt://localhost:1883");


client.on('connect', () => {
  console.log('Connected')

  client.subscribe(["bonjour"], () => {
    console.log("subscribed to topic bonjour");
    client.publish("bonjour", 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
      if (error) {
        console.error(error)
      }
    })
  })
})


client.on('message', (topic, payload) => {
  console.log('Received Message:', topic, payload.toString())
})

export default client