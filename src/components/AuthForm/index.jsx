import { AxiosError } from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "@contexts/UserContext";
import { ModalContext } from "@contexts/ModalContext";
import styles from "./styles.module.css";

import eyeClose from "@assets/eye_close.svg";
import eyeOpen from "@assets/eye_open.svg";
import closeIcon from "@assets/form_close.svg";
import clsx from "clsx";

const AuthForm = () => {
  const { loginUser, registerUser } = useContext(UserContext);
  const { authModal, toggleAuthModal } = useContext(ModalContext);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const isFormValid = () => {
    if (!formData.username || !formData.password) {
      setError("All fields are required!");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.replace(/\s/g, ""),
    }));
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
      if (!isFormValid()) return;
      if (authModal.type === "LOGIN") {
        await loginUser(formData);
        toast.success("Login success.");
      } else {
        await registerUser(formData);
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
            required
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
              required
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
          {loading ? (
            <span className={styles.loader}></span>
          ) : authModal.type === "LOGIN" ? (
            "Login"
          ) : (
            "Register"
          )}
        </button>
      </div>
    </article>
  );
};
export default AuthForm;
