import classNames from "classnames/bind";
import styles from "./style_login.css";
import React, { useContext, useState } from "react";
import { auth } from "../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import validator from "validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEyeSlash,
  faLock,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const regnum =
    /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/;

  const navitage = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Vui lòng nhập đủ các trường thông tin");
    } else if (email.match(regnum)) {
      toast.error("Email không được bỏ dấu");
    } else if (password.match(regnum)) {
      toast.error("Mật khẩu không được bỏ dấu");
    } else if (!validator.isEmail(email)) {
      toast.error("Đây không phải email");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          dispatch({ type: "LOGIN", payload: user });
          toast.success("Đăng nhập thành công");
          setTimeout(() => navitage("/"), 1000);
        })
        .catch(() => {
          toast.error("Email hoặc mật khẩu không chính xác");
        });
    }
  };

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
  return (
    <div className="body">
      <div className={cx("container")}>
        <ToastContainer />

        <div className={cx("forms")}>
          <div className={cx("form login")}>
            <span className={cx("title")}>Đăng nhập</span>

            <form onSubmit={handleLogin}>
              <div className={cx("input-field")}>
                <input
                  type="text"
                  placeholder="Nhập địa chỉ Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {/* <i className={cx("uil uil-envelope icon")}></i> */}
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div className={cx("input-field")}>
                <input
                  type={passwordType.password}
                  className={cx("password")}
                  placeholder="Nhập mật khẩu"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <FontAwesomeIcon icon={faLock} />
                <FontAwesomeIcon
                  className={cx("showHidePw")}
                  icon={passwordType.eye}
                  onClick={togglePassword}
                />
              </div>

              <div className={cx("input-field button")}>
                <input type="button" value="Đăng nhập" onClick={handleLogin} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
