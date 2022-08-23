import classNames from "classnames/bind";
import styles from "../AddHost/style_add-host.css";
import React, { useState } from "react";
import { db } from "../../firebase/config";
import { ref, set } from "firebase/database";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function AddHost() {
  const [state, setState] = useState({
    mo_no: {
      value: "",
    },
    username: {
      value: "",
      isInputValid: true,
      errorMessage: "",
    },
    password: {
      value: "",
      isInputValid: true,
      errorMessage: "",
    },
    name: {
      value: "",
      isInputValid: true,
      errorMessage: "",
    },
    phoneNumber: {
      value: "",
      isInputValid: true,
      errorMessage: "",
    },
    email: {
      value: "",
      isInputValid: true,
      errorMessage: "",
    },
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: { value: value } });
  };

  function FormError(props) {
    if (props.isHidden) {
      return null;
    }

    return <div className={cx("errorMessage")}>{props.errorMessage}</div>;
  }

  const validateInput = (type, checkingText) => {
    const spaceBetween = /^[\S]+(\s[\S]+)*$/;
    const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const regnum =
      /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/;
    const regexp = /^\d{10,11}$/;

    if (type === "username") {
      if (checkingText.match(regnum)) {
        return {
          isInputValid: false,
          errorMessage: "Tài khoản không được bỏ dấu.",
        };
      } else if (checkingText.match(regex)) {
        return {
          isInputValid: false,
          errorMessage:
            "Tài khoản không được có kí tự đặc biệt hoặc khoảng trắng.",
        };
      } else if (checkingText.length > 15 || checkingText.length < 3) {
        return {
          isInputValid: false,
          errorMessage: "Tài khoản phải có độ dài từ 3 - 15 chữ số.",
        };
      } else {
        return { isInputValid: true, errorMessage: "" };
      }
    }

    if (type === "password") {
      if (checkingText.match(regnum)) {
        return {
          isInputValid: false,
          errorMessage: "Mật khẩu không được bỏ dấu.",
        };
      } else if (checkingText.match(regex)) {
        return {
          isInputValid: false,
          errorMessage:
            "Mật khẩu không được có kí tự đặc biệt hoặc khoảng trắng.",
        };
      } else if (checkingText.length > 15 || checkingText.length < 6) {
        return {
          isInputValid: false,
          errorMessage: "Mật khẩu phải có độ dài từ 6 - 15 chữ số.",
        };
      } else {
        return { isInputValid: true, errorMessage: "" };
      }
    }

    if (type === "name") {
      if (checkingText.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
        return {
          isInputValid: false,
          errorMessage: "Tên khách hàng không được có ký tự đặc biệt.",
        };
      } else if (checkingText.match(spaceBetween) === null) {
        return {
          isInputValid: false,
          errorMessage: "Không được có khoảng trắng ở đầu hoặc cuối.",
        };
      } else {
        return { isInputValid: true, errorMessage: "" };
      }
    }

    if (type === "phoneNumber") {
      const checkingResult = regexp.exec(checkingText);
      if (checkingResult !== null) {
        return { isInputValid: true, errorMessage: "" };
      } else {
        return {
          isInputValid: false,
          errorMessage: "Số điện thoại phải có độ dài từ 10 - 11 con số.",
        };
      }
    }

    if (type === "email") {
      if (checkingText.match(regnum)) {
        return {
          isInputValid: false,
          errorMessage: "Email không được bỏ dấu.",
        };
      } else if (!validator.isEmail(checkingText)) {
        return {
          isInputValid: false,
          errorMessage: "Đây không phải email.",
        };
      } else {
        return { isInputValid: true, errorMessage: "" };
      }
    }
  };

  const handleInputValidation = (event) => {
    const { name } = event.target;
    const { isInputValid, errorMessage } = validateInput(
      name,
      state[name].value
    );
    setState({
      ...state,
      [name]: {
        isInputValid: isInputValid,
        errorMessage: errorMessage,
        value: state[name].value,
      },
    });
  };

  //handleShowPassword
  const [passwordType, setPasswordType] = useState({
    password: "password",
    eye: faEyeSlash,
  });

  const togglePassword = () => {
    if (passwordType.password === "password") {
      setPasswordType({ password: "text", eye: faEye });
      return;
    }
    setPasswordType({ password: "password", eye: faEyeSlash });
  };

  const handleUpdate = () => {
    const newData = state;
    const dbRef = ref(db, "Users/Host/" + newData.username.value);

    if (
      !newData.username.value.trim() ||
      !newData.name.value.trim() ||
      !newData.phoneNumber.value.trim() ||
      !newData.email.value.trim() ||
      !newData.password.value.trim()
    ) {
      toast.error("Vui lòng nhập đủ các trường thông tin");
    } else if (
      newData.username.isInputValid === false ||
      newData.name.isInputValid === false ||
      newData.phoneNumber.isInputValid === false ||
      newData.email.isInputValid === false ||
      newData.password.isInputValid === false
    ) {
      toast.error("Các trường thông tin nhập chưa đúng định dạng");
    } else {
      set(dbRef, {
        username: newData.username.value,
        name: newData.name.value,
        phoneNumber: newData.phoneNumber.value,
        email: newData.email.value,
        password: newData.password.value,
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
              value={state.username.value || ""}
              placeholder="Nhập tài khoản"
              maxlength="50"
              onChange={handleInputChange}
              onBlur={handleInputValidation}
            />
            <FormError
              type="fullname"
              isHidden={state.username.isInputValid}
              errorMessage={state.username.errorMessage}
            />

            <div className={cx("box-password")}>
              <span>Mật khẩu</span>
              <input
                type={passwordType.password}
                className={cx("box")}
                name="password"
                value={state.password.value || ""}
                placeholder="Nhập mật khẩu  "
                maxlength="50"
                onChange={handleInputChange}
                onBlur={handleInputValidation}
              />
              <FontAwesomeIcon
                className={cx("showHidePw")}
                icon={passwordType.eye}
                onClick={togglePassword}
              />
            </div>
            <FormError
              type="fullname"
              isHidden={state.password.isInputValid}
              errorMessage={state.password.errorMessage}
            />

            <span>Tên khách thuê</span>
            <input
              type="text"
              className={cx("box")}
              name="name"
              value={state.name.value || ""}
              placeholder="Nhập tên khách thuê"
              maxlength="50"
              onChange={handleInputChange}
              onBlur={handleInputValidation}
            />
            <FormError
              type="fullname"
              isHidden={state.name.isInputValid}
              errorMessage={state.name.errorMessage}
            />

            <span>Số điện thoại</span>
            <input
              type="number"
              className={cx("box")}
              name="phoneNumber"
              value={state.phoneNumber.value || ""}
              placeholder="Nhập số điện thoại"
              maxlength="50"
              onChange={handleInputChange}
              onBlur={handleInputValidation}
            />
            <FormError
              type="fullname"
              isHidden={state.phoneNumber.isInputValid}
              errorMessage={state.phoneNumber.errorMessage}
            />

            <span>Email</span>
            <input
              type="email"
              className={cx("box")}
              name="email"
              value={state.email.value || ""}
              placeholder="Nhập địa chỉ email"
              maxlength="50"
              onChange={handleInputChange}
              onBlur={handleInputValidation}
            />
            <FormError
              type="fullname"
              isHidden={state.email.isInputValid}
              errorMessage={state.email.errorMessage}
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
