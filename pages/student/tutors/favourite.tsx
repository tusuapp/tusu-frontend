import Container from "../../../components/container";
import Link from "next/link";
import React from "react";
import withAuthNew from "../../../HOC/withAuthNew";
import { v2api } from "../../../api";
import { useMutation, useQueryClient } from "react-query";
import TutorCardWithDelete from "../../../modules/tutor/components/TutorCardWithDelete";
import Spinner from "../../../components/Spinner";
import StudentDashboardLayout from "layouts/StudentDashboard";
import PageSearchField from "@/student/components/PageSearchField";
import useFavourites from "@/student/hooks/useFavourites";

const USER_ROLE = "student";

const FavouriteTutors = () => {
  const queryClient = useQueryClient();

  const { data: tutors, status, isFetching } = useFavourites();

  const removeMutation = useMutation(
    (id: number) => v2api.delete(`/user/favourites/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("favouriteTutors");
      },
    }
  );

  const handleDeleteTutor = (id: number) => {
    removeMutation.mutate(id);
  };

  return (
    <StudentDashboardLayout>
      <Container>
        <section>
          <div className="d-flex justify-content-between mb-5 mt-5">
            <h3 className="student__page__header__title">Favourite Tutors</h3>
            <div>{isFetching ? "Updating..." : ""}</div>
          </div>
          <div className="d-flex justify-content-between mb-5">
            <PageSearchField />
          </div>

          {status === "error" && (
            <span>Failed to fetch favourites.</span>
          )}

          {status === "loading" && (
            <div className="text-center mt-5">
              <Spinner />
            </div>
          )}

          {status === "success" && tutors?.length === 0 && (
            <p className="text-muted mt-4">
              You haven&apos;t added any tutors to your favourites yet.
            </p>
          )}

          {status === "success" && tutors && tutors.length > 0 && (
            <div className="row row-cols-2 row-cols-md-2 row-cols-lg-5 row-cols-xl-5">
              {tutors.map((tutor: any, index: number) => {
                const subjectLabel = tutor.subjects?.length
                  ? tutor.subjects[0].name +
                    (tutor.subjects.length > 1
                      ? ` +${tutor.subjects.length - 1}`
                      : "")
                  : tutor.subject ?? "";

                return (
                  <Link
                    href={`/student/tutors/${tutor.id}`}
                    key={tutor.id ?? index}
                  >
                    <div className="col mb-5 tutor__list_column">
                      <TutorCardWithDelete
                        id={tutor.userId ?? tutor.id}
                        tutorName={tutor.fullName ?? tutor.name ?? ""}
                        profilePicture={tutor.userImageUrl ?? tutor.image ?? ""}
                        tutorSubject={subjectLabel}
                        rating={tutor.rating ?? tutor.ratting ?? 0}
                        onDelete={handleDeleteTutor}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          <br />
          <br />
          <br />
        </section>
      </Container>
    </StudentDashboardLayout>
  );
};

export default withAuthNew(FavouriteTutors, USER_ROLE);
