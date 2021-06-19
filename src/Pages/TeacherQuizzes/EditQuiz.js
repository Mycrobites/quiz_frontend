import React from 'react';
import EditQuizModal from "./EditQuizModal";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../Context/UserContext";
import TeacherNavbar from "../../Components/NavBar/TeacherNavbar";
import CreateQuizModal from "./CreateQuizModal";
import Loader from "../../Components/Loader/LoadingBar";
import QuizCard from "./QuizCard";
import axios from "../../axios/axios";
import Carousel from "react-elastic-carousel";
import "./TeacherQuizzes.css";
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import { CircularProgress } from "@material-ui/core";
import TransitionsModal from "./CreateGroup";
import { useHistory } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import StartTest from "../Quizzes/StartTest";
import DeleteQuiz from "./DeleteQuiz";

function EditQuiz(props) {
    const {
        id,
        title,
        desc,
        duration,
        starttime,
        endtime,
        userDetails
        
      } = props;
      const [editQuiz, setEditQuiz] = useState(false);
      const [loading, setLoading] = useState(false);
      
    return (
        <div>
            <button className="edit" onClick={() => setEditQuiz(!editQuiz)}>Edit</button>
            {editQuiz && <EditQuizModal {...props} setEditQuiz={setEditQuiz} />}
        </div>
    )
}

export default EditQuiz;
