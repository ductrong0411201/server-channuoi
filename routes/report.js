const express = require("express");
const router = express.Router();
const ReportController = require("../src/controllers/ReportController");
const auth = require("../src/middlewares/authorizeMiddleware");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./storage");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/new-reports", auth, ReportController.newReport);

router.get("/list-reports", auth, ReportController.reportByRole);

router.get("/list-reports-by-user", auth, ReportController.reportByUser);

router.post("/reports", auth, ReportController.store);

router.get("/reports/:id", auth, ReportController.show);

router.post("/reports/:id/approved", auth, ReportController.approveReport);

router.post(
  "/upload-image",
  upload.single("image"),
  ReportController.uploadImage
);

router.post(
  "/upload-image-mutiple",
  upload.array("images", 4),
  ReportController.uploadImage
);


module.exports = router;
