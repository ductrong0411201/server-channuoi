const { User, Role } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtGenerator = require("../utils/jwt-generator");
const transporter = require("../utils/transporter");

const ROLE = {
  khuyen_nong_co_so: 2,
  nha_nong: 3,
  ky_thuat_vien_thu_y: 4,
};

exports.store = async (req, res) => {
  try {
    const { name, mobile, password, role } = req.body;
    const old_user = await User.findOne({ where: { mobile: mobile } });
    if (old_user) {
      return res
        .status(401)
        .json({ status: 401, error: "Số điện thoại đã được đăng ký" });
    }
    const salt = await bcrypt.genSalt(12);
    const hashed_password = await bcrypt.hash(password, salt);
    const new_user = await User.create({
      name,
      mobile,
      password: hashed_password,
      role_id: ROLE[role],
    });
    res.status(200).json({
      status: 200,
      message: "Thành công",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { mobile, password, role } = req.body;
    const user = await User.findOne({
      where: { mobile: mobile },
    });
    if (!user) {
      return res
        .status(401)
        .json({ status: 401, message: "Tài khoản hoặc mật khẩu không đúng" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: 401, message: "Tài khoản hoặc mật khẩu không đúng" });
    }
    const token = jwtGenerator(user.id);
    return (
      res
        .json({ status: 200, message: "Success", token: token })
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

exports.logout = async (req, res) => {
  try {
    await res.clearCookie("token");
    res
      .status(200)
      .json({ status: 200, message: "Your account has been logout" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const old_user = await User.findOne({
      where: { email: email, confirmed: true },
    });
    if (!old_user) {
      res.status(404).json({
        status: 404,
        message: "Không thể tìm thấy tài khoản",
      });
    }
    const token_reset = jwtGenerator(old_user.id, (expiresIn = "15m"));
    const link = `http://localhost:8080/reset-password/${old_user.id}/${token_reset}`;
    let mailInfo = {
      from: "Admin",
      to: email,
      subject: "Reset Password",
      text: "Click on the following link to reset your password " + link,
    };
    transporter.sendMail(mailInfo);
    res.status(200).json({
      status: 200,
      message: "Reset link has been sent to your email",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};
exports.resetPassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;

    const verify = jwt.verify(token, process.env.JWT_SECRET);
    const currentTime = Math.floor(Date.now() / 1000);
    if (verify.exp < currentTime) {
      res.status(401).json({
        status: 401,
        message: "Invalid token",
      });
    }
    const old_user = await User.findOne({ where: { id } });
    if (!old_user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }
    const salt = await bcrypt.genSalt(12);
    const hashed_password = await bcrypt.hash(password, salt);
    await old_user.update({
      password: hashed_password,
    });
    res.status(200).json({ status: 200, message: "Success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: { exclude: ["password"] },
      include: [{ model: Role, as: "role" }],
    });
    if (!user) {
      return res.status(404).json({ status: 404, error: "User not found" });
    }
    console.log(user);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

exports.checkToken = async (req, res) => {
  try {
    const { token } = req.body;
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    const currentTime = Math.floor(Date.now() / 1000);
    if (verify.exp > currentTime) {
      return res.status(200).json({ status: 200, message: "Thành công" });
    }
    return res
      .status(401)
      .json({ status: 401, message: "Hết phiên đăng nhập" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};
