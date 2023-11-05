const express = require("express");
const router = express.Router();
const DeviceTokenController = require("../src/controllers/DeviceTokenController");
const NotificationController = require("../src/controllers/NotificationController");
const auth = require("../src/middlewares/authorizeMiddleware");


router.post("/device", auth, DeviceTokenController.newDevice);

router.delete("/device", auth, DeviceTokenController.removeDevice);

router.get("/notifications-by-role/:role", auth, NotificationController.notificationByRole);

router.get("/notifications-by-user", auth, NotificationController.notificationByUser);

router.get("/mark-read/:id", auth, NotificationController.markReadNoti);

router.get("/count-notifications", auth, NotificationController.countNotifications);

module.exports = router;