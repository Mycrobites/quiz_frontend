import { useState, useEffect, useContext } from "react";
import UserContext from "../../Context/UserContext";
import TeacherNavbar from "../../Components/NavBar/TeacherNavbar";
import CreateQuizModal from "./CreateQuizModal";
import Loader from "../../Components/Loader/LoadingBar";
import QuizCard from "./QuizCard";
import axios from "../../axios/axios";
import Carousel from "react-elastic-carousel";
import "./TeacherQuizzes.css";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import { CircularProgress } from "@material-ui/core";
import TransitionsModal from "./CreateGroup";
import { useHistory } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import StartTest from "../Quizzes/StartTest";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: "0px",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
}));

function DeleteQuiz({ id , deleteQuizGroup }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { removeUser, userDetails, addQuiz } = useContext(UserContext);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  // console.log(deleteQuizGroup);
  
  const deleteQuiz = async () => {
    console.log("working");
    setLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${userDetails.access}` },
      };
      ///api/edit-quiz/${id}
      await axios.get(`https://api.progressiveminds.in/api/quiz/${id}/delete`, config);
      setShowConfirmDelete(false);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };
  const delete_QuizGroup = async () => {
    console.log("working");
    setLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${userDetails.access}` },
      };
      ///api/edit-quiz/${id}
      await axios.get(
        `https://api.progressiveminds.in/api/quizGroup/${id}/delete`,
        config
      );
      
      setShowConfirmDelete(false);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button className="delete" onClick={handleOpen}>
        Delete
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className="confirm-delete">
              <p
                className="confirm-delete-text"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: "600",
                }}
              >
                Are you sure you want to delete this quiz?
              </p>
              <div
                className="confirm-delete-quiz-buttons"
                style={{
                  display: "flex",
                  marginTop: "3vw",
                  justifyContent: "space-around",
                }}
              >
                <button
                  className="view"
                  style={{ paddingLeft: "1.5vw", paddingRight: "1.5vw" }}
                  onClick={()=> {
                    deleteQuizGroup ?
                    delete_QuizGroup():
                    deleteQuiz()
                  }}
                >
                  Yes
                </button>
                <button
                  className="view"
                  style={{ paddingLeft: "1.5vw", paddingRight: "1.5vw" }}
                  onClick={handleClose}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
      {loading && (
        <div className="quizquestion-loader">
          <Loader />
        </div>
      )}
    </div>
  );
}

export default DeleteQuiz;
