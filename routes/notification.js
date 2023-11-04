const express = require("express");
const router = express.Router();
const DeviceTokenController = require("../src/controllers/DeviceTokenController");
const auth = require("../src/middlewares/authorizeMiddleware");


router.post("/device", auth, DeviceTokenController.newDevice);

router.delete("/device", auth, DeviceTokenController.removeDevice);

module.exports = router;