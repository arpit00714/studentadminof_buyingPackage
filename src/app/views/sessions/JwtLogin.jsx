import { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Card, Checkbox, Grid, TextField, Box, styled, useTheme } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Formik } from "formik";
import * as Yup from "yup";
import { app } from "../../../Firebase/firebase";
import useAuth from "app/hooks/useAuth";
import { Paragraph } from "app/components/Typography";
import { useEffect } from "react";
import { generatetoken } from "Apis/Persnoldetailsform";
import CircularProgress from "@mui/material/CircularProgress";
// STYLED COMPONENTS
const FlexBox = styled(Box)(() => ({
  display: "flex"
}));

const ContentBox = styled("div")(() => ({
  height: "100%",
  padding: "32px",
  position: "relative",
  background: "rgba(0, 0, 0, 0.01)"
}));

const StyledRoot = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#1A2038",
  minHeight: "100% !important",
  "& .card": {
    maxWidth: 800,
    minHeight: 400,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center"
  },

  ".img-wrapper": {
    height: "100%",
    minWidth: 320,
    display: "flex",
    padding: "2rem",
    alignItems: "center",
    justifyContent: "center"
  }
}));

// initial login credentials
const initialValues = {
  email: "jason@ui-lib.com",
  password: "dummyPass",
  remember: true
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be 6 character length")
    .required("Password is required!"),
  email: Yup.string().email("Invalid Email address").required("Email is required!")
});

export default function JwtLogin() {
  const { id } = useParams();
  console.log("id", id);
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();
  // const { login } = useAuth();

  // useEffect(() => {
  //   const gettokenurl = "http://localhost:5000/api/generatetoken";
  //   const get = fetch(gettokenurl, {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({ uid: id })
  //   });

  //   console.log("get", get);
  // });
  useEffect(() => {
    const gettoken = async () => {
      try {
        const details = await generatetoken({ uid: id });
        if (details.ok) {
          const data = await details.json();
          console.log("Response data:", data.token);
          if (data) {
            const token = data.token;
            await app
              .auth()
              .signInWithCustomToken(token)
              .then((userCredential) => {
                console.log("userCredential", userCredential);
                if (userCredential.operationType === "signIn") {
                  setLoading(true);
                  navigation("/student/dashboard/default");
                } else {
                  navigation("/student/session/404");
                }
              });
          }
        } else {
          console.error("Failed to fetch token:", details.statusText);
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };
    gettoken();
  }, [id, navigation]);

  const handleFormSubmit = async (values) => {
    // setLoading(true);
    // try {
    //   await login(values.email, values.password);
    //   navigate("/");
    // } catch (e) {
    //   setLoading(false);
    // }
  };

  return (
    <StyledRoot>
      {!loading ? (
        <CircularProgress />
      ) : (
        <Card className="card">
          <Grid container>
            <Grid item sm={6} xs={12}>
              <div className="img-wrapper">
                <img src="/assets/images/illustrations/dreamer.svg" width="100%" alt="" />
              </div>
            </Grid>

            <Grid item sm={6} xs={12}>
              <ContentBox>
                <Formik
                  onSubmit={handleFormSubmit}
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                >
                  {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      <TextField
                        fullWidth
                        size="small"
                        type="email"
                        name="email"
                        label="Email"
                        variant="outlined"
                        onBlur={handleBlur}
                        value={values.email}
                        onChange={handleChange}
                        helperText={touched.email && errors.email}
                        error={Boolean(errors.email && touched.email)}
                        sx={{ mb: 3 }}
                      />

                      <TextField
                        fullWidth
                        size="small"
                        name="password"
                        type="password"
                        label="Password"
                        variant="outlined"
                        onBlur={handleBlur}
                        value={values.password}
                        onChange={handleChange}
                        helperText={touched.password && errors.password}
                        error={Boolean(errors.password && touched.password)}
                        sx={{ mb: 1.5 }}
                      />

                      <FlexBox justifyContent="space-between">
                        <FlexBox gap={1}>
                          <Checkbox
                            size="small"
                            name="remember"
                            onChange={handleChange}
                            checked={values.remember}
                            sx={{ padding: 0 }}
                          />

                          <Paragraph>Remember Me</Paragraph>
                        </FlexBox>

                        <NavLink
                          to="/student/session/forgot-password"
                          style={{ color: theme.palette.primary.main }}
                        >
                          Forgot password?
                        </NavLink>
                      </FlexBox>

                      <LoadingButton
                        type="submit"
                        color="primary"
                        // loading={loading}
                        variant="contained"
                        sx={{ my: 2 }}
                      >
                        Login
                      </LoadingButton>

                      <Paragraph>
                        Don't have an account?
                        <NavLink
                          to="/student/session/signup"
                          style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                        >
                          Register
                        </NavLink>
                      </Paragraph>
                    </form>
                  )}
                </Formik>
              </ContentBox>
            </Grid>
          </Grid>
        </Card>
      )}
    </StyledRoot>
  );
}
