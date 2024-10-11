import React, {useEffect, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import FilterDropdown from "@/student/components/FilterDropdown";
import {useRouter} from "next/router";
import {fetch} from "../../../../api";
import {useDispatch, useSelector} from "react-redux";
import {initialState, selectSearch, setSearchResults} from "../../../../features/search/reducer";

const SearchBar = () => {
    const router = useRouter()
    const {searchResults} = useSelector(selectSearch);
    const paramsName = router?.pathname?.split("/");
    
    const q: string = typeof router.query.q === "string" ? router.query.q : ""

    const [searchVal, setSearchVal] = useState(q)
    const [filter, setFilter] = useState("")
    const [inSearchPage, setInSearchPage] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        if (router.pathname === "/student/search") {
            setInSearchPage(true)
        }
        if (router.query.q) {
            // @ts-ignore
            setSearchVal(router.query.q || "")
            // @ts-ignore
            search(getQry(router.query.q || ""), 1)
        }
    }, [])


    useEffect(() => {
        if (router.pathname === "/student/search")
            search(getQry(), 2)

    }, [filter, searchResults.pagination.page])

    function search(q: string, mod: number) {

        console.log("searching", q, mod)
        if (!q || q === "&page=1")
            return
        let token = localStorage.getItem("accessToken") || ""
        fetch(token).get("/student/tutor/search?fullname_contains=" + q).then((resp) => {
            if (resp.data.result) {
                dispatch(setSearchResults(resp.data.result))
            }
        }).catch((err) => {
        })
    }

    function getQry(q?: string): string {

        return q ? q + filter : searchVal + filter + "&page=" + searchResults.pagination.page
    }

    function handleClear() {
        setSearchVal("")
        dispatch(setSearchResults(initialState.searchResults))

    }

    return (
        <>

            <form className="d-flex  ms-5" onSubmit={(e) => e.preventDefault()}>
                <div style={{position: "relative"}}>
                    <SearchIcon
                        sx={{
                            fontSize: "20px",
                            position: "absolute",
                            left: "10px",
                            top: "6px",
                            zIndex: "999",
                        }}
                    />
                    <input
                        className="bg-light border-0 w-75 rounded-pill px-5"
                        type="search"
                        placeholder="Search tutors here"
                        aria-label="Search"
                        style={{position: "relative"}}
                        value={searchVal}
                        onChange={(event) => {

                            setSearchVal(event.target.value)
                        }}
                    />
                </div>
                <button
                    className="btn btn-warning rounded-pill"
                    style={{color: "#fff"}}
                    onClick={() => {
                        if (!inSearchPage) {
                            router.push({
                                pathname: '/student/search',
                                query: {q: searchVal}
                            })
                        } else {
                            search(getQry(), 3)
                        }
                    }}
                >
                    Search
                </button>
            </form>
            {paramsName[paramsName.length - 1] === "tutors" && <FilterDropdown parentHandleClear={handleClear} onApplyFilter={(filters) => {
                if (!inSearchPage) {
                    router.push({
                        pathname: '/student/search',
                        query: {q: searchVal}
                    })
                }
                setFilter(filters)
            }}/>}
        </>
    );
};

export default SearchBar;
