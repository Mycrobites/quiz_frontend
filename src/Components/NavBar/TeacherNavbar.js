import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { CgNotes } from "react-icons/cg";
import { FaBars } from "react-icons/fa";
import ReactTooltip from "react-tooltip";
import UserContext from "../../Context/UserContext";
import "./TeacherNavbar.css";

const TeacherNavBar = ({ show, setShow }) => {
  const { removeUser, userDetails } = useContext(UserContext);
  const history = useHistory();
  console.log(userDetails);

  return (
    <div className="navbar">
      <div className="navbar-container">
        <FaBars className="ham" onClick={() => setShow(!show)} />
        <div className="navbar-logo">
          <CgNotes
            onClick={() => history.push("/")}
            style={{ cursor: "pointer" }}
          />
        </div>
        {userDetails.role === "Student" && (
          <div className="user-name-nav scores ">
            <p
              className="viewall"
              onClick={() => history.push(`/allscores/${userDetails.username}`)}
            >
              View All Scores
            </p>
          </div>
        )}
        <div className="user-name-nav">
          <p>Hello, {userDetails.first_name}</p>
          <button onClick={removeUser} className="nav-logout" data-tip="logout">
            <FiLogOut />
          </button>
          <ReactTooltip place="bottom" type="dark" effect="solid" />
        </div>
      </div>
    </div>
  );
};

export default TeacherNavBar;
