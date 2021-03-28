import { useState, useContext } from "react";
import UserContext from "../../Context/UserContext";
import Loader from "../../Components/Loader/LoadingBar";
import Error from "../../Components/ErrorComponent/Error";
import axios from "../../axios/axios";
import { AiOutlineFileDone } from "react-icons/ai";
import "./FeedBack.css";

const FeedBack = () => {
  const { userDetails, removeUser, userCurrentQuiz } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [learnSomething, setLearnSomething] = useState(1);
  const [participating, setParticipating] = useState(1);
  const [difficultFeedback, setDifficultFeedback] = useState(1);
  const [participateAgain, setParticipateAgain] = useState("");
  const [timeSufficient, setTimeSufficient] = useState("");
  const [attendWebinar, setAttendWebinar] = useState("");
  const [language, setLanguage] = useState("");
  const [miniCourse, setMiniCourse] = useState("");
  const [nextContest, setNextContest] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");

  const postData = {
    learn_new: parseInt(learnSomething),
    like_participating: parseInt(participating),
    difficulty: parseInt(difficultFeedback),
    participate_again: participateAgain,
    time_sufficient: timeSufficient,
    attend_webinar: attendWebinar,
    language_english: language,
    mini_course: miniCourse,
    next_contest: nextContest,
    suggestions: feedbackText,
    user: userDetails.user_id,
    quiz_id: userCurrentQuiz.id,
    username: username,
  };

  const handleSubmit = async () => {
    if (
      participateAgain === "" ||
      timeSufficient === "" ||
      attendWebinar === "" ||
      miniCourse === "" ||
      nextContest === "" ||
      username === ""
    ) {
      setError("All fields are mandatory");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const config = {
        headers: { Authorization: `Bearer ${userDetails.access}` },
      };
      await axios.post("/api/postFeedback/", postData, config);
      setSubmitted(true);
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };

  if (submitted) {
    setTimeout(() => {
      removeUser();
    }, 5000);
  }

  return (
    <>
      {submitted ? (
        <div className="submitted-form">
          <AiOutlineFileDone />
          <h1>Thank You for giving the feedback</h1>
        </div>
      ) : (
        <div className="feedback-page">
          {loading && (
            <div className="feedback-loader">
              <Loader />
            </div>
          )}
          <h1 className="quiz-submitted-header">
            Your test has been submitted
          </h1>
          <h1 className="feedback-page-header">Give Us Some Feedback</h1>
          <div className="feedback-input-sliders">
            <div className="feedback-username">
              <p>Enter your Full name*</p>
              <input
                type="text"
                placeholder="Enter username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="learn-feedback">
              <p>
                Did you learn something new?* <span> {learnSomething}/5</span>
              </p>
              <input
                name="question-slider"
                type="range"
                min={1}
                max={5}
                defaultValue={learnSomething}
                onChange={(e) => setLearnSomething(e.target.value)}
              />
            </div>
            <div className="participate-feedback">
              <p>
                To what extent did you like participating in this contest?*{" "}
                <span>{participating}/5</span>
              </p>
              <input
                type="range"
                min={1}
                max={5}
                defaultValue={participating}
                onChange={(e) => setParticipating(e.target.value)}
              />
            </div>
            <div className="difficulty-feedback">
              <p>
                How difficult were the problems?*
                <span>{difficultFeedback}/5</span>{" "}
              </p>
              <input
                type="range"
                min={1}
                max={5}
                defaultValue={difficultFeedback}
                onChange={(e) => setDifficultFeedback(e.target.value)}
              />
            </div>
          </div>

          <div className="feedback-yes-no">
            <div>
              <p>
                If a contest like this is organised again, will you participate?*
              </p>
              <div>
                <button
                  value="yes"
                  onClick={(e) => setParticipateAgain(e.target.value)}
                  className={
                    participateAgain === "yes" ? "selected-btn" : undefined
                  }
                >
                  Yes
                </button>
                <button
                  value="no"
                  onClick={(e) => setParticipateAgain(e.target.value)}
                  className={
                    participateAgain === "no" ? "selected-btn" : undefined
                  }
                >
                  No
                </button>
              </div>
            </div>
            <div>
              <p>Do you think time was sufficient?*</p>
              <div>
                <button
                  value="yes"
                  onClick={(e) => setTimeSufficient(e.target.value)}
                  className={
                    timeSufficient === "yes" ? "selected-btn" : undefined
                  }
                >
                  Yes
                </button>
                <button
                  value="no"
                  onClick={(e) => setTimeSufficient(e.target.value)}
                  className={
                    timeSufficient === "no" ? "selected-btn" : undefined
                  }
                >
                  No
                </button>
              </div>
            </div>
            <div>
              <p>
                If a webinar is organised to discuss the solutions of these
                problems will you attend?*
              </p>
              <div>
                <button
                  value="yes"
                  onClick={(e) => setAttendWebinar(e.target.value)}
                  className={
                    attendWebinar === "yes" ? "selected-btn" : undefined
                  }
                >
                  Yes
                </button>
                <button
                  value="no"
                  onClick={(e) => setAttendWebinar(e.target.value)}
                  className={
                    attendWebinar === "no" ? "selected-btn" : undefined
                  }
                >
                  No
                </button>
              </div>
            </div>
            <div>
              <p>In which language will you prefer to attend the webinar?</p>
              <div>
                <button
                  value="yes"
                  onClick={(e) => setLanguage(e.target.value)}
                  className={language === "yes" ? "selected-btn" : undefined}
                >
                  English
                </button>
                <button
                  value="no"
                  onClick={(e) => setLanguage(e.target.value)}
                  className={language === "no" ? "selected-btn" : undefined}
                >
                  Hindi
                </button>
              </div>
            </div>
            <div>
              <p>
                Would you like to see a mini course which focuses on training
                middle and high school students about mathematics in real life?*
              </p>
              <div>
                <button
                  value="yes"
                  onClick={(e) => setMiniCourse(e.target.value)}
                  className={miniCourse === "yes" ? "selected-btn" : undefined}
                >
                  Yes
                </button>
                <button
                  value="no"
                  onClick={(e) => setMiniCourse(e.target.value)}
                  className={miniCourse === "no" ? "selected-btn" : undefined}
                >
                  No
                </button>
              </div>
            </div>
            <div className="feedback-quiz">
              <p>
                Would you like to see a mini course which focuses on training
                middle and high school students about mathematics in real life?*
              </p>
              <div>
                <button
                  value="Puzzle Solving"
                  onClick={(e) => setNextContest(e.target.value)}
                  className={
                    nextContest === "Puzzle Solving"
                      ? "selected-btn"
                      : undefined
                  }
                >
                  Puzzle Solving
                </button>
                <button
                  value="Problem solving strategies"
                  onClick={(e) => setNextContest(e.target.value)}
                  className={
                    nextContest === "Problem solving strategies"
                      ? "selected-btn"
                      : undefined
                  }
                >
                  Problem solving strategies
                </button>
                <button
                  value="Mental Maths"
                  onClick={(e) => setNextContest(e.target.value)}
                  className={
                    nextContest === "Mental Maths" ? "selected-btn" : undefined
                  }
                >
                  Mental Maths
                </button>
                <button
                  value="Mathematics to entertain your spirit"
                  onClick={(e) => setNextContest(e.target.value)}
                  className={
                    nextContest === "Mathematics to entertain your spirit"
                      ? "selected-btn"
                      : undefined
                  }
                >
                  Mathematics to entertain your spirit
                </button>
              </div>
            </div>
          </div>
          <div className="feedback-text">
            <p>Do you have any other suggestions for future competition?</p>
            <textarea
              placeholder="Feedback here..."
              onChange={(e) => setFeedbackText(e.target.value)}
            />
          </div>
          {error && <Error msg={error} />}
          <button
            className="feedback-submit"
            type="submit"
            onClick={handleSubmit}
          >
            Submit Feedback
          </button>
        </div>
      )}
    </>
  );
};

export default FeedBack;
