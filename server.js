require("dotenv").config();
const express = require('express');
const app = express();
const router = express.Router();
require("./db/conn");
const cors = require('cors');
const controllers = require("./controllers/dataController");

const PORT = process.env.PORT || "5001";
const API_KEY = process.env.API_KEY;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json("You are quit cleaver but not more than me. You can't access my database.😉😎");
});

// Middleware to verify API key
function verifyAPIKey(req, res, next) {
  const apiKey = req.query.apikey;
  if (apiKey !== API_KEY) {
      return res.status(401).json({ message: "Unauthorized. Invalid API key." });
  }
  next();
}


router.post("/api/v1/upload", verifyAPIKey, controllers.datapost);
router.get("/api/v1/data", verifyAPIKey, controllers.getData);
router.get("/filter", verifyAPIKey, controllers.advancedatafilter);
router.get("/api/v1/popular/:id", verifyAPIKey, controllers.getonedata);
router.delete("/api/v1/delete/:id", verifyAPIKey, controllers.deletedata);
router.put("/api/v1/popular/update/:dataid", verifyAPIKey, controllers.updatedata);

// Use the router for all routes defined above
app.use("/", router);

app.listen(PORT, () => {
  console.log("Server Started");
});

