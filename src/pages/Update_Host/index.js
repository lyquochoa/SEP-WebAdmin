import classNames from "classnames/bind";
import styles from "./style_update-profile.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/config";
import { ref, onValue, update } from "firebase/database";
import validator from "validator";

const cx = classNames.bind(styles);

const initialState = {
  name: "",
  phoneNumber: "",
  email: "",
  password: "",
};

function UpdateHost() {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const { name, phoneNumber, email, password } = state;

  const { id } = useParams();

  useEffect(() => {
    const dbRef = ref(db, "Users/Host");

    onValue(dbRef, (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
    };
  }, [id]);

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState });
    }

    return () => {
      setState({ ...initialState });
    };
  }, [id, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleUpdate = () => {
    const dbRef = ref(db, `Users/Host/${id}`);
    const newData = state;

    if (
      !newData.name ||
      !newData.phoneNumber ||
      !newData.email ||
      !newData.password
    ) {
      alert("Vui lòng nhập đủ các trường thông tin");
    } else if (newData.phoneNumber.length < 10) {
      alert("Sô điện thoại không được ít hơn 10 số");
    } else if (newData.name.length > 10 || newData.name.length < 3) {
      alert("Tài khoản phải có độ dài từ 3 đến 12 ký tự");
    } else if (!validator.isEmail(newData.email)) {
      alert("Đây không phải email");
    } else if (newData.password.length > 13 || newData.password.length < 6) {
      alert("Mật khẩu phải có độ dài từ 6 đến 15 ký tự");
    } else {
      update(dbRef, {
        name: newData.name,
        phoneNumber: newData.phoneNumber,
        email: newData.email,
        password: newData.password,
      })
        .then(() => {
          console.log(newData.name.trim());
          alert("Cập nhật thông tin thành công");
        })
        .catch((error) => {
          alert("Cập nhật thông tin không thành công, chi tiết" + error);
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
          value="Cập nhật"
          onClick={handleUpdate}
        />
        <a href="/accountmanagementhost" className={cx("delete-btn")}>
          Quay lại
        </a>
      </form>
    </div>
  );
}

export default UpdateHost;
