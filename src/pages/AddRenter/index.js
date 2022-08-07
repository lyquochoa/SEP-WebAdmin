import classNames from "classnames/bind";
import styles from "./style_update-profile.css";
import React, { useState } from "react";
import { db } from "../../firebase/config";
import { ref, set } from "firebase/database";
import validator from "validator";

const cx = classNames.bind(styles);

const initialState = {
  name: "",
  phoneNumber: "",
  email: "",
  password: "",
};

function AddRenter() {
  const [state, setState] = useState(initialState);

  const { name, phoneNumber, email, password } = state;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleUpdate = () => {
    const newData = state;
    const dbRef = ref(db, "Users/Renter/" + newData.name);

    if (
      !newData.name ||
      !newData.phoneNumber ||
      !newData.email ||
      !newData.password
    ) {
      alert("Vui lòng nhập đủ các trường thông tin");
    } else if (
      newData.phoneNumber.length < 10 ||
      newData.phoneNumber.length > 12
    ) {
      alert("Số điện thoại phải từ 10 đến 12 con số");
    } else if (newData.name.length > 10 || newData.name.length < 3) {
      alert("Tài khoản phải có độ dài từ 3 đến 10 ký tự");
    } else if (!validator.isEmail(newData.email)) {
      alert("Đây không phải email");
    } else if (newData.password.length > 13 || newData.password.length < 6) {
      alert("Mật khẩu phải có độ dài từ 6 đến 13 ký tự");
    } else {
      set(dbRef, {
        name: newData.name,
        phoneNumber: newData.phoneNumber,
        email: newData.email,
        password: newData.password,
      })
        .then(() => {
          // <Navigate to="/accountmanagement" />;
          alert("Tạo tài khoản thành công");
        })
        .catch((error) => {
          alert("Tạo tài khoản không thành công, chi tiết" + error);
        });
    }
  };

  return (
    <div className={cx("update-profile")}>
      <form action="">
        <div className={cx("flex")}>
          <div className={cx("inputBox")}>
            <span>Tài khoản</span>
            <input
              type="text"
              className={cx("box")}
              name="name"
              value={name || ""}
              placeholder="Nhập tài khoản"
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
            <input type="hidden" name="old_pass" value="" />
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
          </div>
        </div>
        <input
          type="button"
          className={cx("btn")}
          value="Tạo tài khoản"
          onClick={handleUpdate}
        />
        <a href="/accountmanagement" className={cx("delete-btn")}>
          Quay lại
        </a>
      </form>
    </div>
  );
}

export default AddRenter;
