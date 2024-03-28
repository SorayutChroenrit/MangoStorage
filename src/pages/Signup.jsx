import { useEffect, useState } from "react";
import { fetchEmployeeData } from "../data/API";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import loginImage from "../images/login_image.jpg";
import Swal from "sweetalert2";
import Axios from "axios";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      MangoStorage
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([]);
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [position, setPosition] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [show, setShow] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeeData = await fetchEmployeeData();
        setData(employeeData);
      } catch (error) {
        setError(error.message);
      }
    };
    // Fetch data initially
    fetchData();
  }, []);

  const addEmployee = () => {
    event.preventDefault();
    if (
      !username ||
      !password ||
      !firstName ||
      !lastName ||
      password !== confirmPassword
    ) {
      let errorMessage = "";
      if (!username || !password || !firstName || !lastName) {
        errorMessage = "Please fill in all the fields!";
      } else if (password !== confirmPassword) {
        errorMessage = "Password and confirm password do not match!";
      } else {
        errorMessage = "Password must be at least 8 characters long!";
      }
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
      return;
    } else if (password.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must be at least 8 characters long!",
      });
      return;
    }
    const newPosition = position || "User";
    console.log("Sending request to create employee:", {
      username,
      password,
      position: newPosition,
    });
    Axios.post("http://localhost:3001/createUserAccount", {
      username,
      password,
      position: newPosition,
    })
      .then(() => {
        // Show success message
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your account has been successfully created",
          showConfirmButton: false,
          timer: 1500,
        });
        // Clear the form inputs
        setUserName("");
        setPassWord("");
        setfirstName("");
        setlastName("");
        setConfirmPassword("");
        // Fetch the updated data from the '/employee' endpoint
        fetchEmployeeData()
          .then((fetchedData) => {
            console.log("Fetched data:", fetchedData);
            setData(fetchedData);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "An error occurred while fetching employee data!",
            });
          });
      })
      .catch((error) => {
        // Show error message
        console.error("Error adding employee:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred while creating the account!",
        });
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${loginImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundColor: "#5271ff",
          }}
        />

        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassWord(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="ConfirmPassword"
                    type="password"
                    id="confirmPassword"
                    autoComplete="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={addEmployee}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to={"/login"} variant="body2">
                    {"Already have an account? Sign in"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </Grid>
    </ThemeProvider>
  );
}
