require("dotenv").config();
const express = require('express');
const app = express();
const router = express.Router();
require("./db/conn");
const cors = require('cors');
const controllers = require("./controllers/dataController");
const PORT = process.env.PORT || "5001";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json("Server Start");
});

app.get("/test", (req, res) => {
  res.status(200).json("It's Working...");
});

router.post("/api/v1/upload", controllers.datapost);
router.get("/api/v1/data", controllers.getData);
router.get("/filter", controllers.advancedatafilter);
router.get("/api/v1/popular/:id", controllers.getonedata);
router.delete("/api/v1/delete/:id", controllers.deletedata);
router.put("/api/v1/popular/update/:dataid", controllers.updatedata);

// Use the router for all routes defined above
app.use("/", router);

app.listen(PORT, () => {
  console.log("Server Started");
});
