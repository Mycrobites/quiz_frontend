import React from "react";
import { Chart } from "react-google-charts";

const ScoreCard = ({ userData, overallDifficulty }) => {
  return (
    <div className="container">
      <p className="head_">Scorecard -</p>
      <div className="rank" style={{ display: "flex" }}>
        <div className="rank-card">
          {/* <p className="rank-des">Rank Obtained:</p> */}
          <p className="rank-rank">
            <img
              src="https://static.online.vidyamandir.com/modules/mtp_quiz/image/Assg_Rank.png"
              alt="rank"
              style={{ height: "100px", width: "100px" }}
            />
            fgfgfgff
          </p>
          <p className="rank-rank">
            <img
              src="https://static.online.vidyamandir.com/modules/mtp_quiz/image/Assg_Students.png"
              alt="rank"
              style={{ height: "100px", width: "100px" }}
            />
            fgfgfgff
          </p>{" "}
          <p className="rank-rank">
            <img
              src="https://static.online.vidyamandir.com/modules/mtp_quiz/image/Assg_Marks.png"
              alt="rank"
              style={{ height: "100px", width: "100px" }}
            />
            fgfgfgff
          </p>{" "}
          <p className="rank-rank">
            <img
              src="https://static.online.vidyamandir.com/modules/mtp_quiz/image/Assg_Accuracy.png"
              alt="rank"
              style={{ height: "100px", width: "100px" }}
            />
            fgfgfgff
          </p>
        </div>
        <div className="marks-card">
          {/* <p className="rank-des">Marks Obtained:</p> */}
          <p className="rank-rank">
            <img
              src="https://static.online.vidyamandir.com/modules/mtp_quiz/image/Assg_Rank.png"
              alt="rank"
              style={{ height: "100px", width: "100px" }}
            />
            fgfgfgff
          </p>
          <p className="rank-rank">
            <img
              src="https://static.online.vidyamandir.com/modules/mtp_quiz/image/Assg_Students.png"
              alt="rank"
              style={{ height: "100px", width: "100px" }}
            />
            fgfgfgff
          </p>{" "}
          <p className="rank-rank">
            <img
              src="https://static.online.vidyamandir.com/modules/mtp_quiz/image/Assg_Marks.png"
              alt="rank"
              style={{ height: "100px", width: "100px" }}
            />
            fgfgfgff
          </p>{" "}
          <p className="rank-rank">
            <img
              src="https://static.online.vidyamandir.com/modules/mtp_quiz/image/Assg_Accuracy.png"
              alt="rank"
              style={{ height: "100px", width: "100px" }}
            />
            fgfgfgff
          </p>
        </div>
      </div>
      {/* https://static.online.vidyamandir.com/modules/mtp_quiz/image/Assg_Rank.png */}
      {/* https://static.online.vidyamandir.com/modules/mtp_quiz/image/Assg_Students.png */}
      {/* https://static.online.vidyamandir.com/modules/mtp_quiz/image/Assg_Marks.png */}
      {/* https://static.online.vidyamandir.com/modules/mtp_quiz/image/Assg_Accuracy.png */}
      {/* https://static.online.vidyamandir.com/modules/mtp_quiz/image/Assg_Completed.png */}
      {/* https://static.online.vidyamandir.com/modules/mtp_quiz/image/Assg_Pace.png */}
      {/* https://static.online.vidyamandir.com/modules/mtp_quiz/image/Assg_Rank.png */}
      {/* https://static.online.vidyamandir.com/modules/mtp_quiz/image/Assg_Referencerank.png */}
      {/* 
      <div className="accuracy">
        <p className="accuracy-1" onClick={() => console.log("+=>", userData)}>
          Accuracy:
          <span style={{ color: "black", fontWeight: "600" }}>{` ${(
            (userData.correctquestion / userData.totalquestion) *
            100
          ).toFixed(2)}`}</span>
        </p>
        <p className="attempted">
          Total attempted questions:
          <span style={{ color: "black", fontWeight: "600" }}>
            {`Total attempted Questions: ${userData.attempted} of ${userData.totalquestion} (Correct: ${userData.correctquestion} Incorrect: ${userData.incorrectquestion})`}
          </span>
        </p>
        <p className="pace">
          Pace: <span style={{ fontWeight: "600" }}>{userData.time_taken}</span>
        </p>
      </div> */}
      {/* <div className="graph">
        <div className="bar-graph">
          <Chart
            className="BarChart"
            chartType="Bar"
            loader={<div>Loading Chart</div>}
            data={[
              ["Attempted Questions", "Easy", "Medium", "Hard"],
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
            className="PieChart"
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
      </div> */}
    </div>
  );
};

export default ScoreCard;
