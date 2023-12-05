import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../Schemas/userModel.js";
import router from "./routes.js";
// import { strategy as GoogleStrategy } from './google'


passport.serializeUser( (user, done)=> {
  done(null, user.id);
});

passport.deserializeUser( (id, done)=> {
  User.findById(id)
    .then((user) => 
    done(null, user))
    .catch((err)=>
    done(err)
    )
  });
export default passport;
// passport.use(
//   new LocalStrategy(function (name, password, done) {
//     User.findOne({ name: name }, function (err, user) {
//       if (err) return done(err);
//       if (!user) return done(null, false, { message: 'Incorrect username.' });

//       bcrypt.compare(password, user.password, function (err, result) {
//         if (err) return done(err);
//         if (!result) return done(null, false, { message: 'Incorrect password.' });

//         return done(null, user);
//       });
//     });
//   })
// );



// passport.use(
//   new LocalStrategy(function (name, password, cb) {
//     User.findOne({ name: name })
//       .exec()
//       .then((user) => {
//         if (user) {
//           return cb(null, false, { message: 'Username already exists.' });
//         }

//         // Hash the password
//         const hashedPassword = bcrypt.hashSync(password, 10);

//         // Create a new user
//         // const newUser = new User({ username: user_name, password: hashedPassword });

//         // Save the new user to the database
//         // return newUser.save();
//       })
//       .then((savedUser) => {
//         return cb(null, savedUser);
//       })
//       .catch((err) => {
//         return cb(err);
//       });
//   })
// );
