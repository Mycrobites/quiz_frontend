import { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import Loader from "../../Components/Loader/LoadingBar";
import Error from "../../Components/ErrorComponent/Error";
import axios from "../../axios/axios";
import login_image from "../../assets/images/login1.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    checkPassword: "",
    firstName: "",
    lastName: "",
    role: "",
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
      const { data } = await axios.post("/api/auth/register", {
        username: formData.username.trim(),
        password: formData.password,
        email: formData.email.trim(),
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        role: formData.role.trim(),
      });

      setLoading(false);
      updateUser(data);
      localStorage.setItem("username", formData.username);
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
    formData.agreedToTerms &&
    formData.password === formData.checkPassword;

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
      <div className="login-page-contents">
        <div className="login-image">
          <img src={login_image} alt="login" />
        </div>
        <div className="form-holder">
          <form onSubmit={handleSubmit}>
            <div className="username">
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {/* {error.username && <Error msg={error.username} />} */}
              </label>
            </div>
            <div className="username">
              <label>
                UserName
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {error.username && <Error msg={error.username} />}
              </label>
            </div>
            <div className="username">
              <label>
                FirstName
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {/* {error.username && <Error msg={error.username} />} */}
              </label>
            </div>
            <div className="username">
              <label>
                LastName
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {/* {error.username && <Error msg={error.username} />} */}
              </label>
            </div>
            <label className="role-label">
              Role:
              <select
                className="role-dropdown"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="">Select Role</option>
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
              </select>
            </label>
            <div className="password">
              <label>
                Password
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="show-password"
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </div>
                {error.password && <Error msg={error.password} />}
              </label>
            </div>
            <div className="password">
              <label>
                Password Confirmation
                <input
                  type={showPassword ? "text" : "password"}
                  name="checkPassword"
                  value={formData.checkPassword}
                  onChange={handleChange}
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="show-password"
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </div>
                {error.password && <Error msg={error.password} />}
              </label>
            </div>
            <div className="terms-and-conditions">
              <label>
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                />
                I agree to the <Link to="/terms">Terms and Conditions</Link>
              </label>
            </div>
            {!allFieldsFilled && (
              <div className="">Please Check all the details </div>
            )}
            <button
              onClick={handleSubmit}
              disabled={!allFieldsFilled}
              type="submit"
              id="login-button"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
