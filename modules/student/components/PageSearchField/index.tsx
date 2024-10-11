import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface Props {}

const PageSearchField = (props: Props) => {
  return (
    <div className="student__page__header__search__container">
      <form action="">
        <input name="search" placeholder="Search" />
      </form>
      <div
        style={{
          float: "right",
          transform: "translate(-190%, 25%)",
          color: "darkgrey",
        }}
      >
        <FontAwesomeIcon icon={faSearch} style={{ fontSize: "20px" }} />
      </div>
    </div>
  );
};

export default PageSearchField;
