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
  return (
    <section className={cx("container forms")}>
      <ToastContainer />
      <div className={cx("form login")}>
        <div className={cx("form-content")}>
          <header>Đăng nhập</header>
          <form onSubmit={handleLogin}>
            <div className={cx("field input-field")}>
              <input
                type="email"
                placeholder="Nhập địa chỉ Email"
                className={cx("input")}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={cx("field input-field")}>
              <input
                type="password"
                placeholder="Nhập mật khẩu"
                className={cx("password")}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className={cx("field button-field")}>
              <button onClick={handleLogin}>
                <a href="/">Đăng nhập</a>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
