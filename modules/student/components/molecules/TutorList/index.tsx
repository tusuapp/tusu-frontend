import React, {memo, useEffect, useState} from "react";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import Rating from '@mui/material/Rating';

import {
    faStar,
    faHeart as faHeartOutline,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from "next/link";
import ReactTooltip from "react-tooltip";
import {useRouter} from "next/router";
import * as uuid from "uuid";

interface Props {
    id: number;
    name: string;
    subjects: string[];
    active: boolean;
    image?: string;
    href: string;
    uuid: string;
    rating: number;
}

const TutorList: React.FC<Props> = ({
                                        id,
                                        name,
                                        subjects,
                                        active,
                                        image,
                                        href,
                                        rating,
                                        uuid,
                                    }) => {


    const router = useRouter();
    // const [heart, setHeart] = useState(false);
    console.log(image);
    


    const getSubjects = () => {
        if (subjects.length === 0) return "No subjects";

        if (subjects.length > 1) {
            let count = 0;
            count = subjects.length;
            count = Number(count - 1);

            return `${subjects[0]} and  ${count} other desciplines.`;
        }

        return subjects[0];
    };


    useEffect(() => {

    }, [])


    return (
        <>
            <div style={{padding: 12, background: "#F7F7F7", borderRadius: 15}}>
                <div className="d-flex">
                    <div>
                        <div
                            style={{
                                float: "right",
                                position: "absolute",
                                marginLeft: "56px",
                                marginTop: "8px",
                            }}
                        >
                            <div
                                style={{
                                    border: "2px solid rgb(255, 255, 255)",
                                    width: "10px",
                                    height: "10px",
                                    padding: "5px",
                                    background: active ? "#69C24D" : "#bbbbbb",
                                    borderRadius: "10px",
                                }}
                            ></div>
                        </div>
                        <Link href={href}>
                            <a>
                                <img
                                    onError={({currentTarget}) => {
                                        currentTarget.onerror = null; // prevents looping
                                        currentTarget.src = "/image/img_avatar.png";
                                    }}
                                    src={image || `/image/img_avatar.png`}
                                    className="mr-3 tutors-image"
                                    alt="..."
                                    style={{
                                        width: "78px",
                                        height: "78px",
                                        objectFit: "cover",
                                        border: "2px solid #fff",
                                        borderRadius: 15,
                                    }}
                                />
                            </a>
                        </Link>
                    </div>
                    <div style={{marginLeft: 10, marginTop: 5, width: "100%"}} onClick={(el) => {

                        // @ts-ignore
                        let cls = el.target.className;
                        console.log(cls)

                        // @ts-ignore
                        if (typeof el.target.className === "object") {
                            cls = JSON.stringify(cls)
                        }
                        return;
                        // @ts-ignore
                        if (cls.search("chat-button-img") > -1) {
                            //todo
                            console.log("chat button clicked")
                        } else {
                            console.log("clicked", href)
                            router.push(href)
                        }
                    }}>
                        <div
                            style={{lineHeight: "20px"}}
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div>
                                <Link href={href}>
                                    <a
                                        style={{
                                            position: "relative",
                                            textDecoration: "none",
                                        }}
                                    >
                                        <div
                                            style={{
                                                color: "#707283",
                                                fontSize: 14,
                                                fontWeight: 600,
                                            }}
                                        >
                                            {name}
                                        </div>
                                    </a>
                                </Link>
                                <a
                                    style={{color: "#9C9D9E", fontSize: 12}}
                                    data-tip=""
                                    data-for="allSubjects"
                                >
                                    {getSubjects()}
                                </a>
                            </div>
                            {/* {heart ? (
                                <FontAwesomeIcon
                                    className={"chat-button-img"}
                                    icon={faHeartOutline}
                                    style={{color: "#FBB017"}}
                                    onClick={() => setHeart(!heart)}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    className={"chat-button-img"}
                                    // @ts-ignore
                                    icon={faHeart}
                                    style={{color: "#FBB017"}}
                                    onClick={() => setHeart(!heart)}
                                />
                            )} */}
                        </div>
                        <ReactTooltip
                            id="allSubjects"
                            type="light"
                            effect="solid"
                            place="right"
                        >
              <span style={{width: "50px"}}>
                {/* {subjects?.map((item: any, index)=> item )} */}
              </span>
                        </ReactTooltip>

                        <div className="d-flex justify-content-between align-items-center">
                            <div className="star-rating w-100">
                                <Rating name="read-only" value={rating} readOnly/>
                            </div>
                            <div className="chat-img-box">
                                <Link href={`/student/message/${uuid}`}>
                                    <a
                                        style={{
                                            position: "relative",
                                        }}
                                    >
                                        <img src="/image/chat.svg" className="float-end chat-button-img"/>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default memo(TutorList);
