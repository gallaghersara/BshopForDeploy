//imports
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import session from 'express-session';
import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
import router from "./routes/routes.js";
import passport from "./routes/auth.js";

dotenv.config();
const {MONGO_URI, PORT,DB_USER,DB_PASS,DB_HOST,DB_NAME,SESSION_SECRET} = process.env;


// if (process.env.NODE_ENV !== 'production'){
//   dotenv.config()
// }




const app = express();

console.log("login");
app.use(express.json());
// app.use(express.urlencoded({extended:false}))
app.use(cors());
app.use(express.static('client/build'))
mongoose.set("strictQuery", true);


// app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'secretsessionkey',
  // secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/',
router);

app.get("*",(req, res) => {
  res.sendFile(__dirname+ "/client/build/index.html")
} )
mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`, {
  useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/`);
    });
  })
  .catch((err) => console.error("Failed to connect to MongoDB:", err));




