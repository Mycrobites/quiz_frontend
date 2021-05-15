import { useState, useContext, useCallback, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import Timer from "./Timer";
import UserContext from "../../Context/UserContext";
import "./Instruction.css";
import axios from "../../axios/axios";
import Loader from "../../Components/Loader/LoadingBar";

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

  const hours = userCurrentQuiz?.duration?.split(":")[0].split("")[1];
  const minutes = userCurrentQuiz?.duration?.split(":")[1];

  const onComplete = useCallback(() => {
    setShowbtn(true);
  }, []);

  if (!appData) {
    return (
      <div className='quiz-loader'>
        <Loader />
      </div>
    );
  }

  return (
    <div className='instruction-page'>
      <div className='instruction-container'>
        <div className='instruction-header'>
          <h1>Test Instruction</h1>
          <p>Please read the instructions carefully.</p>
        </div>
        <div className='instruction-one'>
          <p>
            1. There are{appData.quiz_questions?.length} problems in the test.
          </p>

          <br />
        </div>
        <div className='instruction-two'>
          <p>
            2. You have{hours !== "0" && `${hours} hours and`} {minutes} minutes
            to solve all the problems.
          </p>
          <br />
          <div className='marking-three'>
            <p>
              3. There are two types of problems. One whose answer is one of the
              four options provided just below the problem and other whose
              answer must be submitted as a non negative integer or rounding off
              to one decimal place.
            </p>
            <br />
          </div>
        </div>
        <div className='instruction-four'>
          <p>
            4. For correct response of each problem, 4 marks get added to your
            score and for every incorrect response, 1 mark is deducted from your
            score. Maximum marks one can score is 100.
          </p>
          <br />
        </div>
        <div className='instruction-five'>
          <p>
            5. There is also an option to flag a problem. On flagging a problem
            you mark it to review later. This option can be used for problems
            which you would like to review in the last time before submitting
            the test.
          </p>
          <br />
        </div>
        <div className='instruction-six'>
          <p>
            6. Kindly do not refresh or click back button during the test. In
            case your quiz gets stuck due to bad network, kindly inform the
            admin about the same immediately.
          </p>
          <br />
        </div>
        <div className='instruction-timer'>
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
