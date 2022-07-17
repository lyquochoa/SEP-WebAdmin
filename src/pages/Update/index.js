import classNames from "classnames/bind";
import styles from "./style_update-profile.css";

const cx = classNames.bind(styles);

function Update() {
  return (
    <div className={cx("update-profile")}>
      <form action="" method="">
        <div className={cx("flex")}>
          <div className={cx("inputBox")}>
            <span>Tài khoản</span>
            <input
              type="text"
              className={cx("box")}
              name="update_name"
              value=""
              placeholder="Nhập tài khoản"
            />
            <span>Số điện thoại</span>
            <input
              type="text"
              className={cx("box")}
              name="update_name"
              value=""
              placeholder="Nhập số điện thoại"
            />
            <span>Email</span>
            <input
              type="email"
              className={cx("box")}
              name="update_email"
              value=""
              placeholder="Nhập địa chỉ email"
            />
            <input type="hidden" name="old_pass" value="" />
            <span>Mật khẩu hiện tại</span>
            <input
              type="password"
              name="update_pass"
              placeholder="Nhập mật khẩu hiện tại"
              className={cx("box")}
            />
            <span>Mật khẩu mới</span>
            <input
              type="password"
              name="new_pass"
              placeholder="Nhập mật khẩu mới"
              className={cx("box")}
            />
            <span>Nhập lại mật khẩu mới</span>
            <input
              type="password"
              name="confirm_pass"
              placeholder="Nhập lại mật khẩu mới"
              className={cx("box")}
            />
          </div>
        </div>
        <input
          type="submit"
          value="Cập nhật"
          name="update_profile"
          className={cx("btn")}
        />
        <a href="/accountmanagement" className={cx("delete-btn")}>
          Quay lại
        </a>
      </form>
    </div>
  );
}

export default Update;
