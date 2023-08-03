import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { authActions } from "../redux/store";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  // satate
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  // handle input chnage
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  // form handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/login", {
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        dispatch(authActions.login());
        alert("User Login Successfully !");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          margin={"auto"}
          marginTop={5}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          borderRadius={5}
        >
          <Typography
            sx={{ textTransform: "uppercase" }}
            variant="h4"
            padding={3}
            textAlign={"center"}
          >
            Login
          </Typography>

          <TextField
            placeholder="email"
            value={inputs.email}
            onChange={handleChange}
            name="email"
            margin="normal"
            type="email"
            required
          />
          <TextField
            placeholder="password"
            value={inputs.password}
            onChange={handleChange}
            name="password"
            margin="normal"
            type="password"
            required
          />

          <Button
            type="submit"
            sx={{ borderRadius: 3, marginTop: 3 }}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/register")}
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="primary"
          >
            New User? Please Register
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
