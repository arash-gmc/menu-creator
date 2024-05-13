import React from "react";
import Form, { Input } from "../../components/Form";
import { FieldValues } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const inputs: Input[] = [
  { placeholder: "Username", name: "username" },
  { placeholder: "Restaurant Name", name: "restaurantName" },
  { placeholder: "Password", name: "password", type: "password" },
];

const Register = () => {
  const navigate = useNavigate();
  const register = useMutation({
    mutationFn: (data) =>
      axios.post("/api/restaurants/register", data).then((res) => res.data),
    onSuccess: (res, sent) => {
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      navigate("/dashboard");
    },
  });
  const handleRegister = (data: FieldValues) => {
    const obj = {
      name: data.username,
      displayName: data.restaurantName,
      password: data.password,
    } as any;
    register.mutate(obj);
  };
  return (
    <Form
      inputs={inputs}
      passData={(data) => handleRegister(data)}
      formName="Register"
    />
  );
};

export default Register;
