const { Report, User, DeviceToken } = require("../models");
require("dotenv").config();

exports.index = async (req, res) => {
  try {
    const reports = await Report.findAll({
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
