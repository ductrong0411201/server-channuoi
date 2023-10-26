const { Report } = require("../models");
const moment = require("moment");
require("dotenv").config();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../../storage");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
exports.store = async (req, res) => {
  try {
    let {
      num_livestock,
      date_release,
      date_sale,
      description,
      image_path,
      type,
    } = req.body;
    date_release = moment(date_release, "DD/MM/YYYY").toDate();
    date_sale = moment(date_sale, "DD/MM/YYYY").toDate();
    const new_report = await Report.create({
      num_livestock,
      date_release,
      date_sale,
      description,
      image_path,
      type_id: type,
      created_by: req.user.id,
    });
    res.status(200).json({
      status: 200,
      message: "Thành công",
      data: new_report,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

exports.uploadImage = (req, res) => {
  upload.single("image");
};