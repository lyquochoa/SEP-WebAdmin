import classNames from "classnames/bind";
import React, { useState, useEffect } from "react";
import queryString from "query-string";
import styles from "../Home_Admin/style.css";
import imgprofile from "../../img/profile.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faAlignJustify,
  faEdit,
  faPlusCircle,
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
import Pagination from "./paginationRenter";
import SearchRenter from "./searchRenter";

const cx = classNames.bind(styles);
let UniqueNumber = 0;

function AccountManagement() {
  const [data, setData] = useState({});
  const [pagination, setPagination] = useState({
    _limit: 3,
    _page: 1,
    _totalRows: 11,
  });
  const [filters, setFilters] = useState({
    _limit: 3,
    _page: 1,
  });

  useEffect(() => {
    const dbRef = query(
      ref(db, "Users/Renter"),
      orderByChild("name"),
      startAt(filters.title_like),
      endAt(`${filters.title_like}\uF8FF`)
    );

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

  // function handlePageChange(newPage) {
  //   setFilters({
  //     ...filters,
  //     _page: newPage,
  //   });
  // }

  // Detele Account Renters
  const onDelete = (id) => {
    if (window.confirm("Bạn muốn xóa tài khoản này hay không ? ")) {
      remove(ref(db, `Users/Renter/${id}`))
        .then(() => {
          toast.success("Xóa thành công");
        })
        .catch((error) => {
          toast.error("Xóa thất bại" + error);
        });
    }
  };

  // console.log(pagination);
  return (
    <body>
      <Sidebar />
      <ToastContainer />

      <section className={cx("dashboard")}>
        <div className={cx("top")}>
          <FontAwesomeIcon icon={faAlignJustify} />

          <SearchRenter onSubmit={handleFiltersChange} />

          <img src={imgprofile} alt="" />
        </div>
        <div className={cx("dash-content")}>
          <div className={cx("activity")}>
            <div className={cx("title")}>
              <FontAwesomeIcon
                icon={faAddressBook}
                style={{ borderRadius: "0px" }}
              />
              <span className={cx("text")}>Danh sách tài khoản Khách Thuê</span>

              <a href="accountmanagement/add" className={cx("btn-add")}>
                <FontAwesomeIcon icon={faPlusCircle} />
                <span>Tạo tài khoản</span>
              </a>
            </div>
            <div className={cx("product-display")}>
              <table className={cx("product-display-table")}>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Mã KH</th>
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
                        <td>{data[id].mo_no}</td>
                        <td>{data[id].name}</td>
                        <td>{data[id].email}</td>
                        <td>{data[id].phoneNumber}</td>
                        <td>
                          <a
                            href={`/accountmanagement/update/${id}`}
                            className={cx("btn")}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                            Sửa
                          </a>
                          <a
                            href="/accountmanagement"
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
          {/* <Pagination pagination={pagination} onPageChange={handlePageChange} /> */}
        </div>
      </section>
    </body>
  );
}

export default AccountManagement;
