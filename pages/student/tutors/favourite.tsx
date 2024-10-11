import Header from "../../../components/header";
import Container from "../../../components/container";
import Footer from "../../../components/footer";
import Link from "next/link";
import React, { useEffect } from "react";
import withAuthNew from "../../../HOC/withAuthNew";
import { api } from "../../../api";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import Button from "../../../components/button";
import TutorCardWithDelete from "../../../modules/tutor/components/TutorCardWithDelete";
import Spinner from "../../../components/Spinner";
import StudentDashboardLayout from "layouts/StudentDashboard";
import PageSearchField from "@/student/components/PageSearchField";

const USER_ROLE = "student";

const FavouriteTutors = () => {
  const queryClient = useQueryClient();

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    "favouriteTutors",
    async ({ pageParam = 0 }) => {
      const res = await api.get("/student/favorite-tutors?page=" + pageParam);
      return res.data;
    },
    {
      getPreviousPageParam: (firstPage) => firstPage.previousId ?? false,
      getNextPageParam: (lastPage) => lastPage.nextId ?? false,
    }
  );

  const mutation = useMutation(
    (id: number) => api.delete(`/student/favorite-tutors/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("favouriteTutors");
      },
    }
  );

  const loadMoreButtonRef: any = React.useRef();

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  const handleDeleteTutor = (id: number) => {
    mutation.mutate(id);
  };

  return (
    <>
      <StudentDashboardLayout>
        <Container>
          <section>
            <div className="d-flex  justify-content-between mb-5 mt-5">
              <h3 className="student__page__header__title">Favourite Tutors</h3>
              <div>{isFetching ? "Updating..." : ""}</div>
            </div>
            <div className="d-flex justify-content-between mb-5">
              <div>
                <PageSearchField />
              </div>
              <div>{/* <PageFilters /> */}</div>
            </div>

            <div>
              {status === "error" ? (
                <span>Failed to fetch data</span>
              ) : (
                <>
                  {data &&
                    data.pages.map((page) => (
                      <React.Fragment key={page.nextId}>
                        <div className="row row-cols-2  row-cols-lg-5 row-cols-xl-5  row-cols-md-2">
                          {page.result.map((tutor: any, index: number) => (
                            <>
                              <Link
                                href={`/student/tutors/${tutor.id}`}
                                key={index}
                              >
                                <div
                                  className="col mb-5 w-30 tutor__list_column"
                                  key={index}
                                >
                                  <TutorCardWithDelete
                                    id={tutor.id}
                                    tutorName={tutor.name}
                                    profilePicture={tutor.image}
                                    tutorSubject={tutor.subject}
                                    rating={tutor.ratting}
                                    onDelete={handleDeleteTutor}
                                  />
                                </div>
                              </Link>
                            </>
                          ))}
                        </div>
                      </React.Fragment>
                    ))}
                  <div className="text-center">
                    {isFetching && !isFetchingNextPage ? (
                      <Spinner />
                    ) : (
                      hasNextPage && (
                        <button
                          ref={loadMoreButtonRef}
                          className="btn btn-primary"
                          onClick={() => fetchNextPage()}
                          disabled={!hasNextPage || isFetchingNextPage}
                        >
                          {isFetchingNextPage ? (
                            <h1>"Loading more..."</h1>
                          ) : hasNextPage ? (
                            "Load Newer"
                          ) : null}
                        </button>
                      )
                    )}
                  </div>
                  <div></div>
                </>
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
