import { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import Loader from "../../Components/Loader/LoadingBar";
import Error from "../../Components/ErrorComponent/Error";
import axios from "../../axios/axios";
import login_image from "../../assets/images/login1.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "./Register.css";

const Terms = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    agreedToTerms: false, // Added agreedToTerms field to the form data
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({
    username: "",
    password: "",
  });
  const history = useHistory();
  const { updateUser } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const fetchUser = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/login", {
        username: formData.username.trim(),
        password: formData.password,
      });
      setLoading(false);
      updateUser(data);
      localStorage.setItem("username", formData.username);
      history.push("/");
    } catch (err) {
      setError({
        username: "Invalid credentials",
        password: "Invalid credentials",
      });
      setLoading(false);
    }
  };

  const allFieldsFilled =
    formData.email &&
    formData.username &&
    formData.password &&
    formData.firstName &&
    formData.lastName &&
    formData.role &&
    formData.agreedToTerms;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username && !formData.password) {
      return setError({
        username: "Please enter username!",
        password: "Please enter password!",
      });
    }
    if (!formData.username) {
      return setError({
        username: "Please enter username!",
        password: "",
      });
    } else if (!formData.password) {
      return setError({
        username: "",
        password: "Please enter password!",
      });
    } else {
      setError({
        username: "",
        password: "",
      });
    }
    fetchUser();
  };

  return (
    <div className="login-page">
      <div className="login-clip-path"></div>
      {loading && (
        <div className="login-loader">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Terms;
