import React, { useEffect, useState } from "react";

import PageSearchField from "@/student/components/PageSearchField";
import StudentDashboardLayout from "layouts/StudentDashboard";
import { api } from "../../../api";
import Container from "../../../components/container";
import withAuthNew from "../../../HOC/withAuthNew";
import MyClass from "../../../modules/student/components/MyClass";

const USER_ROLE = "student";

const FavouriteTutors: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(9);
  const [pageData, setPageData] = useState<any>();
  const [paginationData, setPaginationData] = useState<any>({});
  const indexOfLastpost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastpost - postsPerPage;
  const paginate = (number: number) => setCurrentPage(number);
  const nextPage = () => setCurrentPage(currentPage + 1);
  const previousPage = () => setCurrentPage(currentPage - 1);
  const pageNumber = [];

  if (pageData) {
    for (let i = 1; i <= Math.ceil(paginationData?.total / postsPerPage); i++) {
      pageNumber.push(i);
    }
  }

  // console.log("pageData =>",pageData);
  
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get(
        `/student/my-bookings?page=${currentPage}&limit=${postsPerPage}`
      );
      setPageData(data?.result?.data);
      setPaginationData({ ...paginationData, ...data?.result?.pagination });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <>
      <StudentDashboardLayout>
        <Container>
          <section>
            <div className="d-flex  justify-content-between mb-5 mt-5">
              <h3 className="student__page__header__title">My classes</h3>
            </div>
            <div className="d-flex justify-content-between mb-5">
              <div>
                <PageSearchField />
              </div>
              <div>{/* <PageFilters /> */}</div>
            </div>
            <div className="tutors">
              {/* Loading screen */}
              <div>{isLoading ? "Loading..." : ""}</div>

              {/* Empty screen */}
              {pageData?.length === 0 && (
                <>
                  <div>No classes found</div>
                </>
              )}
              <div className="row">
                {pageData?.map((myClass: any, index: number) => {
                  return (
                    <>
                      <div
                        className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 my-classes"
                        key={index}
                      >
                        <MyClass
                            myclass={myClass}
                        />
                      </div>
                    </>
                  );
                })}
              </div>

              {pageData?.length > 0 && (
                <div className="row">
                  <div className="col-lg-12">
                    <div className="pagination">
                      <ul>
                        <li>
                          <a
                            onClick={() => previousPage()}
                            className={currentPage === 1 ? "inactive" : ""}
                          >
                            {"<"}
                          </a>
                        </li>
                        {pageNumber?.map((item) => (
                          <li>
                            <a
                              onClick={() => paginate(item)}
                              className={item == currentPage ? "active" : ""}
                            >
                              {item}
                            </a>
                          </li>
                        ))}
                        <li>
                          <a
                            onClick={() => nextPage()}
                            className={
                              currentPage === paginationData?.lastPage
                                ? "inactive"
                                : ""
                            }
                          >
                            {">"}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <br />
            <br />
            <br />
          </section>
        </Container>
      </StudentDashboardLayout>
    </>
  );
};

export default withAuthNew(FavouriteTutors, USER_ROLE);
