import express from "express";
import Item from "../Schemas/item.js";
import passport from "./auth.js";
import { ensureLoggedIn } from "connect-ensure-login";
import User from "../Schemas/userModel.js";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists." });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    newUser.userID = Date.now();
    await newUser.save();

    res.status(201).json({ message: "Registration successful.", newUser });
    console.log(req.body);

  } catch (err) {
    res.status(500).json({ error: "Failed to register user." });

  }
});

router.post(
  "/login",
  (req, res, next) => {
    console.log("reached passport");
    next();
  },
  passport.authenticate(
    new LocalStrategy(function (user, password, cb) {
      console.log("reached passport");
      User.findOne({ name: user })
        .exec()
        .then((user) => {
          console.log(user);
          console.log("reached passport2");
          if (!user) {
            console.log("No user with that email");
            return cb(null, false);
          }

          bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch) {
              console.log("Password incorrect");
              return cb(null, false);
            }
            console.log("login successful");
            return cb(null, user);
          });
        })
        .catch((err) => {
          console.log("reached passport3");
          return cb(err);
        });
    }),
    {
      // successRedirect: "/",
      // failureRedirect: "/",
      failureRedirect: "/login",
      // failureFlash: true,
    }
  ),
  (req, res) => {
    res.json(req.user);
  }
);
function checkAuthenticated(req,res,next){
  if (req.isAuthenticated()){
    return next()
  }
  res.redirect('/faileddd')
}
function checkNotAuthenticated(req,res,next){
  if (req.isAuthenticated()){
    return res.redirect('/')
  }
  next()
}

router.post('/logout', checkAuthenticated, function(req, res, next){
  req.logout(function(err) {
    // if (err) { return next(err); }
    console.log("logout succes");
    res.redirect('/login');
  });
});


router.get("/users",  checkAuthenticated, (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error("Failed to fetch items:", err);
      res.status(500).json({ error: "Failed to fetch items" });
    });
});

router.post("/add-item", async (req, res) => {
  let product = new Item(req.body);
  let result = await product.save();
  res.send(result);
});

router.get("/items",  (req, res) => {
  Item.find()
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      console.error("Failed to fetch items:", err);
      res.status(500).json({ error: "Failed to fetch items" });
    });
});

router.get("/product/:id", async (req, res) => {
  // try {
  let result = await Item.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No record found." });
  }
  // } catch (error) {
  //   console.error("Error fetching product details:", error);
  //   res.status(500).send({ error: "Internal server error" });
  // }
});

router.put("/product/:id", async (req, res) => {
  // try {
  let result = await Item.updateOne({ _id: req.params.id }, { $set: req.body });
  res.send(result);
  // } catch (error) {
  //   console.error("Error updating product:", error);
  //   res.status(500).send({ error: "Internal server error" });
  // }
});

router.delete("/product/:id", async (req, res) => {
  let result = await Item.deleteOne({ _id: req.params.id });

  res.send(result);
});

router.get("/products", async (req, res) => {
  const products = await Item.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No f Product found" });
  }
  // .then((items) => {
  //   res.json(items);
  // })
  // .catch((err) => {
  //   console.error("Failed to fetch items:", err);
  //   res.status(500).json({ error: "Failed to fetch items" });
  // });
});

router.get("/search/:key", async (req, res) => {
  let result = await Item.find({
    $or: [
      {
        title: { $regex: req.params.key },
      },
      {
        category: { $regex: req.params.key },
      },
    ],
  });
  res.send(result);
});

export default router;
