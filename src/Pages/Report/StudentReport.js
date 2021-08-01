import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import UserContext from "../../Context/UserContext";
import { Chart } from "react-google-charts";
import axios from "../../axios/axios";
import Loader from "../../Components/Loader/LoadingBar";
import ReactHtmlParser from "react-html-parser";
import SubjectReport from "./SubjectReport";

//CSS FILES
import "./Report.css";
import "./SubjectReport.css";
import "./Comparative.css";

const StudentReport = () => {
  const { testid } = useParams();
  const { userDetails } = useContext(UserContext);

  //Conditionals
  const [isLoading, setIsLoading] = useState(false);
  const [isScoreCard, setIsScoreCard] = useState(true);
  const [isSubjectReport, setIsSubjectReport] = useState(false);
  const [isComparativeReport, setIsComparativeReport] = useState(false);
  const [answerkey, setAnswerkey] = useState(false);

  //Data Handling
  const [userData, setUserData] = useState([]);
  const [averageData, setAverageData] = useState([]);
  const [topperData, setTopperData] = useState([]);
  const [overallDifficulty, setOverallDifficulty] = useState([]);
  const [quizResponses, setQuizResponses] = useState([]);
  const [subjectwiseDifficulty, setSubjectwiseDifficulty] = useState([]);
  //Methods
  const fetchStudentReport = async () => {
    setIsLoading(true);
    const config = {
      headers: { Authorization: `Bearer ${userDetails.access}` },
    };
    try {
      console.log("user=>", localStorage.getItem("username"));
      const { data } = await axios.get(
        `/api/getstudentreport/${localStorage.getItem("username")}/${testid}`,
        config
      );
      console.log("DATA", data);
      setUserData(data.data);
      setAverageData(data.average);
      setTopperData(data.topper);
      // handleOverallDifficulty();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleOverallDifficulty = () => {
    // console.log("USER DATA ANALYSIS:", userData.analysis[`Question 1`]);
    console.log("HANDLEOVERALLDIFFICULTY");
    let diff = new Array(3);
    const { analysis } = userData;
    console.log(analysis);
    for (const key in analysis) {
      // console.log(`${key}: ${analysis[key]}`);
      if (key.includes("dificulty")) {
        if (key.includes("Easy")) {
          console.log(analysis[key]);
          diff[0] = analysis[key];
        }
        if (key.includes("Medium")) {
          console.log(analysis[key]);
          diff[1] = analysis[key];
        }
        if (key.includes("Hard")) {
          console.log(analysis[key]);
          diff[2] = analysis[key];
        }
        // diff.push(userData.analysis[key]);
      }
    }
    console.log(diff);
    setOverallDifficulty(diff);
  };

  const handleQuizResponses = () => {
    console.log("USER RESPONSES:", userData.responses);
    setQuizResponses(userData.responses);
  };

  const handleSubjectwiseDifficulty = () => {
    console.log("SUBJECTWISE DIFFICULTY:", userData.subjectwise_difficulty);
    const { subjectwise_difficulty } = userData;
    console.log(subjectwise_difficulty);
    setSubjectwiseDifficulty(subjectwise_difficulty);
  };

  console.log(answerkey);
  //Hooks
  useEffect(() => {
    fetchStudentReport();
  }, []);

  useEffect(() => {
    if (userData) {
      handleOverallDifficulty();
      handleQuizResponses();
      handleSubjectwiseDifficulty();
    }
  }, [userData]);

  return (
    <div>
      {isLoading ? (
        <div className="quizquestion-loader">
          <Loader />
        </div>
      ) : (
        <>
          <div className="report-card">
            <div className="report-nav">
              <button
                style={{
                  backgroundColor: isScoreCard ? "#ffffff" : "#214786",
                  color: isScoreCard ? "#214786" : "#ffffff",
                  outline: "none",
                  border: "none",
                  marginRight: "2px",
                }}
                className="nav-item-2 scorecard "
                onClick={() => {
                  setIsScoreCard(true);
                  setIsSubjectReport(false);
                  setIsComparativeReport(false);
                  setAnswerkey(false);
                }}
              >
                Scorecard
              </button>
              <button
                className="nav-item-2 subject-report"
                style={{
                  backgroundColor: isSubjectReport ? "#ffffff" : "#214786",
                  color: isSubjectReport ? "#214786" : "#ffffff",
                  outline: "none",
                  border: "none",
                  marginRight: "2px",
                }}
                onClick={() => {
                  setIsSubjectReport(true);
                  setIsScoreCard(false);
                  setIsComparativeReport(false);
                  setAnswerkey(false);
                }}
              >
                Subject Report
              </button>
              <button
                className="nav-item-2 comparative-report"
                style={{
                  backgroundColor: isComparativeReport ? "#ffffff" : "#214786",
                  color: isComparativeReport ? "#214786" : "#ffffff",
                  outline: "none",
                  border: "none",
                  marginRight: "2px",
                }}
                onClick={() => {
                  setIsComparativeReport(true);
                  setIsScoreCard(false);
                  setIsSubjectReport(false);
                  setAnswerkey(false);
                }}
              >
                Comparative Report
              </button>
              <button
                className="nav-item-2 comparative-report"
                style={{
                  backgroundColor: answerkey ? "#ffffff" : "#214786",
                  color: answerkey ? "#214786" : "#ffffff",
                  outline: "none",
                  border: "none",
                }}
                onClick={() => {
                  setIsComparativeReport(false);
                  setIsScoreCard(false);
                  setIsSubjectReport(false);
                  setAnswerkey(true);
                }}
              >
                Q & A List
              </button>
            </div>
          </div>
          {isScoreCard && (
            <div className="container">
              <p className="head_">Result Analysis - Scorecard</p>
              <div className="rank" style={{ display: "flex" }}>
                <div className="rank-card">
                  <p className="rank-des">Rank Obtained:</p>
                  <p className="rank-rank">{userData.rank}</p>
                </div>
                <div className="marks-card">
                  <p className="rank-des">Marks Obtained:</p>
                  <p className="rank-rank">{userData.marks_obtained}</p>
                </div>
              </div>
              <div className="txt">
                <p className="score-txt">
                  {`In this test , you have scored ${userData.marks_obtained} marks and your rank is ${userData.rank}. Other metrics of your performance on Difficulty
               level, Subjects and the like are available below.`}{" "}
                </p>
              </div>
              <div className="accuracy">
                <p
                  className="accuracy-1"
                  onClick={() => console.log("+=>", userData)}
                >
                  Accuracy:
                  <span style={{ color: "#214786", fontWeight: "600" }}>{`${(
                    (userData.correctquestion / userData.totalquestion) *
                    100
                  ).toFixed(2)}`}</span>
                </p>
                <p className="attempted">
                  Total attempted questions:
                  <span style={{ color: "#214786", fontWeight: "700" }}>
                    {`Total attempted Questions: ${userData.attempted} of ${userData.totalquestion} (Correct:${userData.correctquestion} Incorrect:${userData.incorrectquestion})`}
                  </span>
                </p>
                <p className="pace">
                  Pace: {userData.time_taken}
                </p>
              </div>
              <div className="graph">
                <div className="bar-graph">
                  <Chart
                    width={"600px"}
                    height={"300px"}
                    chartType="Bar"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ["", "Easy", "Medium", "Hard"],
                      [
                        "Correct",
                        overallDifficulty[0]?.correct_questions,
                        overallDifficulty[1]?.correct_questions,
                        overallDifficulty[2]?.correct_questions,
                      ],
                      [
                        "Incorrect",
                        overallDifficulty[0]?.incorrect,
                        overallDifficulty[1]?.incorrect,
                        overallDifficulty[2]?.incorrect,
                      ],
                      [
                        "Unattempted",
                        overallDifficulty[0]?.not_attempted,
                        overallDifficulty[1]?.not_attempted,
                        overallDifficulty[2]?.not_attempted,
                      ],
                      [
                        "Total",
                        overallDifficulty[0]?.total_questions,
                        overallDifficulty[1]?.total_questions,
                        overallDifficulty[2]?.total_questions,
                      ],
                    ]}
                    options={{
                      chart: {
                        title: "",
                        subtitle: "",
                      },
                    }}
                  />
                </div>
                <div className="pie-chart">
                  <Chart
                    width={"500px"}
                    height={"300px"}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ["Quiz", "Types of Questions"],
                      ["Correct", userData?.correctquestion],
                      ["Incorrect", userData?.incorrectquestion],
                      ["unattempted", userData?.not_attempted],
                    ]}
                    options={{
                      title: "Attempt Summary",
                    }}
                  />
                </div>
              </div>
              {/* </div> */}
            </div>
          )}
          {answerkey && (
            <div className="answerkey">
              <h3 className="answer-key-title">Answer Key</h3>
              {quizResponses.map((response, index) => {
                return (
                  <div key={index} className="answer">
                    <div
                      className="answer-key-question"
                      style={{ marginLeft: "4vw" }}
                    >
                      <h3 className="number">
                        Question - {response?.question_number}
                      </h3>
                      <h3 className="ques-img">
                        {ReactHtmlParser(response?.question)}
                      </h3>
                      <h3
                        className="correct-answer"
                        style={{
                          background:
                            response["your answer"] ===
                            response["correct answer"]
                              ? "#66ff33"
                              : "red",
                          color:
                            response["your answer"] ===
                            response["correct answer"]
                              ? "black"
                              : "white",
                        }}
                      >
                        Your Answer : {response["your answer"]}
                      </h3>
                      <h3 className="correct-answer">
                        Correct Answer : {response["correct answer"]}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {isSubjectReport && (
            <div>
              <p className="subject-report-title">Subject Report</p>
              <div className="report-card-2">
                <div className="text">
                  {/* <p className="h-2">
                    Marks Obtained :{" "}
                    <span style={{ color: "#214786", fontWeight: "600" }}>
                      33/125 (+40 -7)
                    </span>
                  </p> */}
                </div>
                <div className="subject">
                  {Object.keys(subjectwiseDifficulty[0]).map((key) => {
                    return (
                      <div>
                        <h3 className="subject-title">{key}</h3>
                        <p className="h-2">
                          Accuracy :
                          <span style={{ color: "#214786", fontWeight: "600" }}>
                            {`${(
                              ((subjectwiseDifficulty[0][key]?.Easy?.correct
                                ? subjectwiseDifficulty[0][key]?.Easy?.correct
                                : 0 +
                                  subjectwiseDifficulty[0][key]?.Medium?.correct
                                ? subjectwiseDifficulty[0][key]?.Medium?.correct
                                : 0 +
                                  subjectwiseDifficulty[0][key]?.Hard?.correct
                                ? subjectwiseDifficulty[0][key]?.Hard?.correct
                                : 0) /
                                ((subjectwiseDifficulty[0][key]?.Easy?.correct
                                  ? subjectwiseDifficulty[0][key]?.Easy?.correct
                                  : 0 +
                                    subjectwiseDifficulty[0][key]?.Medium
                                      ?.correct
                                  ? subjectwiseDifficulty[0][key]?.Medium
                                      ?.correct
                                  : 0 +
                                    subjectwiseDifficulty[0][key]?.Hard?.correct
                                  ? subjectwiseDifficulty[0][key]?.Hard?.correct
                                  : 0) +
                                  (subjectwiseDifficulty[0][key]?.Easy
                                    ?.incorrect
                                    ? subjectwiseDifficulty[0][key]?.Easy
                                        ?.incorrect
                                    : 0 +
                                      subjectwiseDifficulty[0][key]?.Medium
                                        ?.incorrect
                                    ? subjectwiseDifficulty[0][key]?.Medium
                                        ?.incorrect
                                    : 0 +
                                      subjectwiseDifficulty[0][key]?.Hard
                                        ?.incorrect
                                    ? subjectwiseDifficulty[0][key]?.Hard
                                        ?.incorrect
                                    : 0) +
                                  (subjectwiseDifficulty[0][key]?.Easy
                                    ?.not_attempted
                                    ? subjectwiseDifficulty[0][key]?.Easy
                                        ?.not_attempted
                                    : 0 +
                                      subjectwiseDifficulty[0][key]?.Medium
                                        ?.not_attempted
                                    ? subjectwiseDifficulty[0][key]?.Medium
                                        ?.not_attempted
                                    : 0 +
                                      subjectwiseDifficulty[0][key]?.Hard
                                        ?.not_attempted
                                    ? subjectwiseDifficulty[0][key]?.Hard
                                        ?.not_attempted
                                    : 0))) *
                              100
                            ).toFixed(2)}`}{" "}
                            %
                          </span>
                        </p>
                        <p className="h-2">
                          Total Attempted Questions :{" "}
                          <span style={{ color: "#214786", fontWeight: "600" }}>
                            {`${
                              (subjectwiseDifficulty[0][key]?.Easy?.correct
                                ? subjectwiseDifficulty[0][key]?.Easy?.correct
                                : 0 +
                                  subjectwiseDifficulty[0][key]?.Medium?.correct
                                ? subjectwiseDifficulty[0][key]?.Medium?.correct
                                : 0 +
                                  subjectwiseDifficulty[0][key]?.Hard?.correct
                                ? subjectwiseDifficulty[0][key]?.Hard?.correct
                                : 0) +
                              (subjectwiseDifficulty[0][key]?.Easy?.incorrect
                                ? subjectwiseDifficulty[0][key]?.Easy?.incorrect
                                : 0 +
                                  subjectwiseDifficulty[0][key]?.Medium
                                    ?.incorrect
                                ? subjectwiseDifficulty[0][key]?.Medium
                                    ?.incorrect
                                : 0 +
                                  subjectwiseDifficulty[0][key]?.Hard?.incorrect
                                ? subjectwiseDifficulty[0][key]?.Hard?.incorrect
                                : 0) +
                              (subjectwiseDifficulty[0][key]?.Easy
                                ?.not_attempted
                                ? subjectwiseDifficulty[0][key]?.Easy
                                    ?.not_attempted
                                : 0 +
                                  subjectwiseDifficulty[0][key]?.Medium
                                    ?.not_attempted
                                ? subjectwiseDifficulty[0][key]?.Medium
                                    ?.not_attempted
                                : 0 +
                                  subjectwiseDifficulty[0][key]?.Hard
                                    ?.not_attempted
                                ? subjectwiseDifficulty[0][key]?.Hard
                                    ?.not_attempted
                                : 0)
                            }`}{" "}
                            (Correct:
                            {`${
                              subjectwiseDifficulty[0][key]?.Easy?.correct
                                ? subjectwiseDifficulty[0][key]?.Easy?.correct
                                : 0 +
                                  subjectwiseDifficulty[0][key]?.Medium?.correct
                                ? subjectwiseDifficulty[0][key]?.Medium?.correct
                                : 0 +
                                  subjectwiseDifficulty[0][key]?.Hard?.correct
                                ? subjectwiseDifficulty[0][key]?.Hard?.correct
                                : 0
                            }`}{" "}
                            , Incorrect:
                            {`${
                              subjectwiseDifficulty[0][key]?.Easy?.incorrect
                                ? subjectwiseDifficulty[0][key]?.Easy?.incorrect
                                : 0 +
                                  subjectwiseDifficulty[0][key]?.Medium
                                    ?.incorrect
                                ? subjectwiseDifficulty[0][key]?.Medium
                                    ?.incorrect
                                : 0 +
                                  subjectwiseDifficulty[0][key]?.Hard?.incorrect
                                ? subjectwiseDifficulty[0][key]?.Hard?.incorrect
                                : 0
                            }`}
                            )
                          </span>
                        </p>
                        <div className="graph">
                          <div className="bar-graph-2">
                            <Chart
                              width={"600px"}
                              height={"300px"}
                              chartType="Bar"
                              loader={<div>Loading Chart</div>}
                              data={[
                                ["", "Easy", "Medium", "Hard"],
                                [
                                  "Correct",
                                  subjectwiseDifficulty[0][key]?.Easy?.correct,
                                  subjectwiseDifficulty[0][key]?.Medium
                                    ?.correct,
                                  subjectwiseDifficulty[0][key]?.Hard?.correct,
                                ],
                                [
                                  "Incorrect",
                                  subjectwiseDifficulty[0][key]?.Easy
                                    ?.incorrect,
                                  subjectwiseDifficulty[0][key]?.Medium
                                    ?.incorrect,
                                  subjectwiseDifficulty[0][key]?.Hard
                                    ?.incorrect,
                                ],
                                [
                                  "Unattempted",
                                  subjectwiseDifficulty[0][key]?.Easy
                                    ?.not_attempted,
                                  subjectwiseDifficulty[0][key]?.Medium
                                    ?.not_attempted,
                                  subjectwiseDifficulty[0][key]?.Hard
                                    ?.not_attempted,
                                ],
                                [
                                  "Total",
                                  subjectwiseDifficulty[0][key]?.Easy
                                    ?.total_questions,
                                  subjectwiseDifficulty[0][key]?.Medium
                                    ?.total_questions,
                                  subjectwiseDifficulty[0][key]?.Hard
                                    ?.total_questions,
                                ],
                              ]}
                              options={{
                                chart: {
                                  title: "",
                                  subtitle: "",
                                },
                              }}
                            />
                          </div>
                          <div className="pie-chart-2">
                            <Chart
                              width={"475px"}
                              height={"300px"}
                              chartType="PieChart"
                              loader={<div>Loading Chart</div>}
                              data={[
                                ["Quiz", "Types of Questions"],
                                [
                                  "Correct",
                                  subjectwiseDifficulty[0][key]?.Easy?.correct
                                    ? subjectwiseDifficulty[0][key]?.Easy
                                        ?.correct
                                    : 0 +
                                      subjectwiseDifficulty[0][key]?.Medium
                                        ?.correct
                                    ? subjectwiseDifficulty[0][key]?.Medium
                                        ?.correct
                                    : 0 +
                                      subjectwiseDifficulty[0][key]?.Hard
                                        ?.correct
                                    ? subjectwiseDifficulty[0][key]?.Hard
                                        ?.correct
                                    : 0,
                                ],
                                [
                                  "Incorrect",
                                  subjectwiseDifficulty[0][key]?.Easy?.incorrect
                                    ? subjectwiseDifficulty[0][key]?.Easy
                                        ?.incorrect
                                    : 0 +
                                      subjectwiseDifficulty[0][key]?.Medium
                                        ?.incorrect
                                    ? subjectwiseDifficulty[0][key]?.Medium
                                        ?.incorrect
                                    : 0 +
                                      subjectwiseDifficulty[0][key]?.Hard
                                        ?.incorrect
                                    ? subjectwiseDifficulty[0][key]?.Hard
                                        ?.incorrect
                                    : 0,
                                ],
                                [
                                  "Unattempted",
                                  subjectwiseDifficulty[0][key]?.Easy
                                    ?.not_attempted
                                    ? subjectwiseDifficulty[0][key]?.Easy
                                        ?.not_attempted
                                    : 0 +
                                      subjectwiseDifficulty[0][key]?.Medium
                                        ?.not_attempted
                                    ? subjectwiseDifficulty[0][key]?.Medium
                                        ?.not_attempted
                                    : 0 +
                                      subjectwiseDifficulty[0][key]?.Hard
                                        ?.not_attempted
                                    ? subjectwiseDifficulty[0][key]?.Hard
                                        ?.not_attempted
                                    : 0,
                                ],
                              ]}
                              options={{
                                title: "Attempt Summary",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          {isComparativeReport && (
            <div>
              <p className="subject-report-title">Comparative Report</p>
              <div className="report-card-2">
                <div className="table">
                  <table>
                    <tr>
                      <th className="col1"> </th>
                      <th className="col2">Your Detail</th>
                      <th className="col3">Average</th>
                      <th className="col4">Topper Details</th>
                    </tr>
                    <tr>
                      <td className="col-1">Rank</td>
                      <td className="col-2">{userData.rank}</td>
                      <td className="col-3">N/A</td>
                      <td className="col-4">1</td>
                    </tr>
                    <tr>
                      <td className="col-1">Total Score</td>
                      <td className="col-2">
                        {userData.marks_obtained.toFixed(2)}
                      </td>
                      <td className="col-3">
                        {averageData.marks_obtained.toFixed(2)}
                      </td>
                      <td className="col-4">
                        {topperData.marks_obtained.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="col-1">Accuracy</td>
                      <td className="col-2">
                        {`${(
                          (userData.correctquestion / userData.totalquestion) *
                          100
                        ).toFixed(2)}`}{" "}
                        %
                      </td>
                      <td className="col-3">
                        {`${(
                          (averageData.correctquestion /
                            averageData.totalquestion) *
                          100
                        ).toFixed(2)}`}{" "}
                        %
                      </td>
                      <td className="col-4">
                        {`${(
                          (topperData.correctquestion /
                            topperData.totalquestion) *
                          100
                        ).toFixed(2)}`}{" "}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td className="col-1">Attempted Ques</td>
                      <td className="col-2">{userData.attempted}</td>
                      <td className="col-3">{averageData.attempted}</td>
                      <td className="col-4">{topperData.attempted}</td>
                    </tr>
                    <tr>
                      <td className="col-1">Unattempted Ques</td>
                      <td className="col-2">{userData.not_attempted}</td>
                      <td className="col-3">{averageData.not_attempted}</td>
                      <td className="col-4">{topperData.notattempted}</td>
                    </tr>
                    <tr>
                      <td className="col-1">Correct Ques</td>
                      <td className="col-2">{userData.correctquestion}</td>
                      <td className="col-3">
                        {averageData.correctquestion.toFixed(2)}
                      </td>
                      <td className="col-4">{topperData.correctquestion}</td>
                    </tr>
                    <tr>
                      <td className="col-1">Incorrect Ques</td>
                      <td className="col-2">{userData.incorrectquestion}</td>
                      <td className="col-3">
                        {averageData.incorrectquestion.toFixed(2)}
                      </td>
                      <td className="col-4">{topperData.incorrectquestion}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StudentReport;
