import classNames from "classnames/bind";
import styles from "./style_update-profile.css";
import React, { useState } from "react";
import { db } from "../../firebase/config";
import { ref, set } from "firebase/database";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cx = classNames.bind(styles);

const initialState = {
  username: "",
  name: "",
  phoneNumber: "",
  email: "",
  password: "",
};

function AddHost() {
  const [state, setState] = useState(initialState);

  const { username, name, phoneNumber, email, password } = state;

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleUpdate = () => {
    const newData = state;
    const dbRef = ref(db, "Users/Host/" + newData.username);
    const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const regnum =
      /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/;

    if (
      !newData.username ||
      !newData.name ||
      !newData.phoneNumber ||
      !newData.email ||
      !newData.password
    ) {
      toast.error("Vui lòng nhập đủ các trường thông tin");
    } else if (newData.username.match(regnum)) {
      toast.error("Tài khoản không được bỏ dấu");
    } else if (newData.password.match(regnum)) {
      toast.error("Mật khẩu không được bỏ dấu");
    } else if (newData.email.match(regnum)) {
      toast.error("Email không được bỏ dấu");
    } else if (
      newData.username.match(regex) ||
      newData.name.match(regex) ||
      newData.password.match(regex)
    ) {
      toast.error("Không được chứa ký tự đặc biệt");
    } else if (newData.username.length > 10 || newData.username.length < 3) {
      toast.error("Tài khoản phải có độ dài từ 3 đến 10 ký tự");
    } else if (newData.password.length > 13 || newData.password.length < 6) {
      toast.error("Mật khẩu phải có độ dài từ 6 đến 13 ký tự");
    } else if (newData.name.length > 15 || newData.name.length < 3) {
      toast.error("Tên chủ nhà phải có độ dài từ 3 đến 15 ký tự");
    } else if (
      newData.phoneNumber.length < 10 ||
      newData.phoneNumber.length > 12
    ) {
      toast.error("Số điện thoại phải từ 10 đến 12 con số");
    } else if (!validator.isEmail(newData.email)) {
      toast.error("Đây không phải email");
    } else {
      set(dbRef, {
        username: newData.username,
        name: newData.name,
        phoneNumber: newData.phoneNumber,
        email: newData.email,
        password: newData.password,
      })
        .then(() => {
          toast.success("Tạo tài khoản thành công");
          setTimeout(() => navigate("/accountmanagementhost"), 1200);
        })
        .catch((error) => {
          toast.error("Tạo tài khoản thất bại" + error);
        });
    }
  };

  return (
    <div className={cx("update-profile")}>
      <ToastContainer />
      <form action="">
        <div className={cx("flex")}>
          <div className={cx("inputBox")}>
            <span>Tài khoản</span>
            <input
              type="text"
              className={cx("box")}
              name="username"
              value={username || ""}
              placeholder="Nhập tài khoản"
              onChange={handleInputChange}
              maxlength="15"
            />

            <span>Mật khẩu</span>
            <input
              type="text"
              className={cx("box")}
              name="password"
              value={password || ""}
              placeholder="Nhập mật khẩu"
              onChange={handleInputChange}
              maxlength="20"
            />

            <span>Tên chủ nhà</span>
            <input
              type="text"
              className={cx("box")}
              name="name"
              value={name || ""}
              placeholder="Nhập tên chủ nhà"
              onChange={handleInputChange}
              maxlength="15"
            />

            <span>Số điện thoại</span>
            <input
              type="number"
              className={cx("box")}
              name="phoneNumber"
              value={phoneNumber || ""}
              placeholder="Nhập số điện thoại"
              onChange={handleInputChange}
              maxlength="15"
            />

            <span>Email</span>
            <input
              type="email"
              className={cx("box")}
              name="email"
              value={email || ""}
              placeholder="Nhập địa chỉ email"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <input
          type="button"
          className={cx("btn")}
          value="Tạo tài khoản"
          onClick={handleUpdate}
        />
        <a href="/accountmanagementhost" className={cx("delete-btn")}>
          Quay lại
        </a>
      </form>
    </div>
  );
}

export default AddHost;
