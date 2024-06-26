const express = require('express');
const app = express();
const router = express.Router();
require("dotenv").config();
require("./db/conn");
const cors = require('cors');
const controllers = require("./controllers/dataController");

const PORT = process.env.PORT || "5001";
const API_KEY = process.env.API_KEY;
const ALLOWED_HOST = "gojoo.fun";
const ALLOWED_HOST_ZORO = "zorox.fun";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json("You are quite clever but not more than me. You can't access my database.😉😎");
});

// Middleware to verify API key and host
function verifyRequest(req, res, next) {
  const apiKey = req.query.apikey;

  // Check if API key is valid
  if (apiKey !== API_KEY) {
    return res.status(401).json({ message: "Unauthorized. Invalid API key." });
  }


  next();
}

router.post("/api/v1/upload", verifyRequest, controllers.datapost);
router.get("/api/v1/data", verifyRequest, controllers.getData);
router.get("/filter", verifyRequest, controllers.advancedatafilter);
router.get("/api/v1/popular/:id", verifyRequest, controllers.getonedata);
router.delete("/api/v1/delete/:id", verifyRequest, controllers.deletedata);
router.put("/api/v1/popular/update/:dataid", verifyRequest, controllers.updatedata);

// Use the router for all routes defined above
app.use("/", router);

app.listen(PORT, () => {
  console.log("Server Started");
});
