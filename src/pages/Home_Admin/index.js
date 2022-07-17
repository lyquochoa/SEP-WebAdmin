import classNames from "classnames/bind";
import styles from "./style.css";
import imgprofile from "../../img/profile.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignJustify,
  faClock,
  faComments,
  faGaugeHigh,
  faSearch,
  faShare,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function HomeAdmin() {
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
        <div className={cx("overview")}>
          <div className={cx("title")}>
            <FontAwesomeIcon icon={faGaugeHigh} />
            <span className={cx("text")}>Dashboard</span>
          </div>

          <div className={cx("boxes")}>
            <div className={cx("box box1")}>
              <FontAwesomeIcon icon={faThumbsUp} />
              <span className={cx("text")}>Total Likes</span>
              <span className={cx("number")}>50,120</span>
            </div>
            <div className={cx("box box2")}>
              <FontAwesomeIcon icon={faComments} />
              <span className={cx("text")}>Comments</span>
              <span className={cx("number")}>20,120</span>
            </div>
            <div className={cx("box box3")}>
              <FontAwesomeIcon icon={faShare} />
              <span className={cx("text")}>Total Share</span>
              <span className={cx("number")}>10,120</span>
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
              <span className={cx("data-list")}>Prem Shahi</span>
              <span className={cx("data-list")}>Deepa Chand</span>
              <span className={cx("data-list")}>Manisha Chand</span>
              <span className={cx("data-list")}>Pratima Shahi</span>
              <span className={cx("data-list")}>Man Shahi</span>
              <span className={cx("data-list")}>Ganesh Chand</span>
              <span className={cx("data-list")}>Bikash Chand</span>
            </div>
            <div className={cx("data email")}>
              <span className={cx("data-title")}>Email</span>
              <span className={cx("data-list")}>premshahi@gmail.com</span>
              <span className={cx("data-list")}>deepachand@gmail.com</span>
              <span className={cx("data-list")}>prakashhai@gmail.com</span>
              <span className={cx("data-list")}>manishachand@gmail.com</span>
              <span className={cx("data-list")}>pratimashhai@gmail.com</span>
              <span className={cx("data-list")}>manshahi@gmail.com</span>
              <span className={cx("data-list")}>ganeshchand@gmail.com</span>
            </div>
            <div className={cx("data joined")}>
              <span className={cx("data-title")}>Joined</span>
              <span className={cx("data-list")}>2022-02-12</span>
              <span className={cx("data-list")}>2022-02-12</span>
              <span className={cx("data-list")}>2022-02-13</span>
              <span className={cx("data-list")}>2022-02-13</span>
              <span className={cx("data-list")}>2022-02-14</span>
              <span className={cx("data-list")}>2022-02-14</span>
              <span className={cx("data-list")}>2022-02-15</span>
            </div>
            <div className={cx("data type")}>
              <span className={cx("data-title")}>Type</span>
              <span className={cx("data-list")}>New</span>
              <span className={cx("data-list")}>Member</span>
              <span className={cx("data-list")}>Member</span>
              <span className={cx("data-list")}>New</span>
              <span className={cx("data-list")}>Member</span>
              <span className={cx("data-list")}>New</span>
              <span className={cx("data-list")}>Member</span>
            </div>
            <div className={cx("data status")}>
              <span className={cx("data-title")}>Status</span>
              <span className={cx("data-list")}>Liked</span>
              <span className={cx("data-list")}>Liked</span>
              <span className={cx("data-list")}>Liked</span>
              <span className={cx("data-list")}>Liked</span>
              <span className={cx("data-list")}>Liked</span>
              <span className={cx("data-list")}>Liked</span>
              <span className={cx("data-list")}>Liked</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeAdmin;
