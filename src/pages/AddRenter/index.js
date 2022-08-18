import classNames from "classnames/bind";
import styles from "./style_update-profile.css";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { ref, set, onValue } from "firebase/database";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cx = classNames.bind(styles);

const dbRef = ref(db, "Users/Renter");

function AddRenter() {
  const [state, setState] = useState({
    mo_no: "",
    username: "",
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    function fetch() {
      const maKHs = [];

      onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          let datas = childSnapshot.val();
          maKHs.push(datas.mo_no);
        });

        const maKHnew = maKHs.toString().replace(/,/g, "").split("KH");

        let randomMaKH = Number(maKHnew[0]);
        for (let i = 0; i < maKHnew.length; i++) {
          if (randomMaKH < Number(maKHnew[i])) {
            randomMaKH = Number(maKHnew[i]);
          }
        }
        setState({ ...state, mo_no: `KH${randomMaKH + 1}` });
      });
    }
    fetch();
  }, []);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleUpdate = () => {
    const newData = state;
    const dbRef = ref(db, "Users/Renter/" + newData.username);
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
      toast.error("Tên khách thuê phải có độ dài từ 3 đến 15 ký tự");
    } else if (
      newData.phoneNumber.length < 10 ||
      newData.phoneNumber.length > 12
    ) {
      toast.error("Số điện thoại phải từ 10 đến 12 con số");
    } else if (!validator.isEmail(newData.email)) {
      toast.error("Đây không phải email");
    } else {
      set(dbRef, {
        mo_no: newData.mo_no,
        username: newData.username,
        name: newData.name,
        phoneNumber: newData.phoneNumber,
        email: newData.email,
        password: newData.password,
      })
        .then(() => {
          toast.success("Tạo tài khoản thành công");
          setTimeout(() => navigate("/accountmanagement"), 1200);
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
            <span>Mã khách thuê</span>
            <input
              type="text"
              className={cx("box")}
              name="mo_no"
              value={state.mo_no}
              placeholder="Nhập mã khách thuê"
              onChange={handleInputChange}
              readonly="readonly"
              maxlength="5"
            />

            <span>Tài khoản</span>
            <input
              type="text"
              className={cx("box")}
              name="username"
              value={state.username || ""}
              placeholder="Nhập tài khoản"
              onChange={handleInputChange}
              maxlength="15"
            />

            <span>Mật khẩu</span>
            <input
              type="text"
              className={cx("box")}
              name="password"
              value={state.password || ""}
              placeholder="Nhập mật khẩu"
              onChange={handleInputChange}
              maxlength="20"
            />

            <span>Tên khách thuê</span>
            <input
              type="text"
              className={cx("box")}
              name="name"
              value={state.name || ""}
              placeholder="Nhập tên khách thuê"
              onChange={handleInputChange}
              maxlength="15"
            />

            <span>Số điện thoại</span>
            <input
              type="number"
              className={cx("box")}
              name="phoneNumber"
              value={state.phoneNumber || ""}
              placeholder="Nhập số điện thoại"
              onChange={handleInputChange}
              maxlength="15"
            />

            <span>Email</span>
            <input
              type="email"
              className={cx("box")}
              name="email"
              value={state.email || ""}
              placeholder="Nhập địa chỉ email"
              onChange={handleInputChange}
            />
            <input type="hidden" name="old_pass" value="" />
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
