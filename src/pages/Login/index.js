import classNames from "classnames/bind";
import styles from "./style_login.css";

const cx = classNames.bind(styles);

function Login() {
  return (
    <section className={cx("container forms")}>
      <div className={cx("form login")}>
        <div className={cx("form-content")}>
          <header>Login</header>
          <form action="#">
            <div className={cx("field input-field")}>
              <input
                type="text"
                placeholder="User ID"
                className={cx("input")}
              />
            </div>

            <div className={cx("field input-field")}>
              <input
                type="password"
                placeholder="Password"
                className={cx("password")}
              />
              {/* <i className={cx("bx bx-hide eye-icon")}></i> */}
            </div>

            <div className={cx("field button-field")}>
              <button>
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
