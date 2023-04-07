import { useState, useEffect, useContext } from "react";
import UserContext from "../../Context/UserContext";
import TeacherNavbar from "../../Components/NavBar/TeacherNavbar";
import CreateQuizModal from "./CreateQuizModal";
import Loader from "../../Components/Loader/LoadingBar";
// import { AiFillDelete } from "react-icons/ai";
// import QuizCard from "./QuizCard";
import axios from "../../axios/axios";
// import Carousel from "react-elastic-carousel";
import "./TeacherQuizzes.css";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
// import { CircularProgress } from "@material-ui/core";
import TransitionsModal from "./CreateGroup";
import { useHistory } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
// import StartTest from "../Quizzes/StartTest";
import DeleteQuiz from "./DeleteQuiz";
import EditQuiz from "./EditQuiz";

const TeacherQuizzes = () => {
  // const [allquizzes, setAllquizzes] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [active, setactive] = useState(true);
  const {userDetails} = useContext(UserContext);
  const [upcoming, setupcoming] = useState(false);
  const [completed, setcompleted] = useState(false);

  const [upcomingquiz, setUpcoming] = useState([]);
  const [completedquiz, setCompletedQuiz] = useState([]);
  const [activequiz, setActiveQuiz] = useState([]);
  const [groupnumber, setGroupnumber] = useState(0);
  const [data, setdata] = useState([]);
  const [groupnames, setGroupnames] = useState([]);
  const [groupIds, setGroupIds] = useState([]);
  const [index, setindex] = useState(0);
  const [quizCounts, setQuizCounts] = useState([]);
  const [open, setopen] = useState(true);
  const history = useHistory();

  const [editQuiz, setEditQuiz] = useState(false);

  // const [quizzes, setQuizzes] = useState(getQuizDatafromSessionStorage);

  const [show, setShow] = useState(false);
  const [deleteQuiz, setDeleteQuiz] = useState(true);

  const fetchquizzes = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${userDetails.access}` },
      };
      setLoading(true);
      const { data } = await axios.get(
        `/api/get-all-quizzes/${userDetails.user_id}`,
        config
      );

      setCompletedQuiz(data[groupnumber]["completed"]);
      setUpcoming(data[groupnumber]["upcoming"]);
      setActiveQuiz(data[groupnumber]["active"]);
      setdata(data);

      console.log("Data",data);
      data.map((names, key) => {
        setGroupnames([...groupnames, names.name]);
      });

      // for (let x = 0;   x < data.length; x++) {
      //   setGroupIds([...groupIds , data[x].id])

      // }
      // console.log(groupIds);
      // console.log(groupnamesIds);
      // console.log(groupnamesIds);

      let counts = [];
      if (data.length > 0) {
        for (let h = 0; h < data.length; h++) {
          counts[h] = {
            active: data[h]["active"].length,
            upcoming: data[h]["upcoming"].length,
            completed: data[h]["completed"].length,
          };
        }
      }
      setQuizCounts(counts);

      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const setGroupdata = (group) => {
    for (let y = 0; y < data.length; y++) {
      if (data[y].name === group) {
        setindex(y);
      }
      console.log(index);

      setCompletedQuiz(data[index]["completed"]);

      setUpcoming(data[index]["upcoming"]);
      setActiveQuiz(data[index]["active"]);
    }
  };

  const setgroups = () => {
    let groups = [];
    let groupIds = [];
    for (let x = 0; x < data.length; x++) {
      groups.push(data[x].name);
      groupIds.push(data[x].id);
    }
    setGroupnames(groups);
    setGroupIds(groupIds);
  };

  // console.log(groupnames);

  // console.log(groupIds);

  useEffect(() => {
    fetchquizzes();
  }, []);
  // console.log(data[index].name);

  useEffect(() => {
    setgroups();
  }, [groupnames.length]);

  useEffect(() => {
    setGroupdata();
  }, [index]);

  // useEffect(() => {
  //   setCounts();
  // },[quizCounts.length]);

  // console.log(quizCounts);
  // console.log(upcomingquiz);

  return (
    <div className="teacher-quizzes">
      {!loading && (
        <div className="all">
          <TeacherNavbar show={show} setShow={setShow} />

          <div className="cont">
            <div className={show ? "side" : "side side_toggle"}>
              <div className="transparent">
                <TransitionsModal />
                {showCreateModal && (
                  <CreateQuizModal
                    apidata={data}
                    userDetails={userDetails}
                    setShowCreateModal={setShowCreateModal}
                  />
                )}
                <div
                  className="create-group"
                  onClick={() => setShowCreateModal(!showCreateModal)}
                >
                  <p>Create Quiz</p>
                  <AddCircleOutlineRoundedIcon />
                </div>
                {groupnames.length > 0 &&
                  quizCounts.length > 0 &&
                  groupnames.map((group, idx) => {
                    return (
                      <>
                        <div
                          className="side-bar-item-advanced-1"
                          onClick={() => {
                            setopen(!open);
                            setopen(!open);
                            setGroupdata(group);
                            setDeleteQuiz(true);
                          }}
                        >
                          {group}
                          {/* <button 
                                      onClick={() => setDeleteQuiz(true)}
                                      class="delete-icon" ><AiFillDelete /></button> */}
                                      
                          {deleteQuiz && (
                            <DeleteQuiz
                              id={groupIds[idx]}
                              deleteQuizGroup={deleteQuiz}
                            />
                          )}
                        </div>
                        <div
                          className="tabs"
                          style={{
                            display:
                              data[index].name === group && open
                                ? "block"
                                : "none",
                          }}
                        >
                          <div className="type-count first-type-count">
                            <p
                              className="side-bar-item"
                              onClick={() => {
                                setactive(true);
                                setupcoming(false);
                                setcompleted(false);
                              }}
                            >
                              Active{" "}
                            </p>
                            <p className="side-bar-item">
                              {quizCounts[idx].active}
                            </p>
                          </div>
                          <div className="type-count">
                            <p
                              className="side-bar-item"
                              onClick={() => {
                                setactive(false);
                                setupcoming(true);
                                setcompleted(false);
                              }}
                            >
                              Upcoming
                            </p>
                            <p className="side-bar-item">
                              {quizCounts[idx].upcoming}
                            </p>
                          </div>

                          <div className="type-count last-type-count">
                            <p
                              className="side-bar-item"
                              onClick={() => {
                                setactive(false);
                                setupcoming(false);
                                setcompleted(true);
                              }}
                            >
                              Completed
                            </p>
                            <p className="side-bar-item">
                              {quizCounts[idx].completed}
                            </p>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
            <div className="mainbar">
              {activequiz.length > 0 &&
                upcoming === false &&
                completed === false &&
                data.length > 0 && (
                  <div className="active">
                    <div className="active-active">
                      <p className="active-title">
                        {data[index].name}
                      </p>
                    </div>
                    {activequiz.map((quiz, index) => {
                      return (
                        <div className="active-quiz">
                          <div className="active-quiz-description">
                            <p className="active-quiz-title">
                              {ReactHtmlParser(quiz.title)}
                            </p>
                            <p className="active-quiz-des">
                              {ReactHtmlParser(quiz.desc)}
                            </p>
                            {/* <b>Instructions</b>
                                <p className="instructions-box">
                                  {ReactHtmlParser(quiz.instructions)}
                                </p> */}
                            <p className="question-time">
                              Duration : {quiz.duration}
                            </p>
                            <p className="start">
                              Start Date :{" "}
                              {quiz.starttime.slice(0, 10) +
                                "     " +
                                quiz.starttime.slice(11, 16) +
                                " GMT"}
                            </p>
                            <p className="end">
                              End Date :{" "}
                              {quiz.endtime.slice(0, 10) +
                                "     " +
                                quiz.endtime.slice(11, 16) +
                                " GMT"}
                            </p>
                          </div>
                          {/* <StartTest 
                                    title={quiz.title} 
                                    des={quiz.desc}
                                    start={quiz.starttime}
                                    end={quiz.endtime}
                                    duration={quiz.duration}
                                    instructions={quiz.instructions}
                                    id={quiz.id}/> */}
                          <div className="but">
                            <div>
                            <button
                              className="view"
                              onClick={() =>
                                history.push(`/quizquestions/${quiz.id}`)
                              }
                            >
                              View
                            </button>
                            </div>
                            <EditQuiz
                              id={quiz.id}
                              title={quiz.title}
                              desc={quiz.desc}
                              starttime={quiz.starttime}
                              endtime={quiz.endtime}
                              duration={quiz.duration}
                              instructions={quiz.instructions}
                              userDetails={userDetails}
                            />
                            <DeleteQuiz id={quiz.id} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

              {activequiz.length === 0 &&
                upcoming === false &&
                completed === false &&
                data.length > 0 && (
                  <div className="active">
                    <div className="active-active">
                      <p className="active-title">
                        {data[index].name} - Active
                      </p>
                    </div>
                    <div className="active-quiz">
                      <p className="empty">
                        Currently no active quizzes to show.
                      </p>
                    </div>
                  </div>
                )}

              {upcomingquiz.length > 0 &&
                active === false &&
                completed === false &&
                data.length > 0 && (
                  <div className="active">
                    <div className="active-active">
                      <p className="active-title">
                        {data[index].name} - Upcoming
                      </p>
                    </div>
                    {upcomingquiz.map((quiz, index) => {
                      return (
                        <div className="active-quiz">
                          <div className="active-quiz-description">
                            <p className="active-quiz-title">
                              {ReactHtmlParser(quiz.title)}
                            </p>
                            <p className="active-quiz-des">
                              {ReactHtmlParser(quiz.desc)}
                            </p>
                            {/* <b>Instructions</b> */}
                            {/* <p className="instructions-box">
                                    {ReactHtmlParser(quiz.instructions)}
                                  </p> */}
                            <p className="question-time">
                              Duration : {quiz.duration}
                            </p>
                            <p className="start">
                              Start Date :{" "}
                              {quiz.starttime.slice(0, 10) +
                                "     " +
                                quiz.starttime.slice(11, 16) +
                                " GMT"}
                            </p>
                            <p className="end">
                              End Date :{" "}
                              {quiz.endtime.slice(0, 10) +
                                "     " +
                                quiz.endtime.slice(11, 16) +
                                " GMT"}
                            </p>
                          </div>
                          <div className="but">
                            <button
                              className="view"
                              onClick={() =>
                                history.push(`/quizquestions/${quiz.id}`)
                              }
                            >
                              View
                            </button>
                            <EditQuiz
                              id={quiz.id}
                              title={quiz.title}
                              desc={quiz.desc}
                              starttime={quiz.starttime}
                              endtime={quiz.endtime}
                              duration={quiz.duration}
                              instructions={quiz.instructions}
                              userDetails={userDetails}
                            />
                            <DeleteQuiz id={quiz.id} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

              {upcomingquiz.length === 0 &&
                active === false &&
                completed === false &&
                data.length > 0 && (
                  <div className="active">
                    <div className="active-active">
                      <p className="active-title">
                        {data[index].name} - Upcoming
                      </p>
                    </div>
                    <div className="active-quiz">
                      <p className="empty">
                        Currently no upcoming quizzes to show.
                      </p>
                    </div>
                  </div>
                )}

              {/* {(missedquiz.length > 0 && active === false && attempted === false && upcoming === false && data.length > 0) && (
                          <div className="active">
                          <div className="active-active">
                              <p className="active-title">{data[index].name} - Missed</p>
                          </div>
                          {missedquiz.map((quiz,index) => {
                            return (
                              <div className="active-quiz">
                                <div className="active-quiz-description">
                                <p className="active-quiz-title">
                                      {ReactHtmlParser(quiz.title)}
                                    </p>
                                    <p className="active-quiz-des">
                                      {ReactHtmlParser(quiz.desc)}
                                    </p>
                                  
                                    <p className="question-time">
                                      Duration :  {quiz.duration} 
                                    </p>
                                    <p className="start">
                                      Start Date : {quiz.starttime.slice(0,10) + "     " + quiz.starttime.slice(11,16)+ " GMT"}
                                    </p>
                                    <p className="end">
                                      End Date : {quiz.endtime.slice(0,10) + "     " + quiz.endtime.slice(11,16)+ " GMT"}
                                    </p>
                                </div>
                                    <StartTest 
                                  duration={quiz.duration}
                                  instructions={quiz.instructions}
                                  id={quiz.id}/>
                              </div>
                            )
                          })}
                          
            
                        </div>
                        )} */}

              {/* {(missedquiz.length === 0 && active === false && attempted === false && upcoming === false && data.length > 0) && (
                                 <div className="active">
                                  <div className="active-active">
                                      <p className="active-title">{data[index].name} - Missed</p>
                                  </div>
                                  <div className="active-quiz">
                                        <p className="empty">Currently no missed quizzes to show.</p>
                                  </div>
                               </div>
                           )} */}

              {completedquiz.length > 0 &&
                active === false &&
                upcoming === false &&
                data && (
                  <div className="active">
                    <div className="active-active">
                      <p className="active-title">
                        {data[index].name} - Completed
                      </p>
                    </div>
                    {completedquiz.map((quiz, index) => {
                      return (
                        <div className="active-quiz">
                          <div className="active-quiz-description">
                            <p className="active-quiz-title">
                              {ReactHtmlParser(quiz.title)}
                            </p>
                            <p className="active-quiz-des">
                              {ReactHtmlParser(quiz.desc)}
                            </p>
                            {/* <b>Instructions</b> */}
                            {/* <p className="instructions-box">
                                    {ReactHtmlParser(quiz.instructions)}
                                  </p> */}
                            <p className="question-time">
                              Duration : {quiz.duration}
                            </p>
                            <p className="start">
                              Start Date :{" "}
                              {quiz.starttime.slice(0, 10) +
                                "     " +
                                quiz.starttime.slice(11, 16) +
                                " GMT"}
                            </p>
                            <p className="end">
                              End Date :{" "}
                              {quiz.endtime.slice(0, 10) +
                                "     " +
                                quiz.endtime.slice(11, 16) +
                                " GMT"}
                            </p>
                          </div>
                          {/* {quiz.resultid && (
                                  <div className="view-result">
                                    <button className="view-result-button" 
                                    onClick={() => history.push(`/studentreport/${quiz.resultid}`)}>View Result</button>
                                </div>
                                )} */}
                          <div className="but">
                            <button
                              className="view"
                              onClick={() =>
                                history.push(`/quizquestions/${quiz.id}`)
                              }
                            >
                              View
                            </button>
                            <EditQuiz
                              id={quiz.id}
                              title={quiz.title}
                              desc={quiz.desc}
                              starttime={quiz.starttime}
                              endtime={quiz.endtime}
                              duration={quiz.duration}
                              instructions={quiz.instructions}
                              userDetails={userDetails}
                            />
                            <DeleteQuiz id={quiz.id} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

              {completedquiz.length === 0 &&
                active === false &&
                upcoming === false &&
                data.length > 0 && (
                  <div className="active">
                    <div className="active-active">
                      <p className="active-title">
                        {data[index].name} - Attempted
                      </p>
                    </div>
                    <div className="active-quiz">
                      <p className="empty">
                        Currently no attempted quizzes to show.
                      </p>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="quizquestion-loader">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default TeacherQuizzes;
