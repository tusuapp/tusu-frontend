import React, { useEffect, useState } from "react";

import PageSearchField from "@/student/components/PageSearchField";
import StudentDashboardLayout from "layouts/StudentDashboard";
import { api, v2api } from "../../../api";
import Container from "../../../components/container";
import withAuthNew from "../../../HOC/withAuthNew";
import MyClass from "../../../modules/student/components/MyClass";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CustomTabPanel from "components/tabs/CustomTabPanel";
import Spinner from "components/Spinner";

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
  const [value, setValue] = useState(0);

  function handleChange(event: React.SyntheticEvent, newValue: number): void {
    setValue(newValue);
  }

  return (
    <>
      <StudentDashboardLayout>
        <Container>
          <section>
            <h3 className="student__page__header__title m-4 mt-10">
              My classes
            </h3>
            <div className="d-flex  justify-content-between mb-5 mt-5">
              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    textColor="inherit"
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab
                      sx={{ textTransform: "none" }}
                      label="Upcoming "
                      disableRipple
                      {...a11yProps(0)}
                    />
                    <Tab
                      sx={{ textTransform: "none" }}
                      label="Completed "
                      disableRipple
                      {...a11yProps(1)}
                    />
                    <Tab
                      sx={{ textTransform: "none" }}
                      label="Cancelled or Rejected"
                      disableRipple
                      {...a11yProps(1)}
                    />
                  </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                  <ActiveClassesTab type="accepted,requested,in-progress" />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  <ActiveClassesTab type="completed" />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                  <ActiveClassesTab type="cancelled,rejected" />
                </CustomTabPanel>
              </Box>
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
                        <MyClass myclass={myClass} />
                      </div>
                    </>
                  );
                })}
              </div>

              {/* {pageData?.length > 0 && (
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
              )} */}
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

interface ActiveClassesTabProps {
  type: string;
}

const ActiveClassesTab: React.FC<ActiveClassesTabProps> = ({ type }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [classes, setClasses] = useState<any>([]);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await v2api.get(`/user/classes/bookings?types=${type}`);
      console.log(data.data);
      setClasses(data.data.bookings);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  console.log(classes);

  if (isLoading) {
    return <Spinner />;
  }

  if (classes?.length === 0) {
    return <p>You don't have any classes here.</p>;
  }

  return (
    <>
      <div className="row">
        {classes &&
          classes?.map((myClass: any, index: number) => {
            return (
              <>
                <div
                  className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 my-classes"
                  key={index}
                >
                  <MyClass myclass={myClass} />
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default withAuthNew(FavouriteTutors, USER_ROLE);
