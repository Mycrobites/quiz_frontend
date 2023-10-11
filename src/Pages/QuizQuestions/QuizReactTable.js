// import React, { useContext, useEffect, useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import UserContext from "../../Context/UserContext";
// import { v4 } from "uuid";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TableSortLabel,
//   Checkbox,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   DialogActions,
// } from "@material-ui/core";
// import axios from "../../axios/axios";
// // fake data generator

// // a little function to help us with reordering the result
// const reorder = (list, startIndex, endIndex) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);
//   return result;
// };

// const QuizReactTable = () => {
//   //   const [items, setItems] = useState(getItems(10));
//   const [data, setData] = useState([]); // Table data
//   const [id, setId] = useState("");
//   const { userDetails } = useContext(UserContext);
//   const [selectedRows, setSelectedRows] = useState([]); // Selected rows
//   const [sortDirection, setSortDirection] = useState("asc"); // Sort direction
//   const [sortedColumn, setSortedColumn] = useState(""); // Column to be sorted
//   const [openModal, setOpenModal] = useState(false); // Modal state
//   const [formData, setFormData] = useState({
//     // Form data state
//     question: "",
//     image: "",
//     // Add more fields as needed
//   });
//   useEffect(() => {
//     // Example data
//     const getQuestion = localStorage.getItem("questions");
//     if (getQuestion) {
//       const parsedValue = JSON.parse(getQuestion);
//       setData(parsedValue);
//     }
//   }, []);
//   const getItems = () => {
//     return data.map((item) => ({
//       id: item.id.toString(),
//       content: (
//         <tr>
//           <td>{item.Question}</td>
//           <td>{item.Correct_Marks}</td>
//           <td>{item.Negative_Marks}</td>
//           <td>{item.Subject_Tag}</td>
//         </tr>
//       ),
//     }));
//   };

//   const handleSort = (column) => {
//     const isAscending = sortedColumn === column && sortDirection === "asc";
//     const sortedData = [...data].sort((a, b) => {
//       if (a[column] < b[column]) return isAscending ? -1 : 1;
//       if (a[column] > b[column]) return isAscending ? 1 : -1;
//       return 0;
//     });

//     setData(sortedData);
//     setSortedColumn(column);
//     setSortDirection(isAscending ? "desc" : "asc");
//   };

//   const handleRowSelect = (event, row) => {
//     const selectedRowIds = selectedRows.map((r) => r.Object_Id);
//     const isSelected = selectedRowIds.includes(row.Object_Id);

//     if (isSelected) {
//       setSelectedRows(
//         selectedRows.filter((r) => r.Object_Id !== row.Object_Id)
//       );
//     } else {
//       setSelectedRows([...selectedRows, row]);
//     }
//   };

//   const handleFormChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };
//   const handleSelectAll = (event) => {
//     if (event.target.checked) {
//       setSelectedRows(data);
//     } else {
//       setSelectedRows([]);
//     }
//   };

//   const isAllRowsSelected = selectedRows?.length === data?.length;

