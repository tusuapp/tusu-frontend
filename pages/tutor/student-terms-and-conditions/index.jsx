import React, { useEffect } from 'react'
import TutorDashboardLayout from "layouts/TutorDashboard";
import { useDispatch, useSelector } from 'react-redux';
import { fetchTermsAndServeices, selectCMS } from "../../../features/CMS/CMSSlice";

const StudentTermsAndConsitions = () => {
  const dispatch = useDispatch();
  const termsAndServices = useSelector(selectCMS).termsAndServices;

  useEffect(() => {
    dispatch(fetchTermsAndServeices());
    console.log(termsAndServices);
  }, []);
  return (
      <TutorDashboardLayout>
        <h3 className="small-header">Terms and Conditions</h3>
        <p>{termsAndServices?.content}</p>
      </TutorDashboardLayout>
  )
}

export default StudentTermsAndConsitions