import Head from "next/head";
import withAuthNew from "HOC/withAuthNew";
import React from "react";
import useStudentProfile from "@/student/hooks/useStudentProfile";
import Header from "../../../modules/student/components/Header/index";
import Link from "next/link";
import TutorCard from "../../../components/TutorCard";
import {useDispatch, useSelector} from "react-redux";
 import {Pagination} from "@mui/material";
import {selectSearch, setPage} from "../../../features/search/reducer";

const PAGE_PERMISSION_ROLE = "student";
let URL = process.env.NEXT_PUBLIC_API_ENDPOINT || "";

function Search() {
    // const { data } = useStudentProfile();
    const {searchResults} = useSelector(selectSearch);
    const dispatch = useDispatch();

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setPage(value))
    };

    return (
        <>
            <Head>
                <title>Tusu - Student | Search</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <Header/>
            <div className="content-wrapper">
                <div className="container">


                    <section id="">
                        <div className="d-flex  justify-content-between mb-5 mt-5">
                            <h3
                                className="header"
                                style={{color: "#0D1333", fontSize: "20px"}}
                            >
                                Search Result
                            </h3>

                        </div>
                        <div className="row row-cols-2  row-cols-lg-5 row-cols-xl-5  row-cols-md-2">
                            {searchResults.data.length ? searchResults.data.map((tutor: any, index: any) => (
                                <div
                                    className="col mb-5 tutor__list_column mouse"
                                    key={index}
                                >
                                    <Link href={`/student/tutors/${tutor.id}`}>
                                        <a>
                                            <TutorCard
                                                tutorName={tutor.fullname}
                                                profilePicture={tutor.image && tutor.image.url ? URL + tutor.image.url : ""}
                                                tutorSubject={tutor.subjects}
                                                rating={tutor.rating}
                                            />
                                        </a>
                                    </Link>
                                </div>
                            )) : (<p style={{width: "100%", textAlign: "center"}}>No result found</p>)}
                        </div>

                        <Pagination count={searchResults.pagination.pageCount} page={searchResults.pagination.page}
                                    variant="outlined" shape="rounded" onChange={handleChange}/>
                    </section>
                </div>

            </div>
        </>
    );
}

export default withAuthNew(Search, PAGE_PERMISSION_ROLE);