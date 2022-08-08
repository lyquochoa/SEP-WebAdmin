import classNames from "classnames/bind";
import React from "react";
import styles from "./style.css";
import imgprofile from "../../img/profile.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignJustify,
  faClock,
  faGaugeHigh,
  faSearch,
  faUsers,
  faUserSecret,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../../components/Layout/DefaultLayout/Sidebar";
import { db } from "../../firebase/config";
import { ref, onValue, remove } from "firebase/database";

const cx = classNames.bind(styles);

export class HomeAdmin extends React.Component {
  constructor() {
    super();
    this.state = {
      // totalAccount: [],
      totalAccountRenter: [],
      totalAccountHost: [],
    };
  }

  componentDidMount() {
    // Renter
    const dbRefRenter = ref(db, "Users/Renter");

    onValue(dbRefRenter, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapshot) => {
        let keyName = childSnapshot.key;
        let data = childSnapshot.val();
        records.push({ key: keyName, data: data });
      });
      this.setState({ totalAccountRenter: records });
    });

    // Host
    const dbRefHost = ref(db, "Users/Host");

    onValue(dbRefHost, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapshot) => {
        let keyName = childSnapshot.key;
        let data = childSnapshot.val();
        records.push({ key: keyName, data: data });
      });
      this.setState({ totalAccountHost: records });
    });
  }

  render() {
    return (
      <div>
        <Sidebar />

        <section className={cx("dashboard")}>
          <div className={cx("top")}>
            <FontAwesomeIcon icon={faAlignJustify} />

            <div className={cx("search-box")}>
              <FontAwesomeIcon icon={faSearch} />
              <input type="text" placeholder="Nhập từ khóa tìm kiếm" />
            </div>

            <img src={imgprofile} alt="" />
          </div>

          <div className={cx("dash-content")}>
            <div className={cx("overview")}>
              <div className={cx("title")}>
                <FontAwesomeIcon icon={faGaugeHigh} />
                <span className={cx("text")}>Dashboard</span>
              </div>

              <div className={cx("boxes")}>
                <div className={cx("box box1")}>
                  <FontAwesomeIcon icon={faUsers} />
                  <span className={cx("text")}>Tổng số tài khoản</span>
                  <span className={cx("number")}>
                    {this.state.totalAccountRenter.length +
                      this.state.totalAccountHost.length}
                  </span>
                </div>
                <div className={cx("box box2")}>
                  <FontAwesomeIcon icon={faUserTie} />
                  <span className={cx("text")}>Tài khoản khách thuê</span>
                  <span className={cx("number")}>
                    {this.state.totalAccountRenter.length}
                  </span>
                </div>
                <div className={cx("box box3")}>
                  <FontAwesomeIcon icon={faUserSecret} />
                  <span className={cx("text")}>Tài khoản chủ nhà</span>
                  <span className={cx("number")}>
                    {this.state.totalAccountHost.length}
                  </span>
                </div>
              </div>
            </div>

            <div className={cx("activity")}>
              <div className={cx("title")}>
                <FontAwesomeIcon icon={faClock} />
                <span className={cx("text")}>Hoạt động gần đây</span>
              </div>

              <div className={cx("activity-data")}>
                <div className={cx("data names")}>
                  <span className={cx("data-title")}>Name</span>
                </div>
                <div className={cx("data email")}>
                  <span className={cx("data-title")}>Email</span>
                </div>
                <div className={cx("data joined")}>
                  <span className={cx("data-title")}>Joined</span>
                </div>
                <div className={cx("data type")}>
                  <span className={cx("data-title")}>Type</span>
                </div>
                <div className={cx("data status")}>
                  <span className={cx("data-title")}>Status</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
