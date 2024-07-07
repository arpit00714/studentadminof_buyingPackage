import { Fragment } from "react";
import { styled } from "@mui/material/styles";
import Scrollbar from "react-perfect-scrollbar";
import "./Sidenav.css";
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
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useEffect } from "react";
import { pgform, studentData } from "Apis/Persnoldetailsform";
import { useState } from "react";
import { app } from "../../Firebase/firebase";
import { Link } from "react-router-dom";

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
  const [examType, setExamType] = useState();
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
        setExamType(examtype);
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
    <div className="sidemenucustom">
      <Sidebar>
        <Menu >
          {examType === "Pg Fresher" && (
            <SubMenu rootStyles={{ background: "#222A45" }} label="Stage 1 : Application">
              <MenuItem
                rootStyles={{ background: "#222A45" }}
                component={<Link to="/student/material/form" />}
              >
                Personnel Detail{" "}
              </MenuItem>
              <MenuItem
                rootStyles={{ background: "#222A45" }}
                component={<Link to="/student/material/Academicdetails" />}
              >
                {" "}
                Academic Details{" "}
              </MenuItem>
              <MenuItem
                rootStyles={{ background: "#222A45" }}
                component={<Link to="/student/material/CompatativeExam" />}
              >
                {" "}
                Competitive Exam{" "}
              </MenuItem>
              <MenuItem
                rootStyles={{ background: "#222A45" }}
                component={<Link to="/student/material/Recomenderdetails" />}
              >
                {" "}
                Recommended Details{" "}
              </MenuItem>
              <MenuItem
                rootStyles={{ background: "#222A45" }}
                component={<Link to="/student/material/DesireCource" />}
              >
                {" "}
                Desire Course{" "}
              </MenuItem>
              <MenuItem
                rootStyles={{ background: "#222A45" }}
                component={<Link to="/student/material/PersnolQuestion" />}
              >
                {" "}
                Personal Questions{" "}
              </MenuItem>
            </SubMenu>
          )}

          {examType === "Pg work Experince" && (
            <SubMenu rootStyles={{ background: "#222A45" }} label="Stage 1 : Application">
              <MenuItem
                rootStyles={{ background: "#222A45" }}
                component={<Link to="/student/material/form" />}
              >
                Personnel Detail{" "}
              </MenuItem>
              <MenuItem
                rootStyles={{ background: "#222A45" }}
                component={<Link to="/student/material/Academicdetails" />}
              >
                {" "}
                Academic Details{" "}
              </MenuItem>
              <MenuItem
                rootStyles={{ background: "#222A45" }}
                component={<Link to="/student/material/CompatativeExam" />}
              >
                {" "}
                Competitive Exam{" "}
              </MenuItem>
              <MenuItem
                rootStyles={{ background: "#222A45" }}
                component={<Link to="/student/material/Recomenderdetails" />}
              >
                {" "}
                Recommended details{" "}
              </MenuItem>
              <MenuItem
                rootStyles={{ background: "#222A45" }}
                component={<Link to="/student/material/CareerHighlight" />}
              >
                {" "}
                Career Highlight{" "}
              </MenuItem>
              <MenuItem
                rootStyles={{ background: "#222A45" }}
                component={<Link to="/student/material/DesireCource" />}
              >
                {" "}
                Desire Course{" "}
              </MenuItem>
              <MenuItem
                rootStyles={{ background: "#222A45" }}
                component={<Link to="/student/material/PersnolQuestion" />}
              >
                {" "}
                Personal questions{" "}
              </MenuItem>
            </SubMenu>
          )}

          {examType === "Ug" && (
            <SubMenu rootStyles={{ background: "#222A45" }} label="Stage 1 : Application">
              <MenuItem
                rootStyles={{ background: "#222A45" }}
                component={<Link to="/student/material/form" />}
              >
                Personnel Detail{" "}
              </MenuItem>
              <MenuItem
                rootStyles={{ background: "#222A45" }}
                component={<Link to="/student/material/UgAcademic" />}
              >
                Academic Details
              </MenuItem>
              <MenuItem
                rootStyles={{ background: "#222A45" }}
                component={<Link to="/student/material/Exams" />}
              >
                Competitive Exam
              </MenuItem>
              <MenuItem
                rootStyles={{ background: "#222A45" }}
                component={<Link to="/student/material/Recomenderdetails" />}
              >
                {" "}
                Recommended details{" "}
              </MenuItem>
              <MenuItem
                rootStyles={{ background: "#222A45" }}
                component={<Link to="/student/material/DesireCource" />}
              >
                {" "}
                Desire Course{" "}
              </MenuItem>
              <MenuItem
                rootStyles={{ background: "#222A45" }}
                component={<Link to="/student/material/PersnolQuestion" />}
              >
                {" "}
                Personal questions{" "}
              </MenuItem>
            </SubMenu>
          )}

          <SubMenu
            disabled={step >= "2" ? false : true}
            rootStyles={{ background: "#222A45" }}
            label="Stage 2 : Universities Selection"
          >
            <MenuItem
              rootStyles={{ background: "#222A45" }}
              component={<Link to="/student/material/Selectuniversity" />}
            >
              {" "}
              Universities Selection
            </MenuItem>
          </SubMenu>

          <SubMenu
            disabled={step >= "3" ? false : true}
            rootStyles={{ background: "#222A45" }}
            label="Stage 3 : Documents Evaluation"
          >
            <MenuItem
              rootStyles={{ background: "#222A45" }}
              component={<Link to="/student/material/DocumentReview" />}
            >
              {" "}
              Document evaluation
            </MenuItem>
          </SubMenu>

          <SubMenu
            disabled={step >= "4" ? false : true}
            rootStyles={{ background: "#222A45" }}
            label="Stage 4 : Application Status"
          >
            <MenuItem
              rootStyles={{ background: "#222A45" }}
              component={<Link to="/student/material/Applicationstatus" />}
            >
              {" "}
              Application Status
            </MenuItem>
          </SubMenu>

          <SubMenu
            disabled={step >= "4" ? false : true}
            rootStyles={{ background: "#222A45" }}
            label="Stage 4 : Accomodation"
          >
            <MenuItem
              rootStyles={{ background: "#222A45" }}
              component={<Link to="/student/material/Accomodation" />}
            >
              {" "}
              Accomodation
            </MenuItem>
          </SubMenu>

          <SubMenu
            disabled={step >= "4" ? false : true}
            rootStyles={{ background: "#222A45" }}
            label="Stage 4 : Banking and Finance"
          >
            <MenuItem
              rootStyles={{ background: "#222A45" }}
              component={<Link to="/student/material/Banking" />}
            >
              {" "}
              Banking and Finance
            </MenuItem>
          </SubMenu>

          <SubMenu
            disabled={step === "5" ? false : true}
            rootStyles={{ background: "#222A45" }}
            label="Stage 5: Visa Processing"
          >
            <MenuItem
              rootStyles={{ background: "#222A45" }}
              component={<Link to="/student/material/Visa" />}
            >
              {" "}
              Visa Processing
            </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  );
}
