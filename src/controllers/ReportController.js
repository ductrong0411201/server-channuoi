const { Report } = require("../models");
const moment = require("moment");
require("dotenv").config();

const REPORT_TYPE = {
  "Báo cáo chăn nuôi": 1,
  "Báo cáo môi trường": 2,
  "Báo cáo bệnh dịch": 3,
  "Báo cáo vật tư": 4,
};

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
    if(date_release > date_sale ) {
      return res.status(400).json({
      status: 400,
      message: "Ngày xuất phải muộn hơn ngày thả",
      })
    };
    const new_report = await Report.create({
      num_livestock,
      date_release,
      date_sale,
      description,
      image_path,
      type_id: REPORT_TYPE[type],
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
  res.status(200).json(req.file);
};
