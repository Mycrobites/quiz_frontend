import { useState, useEffect, useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import './CreateGroup.css';
import UserContext from "../../Context/UserContext";
import axios from "../../axios/axios";
import Loader from "../../Components/Loader/LoadingBar";
import { BorderAllRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    border: 0,
    borderRadius: 10,
    borderColor: 'white'
  },
}));

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [quiztitle,setQuizTitle] = useState("");
  const [quizdescription,setQuizDescription] = useState("");
  const [data,setdata] = useState([]);
  const { userDetails } = useContext(UserContext);
  const [loading,setloading] = useState(false);
  const [message,setmessage] = useState("");
  const [error,setError] = useState(false);
  

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setmessage("");
  };

  const refreshPage = () => {
    window.location.reload();
  };
  
  const createGroup = async () => {
    setloading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${userDetails.access}` },
      };
      const postData = {
          title:quiztitle,
          description:quizdescription
      };
      const { data } = await axios.post(
        `/api/create-quiz-group`,
        postData,
        config
      );
      if(data){
        setloading(false);
      }
      setQuizTitle("");
      setQuizDescription("");
      setdata(data);
      setError(false);
      setmessage("New Quiz Group created successfully");
      refreshPage();
      console.log(data);
    } catch (err) {
      console.log(err.message);
      setmessage("New group couldn't be created try again later!");
      setError(true);
    }
  };

  console.log(quiztitle,quizdescription);

  return (
    <div>
        <div className="create-group" onClick={handleOpen}>
            <p>Create Quiz Group</p>
            <AddCircleOutlineRoundedIcon />
        </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
             <p className="modal-title">Enter Quiz Group Details</p>
             <div className="quiz-modal-title">
                <label className="modal-label">Enter Quiz Group Title</label>
                <input type="text" 
                className="modal-input" 
                onChange={(e) => setQuizTitle(e.target.value)}
                value={quiztitle}/>
             </div>
             <div className="quiz-modal-des">
                <label className="modal-label">Enter Quiz Group Description</label>
                <input type="text"  
                className="modal-input" 
                onChange={(e) => setQuizDescription(e.target.value)}
                value={quizdescription}/>
             </div>
                {message && (
                    <div className="quiz-group-message">
                        <p className="quiz-group-message-message" style={{background:error ? "#ffb3b3" : "#d4e7f7"}}>{message}</p>
                    </div>
                )}
             <button className="create-group-button" onClick={createGroup}>Create Quiz Group</button>
             
         </div>
        </Fade>
      </Modal>
                {loading  && (
                  <div className="quizquestion-loader">
                    <Loader />
                  </div>
                )}
    </div>
  );
}
