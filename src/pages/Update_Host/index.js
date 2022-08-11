import classNames from "classnames/bind";
import styles from "./style_update-profile.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase/config";
import { ref, onValue, update } from "firebase/database";
import validator from "validator";
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

function UpdateHost() {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const { username, name, phoneNumber, email, password } = state;

  const { id } = useParams();

  const navigate = useNavigate();

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
      !newData.username ||
      !newData.name ||
      !newData.phoneNumber ||
      !newData.email ||
      !newData.password
    ) {
      toast.error("Vui lòng nhập đủ các trường thông tin");
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
      update(dbRef, {
        username: newData.username,
        name: newData.name,
        phoneNumber: newData.phoneNumber,
        email: newData.email,
        password: newData.password,
      })
        .then(() => {
          toast.success("Cập nhật thông tin thành công");
          setTimeout(() => navigate("/accountmanagementhost"), 1200);
        })
        .catch((error) => {
          toast.error("Cập nhật thất bại" + error);
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
