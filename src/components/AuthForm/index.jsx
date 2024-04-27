import { AxiosError } from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/api_instance";
import { UserContext } from "../../contexts/UserContext";
import styles from "./styles.module.css";

import eyeClose from "../../assets/eye_close.svg";
import eyeOpen from "../../assets/eye_open.svg";
import closeIcon from "../../assets/form_close.svg";

const AuthForm = () => {
  const { setUser } = useContext(UserContext);
  // const { authForm, toggleAuthForm } = useContext(FormContext);

  const authForm = { type: "LOGIN" };

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("Please enter a valid username");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const validateForm = () => {
    if (!formData.username || !formData.password) {
      throw "All fields are required!";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      validateForm();
      if (authForm.type === "LOGIN") {
        const res = await api.post("/api/auth/login", formData);
        const data = res.data.data;
        setUser(data);
        toast.success("Login success.");
      } else {
        await api.post("/api/user", formData);
        toast.success("Register success.");
      }
      closeForm();
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response.data;
        setError(data.error);
      } else {
        setError(error);
      }
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const closeForm = () => {
    setFormData({ username: "", password: "" });
    // toggleAuthForm();
  };

  const title = `${
    authForm.type === "LOGIN" ? "Login" : "Register"
  } to SwipTory`;

  return (
    <article className={styles.wrapper}>
      <div className={styles.content}>
        <img
          src={closeIcon}
          alt=""
          onClick={() => console.log("closed")}
          role="button"
        />
        <h1>{title}</h1>
        <form className={styles.authForm} onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <div className={styles.passwordWrapper}>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
            <img
              src={showPassword ? eyeClose : eyeOpen}
              className="passwordIcon"
              alt=""
              role="button"
              onClick={() => setShowPassword((prev) => !prev)}
            />
          </div>
        </form>
        {error && <p className={styles.authError}>{error}</p>}
        <button className="bgSecondary textLight" disabled={loading}>
          {loading ? "..." : authForm.type === "LOGIN" ? "Login" : "Register"}
        </button>
      </div>
    </article>
  );
};
export default AuthForm;
