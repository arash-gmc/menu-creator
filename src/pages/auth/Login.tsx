import React, { useContext, useState } from "react";
import AuthForm, { Input } from "./AuthForm";
import { FieldValues } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { User } from "../../Providers";
import { useNavigate } from "react-router-dom";
import { BackendError } from "../../interfaces";

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
  const [error, setError] = useState<string>();
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
      })
      .catch((e: AxiosError<BackendError>) =>
        setError(e.response?.data.message)
      );
  };
  return (
    <AuthForm
      inputs={inputs}
      passData={(data) => handleLogin(data)}
      formName="Login"
      error={error}
    />
  );
};

export default Login;
