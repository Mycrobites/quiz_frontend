import React, { useState } from "react";
import * as XLSX from "xlsx";
import "./AddQuestions.css";
import { v4 } from "uuid";
import close from "../Images/close.png";
import down from "../Images/down.png";
import down1 from "../Images/down1.png";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Linear from "./Linear";
import { FastForward } from "@material-ui/icons";
import Sheet from "./Sheet";
import Multiple from "./Multiple";
import Grid from "./Grid";
import Short from "./Short";
import Long from "./Long";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
const AddQuestions = () => {
  const [drop, setDrop] = useState(false);
  const [animal, setAnimal] = useState(null);
  const [show, setShow] = useState("Multiple choice");
  const [number1, setNumber1] = useState(1);
  const [number2, setNumber2] = useState(5);
  const [grid, showGrid] = useState([""]);
  const [linear, showLinear] = useState([""]);
  const [multiple, showMultiple] = useState([""]);
  const [short, showShort] = useState([""]);
  const [long, showLong] = useState([""]);
  const [excelData, setExcelData] = useState(null);
  const click = (e) => {
    const nam = e.currentTarget.id;
    setShow(nam);
  };
  const history = useHistory();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });

        // Assume we are only interested in the first sheet
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Parse the sheet data into JSON format
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        const dataWithId = jsonData.map((data) => {
          const newData = {
            ...data,
            id: v4(),
          };
          return newData;
        });
        localStorage.setItem("questions", JSON.stringify(dataWithId));
        history.push("/uploadQuestion");
      };
      reader.readAsBinaryString(file);
    }
  };
  const click1 = (e) => {
    const nam = e.currentTarget.id;
    setNumber1(nam);
  };
  const click2 = (e) => {
    const nam = e.currentTarget.id;
    setNumber2(nam);
  };

  function dropMenu() {
    switch (animal) {
      case "Linear":
        return (
          <div>
            {grid.map(() => {
              return <Linear />;
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
                <input
                  type="submit"
                  placeholder="submit"
                  className="addSubmit"
                />
              </div>
            </div>
          </div>
        );
      case "Short Answer":
        return (
          <div>
            {short.map(() => {
              return <Short />;
            })}
            <div className="addsub">
              <div>
                <div
                  className="addbut"
                  onClick={() => {
                    showShort([...short, ""]);
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
      case "Grid":
        return (
          <div>
            {/* <Grid /> */}
            {linear.map(() => {
              return <Grid />;
            })}
            <div className="addsub">
              <div>
                <div
                  className="addbut"
                  onClick={() => {
                    showLinear([...linear, ""]);
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
      case "Long Answer":
        return (
          <div>
            {long.map(() => {
              return <Long />;
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
      <div className="quiz">
        <div>
          <h1>Quiz</h1>
        </div>

        <div className="quiz-comp">
          <div className="quiz-sub">
            {/* <input
              type="text"
              placeholder="Write your question"
              className="input-que "
              // style={{border:"none"}}
            /> */}
            <div className="dropdown">
              <div>
                <h3>Upload File</h3>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".xls, .xlsx,.csv"
                />
              </div>
              <div
                className="drop-main"
                onClick={() => {
                  setDrop(!drop);
                }}
              >
                <h3 className="main-menu">{show}</h3>
                <img src={down1} className="down1" />
              </div>
              {drop && (
                <div
                  className="dropmenu"
                  onClick={(event) => {
                    setAnimal(event.target.id);
                    setDrop(!drop);
                  }}
                >
                  <h3
                    id="Multiple choice"
                    onClick={click}
                    className="dropContent"
                  >
                    Multiple Choice
                  </h3>
                  <h3 id="Linear" onClick={click} className="dropContent">
                    Linear Scale
                  </h3>
                  <h3 id="Grid" onClick={click} className="dropContent">
                    Grid
                  </h3>
                  <h3 id="Short Answer" onClick={click} className="dropContent">
                    Short Answer
                  </h3>
                  <h3 id="Long Answer" onClick={click} className="dropContent">
                    Long Answer
                  </h3>
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
};

export default AddQuestions;
