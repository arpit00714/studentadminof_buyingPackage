import useSettings from "app/hooks/useSettings";
import { Link } from "react-router-dom";

export default function MatxLogo({ className }) {
  const { settings } = useSettings();
  const theme = settings.themes[settings.activeTheme];
  const bgImgURL1 = require("../../Images/logo.png");
  return (
    <>
      <Link to="/student/dashboard/default">
        <img src={bgImgURL1} alt="bgImgURL1" style={{ height: "70px" }} />
      </Link>
    </>
  );
}
