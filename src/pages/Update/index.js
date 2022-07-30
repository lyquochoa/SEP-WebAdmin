import classNames from "classnames/bind";
import styles from "./style_update-profile.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/config";
import { ref, onValue, child, get } from "firebase/database";
// import { toast } from "react-toastify";

const cx = classNames.bind(styles);

const initialState = {
  name: "",
  phoneNumber: "",
  email: "",
  password: "",
};

function Update() {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const { name, phoneNumber, email, password } = state;

  // const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    // const dbRef = ref(db);
    const dbRef = ref(db, "Users/Customer");

    onValue(dbRef, (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
      console.log(snapshot.val());
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phoneNumber || !email || !password) {
      alert("Vui lòng nhập đủ các trường thông tin");
    } else {
      const dbRef = ref(db, `Users/Customer/${id}`);

      onValue(dbRef).set(state, (err) => {
        if (err) {
          // toast.error(err);
          console.log(err);
        } else {
          alert("Cập nhật thành công");
        }
      });
    }
  };

  return (
    <div className={cx("update-profile")}>
      <form onSubmit={handleSubmit}>
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
            />
            <span>Số điện thoại</span>
            <input
              type="text"
              className={cx("box")}
              name="phoneNumber"
              value={phoneNumber || ""}
              placeholder="Nhập số điện thoại"
              onChange={handleInputChange}
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
            />

            {/* <span>Nhập lại mật khẩu mới</span>
            <input
              type="password"
              name="confirm_pass"
              placeholder="Nhập lại mật khẩu mới"
              className={cx("box")}
            /> */}
          </div>
        </div>
        <input type="submit" className={cx("btn")} value="Cập nhật" />
        <a href="/accountmanagement" className={cx("delete-btn")}>
          Quay lại
        </a>
      </form>
    </div>
  );
}

export default Update;
