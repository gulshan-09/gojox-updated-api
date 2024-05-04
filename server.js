const express = require('express');
const app = express();
const router = express.Router();
require("dotenv").config();
require("./db/conn");
const cors = require('cors');
const controllers = require("./controllers/dataController");

const PORT = process.env.PORT || "5001";
const API_KEY = process.env.API_KEY;
const ALLOWED_HOSTS = ["zorox.fun", "gojoo.fun", "huramovies.fun", "streamixz.com", "gojox.cloud"];

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json("You are quite clever but not more than me. You can't access my database.😉😎");
});

// Middleware to verify request URL
function verifyRequestURL(req, res, next) {
    const host = req.headers.host;
    if (!ALLOWED_HOSTS.includes(host)) {
        return res.status(403).json({ message: "Forbidden. Host not allowed." });
    }
    next();
}

// Middleware to verify API key
function verifyAPIKey(req, res, next) {
    const apiKey = req.query.apikey;
    if (apiKey !== API_KEY) {
        return res.status(401).json({ message: "Unauthorized. Invalid API key." });
    }
    next();
}

router.post("/api/v1/upload", verifyRequestURL, verifyAPIKey, controllers.datapost);
router.get("/api/v1/data", verifyRequestURL, verifyAPIKey, controllers.getData);
router.get("/filter", verifyRequestURL, verifyAPIKey, controllers.advancedatafilter);
router.get("/api/v1/popular/:id", verifyRequestURL, verifyAPIKey, controllers.getonedata);
router.delete("/api/v1/delete/:id", verifyRequestURL, verifyAPIKey, controllers.deletedata);
router.put("/api/v1/popular/update/:dataid", verifyRequestURL, verifyAPIKey, controllers.updatedata);

// Use the router for all routes defined above
app.use("/", router);

app.listen(PORT, () => {
    console.log("Server Started");
});
