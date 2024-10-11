import { useDispatch, useSelector } from "react-redux";
import { fetchPrivacyPolicy } from "../../../features/CMS/CMSSlice";
import { useEffect } from "react";
import { selectCMS } from "../../../features/CMS/CMSSlice";
import TutorDashboardLayout from "layouts/TutorDashboard";

function PrivacyPolicy() {
  const dispatch = useDispatch();
  const privacyPolicy = useSelector(selectCMS).privacyPolicy;

  useEffect(() => {
    dispatch(fetchPrivacyPolicy());
    console.log(privacyPolicy);
  }, []);

  return (
    <>
      <TutorDashboardLayout>
        <h3 className="small-header">Legal</h3>
        <p>{privacyPolicy?.content}</p>
      </TutorDashboardLayout>
    </>
  );
}

export default PrivacyPolicy;
