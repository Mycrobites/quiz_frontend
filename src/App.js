import { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./Pages/LoginPage/Login";
import QuizPage from "./Pages/QuizPage/QuizPage";
import Quizzes from "./Pages/Quizzes/Quizzes";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";

import UserContext from "./Context/UserContext";
import Instruction from "./Pages/InstructionPage/Instruction";
import TeacherQuizzes from "./Pages/TeacherQuizzes/TeacherQuizzes";
import QuizQuestions from "./Pages/QuizQuestions/QuizQuestions";
import QuizEditPage from "./Pages/QuizEditPage/QuizEditPage";
import TeacherHomePage from "./Pages/TeacherHomePage/TeacherHomePage";
import FeedBack from "./Pages/FeedBackPage/FeedBack";
import CustomFeedback from "./Pages/CustomFeedback/CustomFeedback";
import PreviewFeedBack from "./Pages/CustomFeedback/PreviewFeedBack";
import SubjectReport from "./Pages/Report/SubjectReport";
import Comparative from "./Pages/Report/Comparative";

import AllScores from "./Pages/AllScores/AllScores";

import GenerateExcel from "./Pages/QuizQuestions/GenerateExcel";
import StudentReport from "./Pages/Report/StudentReport";
import Register from "./Pages/RegisterPage/Register";
import QuizReactTable from "./Pages/QuizQuestions/QuizReactTable";
import Terms from "./Pages/RegisterPage/Terms";

const App = () => {
  const { userDetails, isTestSubmitted } = useContext(UserContext);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {userDetails ? (
              userDetails.role === "Teacher" ? (
                <TeacherHomePage />
              ) : (
                <Quizzes />
              )
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route exact path="/login">
            {!userDetails ? <Login /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/Register">
            {!userDetails ? <Register /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/terms">
            {!userDetails ? <Terms /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/quizpage/:id">
            {userDetails ? (
              userDetails.role === "Student" ? (
                isTestSubmitted ? (
                  <Redirect to="/feedback/" />
                ) : (
                  <QuizPage />
                )
              ) : (
                <Redirect to="/404" />
              )
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route exact path="/instruction/:id">
            {userDetails ? (
              userDetails.role === "Student" ? (
                isTestSubmitted ? (
                  <Redirect to="/feedback/" />
                ) : (
                  <Instruction />
                )
              ) : (
                <Redirect to="/404" />
              )
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route exact path="/feedback/">
            {userDetails ? (
              userDetails.role === "Student" ? (
                <FeedBack />
              ) : (
                <Redirect to="/404" />
              )
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route exact path="/allscores/:username">
            {userDetails ? (
              userDetails.role === "Student" ? (
                <AllScores />
              ) : (
                <Redirect to="/404" />
              )
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route exact path="/studentreport/:testid">
            {userDetails ? (
              userDetails.role === "Student" ? (
                <StudentReport />
              ) : (
                <Redirect to="/404" />
              )
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route exact path="/report/subjectreport/:username/:id">
            {userDetails ? (
              userDetails.role === "Student" ? (
                <SubjectReport />
              ) : (
                <Redirect to="/404" />
              )
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route exact path="/report/comparativereport/:username/:id">
            {userDetails ? (
              userDetails.role === "Student" ? (
                <Comparative />
              ) : (
                <Redirect to="/404" />
              )
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route exact path="/customfeedback/:id">
            {userDetails ? (
              userDetails.role === "Teacher" ? (
                <CustomFeedback />
              ) : (
                <Redirect to="/404" />
              )
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route exact path="/generateresult/:id">
            {userDetails ? (
              userDetails.role === "Teacher" ? (
                <GenerateExcel />
              ) : (
                <Redirect to="/404" />
              )
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route exact path="/previewfeedback/:id">
            {userDetails ? (
              userDetails.role === "Teacher" ? (
                <PreviewFeedBack />
              ) : (
                <Redirect to="/404" />
              )
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route exact path="/allquizzes">
            {userDetails ? (
              userDetails.role === "Teacher" ? (
                <TeacherQuizzes />
              ) : (
                <Redirect to="/404" />
              )
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route exact path="/uploadQuestion">
            {userDetails ? (
              userDetails.role === "Teacher" ? (
                <QuizReactTable />
              ) : (
                <Redirect to="/404" />
              )
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route exact path="/quizquestions/:id">
            {userDetails ? (
              userDetails.role === "Teacher" ? (
                <QuizQuestions />
              ) : (
                <Redirect to="/404" />
              )
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route exact path="/quizedit/:id">
            {userDetails ? (
              userDetails.role === "Teacher" ? (
                <QuizEditPage />
              ) : (
                <Redirect to="/404" />
              )
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
