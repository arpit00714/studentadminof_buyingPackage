import { lazy } from "react";
import Loadable from "app/components/Loadable";

const AppForm = Loadable(lazy(() => import("./forms/AppForm")));
const AppMenu = Loadable(lazy(() => import("./menu/AppMenu")));
const AppIcon = Loadable(lazy(() => import("./icons/AppIcon")));
const AppProgress = Loadable(lazy(() => import("./AppProgress")));
const AppRadio = Loadable(lazy(() => import("./radio/AppRadio")));
const AppTable = Loadable(lazy(() => import("./tables/AppTable")));
const AppSwitch = Loadable(lazy(() => import("./switch/AppSwitch")));
const AppSlider = Loadable(lazy(() => import("./slider/AppSlider")));
const AppDialog = Loadable(lazy(() => import("./dialog/AppDialog")));
const AppButton = Loadable(lazy(() => import("./buttons/AppButton")));
const AppCheckbox = Loadable(lazy(() => import("./checkbox/AppCheckbox")));
const AppSnackbar = Loadable(lazy(() => import("./snackbar/AppSnackbar")));
const AppAutoComplete = Loadable(lazy(() => import("./auto-complete/AppAutoComplete")));
const AppExpansionPanel = Loadable(lazy(() => import("./expansion-panel/AppExpansionPanel")));
const PgfresherAcademicdetails = Loadable(lazy(() => import("./forms/Academicdetails")));
const PgfresherRecomendeddetails = Loadable(lazy(() => import("./forms/Recomenderdetails")));
const PgfresherDesireCource = Loadable(lazy(() => import("./forms/DesireCource")));
const PgfresherPersnolQuestion = Loadable(lazy(() => import("./forms/PersnolQuestion")));
const PgfreshercompatativeExam = Loadable(lazy(() => import("./forms/CompatativeExam")));
const UgExams = Loadable(lazy(() => import("./forms/Exams")));
const UgAcademic = Loadable(lazy(() => import("./forms/UgAcademic")));
const CareerHighlight = Loadable(lazy(() => import("./forms/CareerHighlight")));
const Selectuniversity = Loadable(lazy(() => import("./UniversitySelection/Selectuniversity")));
const DocumentReview = Loadable(lazy(() => import("./Documentreview/DocumentReview")));
const Applicationstatus = Loadable(lazy(() => import("./ApplicationStatus/Applicationstatus")));
const Visa = Loadable(lazy(() => import("./Visa/Visa")));
const Accomodation = Loadable(lazy(() => import("./Accomodation/Accomodation")));
const Banking = Loadable(lazy(() => import("./Banking/Banking")));
const Studentpackage = Loadable(lazy(() => import("./studentpacakages/Studentpackage")));
const materialRoutes = [
  { path: "/student/material/table", element: <AppTable /> },
  { path: "/student/material/form", element: <AppForm /> },
  { path: "/student/material/Academicdetails", element: <PgfresherAcademicdetails /> },
  { path: "/student/material/DesireCource", element: <PgfresherDesireCource /> },
  { path: "/student/material/Recomenderdetails", element: <PgfresherRecomendeddetails /> },
  { path: "/student/material/CompatativeExam", element: <PgfreshercompatativeExam /> },
  { path: "/student/material/PersnolQuestion", element: <PgfresherPersnolQuestion /> },
  { path: "/student/material/buttons", element: <AppButton /> },
  { path: "/student/material/icons", element: <AppIcon /> },
  { path: "/student/material/progress", element: <AppProgress /> },
  { path: "/student/material/menu", element: <AppMenu /> },
  { path: "/student/material/checkbox", element: <AppCheckbox /> },
  { path: "/student/material/switch", element: <AppSwitch /> },
  { path: "/student/material/radio", element: <AppRadio /> },
  { path: "/student/material/slider", element: <AppSlider /> },
  { path: "/student/material/autocomplete", element: <AppAutoComplete /> },
  { path: "/student/material/expansion-panel", element: <AppExpansionPanel /> },
  { path: "/student/material/dialog", element: <AppDialog /> },
  { path: "/student/material/snackbar", element: <AppSnackbar /> },
  { path: "/student/material/Exams", element: <UgExams /> },
  { path: "/student/material/UgAcademic", element: <UgAcademic /> },
  { path: "/student/material/CareerHighlight", element: <CareerHighlight /> },
  { path: "/student/material/Selectuniversity", element: <Selectuniversity /> },
  { path: "/student/material/DocumentReview", element: <DocumentReview /> },
  { path: "/student/material/ApplicationStatus", element: <Applicationstatus /> },
  { path: "/student/material/Visa", element: <Visa /> },
  { path: "/student/material/Accomodation", element: <Accomodation /> },
  { path: "/student/material/Banking", element: <Banking /> },
  { path: "/student/material/Studentpackage", element: <Studentpackage /> }
];

export default materialRoutes;
