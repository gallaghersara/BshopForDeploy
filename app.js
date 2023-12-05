import express from "express";

const app = express();

router.get("/items", (req, res) => {
    Item.find()
      .then((items) => {
        res.json(items);
      })
      .catch((err) => {
        console.error("Failed to fetch items:", err);
        res.status(500).json({ error: "Failed to fetch items" });
      });
  });
app.listen(8100, () => {
    console.log(" port 8100");
  });