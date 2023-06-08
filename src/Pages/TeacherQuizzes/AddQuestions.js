import React , {useState} from 'react'
import "./AddQuestions.css";
import close from "../Images/close.png"
import down from '../Images/down.png'
import down1 from '../Images/down1.png'
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
                  {num && (
                    <div className="drop-label">
                      <h3
                        id="0"
                        onClick={(e) => {
                          setNum(!num);
                          setNumber1(e.target.id);
                          // click1();
                        }}
                      >
                        0
                      </h3>
                      <h3
                        id="1"
                        onClick={(e) => {
                          setNum(!num);
                          setNumber1(e.target.id);
                        }}
                      >
                        1
                      </h3>
                    </div>
                  )}
                  <div className="case1">
                    <div className="num1">
                      <h3>{number1}</h3>
                      <img
                        src={down}
                        className="icon1"
                        onClick={() => {
                          setNum(!num);
                        }}
                      />
                    </div>

                    <div>
                      <h3>to</h3>
                    </div>
                    <div className="labelDrop2">
                      {num1 && (
                        <div className="drop-label2">
                          <h3
                            id="2"
                            onClick={(e) => {
                              setNum1(!num1);
                              setNumber2(e.target.id);
                            }}
                          >
                            2
                          </h3>
                          <h3
                            id="3"
                            onClick={(e) => {
                              setNum1(!num1);
                              setNumber2(e.target.id);
                            }}
                          >
                            3
                          </h3>
                          <h3
                            id="4"
                            onClick={(e) => {
                              setNum1(!num1);
                              setNumber2(e.target.id);
                            }}
                          >
                            4
                          </h3>
                          <h3
                            id="5"
                            onClick={(e) => {
                              setNum1(!num1);
                              setNumber2(e.target.id);
                            }}
                          >
                            5
                          </h3>
                        </div>
                      )}
                      <div className="num2">
                        <h3>{number2}</h3>
                        <img
                          src={down}
                          className="icon1"
                          onClick={() => setNum1(!num1)}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="label">
                      <h3>1</h3>
                      <input
                        type="text"
                        placeholder="Label(optional)"
                        className="label-input"
                      />
                    </div>
                    <div className="label">
                      <h3>5</h3>
                      <input
                        type="text"
                        placeholder="Label(optional)"
                        className="label-input"
                      />
                    </div>
                  </div>
                </div>
              );
          case "Short Answer":
              return (
                <div id="short">
                  <h3 className="short-ans">Short answer</h3>
                </div>
              );
          case "Grid":
              return (
              <div className='case3'>
                <div className='rows3'>
                  <h3>Rows</h3>
                  <div className='rowcase3'>
                    <input type="text" placeholder='Row 1' className='row-input'/>
                  </div>
                  {row.map((index) => {
                    return (
                      <div>
                        <div className="functionality">
                          <div>
                            <input type="text" placeholder="Row 1" className='row-input' />
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
                  <h4 onClick={() => {
                      setRow([...row, ""]);
                    }} className='add-row'>Add Rows</h4>
                </div>
                <div className='cols3'>
                <h3>Columns</h3>
                  <div className='rowcase3'>
                    <input type="text" placeholder='Column 1' className='col-input' />
                  </div>
                  {col.map((index) => {
                    return (
                      <div>
                        <div className="functionality">
                          <div>
                            <input type="text" placeholder="Column 1" className='col-input' />
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
                  <h4 onClick={() => {
                      setCol([...col, ""]);
                    }} className='add-col'>Add Columns</h4>
                </div>
              </div>
              )
              ;
          case "Paragraph":
                return (
                  <div id="short">
                    <h3 className="short-ans">Long-answer text</h3>
                  </div>
                );
          default:
              return (
                <div id="multiple">
                  <input
                    type="text"
                    placeholder="Option 1"
                    className="option1"
                  />
                  {/* <div className=" "> */}

                  {ad.map((index) => {
                    return (
                      <div>
                        <div className="functionality">
                          <div>
                            <input
                              type="text"
                              placeholder="Option 1"
                              className="option1"
                            />
                          </div>
                          <div
                            onClick={(i) => {
                              const del = [...ad];
                              del.splice(i, 1);
                              setAdd(del);
                            }}
                          >
                            <img src={close} className="icon" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div
                    onClick={() => {
                      setAdd([...ad, ""]);
                    }}
                  >
                    <h3 className='multiple-add'>Add option</h3>
                  </div>
                </div>
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
            <input
              type="text"
              placeholder="Write your question"
              className="input-que "
              // style={{border:"none"}}
            />
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
                  <h3 id='Paragraph' onClick={click} className='dropContent'>Paragraph</h3>
                </div>
              )}
            </div>
            
          </div>
          {dropMenu()}
          
          {/* </div> */}
        </div>
        
      </div>
    </div>
  );
}

export default AddQuestions