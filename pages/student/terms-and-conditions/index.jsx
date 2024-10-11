import React, { useEffect } from 'react'
import StudentDashboardLayout from "layouts/StudentDashboard";
import { useDispatch, useSelector } from 'react-redux';
import { fetchTermsAndServeices, selectCMS } from "../../../features/CMS/CMSSlice";
import Container from "../../../components/container";

const TermsAndConditions = () => {
  const dispatch = useDispatch();
  const termsAndServices = useSelector(selectCMS).termsAndServices;

  useEffect(() => {
    dispatch(fetchTermsAndServeices());
    console.log(termsAndServices);
  }, []);
  return (
    <StudentDashboardLayout>
      <Container>
        <div className="container">
        <br />
          <br />
          <br />
          <div className="inner-container">
            <h3 className="small-header">Terms and Conditions</h3>
            <p>{termsAndServices?.content}</p>
          </div>
          <br />
          <br />
          <br />
        </div>
      </Container>
    </StudentDashboardLayout>
  )
}

export default TermsAndConditions