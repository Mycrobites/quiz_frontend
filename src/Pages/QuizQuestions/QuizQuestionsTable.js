import React, { useContext, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Checkbox,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@material-ui/core";
import axios from "../../axios/axios";
import UserContext from "../../Context/UserContext";
import { v4 } from "uuid";
import TeacherNavBar from "../../Components/NavBar/TeacherNavbar";

const QuizQuestionsTable = () => {
  const [data, setData] = useState([]); // Table data
  const [id, setId] = useState("");
  const { userDetails } = useContext(UserContext);
  const [selectedRows, setSelectedRows] = useState([]); // Selected rows
  const [sortDirection, setSortDirection] = useState("asc"); // Sort direction
  const [sortedColumn, setSortedColumn] = useState(""); // Column to be sorted
  const [openModal, setOpenModal] = useState(false); // Modal state
  const [formData, setFormData] = useState({
    // Form data state
    question: "",
    image: "",
    // Add more fields as needed
  });
  // Fetch or set table data
  // Replace this with your data-fetching logic or static data assignment
  useEffect(() => {
    // Example data
    const getQuestion = localStorage.getItem("questions");
    if (getQuestion) {
      const parsedValue = JSON.parse(getQuestion);
      setData(parsedValue);
    }
  }, []);

  const handleSort = (column) => {
    const isAscending = sortedColumn === column && sortDirection === "asc";
    const sortedData = [...data].sort((a, b) => {
      if (a[column] < b[column]) return isAscending ? -1 : 1;
      if (a[column] > b[column]) return isAscending ? 1 : -1;
      return 0;
    });

    setData(sortedData);
    setSortedColumn(column);
    setSortDirection(isAscending ? "desc" : "asc");
  };

  const handleRowSelect = (event, row) => {
    const selectedRowIds = selectedRows.map((r) => r.Object_Id);
    const isSelected = selectedRowIds.includes(row.Object_Id);

    if (isSelected) {
      setSelectedRows(
        selectedRows.filter((r) => r.Object_Id !== row.Object_Id)
      );
    } else {
      setSelectedRows([...selectedRows, row]);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    // Add your logic to save the form data or perform any other action
    console.log("Form Data:", formData);
    handleCloseModal();
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(data);
    } else {
      setSelectedRows([]);
    }
  };

  const isAllRowsSelected = selectedRows.length === data.length;

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
    console.log("selectedRows", selectedRows);
    const createQuestion = selectedRows.map(async (row) => {
      const {
        Answer,
        Correct_Marks,
        Difficulty_tag,
        Negative_Marks,
        Passage,
        Question,
        QuestionType,
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

      const data = await axios.post(
        "/api/create-question",
        {
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
          question_type: "Single Correct",
          dificulty_tag: Difficulty_tag,
          skill: Skill,
          answer: { 1: Answer },
          passage: Passage,
          text: Text,
          subject_tag: Subject_Tag,
          subtopic_tag: Subtopic_tag,
          topic_tag: Topic_tag,
        },
        config
      );
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Get the first selected file

    // Create a FileReader object to read the file
    const reader = new FileReader();
    reader.onload = (e) => {
      const uploadedImage = e.target.result; // Get the image data URL
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: uploadedImage,
      }));
    };

    // Read the file as a data URL
    reader.readAsDataURL(file);
  };
  const HandleSave = () => {
    const filteredData = data.map((dat) => {
      if (dat.Object_Id === id) {
        const newData = {
          ...dat,
          Question: formData.question ? formData.question : formData.image,
        };
        return newData;
      }
      return dat;
    });
    setData(filteredData);
  };

  return (
    <div className="teacher-homepage">
      <TeacherNavBar />
      <TableContainer style={{ marginTop: "350px", marginLeft: "200px" }}>
        <Table>
          <TableHead>
            {/* <TableRow>
              <TableCell>
                <Checkbox
                  checked={isAllRowsSelected}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortedColumn === "columnName"}
                  direction={sortDirection}
                  onClick={() => handleSort("columnName")}
                >
                  Question
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortedColumn === "columnName"}
                  direction={sortDirection}
                  onClick={() => handleSort("columnName")}
                >
                  Passage
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortedColumn === "columnName"}
                  direction={sortDirection}
                  onClick={() => handleSort("columnName")}
                >
                  Skill
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortedColumn === "columnName"}
                  direction={sortDirection}
                  onClick={() => handleSort("columnName")}
                >
                  Text
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortedColumn === "columnName"}
                  direction={sortDirection}
                  onClick={() => handleSort("columnName")}
                >
                  Answer
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortedColumn === "columnName"}
                  direction={sortDirection}
                  onClick={() => handleSort("columnName")}
                >
                  Correct Marks
                </TableSortLabel>
              </TableCell>

              <TableCell>
                <TableSortLabel
                  active={sortedColumn === "columnName"}
                  direction={sortDirection}
                  onClick={() => handleSort("columnName")}
                >
                  Difficulty tag
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortedColumn === "columnName"}
                  direction={sortDirection}
                  onClick={() => handleSort("columnName")}
                >
                  Negative Marks
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortedColumn === "columnName"}
                  direction={sortDirection}
                  onClick={() => handleSort("columnName")}
                >
                  Subtopic tag
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortedColumn === "columnName"}
                  direction={sortDirection}
                  onClick={() => handleSort("columnName")}
                >
                  Subject Tag
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortedColumn === "columnName"}
                  direction={sortDirection}
                  onClick={() => handleSort("columnName")}
                >
                  Topic tag
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortedColumn === "columnName"}
                  direction={sortDirection}
                  onClick={() => handleSort("columnName")}
                >
                  QuestionType
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortedColumn === "columnName"}
                  direction={sortDirection}
                  onClick={() => handleSort("columnName")}
                >
                  Option A
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortedColumn === "columnName"}
                  direction={sortDirection}
                  onClick={() => handleSort("columnName")}
                >
                  Option B
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortedColumn === "columnName"}
                  direction={sortDirection}
                  onClick={() => handleSort("columnName")}
                >
                  Option C
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortedColumn === "columnName"}
                  direction={sortDirection}
                  onClick={() => handleSort("columnName")}
                >
                  Option D
                </TableSortLabel>
              </TableCell>
              <TableCell>Action</TableCell>
            </TableRow> */}
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id} selected={selectedRows.includes(row)}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(row)}
                    onChange={(event) => handleRowSelect(event, row)}
                  />
                </TableCell>
                <TableCell>
                  {row.Question.includes("image") ? (
                    <a href="#enlarged-image">
                      <img
                        class="enlarge-image"
                        id="enlarged-image"
                        src={row.Question}
                        alt="Image"
                      />
                    </a>
                  ) : (
                    <TableCell>{row.Question}</TableCell>
                  )}
                </TableCell>
                {/* <TableCell>{row.Passage}</TableCell>
                <TableCell>{row.Skill}</TableCell>
                <TableCell>{row.Text}</TableCell>
                <TableCell>{row.Answer}</TableCell>
                <TableCell>{row.Correct_Marks}</TableCell>
                <TableCell>{row.Difficulty_tag}</TableCell>
                <TableCell>{row.Negative_Marks}</TableCell>
                <TableCell>{row.Subtopic_tag}</TableCell>
                <TableCell>{row.Subject_Tag}</TableCell>
                <TableCell>{row.Topic_tag}</TableCell>
                <TableCell>{row.QuestionType}</TableCell>
                <TableCell>{row.Option_A}</TableCell>
                <TableCell>{row.Option_B}</TableCell>
                <TableCell>{row.Option_C}</TableCell>
                <TableCell>{row.Option_D}</TableCell> */}
                {/* <TableCell>
                  <Button onClick={() => handleOpenModal(row.Object_Id)}>
                    Edit
                  </Button>
                </TableCell> */}
                {/* Render other cells for the row */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Add Question</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Question"
              name="question"
              value={formData.question}
              onChange={handleFormChange}
              fullWidth
            />
            <br />
            <input type="file" accept="image/*" onChange={handleImageUpload} />
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

export default QuizQuestionsTable;
