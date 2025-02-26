import React, { useEffect, useState } from "react";
import Header from "../../../components/header";

import withAuthNew from "../../../HOC/withAuthNew";
import CreateSchedule from "../../../modules/tutor/components/CreateSchedule";
import StepOne from "@/tutor/components/CompleteProfile/StepOne";
import StepTwo from "@/tutor/components/CompleteProfile/StepTwo";
import Button from "components/button";
import useInitialFormData from "@/tutor/hooks/useInitialFormData";
import { AnimatePresence, motion } from "framer-motion";
import useCompleteTutorProfile from "@/tutor/hooks/useCompleteTutorProfile";
import { toast } from "react-toastify";
import router from "next/router";

interface ExtraProfile {
  description: string;
  subjects: number[];
  disciplines: number[];
  languages: number[];
  experience: number;
  hourly_charge: number;
  gender: "male" | "female" | "others";
}

const ChooseSchedulePage = () => {
  const [step, setStep] = useState(3);
  const [formValues, setFormValues] = useState({});

  const [isScheduleCreated, setIsScheduleCreated] = useState<boolean>(false);

  const { data, isFetching } = useInitialFormData();

  const completeTutorProfile = useCompleteTutorProfile();

  const handleFirstPageSubmit = (values: any) => {
    setFormValues(values);
    setStep(2);
  };

  const handleSecondPageSubmit = (values: any) => {
    const newFormValues: ExtraProfile = { ...formValues, ...values };

    completeTutorProfile.mutate(newFormValues, {
      onSuccess: () => {
        toast.success("Updated succssfully");
        setStep(3);
      },
    });
  };

  return (
    <>
      <Header title="Complete profile" />

      <div className="Schedule__page__wrapper">
        <div className="container page__container">
          <div className="container h-100">
            <div className="row h-100 p-0">
              <div className="col-md-4 h-100 p-0">
                <div style={{ height: "80%" }}>
                  {step === 1 && (
                    <AnimatePresence>
                      <motion.img
                        key="CreateScheduleImage"
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        className="img-fluid"
                        src="/image/signup.png"
                        height="100%"
                      />
                    </AnimatePresence>
                  )}
                  {step === 2 && (
                    <AnimatePresence>
                      <motion.img
                        key="CreateScheduleImage"
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        src="/image/signin.png"
                        className="img-fluid"
                        height="100%"
                      />
                    </AnimatePresence>
                  )}
                  {step === 3 && (
                    <AnimatePresence>
                      <motion.img
                        key="CreateScheduleImage"
                        initial={{ x: 150, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -150, opacity: 0 }}
                        style={{ maxWidth: "80%" }}
                        src="/image/tutorschedule.svg"
                        height="100%"
                      />
                    </AnimatePresence>
                  )}
                </div>
                <div
                  className="d-flex w-100 align-items-end"
                  style={{ height: "20%" }}
                >
                  {/* <div className="d-flex border--red align-item-center justify-content-between">
                    <div className="wrapper-progressBar">
                      <ul className="progressBar">
                        <li className="active" onClick={() => setStep(1)}>
                          Step 1
                        </li>
                        <li className="active" onClick={() => setStep(2)}>
                          Step 2
                        </li>
                        <li onClick={() => setStep(3)}>Step 3</li>
                      </ul>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="col-md-8 p-0 d-flex justify-content-end">
                <div className="Right__card">
                  {/* form values: {JSON.stringify(formValues)} */}
                  {step === 1 && (
                    <>
                      <StepOne
                        initialFormData={data}
                        onSubmit={handleFirstPageSubmit}
                        isFetching={isFetching}
                      />
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <StepTwo
                        initialFormData={data}
                        onSubmit={handleSecondPageSubmit}
                        isFetching={isFetching}
                      />
                    </>
                  )}
                  {step === 3 && (
                    <>
                      <CreateSchedule scheduleCreated={setIsScheduleCreated} />
                      <Button
                        type="primary"
                        className="btn-brand w-100 btn-lg mt-1"
                        onClick={() => {
                          router.push("/tutor/class-schedules");
                        }}
                        disabled={!isScheduleCreated}
                      >
                        Proceed
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
        </div>
      </div>
    </>
  );
};

// export default withAuthNew(ChooseSchedulePage, "tutor");
export default ChooseSchedulePage;
