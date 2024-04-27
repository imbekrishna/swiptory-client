import { AxiosError } from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/api_instance";
import { UserContext } from "../../contexts/UserContext";
import { ModalContext } from "../../contexts/ModalContext";
import styles from "./styles.module.css";

import eyeClose from "../../assets/eye_close.svg";
import eyeOpen from "../../assets/eye_open.svg";
import closeIcon from "../../assets/form_close.svg";
import clsx from "clsx";

const AuthForm = () => {
  const { setUser } = useContext(UserContext);
  const { authModal, toggleAuthModal } = useContext(ModalContext);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const validateForm = () => {
    if (!formData.username || !formData.password) {
      throw Error("All fields are required!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      validateForm();
      if (authModal.type === "LOGIN") {
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
        setError(error.message);
      }
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const closeForm = (e) => {
    setFormData({ username: "", password: "" });
    setError(null);
    toggleAuthModal();
    e?.stopPropagation();
  };

  const title = `${
    authModal.type === "LOGIN" ? "Login" : "Register"
  } to SwipTory`;

  return (
    <article
      style={{ display: authModal.hidden ? "none" : "" }}
      className={clsx(styles.wrapper)}
      onClick={closeForm}
    >
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <img src={closeIcon} alt="" onClick={closeForm} role="button" />
        <h1>{title}</h1>
        <form className={styles.modalForm} onFocus={() => setError(null)}>
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
              onKeyDown={handleEnter}
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
        <div className={styles.authError}>
          <p>{error ?? ""}</p>
        </div>
        <button
          className="bgSecondary textLight"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "..." : authModal.type === "LOGIN" ? "Login" : "Register"}
        </button>
      </div>
    </article>
  );
};
export default AuthForm;
