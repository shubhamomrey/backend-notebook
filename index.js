const connectToMongo = require("./db");
const express = require("express");
const app = express();
var cors = require('cors')

app.use(express.json());

app.use(cors())

async function startServer() {
  try {
    await connectToMongo(); 
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}
startServer();
// Availble routes 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


app.listen(9000, () => {
  console.log("Notebook backend is running on port 9000");
});
