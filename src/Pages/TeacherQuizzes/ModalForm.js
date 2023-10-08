import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";

const ModalForm = ({ open, setOpen, children }) => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [username, setUsername] = useState("");

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Perform form submission logic here
  //   console.log("Name:", name);

  //   handleClose();
  // };

  return (
    <div>
      <Modal open={open} onClose={setOpen}>
        <Box
          style={{
            backgroundColor: "white",
            display: "flex",
            width: "50vw",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "140px",
            marginLeft: "400px",
            height: "50vh",
          }}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
          }}
        >
          {children}
          {/* <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="UserName"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form> */}
        </Box>
      </Modal>
    </div>
  );
};

export default ModalForm;
