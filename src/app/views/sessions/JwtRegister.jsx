import { Formik } from "formik";
import { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Card, Checkbox, Grid, TextField, useTheme, Box, styled, Button } from "@mui/material";
import { LoadingButton  } from "@mui/lab";
import * as Yup from "yup";
import { useAlert } from "react-alert";
import useAuth from "app/hooks/useAuth";
import { Paragraph } from "app/components/Typography";
import { app, auth } from "../../../Firebase/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

// STYLED COMPONENTS
const FlexBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center"
}));

const JustifyBox = styled(FlexBox)(() => ({
  justifyContent: "center"
}));

const ContentBox = styled(JustifyBox)(() => ({
  height: "100%",
  padding: "32px",
  background: "rgba(0, 0, 0, 0.01)"
}));

const JWTRegister = styled(JustifyBox)(() => ({
  background: "#1A2038",
  minHeight: "100vh !important",
  "& .card": {
    maxWidth: 800,
    minHeight: 400,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center"
  }
}));

// initial login credentials
const initialValues = {
  email: "",
  password: "",
  username: "",
  remember: true
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be 6 character length")
    .required("Password is required!"),
  email: Yup.string().email("Invalid Email address").required("Email is required!")
});

export default function JwtRegister() {
    const alert = useAlert();
  const { id } = useParams();
  const navigation = useNavigate();
  console.log("id", id);
  const theme = useTheme();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async(values) => {
    setLoading(true);

    try {
      const res = await signInWithEmailAndPassword(auth, values.email, values.password);
      console.log(res)
      const user = res.user;
      if (user.emailVerified) {
        alert.success("Logged in successfully");
        navigation("/student/dashboard/default");
       
      } else {
        setLoading(false)
        alert.error("Logged in failed");
        await signOut(auth); // Sign out the user if email is not verified
      }
    } catch (e) {
      console.log(e);
      alert.error("Please try again");
      setLoading(false);
    }
  };

  return (
    <JWTRegister>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <ContentBox>
              <img
                width="100%"
                alt="Login"
                src={`${process.env.PUBLIC_URL}/logocolour-u508906.png`}
              />
            </ContentBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <Box p={4} height="100%">
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    {/* <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="username"
                      label="Username"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.username}
                      onChange={handleChange}
                      helperText={touched.username && errors.username}
                      error={Boolean(errors.username && touched.username)}
                      sx={{ mb: 3 }}
                    /> */}

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
                      sx={{ mb: 2 }}
                    />

                    {/* <FlexBox gap={1} alignItems="center">
                      <Checkbox
                        size="small"
                        name="remember"
                        onChange={handleChange}
                        checked={values.remember}
                        sx={{ padding: 0 }}
                      />

                      <Paragraph fontSize={13}>
                        I have read and agree to the terms of service.
                      </Paragraph>
                    </FlexBox> */}

                    {/* <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ mb: 2, mt: 3 }}
                    >
                      Register
                    </LoadingButton> */}
                    <Button
                      variant="contained"
                      type="submit"
                    >
                      Login
                    </Button>

                    {/* <Paragraph>
                      Already have an account?
                      <NavLink
                        to="/student/session/signin/:id"
                        style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                      >
                        Login
                      </NavLink>
                    </Paragraph> */}
                  </form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </JWTRegister>
  );
}