//   const handleOpenModal = (value) => {
//     setId(value);
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setFormData({
//       question: "",
//       image: "",
//     });
//     setOpenModal(false);
//   };
//   const headers = [
//     { label: "QuestionType", key: "QuestionType" },
//     { label: "Passage", key: "Passage" },
//     { label: "Skill", key: "Skill" },
//     { label: "Text", key: "Text" },
//     { label: "Answer", key: "Answer" },
//     { label: "Correct Marks", key: "Correct_Marks" },
//     { label: "Difficulty Tag", key: "Difficulty_tag" },
//     { label: "Negative Marks", key: "Negative_Marks" },
//     { label: "Subtopic tag", key: "Subtopic_tag" },
//     { label: "Subject Tag", key: "Subject_Tag" },
//     { label: "Topic Tag", key: "Topic_tag" },
//     { label: "Question", key: "Question" },
//   ];

//   const csvreport = {
//     data: selectedRows,
//     headers: headers,
//     filename: "Question_Bank.csv",
//   };
//   const handleSaveSelectedRows = () => {
//     // Do something with the selected rows
//     console.log("Selected Rows:", selectedRows);
//     const config = {
//       headers: { Authorization: `Bearer ${userDetails.access}` },
//     };
//     console.log("selectedRows", selectedRows);
//     const createQuestion = selectedRows.map(async (row) => {
//       const {
//         Answer,
//         Correct_Marks,
//         Difficulty_tag,
//         Negative_Marks,
//         Passage,
//         Question,
//         QuestionType,
//         Skill,
//         Subject_Tag,
//         Subtopic_tag,
//         Option_A,
//         Option_B,
//         Option_C,
//         Option_D,
//         Text,
//         Topic_tag,
//       } = row;

//       const data = await axios.post(
//         "/api/create-question",
//         {
//           id: v4(),
//           option: [
//             { key: "A", option: Option_A },
//             { key: "B", option: Option_B },
//             { key: "C", option: Option_C },
//             { key: "D", option: Option_D },
//           ],
//           question: Question,
//           correct_marks: Correct_Marks,
//           negative_marks: Negative_Marks,
//           //issue in this question_type
//           question_type: "Single Correct",
//           dificulty_tag: Difficulty_tag,
//           skill: Skill,
//           answer: { 1: Answer },
//           passage: Passage,
//           text: Text,
//           subject_tag: Subject_Tag,
//           subtopic_tag: Subtopic_tag,
//           topic_tag: Topic_tag,
//         },
//         config
//       );
//     });
//   };

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0]; // Get the first selected file

//     // Create a FileReader object to read the file
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const uploadedImage = e.target.result; // Get the image data URL
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         image: uploadedImage,
//       }));
//     };

//     // Read the file as a data URL
//     reader.readAsDataURL(file);
//   };
//   const HandleSave = () => {
//     const filteredData = data.map((dat) => {
//       if (dat.Object_Id === id) {
//         const newData = {
//           ...dat,
//           Question: formData.question ? formData.question : formData.image,
//         };
//         return newData;
//       }
//       return dat;
//     });
//     setData(filteredData);
//   };

//   const onDragEnd = (result) => {
//     // dropped outside the list
//     if (!result.destination) {
//       return;
//     }

//     const reorderedItems = reorder(
//       data,
//       result.source.index,
//       result.destination.index
//     );

//     setData(reorderedItems);
//   };

//   return (
//     <div style={{ padding: "2rem" }}>
//       <table>
//         <thead>
//           <tr>
//             <th> Question</th>
//             <th>Passage</th>
//             <th>Skill</th>
//             <th>Text</th>
//             <th>Answer</th>
//             <th> Correct Marks</th>
//             <th>Difficulty tag</th>
//             <th>Negative Marks</th>
//             <th>Subtopic tag</th>
//             <th>Subject Tag</th>
//             <th> Topic tag</th>
//             <th> QuestionType</th>
//             <th>Option A</th>
//             <th>Option B</th>
//             <th>Option C</th>
//             <th>Option D</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <DragDropContext onDragEnd={onDragEnd}>
//           <Droppable droppableId="droppable">
//             {(provided) => (
//               <tbody {...provided.droppableProps} ref={provided.innerRef}>
//                 {data.map((row, index) => (
//                   <Draggable key={row.id} draggableId={row.id} index={index}>
//                     {(provided) => (
//                       <tr
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                       >
//                         <td>
//                           <Checkbox
//                             checked={selectedRows.includes(row)}
//                             onChange={(event) => handleRowSelect(event, row)}
//                           />
//                         </td>
//                         <td>
//                           {row.Question?.includes("image") ? (
//                             <a href="#enlarged-image">
//                               <img
//                                 class="enlarge-image"
//                                 id="enlarged-image"
//                                 src={row.Question}
//                                 alt="Image"
//                               />
//                             </a>
//                           ) : (
//                             <td>{row.Question}</td>
//                           )}
//                         </td>
//                         <td>{row.Passage}</td>
//                         <td>{row.Skill}</td>
//                         <td>{row.Text}</td>
//                         <td>{row.Answer}</td>
//                         <td>{row.Correct_Marks}</td>
//                         <td>{row.Difficulty_tag}</td>
//                         <td>{row.Negative_Marks}</td>
//                         <td>{row.Subtopic_tag}</td>
//                         <td>{row.Subject_Tag}</td>
//                         <td>{row.Topic_tag}</td>
//                         <td>{row.QuestionType}</td>
//                         <td>{row.Option_A}</td>
//                         <td>{row.Option_B}</td>
//                         <td>{row.Option_C}</td>
//                         <td>{row.Option_D}</td>
//                         <td>
//                           <Button
//                             onClick={() => handleOpenModal(row.Object_Id)}
//                           >
//                             Edit
//                           </Button>
//                         </td>
//                       </tr>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </tbody>
//             )}
//           </Droppable>
//         </DragDropContext>
//       </table>
//     </div>
//   );
// };

// export default QuizReactTable;

import React, { useState, useEffect, useContext } from "react";
import { CSVLink } from "react-csv";
import { v4 } from "uuid";
import UserContext from "../../Context/UserContext";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import axios from "../../axios/axios";
import DynamicTable from "./DynamicTable";
import StickyHeadTable from "./DynamicTable";

const QuizReactTable = () => {
  const [items, setItems] = useState([]);
  const [id, setId] = useState("");
  const [data, setData] = useState();
  const [questionKeys, setQuestionKeys] = useState();
  const [updateType, setUpdateType] = useState();
  const [inputType, setInputType] = useState();
  const [openModal, setOpenModal] = useState(false); // Modal state
  const [selectedRows, setSelectedRows] = useState([]); // Selected rows
  const { userDetails } = useContext(UserContext);

  const [formData, setFormData] = useState({
    // Form data state
    question: data?.Question ?? data?.Question,
    image: "",
    text: data?.Text ?? data?.Text,
    // Add more fields as needed
  });
  useEffect(() => {
    const getQuestion = localStorage.getItem("questions");

    if (getQuestion) {
      const parsedValue = JSON.parse(getQuestion);
      const QuestionKey = Object?.keys(parsedValue[0]);
      console.log("parsedValue", parsedValue);
      setQuestionKeys(QuestionKey);

      const updateData = parsedValue.map((key, value) => {
        const newData = {
          ...key,
          Question: "N/a",
        };
        return newData;
      });

      setData(updateData);

      // setItems(updateData);
    }
  }, []);
  const handleOpenModal = (value) => {
    setId(value);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setFormData({
      question: "",
      image: "",
    });
    setOpenModal(false);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Get the first selected file

    // Create a FileReader object to read the file
    const reader = new FileReader();

    reader.onload = (e) => {
      const uploadedImage = e.target.result; // Get the image data URL
      console.log("Uploading image", uploadedImage);
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: uploadedImage,
      }));
    };
    reader.readAsDataURL(file);
  };

  const headers = [
    { label: "QuestionType", key: "QuestionType" },
    { label: "Passage", key: "Passage" },
    { label: "Skill", key: "Skill" },
    { label: "Text", key: "Text" },
    { label: "Answer", key: "Answer" },
    { label: "Correct Marks", key: "Correct_Marks" },
    { label: "Difficulty Tag", key: "Difficulty_tag" },
    { label: "Negative Marks", key: "Negative_Marks" },
    { label: "Subtopic tag", key: "Subtopic_tag" },
    { label: "Subject Tag", key: "Subject_Tag" },
    { label: "Topic Tag", key: "Topic_tag" },
    { label: "Question", key: "Question" },
  ];

  const csvreport = {
    data: selectedRows,
    headers: headers,
    filename: "Question_Bank.csv",
  };

  const handleSaveSelectedRows = () => {
    // Do something with the selected rows
    console.log("Selected Rows:", selectedRows);
    const config = {
      headers: { Authorization: `Bearer ${userDetails.access}` },
    };

    const createQuestion = selectedRows.map(async (row) => {
      console.log("row: " + row);

      const {
        Answer,
        Correct_Marks,
        Difficulty_tag,
        Negative_Marks,
        Passage,
        Question,
        Question_Type,
        Skill,
        Subject_Tag,
        Subtopic_tag,
        Option_A,
        Option_B,
        Option_C,
        Option_D,
        Text,
        Topic_tag,
      } = row;
      if (Question_Type === "MCQ") {
        const question_mcq = {
          id: v4(),
          option: [
            { key: "A", option: Option_A },
            { key: "B", option: Option_B },
            { key: "C", option: Option_C },
            { key: "D", option: Option_D },
          ],
          question: Question,
          correct_marks: Correct_Marks,
          negative_marks: Negative_Marks,
          //issue in this question_type
          question_type: "Multiple Correct",
          dificulty_tag: Difficulty_tag,
          skill: Skill,
          answer: { 1: Answer },
          passage: Passage,
          text: Text,
          subject_tag: Subject_Tag,
          subtopic_tag: Subtopic_tag,
          topic_tag: Topic_tag,
        };
        const data = await axios.post(
          "/api/create-question",
          question_mcq,
          config
        );
      }
      if (Question_Type === "Input Type") {
        const question_mcq = {
          id: v4(),
          question: Question,
          correct_marks: Correct_Marks,
          negative_marks: Negative_Marks,
          question_type: "Input Type",
          // dificulty_tag: Difficulty_tag,
          skill: Skill,
          answer: { 1: Answer },
          passage: Passage,
          text: Text,
          subject_tag: Subject_Tag,
          subtopic_tag: Subtopic_tag,
          topic_tag: Topic_tag,
        };
        const data = await axios.post(
          "/api/create-question",
          question_mcq,
          config
        );
      }
      if (Question_Type === "True False") {
        const question_mcq = {
          id: v4(),
          question: Question,
          option: [
            { key: "A", option: Option_A },
            { key: "B", option: Option_B },
          ],
          correct_marks: Correct_Marks,
          negative_marks: Negative_Marks,
          question_type: "True False",
          // dificulty_tag: Difficulty_tag,
          skill: Skill,
          answer: { 1: Answer },
          passage: Passage,
          text: Text,
          subject_tag: Subject_Tag,
          subtopic_tag: Subtopic_tag,
          topic_tag: Topic_tag,
        };
        const data = await axios.post(
          "/api/create-question",
          question_mcq,
          config
        );
      }
      // }
    });
  };
  const handleRowSelect = (event, row) => {
    const selectedRowIds = selectedRows.map((r) => r.id);
    const isSelected = selectedRowIds.includes(row.id);

    if (isSelected) {
      setSelectedRows(selectedRows.filter((r) => r.id !== row.id));
    } else {
      setSelectedRows([...selectedRows, row]);
    }
  };
  const HandleSave = () => {
    const filteredData = data.map((dat) => {
      console.log("dat", dat);
      if (dat.id === id) {
        if (inputType === "image") {
          const newDataWithImage = {
            ...dat,
            Question:
              updateType === "question" && inputType === "image"
                ? formData.image
                : dat.Question,
            Text:
              updateType === "text" && inputType === "image"
                ? formData.image
                : dat.Text,
          };
          return newDataWithImage;
        }
        const newData = {
          ...dat,
          Question:
            updateType === "question" ? formData.question : dat.Question,
          Text: updateType === "text" ? formData.text : dat.Text,
        };
        return newData;
      }
      return dat;
    });
    setData(filteredData);
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(reorderedItems);
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  return (
    <div style={{ padding: "2rem" }}>
      <StickyHeadTable
        headers={questionKeys}
        data={data}
        handleOpenModal={handleOpenModal}
        // setSelectedRows={setSelectedRows}
        // selectedRows={selectedRows}
        handleRowSelect={handleRowSelect}
      />
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Update Document</DialogTitle>
        <DialogContent>
          <Button onClick={() => setUpdateType("question")}>Question</Button>
          <Button onClick={() => setUpdateType("text")}>Text</Button>
          {updateType && (
            <>
              <Button onClick={() => setInputType("textField")}>
                {" "}
                Text Field
              </Button>
              <Button onClick={() => setInputType("image")}>
                upload Image
              </Button>
            </>
          )}
          <form>
            {updateType === "question" && inputType === "textField" && (
              <TextField
                label="Question"
                name={updateType}
                value={formData.question}
                onChange={handleFormChange}
                fullWidth
              />
            )}
            {updateType === "text" && inputType === "textField" && (
              <TextField
                label="Text"
                name={updateType}
                value={formData.text}
                onChange={handleFormChange}
                fullWidth
              />
            )}
            <br />

            {updateType && inputType === "image" && (
              <>
                <h3>Upload your {updateType}</h3>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </>
            )}
            {/* Add more form fields as needed */}
            <DialogActions>
              <Button onClick={handleCloseModal}>Close</Button>
              <Button color="primary" onClick={HandleSave}>
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      {selectedRows.length !== 0 && (
        <>
          <button onClick={handleSaveSelectedRows}>Save Selected Rows</button>
          <CSVLink {...csvreport}>Export to CSV</CSVLink>
        </>
      )}
    </div>
  );
};

export default QuizReactTable;
