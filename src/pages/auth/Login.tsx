import React, { useContext } from "react";
import Form, { Input } from "../../components/Form";
import { FieldValues } from "react-hook-form";
import axios from "axios";
import { User } from "../../Providers";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
  token: string;
  user: User;
}

const inputs: Input[] = [
  { placeholder: "Username", name: "username" },
  { placeholder: "Password", name: "password", type: "password" },
];

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = (data: FieldValues) => {
    axios
      .post<LoginResponse>("/api/restaurants/login", {
        nameOrEmail: data.username,
        password: data.password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard");
      });
  };
  return (
    <Form
      inputs={inputs}
      passData={(data) => handleLogin(data)}
      formName="Login"
    />
  );
};

export default Login;
