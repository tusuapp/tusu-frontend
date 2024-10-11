import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import Countdown from "react-countdown";
import { toast } from "react-toastify";
import { api, setApplicationName } from "../../api";

interface Props {
  currentPage: number;
  lastPage: number;
  maxLength: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<Props> = ({
  currentPage,
  lastPage,
  maxLength,
  setCurrentPage,
}) => {
  const pageNums = [1, 2, 3];

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="pagination">
          <ul>
            <li>
              <a
                onClick={() => setCurrentPage(currentPage - 1)}
                className={currentPage === 1 ? "inactive" : ""}
              >
                {"<"}
              </a>
            </li>
            {pageNums?.map((item) => (
              <li>
                <a
                  onClick={() => setCurrentPage(item)}
                  className={item == currentPage ? "active" : ""}
                >
                  {item}
                </a>
              </li>
            ))}
            <li>
              <a
                onClick={() => setCurrentPage(currentPage + 1)}
                className={currentPage === lastPage ? "inactive" : ""}
              >
                {">"}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
