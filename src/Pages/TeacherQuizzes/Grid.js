import React , {useState} from 'react'
import "./AddQuestions.css";
import close from "../Images/close.png"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Grid = () => {
    const [row , setRow] = useState([''])
    const [col,setCol] = useState([''])
    const [show , setShow] =useState('Multiple choice')
    
  return (
    <div className="grid">
      <div>
        <input
          type="text"
          placeholder="Write your question"
          className="input-que "
        />
        <CKEditor editor={ClassicEditor} data="" />
        <div className="case3">
          <div className="rows3">
            <h3>Rows</h3>
            <div className="rowcase3">
              <input type="text" placeholder="Row 1" className="row-input" />
            </div>
            {row.map((index) => {
              return (
                <div className="grid-func">
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
              <input type="text" placeholder="Column 1" className="col-input" />
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
      </div>
      
    </div>
  );
}

export default Grid