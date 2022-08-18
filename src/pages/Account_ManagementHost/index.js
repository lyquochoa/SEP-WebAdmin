import classNames from "classnames/bind";
import React, { useState, useEffect } from "react";
import styles from "../Home_Admin/style.css";
import imgprofile from "../../img/profile.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faAlignJustify,
  faEdit,
  faPlusCircle,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../../components/Layout/DefaultLayout/Sidebar";
import { db } from "../../firebase/config";
import {
  ref,
  onValue,
  remove,
  query,
  limitToFirst,
  limitToLast,
  orderByChild,
  startAfter,
  startAt,
  endAt,
  endBefore,
  equalTo,
  orderByKey,
} from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchHost from "./searchHost";

const cx = classNames.bind(styles);
let UniqueNumber = 0;

function AccountManagementHost() {
  const [data, setData] = useState({});

  const [filters, setFilters] = useState({
    _limit: 2,
    _page: 1,
  });

  useEffect(() => {
    const dbRef = query(
      ref(db, "Users/Host"),
      orderByChild("name"),
      startAt(filters.title_like),
      endAt(`${filters.title_like}\uF8FF`)
    );
    // const dbRef = ref(db, "Users/Renter");
    onValue(dbRef, (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
    };
  }, [filters]);

  function handleFiltersChange(newFilters) {
    setFilters({
      ...filters,
      title_like: newFilters.search,
    });
  }

  // Detele Account Hosts
  const onDelete = (id) => {
    if (window.confirm("Bạn muốn xóa tài khoản này hay không ? ")) {
      remove(ref(db, `Users/Host/${id}`))
        .then(() => {
          toast.success("Xóa thành công");
        })
        .catch((error) => {
          toast.error("Xóa thất bại" + error);
        });
    }
  };

  return (
    <body>
      <Sidebar />
      <ToastContainer />

      <section className={cx("dashboard")}>
        <div className={cx("top")}>
          <FontAwesomeIcon icon={faAlignJustify} />

          <SearchHost onSubmit={handleFiltersChange} />

          <img src={imgprofile} alt="" />
        </div>
        <div className={cx("dash-content")}>
          <div className={cx("activity")}>
            <div className={cx("title")}>
              <FontAwesomeIcon
                icon={faAddressBook}
                style={{ borderRadius: "0px" }}
              />
              <span className={cx("text")}>Danh sách tài khoản Chủ Nhà</span>

              <a href="accountmanagementhost/add" className={cx("btn-add")}>
                <FontAwesomeIcon icon={faPlusCircle} />
                <span>Tạo tài khoản</span>
              </a>
            </div>
            <div className={cx("product-display")}>
              <table className={cx("product-display-table")}>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Số điện thoại</th>
                    <th>Chức năng</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(data).map((id, index) => {
                    return (
                      <tr key={UniqueNumber++}>
                        <td>{index + 1}</td>
                        <td>{data[id].name}</td>
                        <td>{data[id].email}</td>
                        <td>{data[id].phoneNumber}</td>
                        <td>
                          <a
                            href={`/accountmanagementhost/update/${id}`}
                            className={cx("btn")}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                            Sửa
                          </a>

                          <a
                            href="/accountmanagementhost"
                            className={cx("btn")}
                            onClick={() => onDelete(id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                            Xóa
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </body>
  );
}

export default AccountManagementHost;
