import classNames from "classnames/bind";
import styles from "../Home_Admin/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);

SearchRenter.propTypes = {
  onSubmit: PropTypes.func,
};

SearchRenter.defaultProps = {
  onSubmit: null,
};

function SearchRenter(props) {
  const { onSubmit } = props;
  const [search, setSearch] = useState("");
  const typingTimeoutRef = useRef(null);

  function handleSearch(e) {
    const value = e.target.value;
    setSearch(e.target.value);

    if (!onSubmit) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const formValues = {
        search: value,
      };
      onSubmit(formValues);
    }, 500);
  }

  return (
    <div className={cx("search-box")}>
      <FontAwesomeIcon icon={faSearch} />
      <input
        type="text"
        value={search}
        placeholder="Nhập từ khóa tìm kiếm"
        onChange={handleSearch}
      />
    </div>
  );
}

export default SearchRenter;
