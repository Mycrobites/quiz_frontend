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
import Multiple from './Multiple';
import Grid from './Grid';
import Short from './Short';
import Long from './Long';
const AddQuestions = () => {
    
    const [drop , setDrop] = useState(false)
    const [animal, setAnimal] = useState(null);
    const [show , setShow] =useState('Multiple choice')
    const [number1, setNumber1] = useState(1)
    const [number2, setNumber2] = useState(5)
    const [grid , showGrid] = useState([''])
    const [linear , showLinear] = useState([''])
    const [multiple , showMultiple] = useState([''])
    const [short , showShort] = useState([''])
    const [long , showLong] = useState([''])
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
                </div>
              );
          case "Short Answer":
              return (
                <div>
                  {short.map(() => {
                    return <Short
                     />;
                  })}
                  <div className="addsub">
                    <div>
                      <div className="addbut" onClick={() => {
                          showShort([...short, ""]);
                        }}>add question</div>
                    </div>
                    <div>
                      <input
                        type="submit"
                        placeholder="submit"
                        className="addSubmit"
                      />
                    </div>
                  </div>
                </div>
              );
          case "Grid":
              return (
                <div>
                  {/* <Grid /> */}
                  {linear.map(() => {
                    return <Grid
                     />;
                  })}
                  <div className="addsub">
                    <div>
                      <div className="addbut" onClick={() => {
                          showLinear([...linear, ""]);
                        }}>add question</div>
                    </div>
                    <div>
                      <input
                        type="submit"
                        placeholder="submit"
                        className="addSubmit"
                      />
                    </div>
                  </div>
                </div>
              );
          case "Long Answer":
                return (
                  <div>
                    {long.map(() => {
                      return <Long/>;
                    })}
                    <div className="addsub">
                      <div>
                        <div
                          className="addbut"
                          onClick={() => {
                            showLong([...long, ""]);
                          }}
                        >
                          add question
                        </div>
                      </div>
                      <div>
                        <input
                          type="submit"
                          placeholder="submit"
                          className="addSubmit"
                        />
                      </div>
                    </div>
                  </div>
                );
          default:
              return (
                <div>
                  {multiple.map(() => {
                    return <Multiple />;
                  })}
                  <div className="addsub">
                    <div>
                      <div
                        className="addbut"
                        onClick={() => {
                          showMultiple([...multiple, ""]);
                        }}
                      >
                        add question
                      </div>
                    </div>
                    <div>
                      <input
                        type="submit"
                        placeholder="submit"
                        className="addSubmit"
                      />
                    </div>
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