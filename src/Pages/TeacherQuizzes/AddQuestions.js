import React , {useState} from 'react'
import "./AddQuestions.css";
import close from "../Images/close.png"
import down from '../Images/down.png'
import down1 from '../Images/down1.png'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Linear from './Linear';
import { FastForward } from '@material-ui/icons';
import Sheet from './Sheet';
// import l from '../TeacherQuizzes/Images/'
const AddQuestions = () => {
    const [ad , setAdd]= useState([''])
    const [drop , setDrop] = useState(false)
    const [animal, setAnimal] = useState(null);
    const [num, setNum]= useState(false) 
    const [num1, setNum1]= useState(false) 
    const [row , setRow] = useState([''])
    const [col,setCol] = useState([''])
    const [plus , setPlus] = useState(1)
    const [show , setShow] =useState('Multiple choice')
    const [number1, setNumber1] = useState(1)
    const [number2, setNumber2] = useState(5)
    const [drop2 , setDrop2] = useState(false)
    const [drop3 , setDrop3] = useState(false)
    const [count, setCount] = useState(4);
    const placeholderText = `Option : ${count}`;
    function increment(){
      setCount(prevCount => prevCount+1);
    }
    const [grid , showGrid] = useState([''])
    const click= (e)=>{
      const nam = e.currentTarget.id;
      setShow(nam);
  }
  const click1= (e)=>{
    const nam = e.currentTarget.id;
    setNumber1(nam);
}
const click2= (e)=>{
  const nam = e.currentTarget.id;
  setNumber2(nam);
}
    
    function dropMenu(){
      switch(animal){
          
          case "Linear":
              return (
                <div>
                  
                  {grid.map(() => {
                    return <Linear
                     />;
                  })}
                  <div className="addsub">
                    <div>
                      <div
                        className="addbut"
                        onClick={() => {
                          showGrid([...grid, ""]);
                        }}
                      >
                        add question
                      </div>
                    </div>
                    <div>
                      <input type="submit" placeholder="submit" className='addSubmit'/>
                    </div>
                  </div>

                  {/* <Grid/> */}
                </div>
              );
          case "Short Answer":
              return (
                <div id="short">
                  <h3 className="short-ans">Short answer</h3>
                  <CKEditor
                    editor={ ClassicEditor }
                    data=""
                    
                />
                </div>
              );
          case "Grid":
              return (
                <div>
                  <CKEditor editor={ClassicEditor} data="" />
                  <div className="case3">
                    <div className="rows3">
                      <h3>Rows</h3>
                      <div className="rowcase3">
                        <input
                          type="text"
                          placeholder="Row 1"
                          className="row-input"
                        />
                      </div>
                      {row.map((index) => {
                        return (
                          <div>
                            <div className="functionality">
                              <div>
                                <input
                                  type="text"
                                  placeholder="Row 1"
                                  className="row-input"
                                />
                              </div>
                              <div
                                onClick={(i) => {
                                  const del = [...row];
                                  del.splice(i, 1);
                                  setRow(del);
                                }}
                              >
                                <img src={close} className="icon" />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <h4
                        onClick={() => {
                          setRow([...row, ""]);
                        }}
                        className="add-row"
                      >
                        Add Rows
                      </h4>
                    </div>
                    <div className="cols3">
                      <h3>Columns</h3>
                      <div className="rowcase3">
                        <input
                          type="text"
                          placeholder="Column 1"
                          className="col-input"
                        />
                      </div>
                      {col.map((index) => {
                        return (
                          <div>
                            <div className="functionality">
                              <div>
                                <input
                                  type="text"
                                  placeholder="Column 1"
                                  className="col-input"
                                />
                              </div>
                              <div
                                onClick={(i) => {
                                  const del = [...col];
                                  del.splice(i, 1);
                                  setCol(del);
                                }}
                              >
                                <img src={close} className="icon" />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <h4
                        onClick={() => {
                          setCol([...col, ""]);
                        }}
                        className="add-col"
                      >
                        Add Columns
                      </h4>
                    </div>
                  </div>
                  
                  <div className='addsub'>
                    <div>
                      <div className='addbut' >add question</div>
                    </div>
                    <div>
                      <input type="submit" placeholder='submit' />
                    </div>
                  </div>
                  
                </div>
              );
          case "Long Answer":
                return (
                  <div id="short">
                    {/* <h3 className="short-ans">Long-answer text</h3> */}
                    <CKEditor
                    editor={ ClassicEditor }
                    data=""
                    
                />
                  </div>
                );
          default:
              return (
                
              );
      }
  }
    
  return (
    <div className="quiz-main">
      <div className='quiz'>
        <div>
          <h1>Quiz</h1>
        </div>
        <div className="quiz-comp" >
          <div className="quiz-sub">
            {/* <input
              type="text"
              placeholder="Write your question"
              className="input-que "
              // style={{border:"none"}}
            /> */}
            <div className="dropdown">
              <div className="drop-main" onClick={() => {setDrop(!drop); }}>
                <h3 className='main-menu'>{show}</h3>
                <img src={down1} className='down1' />
              </div>
              {drop && (
                <div className="dropmenu" onClick={(event) => {
                        setAnimal(event.target.id);
                        setDrop(!drop)
                    }}>
                  <h3 id="Multiple choice" onClick={click} className='dropContent'>Multiple Choice</h3>
                  <h3 id='Linear' onClick={click} className='dropContent'>Linear Scale</h3>
                  <h3 id='Grid' onClick={click} className='dropContent'>Grid</h3>
                  <h3 id='Short Answer' onClick={click} className='dropContent'>Short Answer</h3>
                  <h3 id='Long Answer' onClick={click} className='dropContent'>Long Answer</h3>
                  
                </div>
              )}
            </div>
            
          </div>
          {dropMenu()}
          
          {/* </div> */}
        </div>
        
      </div>
      {/* <Sheet/> */}
    </div>
  );
}

export default AddQuestions