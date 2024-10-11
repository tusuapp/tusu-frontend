import Header from "../../../components/header";
import Container from "../../../components/container";
import Footer from "../../../components/footer";
import Certificate from "../../../components/certificate";
import StudentDashboardLayout from "layouts/StudentDashboard";
import {useEffect, useState} from "react";
import {fetch} from "../../../api";

function MyCertifatesPage() {
const [certificates, setCertificates] = useState([])

    useEffect(() => {
        //student/certificates
        let token = localStorage.getItem("accessToken") || ""
        fetch(token).get("student/certificates").then((resp) => {

            console.log(resp.data.result)

            if(resp && resp.data && resp.data.result){
                setCertificates(resp.data.result)
            }

        }).catch((err) => {
            console.log(err)
        })

    },[])


    return (
        <>
            <StudentDashboardLayout>
                <Container>
                    <section>
                        <div className="d-flex  justify-content-between mb-5 mt-5">
                            <h3
                                className="header"
                                style={{color: "#0D1333", fontSize: "30px"}}
                            >
                                Certificates
                            </h3>
                        </div>
                        <div className="row pb-3">

                                {
                                    certificates.map((cert,idx)=>  <div key={idx} className="col-md-4"><Certificate data={cert}/> </div>)
                                }


                        </div>
                    </section>
                </Container>
            </StudentDashboardLayout>
        </>
    );
}

export default MyCertifatesPage;
