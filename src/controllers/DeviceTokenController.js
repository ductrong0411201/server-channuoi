const { Report, User, DeviceToken } = require("../models");
const moment = require("moment");
require("dotenv").config();

exports.newDevice = async (req, res) => {
  try {
    const { token } = req.body;
    const oldToken = await DeviceToken.findOne({
      where: {
        token: token,
        user_id: req.user.id,
        active: true,
      },
    });
    if (oldToken) {
      return res.status(200).json({
        status: 200,
        message: "Thành công",
      });
    }
    const newToken = await DeviceToken.create({
      token: token,
      user_id: req.user.id,
    });
    return res.status(200).json({
      status: 200,
      message: "Thành công",
      data: newToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

exports.removeDevice = async (req, res) => {
  try {
    const { token } = req.body;
    await DeviceToken.destroy({
      where: {
        token: token,
        user_id: req.user.id,
      },
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
