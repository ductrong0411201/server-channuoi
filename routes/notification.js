const express = require("express");
const router = express.Router();
const DeviceTokenController = require("../src/controllers/DeviceTokenController");
const NotificationController = require("../src/controllers/NotificationController");
const auth = require("../src/middlewares/authorizeMiddleware");


router.post("/device", auth, DeviceTokenController.newDevice);

router.delete("/device", auth, DeviceTokenController.removeDevice);

router.get("/reports-by-role/:role", auth, NotificationController.notificationByRole);

router.get("/reports-by-user", auth, NotificationController.notificationByUser);

module.exports = router;