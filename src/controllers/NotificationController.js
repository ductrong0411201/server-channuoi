const { Notification, Report, User, DeviceToken } = require("../models");
require("dotenv").config();

exports.index = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        { model: Report, as: "report" },
        {
          model: User,
          as: "from_user",
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
      data: notifications,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

exports.notificationByUser = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        to: req.user.id,
      },
      include: [
        {
          model: User,
          as: "from_user",
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
        {
          model: User,
          as: "to_user",
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
      data: notifications,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};
exports.notificationByRole = async (req, res) => {
  try {
    const { role } = req.params;
    const notifications = await Notification.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        to: req.user.id,
      },
      include: [
        {
          model: User,
          as: "from_user",
          attributes: {
            exclude: ["password", "deletedAt", "createdAt", "updatedAt"],
          },
          where: {
            role_id: role,
          },
        },
      ],
    });
    res.status(200).json({
      status: 200,
      message: "Thành công",
      data: notifications,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

exports.markReadNoti = async (req, res) => {
  try {
    const notification = await Notification.findOne({
      where: {
        id: req.params.id,
      },
    });
    notification.update({
      seen: true,
    });
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
