import { useState, useContext, useCallback, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import Timer from "./Timer";
import UserContext from "../../Context/UserContext";
import "./Instruction.css";
import axios from "../../axios/axios";
import Loader from "../../Components/Loader/LoadingBar";
import ReactHtmlParser from "react-html-parser";

const Instruction = ({ match }) => {
  const [appData, setappData] = useState({});
  const userDetails = sessionStorage.getItem("user-details");
  const usingData = JSON.parse(userDetails);
  const getData = async () => {
    let res = await axios.get(`/api/get-quiz/${match.params.id}`, {
      headers: { Authorization: `Bearer ${usingData.access}` },
    });
    setappData(res.data);
  };

  useEffect(() => getData(), []);

  const [showbtn, setShowbtn] = useState(false);
  const { userCurrentQuiz } = useContext(UserContext);
  const history = useHistory();

  //added instructions field to get instructions of current quiz
  const instructions = userCurrentQuiz?.instructions;
  console.log(userCurrentQuiz);
  const onComplete = useCallback(() => {
    setShowbtn(true);
  }, []);

  if (!appData) {
    return (
      <div className="quiz-loader">
        <Loader />
      </div>
    );
  }

  return (
    <div className="instruction-page">
      <div className="instruction-container">
        <div className="instruction-header">
          <h1>Test Instruction</h1>
          <p>Please read the instructions carefully.</p>
        </div>

        <div className="instruction-two">
          <p>{ReactHtmlParser(instructions)}</p>
        </div>
        <div className="instruction-timer">
          <p>Your test will start in:</p>
          <Timer onComplete={onComplete} duration={30000} />
          {showbtn && (
            <button
              onClick={() => history.push(`/quizpage/${userCurrentQuiz.id}`)}
            >
              Proceed to Test
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Instruction);
