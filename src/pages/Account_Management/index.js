import classNames from "classnames/bind";
// import styles from "./HomeAdmin.module.scss";
import styles from "../Home_Admin/style.css";
import imgprofile from "../../img/profile.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faAlignJustify,
  faEdit,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function AccountManagement() {
  return (
    <section className={cx("dashboard")}>
      <div className={cx("top")}>
        <FontAwesomeIcon icon={faAlignJustify} />

        <div className={cx("search-box")}>
          <FontAwesomeIcon icon={faSearch} />
          <input type="text" placeholder="Search here..." />
        </div>

        <img src={imgprofile} alt="" />
      </div>
      <div className={cx("dash-content")}>
        <div className={cx("activity")}>
          <div className={cx("title")}>
            <FontAwesomeIcon
              icon={faAddressBook}
              style={{ borderRadius: "0px" }}
            />
            <span className={cx("text")}>Danh sách tài khoản</span>
          </div>
          <div className={cx("product-display")}>
            <table className={cx("product-display-table")}>
              <thead>
                <tr>
                  <th>Mã TK</th>
                  <th>Tên</th>
                  <th>Email</th>
                  <th>Ngày tạo</th>
                  <th>Chức năng</th>
                </tr>
              </thead>
              <tr>
                <td>KH01</td>
                <td>Lý Quốc Hòa</td>
                <td>lyquochoa@gmail.com</td>
                <td>04/07/2022</td>
                <td>
                  <a href="/update" className={cx("btn")}>
                    <FontAwesomeIcon icon={faEdit} />
                    Edit
                  </a>
                  <a href="/update" className={cx("btn")}>
                    <FontAwesomeIcon icon={faTrash} />
                    Delete
                  </a>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AccountManagement;
