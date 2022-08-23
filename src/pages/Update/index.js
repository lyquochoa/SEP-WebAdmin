import classNames from "classnames/bind";
import styles from "../Update/style_update-renter.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase/config";
import { ref, onValue, update } from "firebase/database";
import validator from "validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Update() {
  const [state, setState] = useState({
    mo_no: "",
    username: "",
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const [errorUsername, setErrorUsername] = useState({
    nameID: "username",
    isInputValid: true,
    errorMessage: "",
  });

  const [errorName, setErrorName] = useState({
    nameID: "name",
    isInputValid: true,
    errorMessage: "",
  });

  const [errorPhoneNumber, setErrorPhoneNumber] = useState({
    nameID: "phoneNumber",
    isInputValid: true,
    errorMessage: "",
  });

  const [errorEmail, setErrorEmail] = useState({
    nameID: "email",
    isInputValid: true,
    errorMessage: "",
  });

  const [errorPassword, setErrorPassword] = useState({
    nameID: "username",
    isInputValid: true,
    errorMessage: "",
  });

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const dbRef = ref(db, "Users/Renter");

    onValue(dbRef, (snapshot) => {
      if (snapshot.val() !== null) {
        setState({ ...snapshot.val()[id] });
      } else {
        setState({});
      }
    });

    return () => {
      setState({});
    };
  }, [id]);

  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
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
          nameID: "username",
          isInputValid: false,
          errorMessage: "Tài khoản không được bỏ dấu.",
        };
      } else if (checkingText.match(regex)) {
        return {
          nameID: "username",
          isInputValid: false,
          errorMessage:
            "Tài khoản không được có kí tự đặc biệt hoặc khoảng trắng.",
        };
      } else if (checkingText.length > 15 || checkingText.length < 3) {
        return {
          nameID: "username",
          isInputValid: false,
          errorMessage: "Tài khoản phải có độ dài từ 3 - 15 chữ số.",
        };
      } else {
        return { nameID: "username", isInputValid: true, errorMessage: "" };
      }
    }

    if (type === "password") {
      if (checkingText.match(regnum)) {
        return {
          nameID: "password",
          isInputValid: false,
          errorMessage: "Mật khẩu không được bỏ dấu.",
        };
      } else if (checkingText.match(regex)) {
        return {
          nameID: "password",
          isInputValid: false,
          errorMessage:
            "Mật khẩu không được có kí tự đặc biệt hoặc khoảng trắng.",
        };
      } else if (checkingText.length > 15 || checkingText.length < 6) {
        return {
          nameID: "password",
          isInputValid: false,
          errorMessage: "Mật khẩu phải có độ dài từ 6 - 15 chữ số.",
        };
      } else {
        return { nameID: "password", isInputValid: true, errorMessage: "" };
      }
    }

    if (type === "name") {
      if (checkingText.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
        return {
          nameID: "name",
          isInputValid: false,
          errorMessage: "Tên khách hàng không được có ký tự đặc biệt.",
        };
      } else if (checkingText.match(spaceBetween) === null) {
        return {
          nameID: "name",
          isInputValid: false,
          errorMessage: "Không được có khoảng trắng ở đầu hoặc cuối.",
        };
      } else {
        return { nameID: "name", isInputValid: true, errorMessage: "" };
      }
    }

    if (type === "phoneNumber") {
      const checkingResult = regexp.exec(checkingText);
      if (checkingResult !== null) {
        return { nameID: "phoneNumber", isInputValid: true, errorMessage: "" };
      } else {
        return {
          nameID: "phoneNumber",
          isInputValid: false,
          errorMessage: "Số điện thoại phải có độ dài từ 10 - 11 con số.",
        };
      }
    }

    if (type === "email") {
      if (checkingText.match(regnum)) {
        return {
          nameID: "email",
          isInputValid: false,
          errorMessage: "Email không được bỏ dấu.",
        };
      } else if (!validator.isEmail(checkingText)) {
        return {
          nameID: "email",
          isInputValid: false,
          errorMessage: "Đây không phải email.",
        };
      } else {
        return { nameID: "email", isInputValid: true, errorMessage: "" };
      }
    }
  };

  const handleInputValidation = (event) => {
    // event.preventDefault();
    const { name } = event.target;
    // console.log(state[name]);
    const { nameID, isInputValid, errorMessage } = validateInput(
      name,
      state[name]
    );
    console.log(nameID);

    if (nameID === "username" && isInputValid === false) {
      setErrorUsername({
        ...errorUsername,
        isInputValid: isInputValid,
        errorMessage: errorMessage,
      });
    } else if (nameID === "username" && isInputValid === true) {
      setErrorUsername({
        ...errorUsername,
        isInputValid: isInputValid,
        errorMessage: errorMessage,
      });
    }

    if (nameID === "password" && isInputValid === false) {
      setErrorPassword({
        ...errorPassword,
        isInputValid: isInputValid,
        errorMessage: errorMessage,
      });
    } else if (nameID === "password" && isInputValid === true) {
      setErrorPassword({
        ...errorPassword,
        isInputValid: isInputValid,
        errorMessage: errorMessage,
      });
    }

    if (nameID === "name" && isInputValid === false) {
      setErrorName({
        ...errorName,
        isInputValid: isInputValid,
        errorMessage: errorMessage,
      });
    } else if (nameID === "name" && isInputValid === true) {
      setErrorName({
        ...errorName,
        isInputValid: isInputValid,
        errorMessage: errorMessage,
      });
    }

    if (nameID === "phoneNumber" && isInputValid === false) {
      setErrorPhoneNumber({
        ...errorPhoneNumber,
        isInputValid: isInputValid,
        errorMessage: errorMessage,
      });
    } else if (nameID === "phoneNumber" && isInputValid === true) {
      setErrorPhoneNumber({
        ...errorPhoneNumber,
        isInputValid: isInputValid,
        errorMessage: errorMessage,
      });
    }

    if (nameID === "email" && isInputValid === false) {
      setErrorEmail({
        ...errorEmail,
        isInputValid: isInputValid,
        errorMessage: errorMessage,
      });
    } else if (nameID === "email" && isInputValid === true) {
      setErrorEmail({
        ...errorEmail,
        isInputValid: isInputValid,
        errorMessage: errorMessage,
      });
    }
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
    const dbRef = ref(db, `Users/Renter/${id}`);

    if (
      !newData.username ||
      !newData.name ||
      !newData.phoneNumber ||
      !newData.email ||
      !newData.password
    ) {
      toast.error("Vui lòng nhập đủ các trường thông tin");
    } else if (
      errorUsername.isInputValid === false ||
      errorPassword.isInputValid === false ||
      errorName.isInputValid === false ||
      errorPhoneNumber.isInputValid === false ||
      errorEmail.isInputValid === false
    ) {
      toast.error("Các trường thông tin nhập chưa đúng định dạng");
    } else {
      update(dbRef, {
        mo_no: newData.mo_no,
        username: newData.username,
        name: newData.name,
        phoneNumber: newData.phoneNumber,
        email: newData.email,
        password: newData.password,
      })
        .then(() => {
          toast.success("Cập nhật thông tin thành công");
          setTimeout(() => navigate("/accountmanagement"), 1200);
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
            <span>Mã khách thuê</span>
            <input
              type="text"
              className={cx("box")}
              name="mo_no"
              value={state.mo_no}
              placeholder="Nhập mã khách thuê"
              onChange={handleInputChange}
              readonly="readonly"
            />

            <span>Tài khoản</span>
            <input
              type="text"
              className={cx("box")}
              name="username"
              value={state.username || ""}
              placeholder="Nhập tài khoản"
              maxlength="50"
              onChange={handleInputChange}
              onBlur={handleInputValidation}
            />
            <FormError
              type="fullname"
              isHidden={errorUsername.isInputValid}
              errorMessage={errorUsername.errorMessage}
            />

            <div className={cx("box-password")}>
              <span>Mật khẩu</span>
              <input
                type={passwordType.password}
                className={cx("box")}
                name="password"
                value={state.password || ""}
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
              isHidden={errorPassword.isInputValid}
              errorMessage={errorPassword.errorMessage}
            />

            <span>Tên khách thuê</span>
            <input
              type="text"
              className={cx("box")}
              name="name"
              value={state.name || ""}
              placeholder="Nhập tên khách thuê"
              maxlength="50"
              onChange={handleInputChange}
              onBlur={handleInputValidation}
            />
            <FormError
              type="fullname"
              isHidden={errorName.isInputValid}
              errorMessage={errorName.errorMessage}
            />

            <span>Số điện thoại</span>
            <input
              type="number"
              className={cx("box")}
              name="phoneNumber"
              value={state.phoneNumber || ""}
              placeholder="Nhập số điện thoại"
              maxlength="50"
              onChange={handleInputChange}
              onBlur={handleInputValidation}
            />
            <FormError
              type="fullname"
              isHidden={errorPhoneNumber.isInputValid}
              errorMessage={errorPhoneNumber.errorMessage}
            />

            <span>Email</span>
            <input
              type="email"
              className={cx("box")}
              name="email"
              value={state.email || ""}
              placeholder="Nhập địa chỉ email"
              maxlength="50"
              onChange={handleInputChange}
              onBlur={handleInputValidation}
            />
            <FormError
              type="fullname"
              isHidden={errorEmail.isInputValid}
              errorMessage={errorEmail.errorMessage}
            />
          </div>
        </div>
        <input
          type="button"
          className={cx("btn")}
          value="Cập nhật"
          onClick={handleUpdate}
        />
        <a href="/accountmanagement" className={cx("delete-btn")}>
          Quay lại
        </a>
      </form>
    </div>
  );
}

export default Update;
