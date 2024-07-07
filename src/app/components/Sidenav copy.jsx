import { Fragment } from "react";
import { styled } from "@mui/material/styles";
import Scrollbar from "react-perfect-scrollbar";

import { MatxVerticalNav } from "app/components";
import useSettings from "app/hooks/useSettings";
import {
  navigations,
  pgExprence,
  underGragute,
  addUniversities,
  DocumentEvalution,
  ApplicationStatus,
  selecytdocs,
  visa,
  Banking,
  Accomodation
} from "app/navigations";

import { useEffect } from "react";
import { pgform, studentData } from "Apis/Persnoldetailsform";
import { useState } from "react";
import { app } from "../../Firebase/firebase";

// STYLED COMPONENTS
const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: "1rem",
  paddingRight: "1rem",
  position: "relative"
}));

const SideNavMobile = styled("div")(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
  width: "100vw",
  background: "rgba(0, 0, 0, 0.54)",
  [theme.breakpoints.up("lg")]: { display: "none" }
}));

export default function Sidenav({ children }) {
  const [Sidebarcontent, setSidebarContent] = useState([]);
  const [step, setStep] = useState();
  const [user, setUser] = useState(null);
  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      // console.log("user", user);
      setUser(user);
    });
  }, []);

  useEffect(() => {
    const check = async () => {
      const resp = await studentData(user?.uid);
      if (resp?.status === 200) {
        const data = await resp.json();
        console.log("dstudentDataata", data);
        const examtype = data.message[0]?.examtype;
        const steps = data.message[0]?.steps;
        setStep(steps);
        console.log("examtype", examtype);
        let content = [];
        if (examtype === "PG Fresher") {
          content = navigations;
        } else if (examtype === "Pg work Experince") {
          content = pgExprence;
        } else if (examtype === "Ug") {
          content = underGragute;
        }
        if (step === "2") {
          content = [...content, ...addUniversities];
        }
        if (step === "2") {
          content = [...content, ...DocumentEvalution];
        }
        if (step === "2") {
          content = [...content, ...ApplicationStatus];
        }
        if (step === "2") {
          content = [...content, ...Banking];
        }
        if (step === "2") {
          content = [...content, ...Accomodation];
        }
        if (step === "2") {
          content = [...content, ...visa];
        }
        setSidebarContent(content);
      }
    };
    check();
  }, [user?.uid, step]);

  console.log("children", children);
  const { settings, updateSettings } = useSettings();

  const updateSidebarMode = (sidebarSettings) => {
    let activeLayoutSettingsName = settings.activeLayout + "Settings";
    let activeLayoutSettings = settings[activeLayoutSettingsName];

    updateSettings({
      ...settings,
      [activeLayoutSettingsName]: {
        ...activeLayoutSettings,
        leftSidebar: {
          ...activeLayoutSettings.leftSidebar,
          ...sidebarSettings
        }
      }
    });
  };

  return (
    <Fragment>
      <StyledScrollBar options={{ suppressScrollX: true }}>
        {children}
        {/* <MatxVerticalNav items={Sidebarcontent} /> */}
        <MatxVerticalNav items={Sidebarcontent} />
      </StyledScrollBar>

      <SideNavMobile onClick={() => updateSidebarMode({ mode: "close" })} />
    </Fragment>
  );
}
