let express = require("express");
const app = express();
const authRoute=require('./routes/auth.routes');
const morgan = require("morgan");
const connectToDB=require('./config/db')
const dotenv=require('dotenv');
const cookieParser = require("cookie-parser");
dotenv.config();

//view Engine
app.set('view engine','ejs')

//middleWares
app.use(morgan('dev'))
app.use(express.static("public"));//to use styles
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser())

//Db
connectToDB()


app.get("/", (req, res) => {
  res.send("Hello World");
});



// Use external routes
app.use(authRoute);

// Start the server
const port = process.env.PORT || 3000; // Make the port configurable
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});