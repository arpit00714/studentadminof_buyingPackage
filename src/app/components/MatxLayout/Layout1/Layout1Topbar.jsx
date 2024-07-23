import { memo } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  styled,
  Avatar,
  Hidden,
  useTheme,
  MenuItem,
  IconButton,
  useMediaQuery
} from "@mui/material";

import { NotificationProvider } from "app/contexts/NotificationContext";

import useAuth from "app/hooks/useAuth";
import useSettings from "app/hooks/useSettings";

import { Span } from "app/components/Typography";
import ShoppingCart from "app/components/ShoppingCart";
import { MatxMenu, MatxSearchBox } from "app/components";
import { NotificationBar } from "app/components/NotificationBar";
import { themeShadows } from "app/components/MatxTheme/themeColors";

import { topBarHeight } from "app/utils/constant";
import {  useNavigate } from "react-router-dom";
import {
  Home,
  Menu,
  Person,
  Settings,
  WebAsset,
  MailOutline,
  StarOutline,
  PowerSettingsNew,

} from "@mui/icons-material";
import FeedIcon from '@mui/icons-material/Feed';
import { useState } from "react";
import { useEffect } from "react";
import { app,auth } from "../../../../Firebase/firebase";
import {
  signOut,
} from "firebase/auth";



// STYLED COMPONENTS
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary
}));

const TopbarRoot = styled("div")({
  top: 0,
  zIndex: 96,
  height: topBarHeight,
  boxShadow: themeShadows[8],
  transition: "all 0.3s ease"
});

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: "8px",
  paddingLeft: 18,
  paddingRight: 20,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: theme.palette.primary.main,
  [theme.breakpoints.down("sm")]: { paddingLeft: 16, paddingRight: 16 },
  [theme.breakpoints.down("xs")]: { paddingLeft: 14, paddingRight: 16 }
}));

const UserMenu = styled(Box)({
  padding: 4,
  display: "flex",
  borderRadius: 24,
  cursor: "pointer",
  alignItems: "center",
  "& span": { margin: "0 8px" }
});

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  minWidth: 185,
  "& a": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none"
  },
  "& span": { marginRight: "10px", color: theme.palette.text.primary }
}));

const IconBox = styled("div")(({ theme }) => ({
  display: "inherit",
  [theme.breakpoints.down("md")]: { display: "none !important" }
}));

const Layout1Topbar = () => {
  const navigation = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      console.log("user", user);
      setUser(user);
    });
  }, []);

  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  // const { logout, users } = useAuth();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({ layout1Settings: { leftSidebar: { ...sidebarSettings } } });
  };

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;
    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      mode = layout1Settings.leftSidebar.mode === "full" ? "close" : "full";
    }
    updateSidebarMode({ mode });
  };

  const logout = async() => { 
    await signOut(auth);
    navigation('/student/session/signup')
  }
  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex">
          <StyledIconButton onClick={handleSidebarToggle}>
            <Menu />
          </StyledIconButton>

          {/* <IconBox>
            <StyledIconButton>
              <MailOutline />
            </StyledIconButton>

            <StyledIconButton>
              <WebAsset />
            </StyledIconButton>

            <StyledIconButton>
              <StarOutline />
            </StyledIconButton>
          </IconBox> */}
        </Box>

        <Box display="flex" alignItems="center">
          <MatxSearchBox />

          {/* <NotificationProvider>
            <NotificationBar />
          </NotificationProvider> */}

          {/* <ShoppingCart /> */}

          <MatxMenu
            menuButton={
              <UserMenu>
                <Hidden xsDown>
                  <Span>
                    Hi <strong>{user?.displayName}</strong>
                  </Span>
                </Hidden>
                <Avatar src={user?.photoURL} sx={{ cursor: "pointer" }} />
              </UserMenu>
            }
          >
            <StyledItem>
              <Link to="/student/">
                <Home />
                <Span>Home</Span>
              </Link>
            </StyledItem>

            {/* <StyledItem>
              <Link to="/student/page-layouts/user-profile">
                <Person />
                <Span>Profile</Span>
              </Link>
            </StyledItem> */}

            {/* <StyledItem>
              <Settings />
              <Span>Settings</Span>
            </StyledItem> */}

            <StyledItem >
              <FeedIcon />
              <Span><Link to="/student/material/Studentpackage">Packages</Link></Span>
            </StyledItem>
            
            <StyledItem onClick={logout}>
              <PowerSettingsNew />
              <Span>Logout</Span>
            </StyledItem>
          </MatxMenu>
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default memo(Layout1Topbar);
