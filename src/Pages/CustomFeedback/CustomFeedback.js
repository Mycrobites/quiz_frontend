import React from "react";
import { useParams, useHistory } from "react-router-dom";
import "./CustomFeedback.css";
import { useState, useContext } from "react";
import UserContext from "../../Context/UserContext";
import axios from "../../axios/axios";
import Loader from "../../Components/Loader/LoadingBar";
import { v4 } from "uuid";

const CustomFeedback = () => {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseType, setResponseType] = useState("");
  const { userDetails } = useContext(UserContext);
  const { id } = useParams();

  // console.log(id);

  const history = useHistory();

  const createFeedback = async () => {
    try {
      const postData = {
        quiz_id: id,
        user: userDetails.user_id,
        question: questions,
      };
      console.log(postData);
      const config = {
        headers: { Authorization: `Bearer ${userDetails.access}` },
      };
      setLoading(true);
      const { data } = await axios.post(
        "/api/FeedbackQs/post",
        postData,
        config
      );
      // console.log(data);
      alert("Feedback Created Successfully");
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };

  // useEffect(() => {
  //   createFeedback();
  // }, [id]);

  const confirmQuestion = (e) => {
    if (updateId) {
      if (question && responseType) {
        let arr = questions;
        let obj = arr[updateId];
        obj.question = question;
        obj.responseType = responseType;
        arr[updateId] = obj;
        setQuestions(arr);
        setQuestion("");
        setResponseType("");
        setUpdateId("");
      } else {
        alert("Add question and select response type");
      }
    } else {
      if (question && responseType) {
        let quest = {
          id: v4(),
          question: question,
          responseType: responseType,
        };
        setQuestions([...questions, quest]);
        setQuestion("");
        setResponseType("");
      } else {
        alert("Add question and select response type");
      }
    }
  };

  const deleteQ = (id) => {
    setQuestions(questions.filter((quest) => quest.id !== id));
  };

  const editQ = (e) => {
    let obj = questions[e.target.id];
    setQuestion(obj.question);
    setResponseType(obj.responseType);
    setUpdateId(e.target.id);
  };

  return (
    <div className="customfeedback">
      <div className="g1">
        <div className="j1">
          <div className="j11">
            <p className="title1">Custom Feedback</p>
            <p className="p1">Add the questions for feedback.</p>
            {/* <button className="p1" onClick={() => console.log(questions)}>
              show feedback. q
            </button> */}
          </div>
          <div className="j12">
            <button
              onClick={() => history.push(`/quizquestions/${id}`)}
              className="select bn create1"
            >
              Back
            </button>
            <button
              onClick={() => createFeedback()}
              className="select bn create"
            >
              Save
            </button>
            <button
              onClick={() => history.push(`/previewfeedback/${id}`)}
              className="select bn prevfeed"
              
            >
              Preview Feedback
            </button>
          </div>
        </div>
      </div>
      <div className="element">
        <div className="p2">
          <label className="p4">Your Question</label>
        </div>
        <div className="p3">
          <input
            type="text"
            className="input1"
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
          />
          <select
            id="responsetype"
            className="select"
            onChange={(e) => setResponseType(e.target.value)}
            value={responseType}
          >
            <option className="select1">select option</option>
            <option className="select1" value="range">
              Slider
            </option>
            <option className="select2" value="text">
              Text
            </option>
            <option className="select3" value="radio">
              Yes/No
            </option>
          </select>
          <button onClick={(e) => confirmQuestion(e)} className="select bn">
            Confirm
          </button>
        </div>
      </div>
      <div>
        {questions.map((question, index) => {
          return (
            <div className="element1" key={index}>
              <div className="p2">
                <label className="p4">Question</label>
              </div>
              <div className="p33">
                <h3 className="p31">{question.question}</h3>
                <h5 className="p32">Response Type : {question.responseType}</h5>
                <button
                  className="select bn cn"
                  id={index}
                  onClick={(e) => editQ(e)}
                >
                  Update
                </button>
                <button
                  className="select bn cn"
                  onClick={() => deleteQ(question.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {loading && (
        <div className="quiz--loader">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default CustomFeedback;
