import { studentData } from "Apis/Persnoldetailsform";
import React, { useState, useEffect } from "react";
import StepProgressBar from "react-step-progress";
// import the stylesheet
import "./Stepslider.css";
import "react-step-progress/dist/index.css";
import { app } from "../../../../Firebase/firebase";
import { H3, H4 } from "app/components/Typography";

function StepSlider() {
  const [step, setStep] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = app.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  useEffect(() => {
    if (user?.uid) {
      const check = async () => {
        const resp = await studentData(user.uid);
        if (resp?.status === 200) {
          const data = await resp.json();
          setLoading(true);
          const steps = parseInt(data.message[0]?.steps, 10);
          setStep(steps);
          setLoading(false);
        }
      };
      check();
    }
  }, [user?.uid]);

  console.log("step", step)
  function step2Validator() {
    return true; // return a boolean
  }

  function step3Validator() {
    return true; // return a boolean
  }

  function onFormSubmit() {
    // handle the submit logic here
    // This function will be executed at the last step
    // when the submit button (next button in the previous steps) is pressed
  }

  return (
    <div >
      {loading ? (
        ""
      ) : (
        <StepProgressBar
          startingStep={step - 1}
          onSubmit={onFormSubmit}
          steps={[
            {
              label: <div ><H4>Stage 1</H4> : Application</div>,
              //   name: "step 1"
            },
            {
              label: <div ><H4>Stage 2</H4> : Universities Selection</div>,
              //   subtitle: "50%",
              //   name: "step 2",

              validator: step2Validator
            },
            {
              label: <div ><H4>Stage 3</H4> : Documents Evaluation</div>,
              //   subtitle: "100%",
              //   name: "step 3",
              validator: step3Validator
            },
            {
              label: <div ><H4>Stage 4</H4> : Application Status , Banking and Finance , Accomodation</div>,
              validator: step3Validator
            },
            // {
            //   label: "Stage 4 : Banking and Finance ",
            //   validator: step3Validator,
            // },
            // {
            //   label: "Stage 4 : Accomodation",
            //   validator: step3Validator
            // },
            {
              label: <div ><H4>Stage 5</H4> : Visa Processing</div>,
              validator: step3Validator
            }
          ]}
        />
      )}
    </div>
  );
}

export default StepSlider;
