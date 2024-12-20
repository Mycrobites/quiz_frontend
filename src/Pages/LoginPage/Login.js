import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import Loader from "../../Components/Loader/LoadingBar";
import Error from "../../Components/ErrorComponent/Error";
import axios from "../../axios/axios";
import login_image from "../../assets/images/login1.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({
    username: "",
    password: "",
  });
  const history = useHistory();
  const { updateUser } = useContext(UserContext);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/login", {
        username: username.trim(),
        password: password,
      });
      setLoading(false);
      updateUser(data);
      localStorage.setItem("username", username);
      history.push("/");
    } catch (err) {
      setError({
        username: "Invalid credentials",
        password: "Invalid credentials",
      });
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username && !password) {
      return setError({
        username: "Please enter username!",
        password: "Please enter password!",
      });
    }
    if (!username) {
      return setError({
        username: "Please enter username!",
        password: "",
      });
    } else if (!password) {
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
                Username
                <input
                  type="text"
                  value={username}
                  placeholder="Enter username..."
                  onChange={(e) => setUsername(e.target.value)}
                />
                {error.username && <Error msg={error.username} />}
              </label>
            </div>
            <div className="password">
              <label>
                Password
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Enter password..."
                  onChange={(e) => setPassword(e.target.value)}
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
            <button onClick={handleSubmit} type="submit" id="login-button">
              Log in
            </button>
            <button
              onClick={() => history.push("/Register")}
              type="submit"
              id="login-button"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
