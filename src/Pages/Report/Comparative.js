import React from "react";
import "./Comparative.css";
import { Chart } from "react-google-charts";
import { useParams } from "react-router";
import axios from "../../axios/axios";
import UserContext from "../../Context/UserContext";
import { useHistory } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import ReactHtmlParser from "react-html-parser";

function Comparative() {
  const { username, id } = useParams();
  console.log("USERNAME:", username, "ID:", id);
  const [isLoading, setIsLoading] = useState(false);
  const { userDetails } = useContext(UserContext);
  const [resultData, setResultData] = useState("");
  const [quiz, setQuiz] = useState([]);
  const history = useHistory();
  var currentTime = new Date();
  var currentOffset = currentTime.getTimezoneOffset();
  var ISTOffset = 330; // IST offset UTC +5:30
  var ISTTime = new Date(
    currentTime.getTime() + (ISTOffset + currentOffset) * 60000
  );
  // ISTTime now represents the time in IST coordinates
  var hoursIST = ISTTime.getHours();
  var minutesIST = ISTTime.getMinutes();
  var days = ISTTime.getDay();
  var months = ISTTime.getMonth();
  let day;
  let month;
  var ampm = hoursIST >= 12 ? "PM" : "AM";
  if (days === 1) {
    day = "Monday";
  } else if (days === 2) {
    day = "Tuesday";
  }
  if (days === 3) {
    day = "Wednesday";
  }
  if (days === 4) {
    day = "Thursday";
  }
  if (days === 5) {
    day = "Friday";
  }
  if (days === 6) {
    day = "Saturday";
  }
  if (days === 7) {
    day = "Sunday";
  }

  // month
  if (months === 0) {
    month = "January";
  } else if (months === 1) {
    month = "February";
  } else if (months === 2) {
    month = "March";
  } else if (months === 3) {
    month = "April";
  } else if (months === 4) {
    month = "May";
  } else if (months === 5) {
    month = "June";
  } else if (months === 6) {
    month = "July";
  } else if (months === 7) {
    month = "August";
  } else if (months === 8) {
    month = "September";
  } else if (months === 9) {
    month = "October";
  } else if (months === 10) {
    month = "November";
  } else if (months === 11) {
    month = "December";
  }

  const fetchResult = async () => {
    setIsLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${userDetails.access}` },
      };
      const postData = {
        user: username,
        quiz: id,
      };
      const { data } = await axios.get(
        `/api/getresult/${username}/${id}`,
        postData,
        config
      );
      console.log(data);
      setResultData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${userDetails.access}` },
      };
      const { data } = await axios.get(`/api/get-quiz/${id}`, config);
      setQuiz(data?.quiz_questions);
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
      history.push("/404");
    }
  };

  useEffect(() => {
    fetchResult();
    fetchQuestions();
  }, []);
  return (
    <div className="report">
      <p className="head">Comparative Report</p>
      <p className="time">
        {day} , {ISTTime.getDate()} {month} {hoursIST} : {minutesIST} {ampm}
      </p>
      <div className="report-card">
        <div className="nav">
          <p
            className="nav-item scorecard"
            onClick={() =>
              history.push(`/report/${userDetails.username}/${id}`)
            }
          >
            Scorecard
          </p>
          <p
            className="nav-item subject-report"
            onClick={() =>
              history.push(`/report/subjectreport/${username}/${id}`)
            }
          >
            Subject Report
          </p>
          <p
            className="nav-item comparative-report active"
            onClick={() =>
              history.push(`/report/comparativereport/${username}/${id}`)
            }
          >
            Comparative Report
          </p>
        </div>
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
              <td className="col-2">536</td>
              <td className="col-3">N/A</td>
              <td className="col-4">1</td>
            </tr>
            <tr>
              <td className="col-1">Total Score</td>
              <td className="col-2">189/300</td>
              <td className="col-3">125.23/300</td>
              <td className="col-4">281/300</td>
            </tr>
            <tr>
              <td className="col-1">Accuracy</td>
              <td className="col-2">76%</td>
              <td className="col-3">65%</td>
              <td className="col-4">95%</td>
            </tr>
            <tr>
              <td className="col-1">Attempted Ques</td>
              <td className="col-2">66</td>
              <td className="col-3">53</td>
              <td className="col-4">75</td>
            </tr>
            <tr>
              <td className="col-1">Unattempted Ques</td>
              <td className="col-2">9</td>
              <td className="col-3">22</td>
              <td className="col-4">0</td>
            </tr>
            <tr>
              <td className="col-1">Correct Ques</td>
              <td className="col-2">50</td>
              <td className="col-3">35</td>
              <td className="col-4">71</td>
            </tr>
            <tr>
              <td className="col-1">Incorrect Ques</td>
              <td className="col-2">16</td>
              <td className="col-3">18</td>
              <td className="col-4">4</td>
            </tr>
            <tr>
              <td className="col-1">Pace (sec/ques)</td>
              <td className="col-2">162</td>
              <td className="col-3">174</td>
              <td className="col-4">144</td>
            </tr>
          </table>
        </div>
        <div className="answerkey">
          <h3 className="answer-key-title">Answer Key</h3>
          {quiz.map((question, index) => {
            return (
              <div  className="answer" key={index}>
                <div className="answer-key-question">
                    <h3 className="number">Q - {index + 1}</h3>
                    <h3 className="ques-img">{ReactHtmlParser(question?.question)}</h3>
                    <p className="correct-answer">Correct Answer : {`${question?.answer["1"]}`}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Comparative;
