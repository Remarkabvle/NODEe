import React, { useEffect, useState } from "react";
import { useSignUpUserMutation } from "../../context/api/userApi";
import "./register.scss";
import { useNavigate } from "react-router-dom";

const initialState = {
  fname: "",
  lname: "",
  username: "",
  password: "",
  age: "",
  url: "",
  gender: "male",
  isActive: "true",
  budget: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [handleCreate, { data, isSuccess, isError }] = useSignUpUserMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleCreate(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      alert(data?.msg);
      setFormData(initialState);
      navigate("/login");
    } else if (isError) {
      alert(data?.msg);
    }
  }, [isSuccess, isError, data, navigate]);

  return (
    <div className="register-form">
      <form className="register-form__form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <label>
          <span>First Name</span>
          <input
            type="text"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            placeholder="First Name"
          />
        </label>
        <label>
          <span>Last Name</span>
          <input
            type="text"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            placeholder="Last Name"
          />
        </label>
        <label>
          <span>Username</span>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
          />
        </label>
        <label>
          <span>Password</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </label>
        <label>
          <span>Age</span>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
          />
        </label>
        <label>
          <span>Profile URL</span>
          <input
            type="text"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="Profile URL"
          />
        </label>
        <label>
          <span>Gender</span>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label>
          <span>Budget</span>
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="Budget"
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
