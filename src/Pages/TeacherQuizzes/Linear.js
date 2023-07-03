import React , {useState} from 'react'
import down from '../Images/down.png'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./AddQuestions.css";
const Linear = () => {
    const [num, setNum]= useState(false) 
    const [num1, setNum1]= useState(false) 
    const [number1, setNumber1] = useState(1)
    const [number2, setNumber2] = useState(5)
  return (
    <div className='newGrid'>
    <input
              type="text"
              placeholder="Write your question"
              className="input-que "
              // style={{border:"none"}}
            />
        <CKEditor
                    editor={ ClassicEditor }
                    data=""
                    
                />
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
  )
}

export default Linear