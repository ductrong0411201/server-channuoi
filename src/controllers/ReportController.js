const {
  Report,
  User,
  ReportType,
  Notification,
  DeviceToken,
} = require("../models");
const moment = require("moment");
require("dotenv").config();
const { getMessaging } = require("firebase-admin/messaging");
const Sequelize = require("sequelize");

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
    if (date_release > date_sale) {
      return res.status(400).json({
        status: 400,
        message: "Ngày xuất phải muộn hơn ngày thả",
      });
    }
    const new_report = await Report.create({
      num_livestock,
      date_release,
      date_sale,
      description,
      image_path,
      type_id: REPORT_TYPE[type],
      created_by: req.user.id,
    });
    const noti_success = await Notification.create({
      title: "Báo cáo đã gửi",
      body: type,
      from: req.user.id,
      report_id: new_report.id,
      to: req.user.id,
    });
    const user = await User.findOne({
      id: req.user.id,
    });
    const devices = await DeviceToken.findAll({
      where: {
        active: true,
      },
      include: [
        {
          model: User,
          as: "user_device",
          attributes: [],
          where: {
            role_id: { [Sequelize.Op.in]: user.role_id == 3 ? [2, 4] : [2] },
          },
        },
      ],
    });
    if (devices.length > 0) {
      const deviceTokens = [];
      const titleNotification = "Báo cáo mới";
      devices.forEach(async (e) => {
        deviceTokens.push(e.token);
        const new_notification = await Notification.create({
          title: titleNotification,
          body: type,
          from: req.user.id,
          report_id: new_report.id,
          to: e.user_id,
        });
      });
      sendNotification(deviceTokens, titleNotification, type);
    }
    res.status(200).json({
      status: 200,
      message: "Thành công",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

exports.uploadImage = (req, res) => {
  res.status(200).json(req.file);
};

exports.approveReport = async (req, res) => {
  try {
    const { approved_description } = req.body;
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user.role_id != 2) {
      return res.status(403).json({
        status: 403,
        message: "Bạn không có quyền",
      });
    }
    if (approved_description == null || approved_description == "") {
      return res.status(400).json({
        status: 400,
        message: "Cần phải nhập thông tin duyệt",
      });
    }
    const report = await Report.findOne({
      where: { id: req.params.id },
      include: [{ model: ReportType, as: "type" }],
    });
    report.update({
      approved: true,
      approved_description: approved_description,
    });

    const devices = await DeviceToken.findAll({
      where: {
        active: true,
        user_id: report.created_by,
      },
    });
    if (devices.length > 0) {
      const deviceTokens = [];
      const titleNotification = "Báo cáo đã được duyệt";
      devices.forEach(async (e) => {
        deviceTokens.push(e.token);
        const new_notification = await Notification.create({
          title: titleNotification,
          body: report.type.dataValues.type,
          from: req.user.id,
          report_id: report.id,
          to: e.user_id,
        });
      });
      sendNotification(
        deviceTokens,
        titleNotification,
        report.type.dataValues.type
      );
    }
    res.status(200).json({
      status: 200,
      message: "Thành công",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

exports.newReport = async (req, res) => {
  try {
    const reports = await Report.findAll({
      limit: 10,
      order: [["createdAt", "DESC"]],
      include: [{ model: ReportType, as: "type" }],
    });
    res.status(200).json({
      status: 200,
      message: "Thành công",
      data: reports,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

exports.show = async (req, res) => {
  try {
    const report = await Report.findOne({
      where: [
        {
          id: req.params.id,
        },
      ],
      include: [
        { model: ReportType, as: "type" },
        {
          model: User,
          as: "user_create",
          attributes: {
            exclude: [
              "password",
              "role_id",
              "deletedAt",
              "createdAt",
              "updatedAt",
            ],
          },
        },
      ],
    });
    res.status(200).json({
      status: 200,
      message: "Thành công",
      data: report,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

function sendNotification(registrationTokens, title, body) {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    tokens: registrationTokens,
  };
  getMessaging()
    .sendMulticast(message)
    .then((response) => {
      if (response.failureCount > 0) {
        const failedTokens = [];
        response.responses.forEach((resp, idx) => {
          if (!resp.success) {
            failedTokens.push(registrationTokens[idx]);
          }
        });
      }
    });
}
