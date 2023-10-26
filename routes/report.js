const express = require("express");
const router = express.Router();
const ReportController = require("../src/controllers/ReportController");
const auth = require("../src/middlewares/authorizeMiddleware");

router.post("/reports", auth, ReportController.store);

module.exports = router;
