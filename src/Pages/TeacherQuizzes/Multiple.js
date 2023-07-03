
import React , {useState} from 'react'
import "./AddQuestions.css";
import close from "../Images/close.png"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Multiple = () => {
  const [ad , setAdd]= useState([''])
    const [count, setCount] = useState(4);
    const placeholderText = `Option : ${count}`;
  return (
    <div id="multiple">
      <input
        type="text"
        placeholder="Write your question"
        className="input-que "
      />
      <CKEditor editor={ClassicEditor} data="" />
      <input type="text" placeholder="Option 1" className="option1" />
      <div className="functionality">
        <div>
          <input type="text" placeholder="Option 2" className="option1" />
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
      <div className="functionality">
        <div>
          <input type="text" placeholder="Option 3" className="option1" />
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

      {ad.map((index) => {
        const optionNumber = index + 1;
        const placeholder = `Option ${optionNumber}`;
        return (
          <div>
            <div className="functionality">
              <div>
                <input
                  type="text"
                  placeholder={placeholder}
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
                <img
                  src={close}
                  className="icon"
                  onClick={() => {
                    setCount(count - 1);
                  }}
                />
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
        <h3 className="multiple-add">Add option</h3>
      </div>
    </div>
  );
}

export default Multiple