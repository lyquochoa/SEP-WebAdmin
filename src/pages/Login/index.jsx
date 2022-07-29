import classNames from "classnames/bind";
import styles from "./style_login.css";
import React, { useContext, useState } from "react";
import { auth } from "../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const cx = classNames.bind(styles);
// console.log(db);
function Login() {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navitage = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navitage("/");
      })
      .catch((error) => {
        setError(true);
      });
  };
  return (
    <section className={cx("container forms")}>
      <div className={cx("form login")}>
        <div className={cx("form-content")}>
          <header>Login</header>
          <form onSubmit={handleLogin}>
            <div className={cx("field input-field")}>
              <input
                type="email"
                placeholder="Email"
                className={cx("input")}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={cx("field input-field")}>
              <input
                type="password"
                placeholder="Password"
                className={cx("password")}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <span>Email hoặc mật khẩu không chính xác</span>}

            <div className={cx("field button-field")}>
              <button onClick={handleLogin}>
                <a href="/">Login</a>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
