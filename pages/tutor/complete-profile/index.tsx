import React, { useState } from "react";
import Header from "../../../components/header";

import withAuthNew from "../../../HOC/withAuthNew";
import CreateSchedule from "../../../modules/tutor/components/CreateSchedule";
import StepOne from "@/tutor/components/CompleteProfile/StepOne";
import StepTwo from "@/tutor/components/CompleteProfile/StepTwo";
import Button from "components/button";
import useInitialFormData from "@/tutor/hooks/useInitialFormData";
import { AnimatePresence, motion } from "framer-motion";
import useCompleteTutorProfile from "@/tutor/hooks/useCompleteTutorProfile";

import { Step, Stepper } from "react-form-stepper";
import { activateEmail } from "features/auth/authSlice";

interface ExtraProfile {
  description: string;
  subjects: number[];
  disciplines: number[];
  languages: number[];
  experience: number;
  hourly_charge: number;
  gender: "male" | "female" | "others";
}

const stepStyleDefaults = {
  activeBgColor: "#ed1d24",
  activeTextColor: "#ffffff",
  completedBgColor: "#a10308",
  completedTextColor: "#ffffff",
  inactiveBgColor: "#e0e0e0",
  inactiveTextColor: "#ffffff",
  size: "2em",
  circleFontSize: "1rem",
  borderRadius: "50%",
};

const ChooseSchedulePage = () => {
  const [step, setStep] = useState(1);
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

    console.log(newFormValues);

    completeTutorProfile.mutate(newFormValues, {
      onSuccess: () => {
        // toast.success("Updated succssfully");
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
              <div className="col-md-5 h-100 p-0">
                <div
                  style={{
                    height: "80%",
                    display: "grid",
                    placeContent: "center",
                  }}
                >
                  {step === 1 && (
                    <AnimatePresence>
                      <motion.img
                        key="CreateScheduleImage"
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        className="img-fluid"
                        src="/image/tutor/complete-profile/1.png"
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
                        src="/image/tutor/complete-profile/2.png"
                        className="img-fluid"
                        height="100%"
                      />
                    </AnimatePresence>
                  )}
                  {step === 3 && (
                    <AnimatePresence>
                      <motion.img
                        key="CreateScheduleImage"
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        className="img-fluid"
                        src="/image/tutorschedule.svg"
                        height="100%"
                        style={{ maxWidth: "80%" }}
                      />
                    </AnimatePresence>
                  )}
                </div>
                <div
                  className="w-100 align-items-end pt-5"
                  style={{ height: "20%" }}
                >
                  <Stepper
                    activeStep={1}
                    styleConfig={{
                      activeBgColor: "green",
                      activeTextColor: " white",
                      completedBgColor: "#FBD162",
                      completedTextColor: "#FBD162",
                      inactiveBgColor: " white",
                      inactiveTextColor: "white",
                      size: "2em",
                      circleFontSize: "1rem",
                      labelFontSize: "0.875rem'",
                      borderRadius: "50%",
                      fontWeight: "500",
                    }}
                  >
                    <Step
                      label="Step 1"
                      style={{ border: "2px solid #924781" }}
                      active={false}
                    />
                    <Step
                      label="Step 2"
                      style={{ border: "2px solid #924781" }}
                    />
                    <Step
                      label="Step 3"
                      style={{ border: "2px solid #924781" }}
                    />
                  </Stepper>
                </div>
              </div>
              <div className="col-md-7 p-0 d-flex justify-content-end">
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
                      {/* <a href="/tutor"> */}

                      <Button
                        type="primary"
                        className="btn-brand w-100 btn-lg mt-auto  "
                        onClick={() => {
                          window.location.href = "/tutor";
                        }}
                        disabled={!isScheduleCreated}
                      >
                        Proceed
                      </Button>
                      <Button
                        type="primary"
                        className="btn-brand w-100 btn-lg mt-auto"
                        onClick={() => {
                          window.location.href = "/tutor";
                        }}
                      >
                        Or Create Later
                      </Button>
                      {/* </a> */}
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
