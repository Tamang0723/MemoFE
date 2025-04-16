import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {Link} from 'react-router-dom';
import {
  Paper,
  Box,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem
 
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function MemoT() {
 const location = useLocation();
  const quesryparams = new URLSearchParams(location.search);
  const subject = quesryparams.get("subject");
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [memo, setMemo] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [newMemo, setNewMemo] = useState({
    id: "",
    date: "",
    tittle: "",
    memos: "",
    subject:"",
  });

  const [editMemo, setEditMemo] = useState({
    id: "",
    date: "",
    tittle: "",
    memos: "",
    subject:"",
  });

  // Open Edit Modal
  const handleClickEdit = (memo) => {
    setEditMemo(memo);
    setOpenEdit(true);
  };

  // Handle input change for adding/editing memo
  const handleChange = (e) => {
    setNewMemo({ ...newMemo, [e.target.name]: e.target.value });
  };

  const handleChangeEdit = (e) => {
    setEditMemo({ ...editMemo, [e.target.name]: e.target.value });
  };

  // Confirm Delete
  const handleConfirmOpen = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmClose = (id) => {
    setDeleteId(null);
    setConfirmOpen(false);
  };

  // Open Add New Memo Modal
  const handleClickOpen = () => {
    // setNewMemo();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
const filteredMemo = memo.filter(
  (memo) => memo.subject ===subject
);
  // Delete Memo
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/memo/${id}`);
      setMemo(memo.filter((memo) => memo.id !== id));
      handleConfirmClose();
    } catch (error) {
      console.log("Error deleting memo:", error);
      alert("There was an error deleting the memo! Please try again.");
    }
  };

  // Edit Memo
  const handleEditMemo = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/memo/${editMemo.id}`,
        {
          ...editMemo,
          tittle:editMemo.tittle,
        }
      );
      setMemo(
        memo.map((memo) =>
          memo.id === editMemo.id ? response.data : memo
        )
      );
      handleCloseEdit();
    } catch (error) {
      console.log("Error updating memo:", error);
      alert("There was an error updating the memo! Please try again.");
    }
  };

  // Add New Memo
  const handleAddMemo = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/memos", {
        ...newMemo,
        // price: parseFloat(newMemo.price),
      });
      setMemo([...memo, response.data]);
      setNewMemo({
        id: "",
        date: "",
        tittle: "",
        memos: "",
        subject:"",
        
      });
      handleClose();
    } catch (error) {
      console.log('There was an error adding the memo!', error);
    }
  };

 // Fetch memo from API
  useEffect(() => {
    axios.get("http://localhost:8080/api/memos")
    .then((response) => {
      setMemo(response.data);
      console.log(response.data);
    

     
    });
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Call both APIs
  //       const memoResponse = await axios.get("http://localhost:8080/api/memos");
  //       const loginResponse = await axios.post("http://localhost:8080/api/v1/user/login");

  //       // Handle login response
  //       setMemo(loginResponse.data);
  //       console.log(loginResponse.data);

  //       const userCourse = loginResponse.data.course;
  //       localStorage.setItem("userCourse", userCourse);
  //       console.log("logged in user's course on list page", userCourse);
        
  //       // If you need the memos:
  //       console.log("Memos:", memoResponse.data);

  //     } catch (error) {sele
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);


  return (
  
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <TableContainer component={Paper} style={{ width: "100%" }}>
        <Box display="flex" justifyContent="flex-start">
          <Button variant="contained" onClick={handleClickOpen}>
            {" "}
            Add New
          </Button>
        </Box>
        <Table sx={{ minWidth: 1000 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Tittle</TableCell>
              <TableCell align="right">Memos</TableCell>
              <TableCell align="right">subject</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>      
            {memo.length > 0 && filteredMemo !==null ? (
              
              filteredMemo.map((memo) => (
                <TableRow key={memo.id}>
                  <TableCell>{memo.id}</TableCell>
                  <TableCell align="right"><Link to={`/memoview`} state={{currentMemo : memo}}>
                  {memo.date}
                  
                  </Link>
                  </TableCell>
                  <TableCell align="right">{memo.tittle}</TableCell>
                  <TableCell align="right">{memo.memos}</TableCell>
                  <TableCell align="right">{memo.subject}</TableCell>
                  <TableCell align="right">
                    <IconButton color="secondary" onClick={() => handleConfirmOpen(memo.id)}> 
                      <DeleteIcon />
                    </IconButton>
                    <IconButton color="primary" onClick={() => handleClickEdit(memo)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/*Confirmation Dialog for Deletion*/}
      <Dialog open={confirmOpen} onClose={handleConfirmClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Are you sure you want to delete this memo?</DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete(deleteId)} color="secondary" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/*Model Dialog for Adding New Memo*/}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Memo</DialogTitle>
        <DialogContent>
          <TextField
          margin="dense"
          name="date"
          label="Memo date"
          type="text"
          fullWidth
          value={newMemo.date}
          onChange={handleChange}
          />
          <TextField
          margin="dense"
          name="tittle"
          label="tittle"
          type="text"
          fullWidth
          value={newMemo.tittle}
          onChange={handleChange}
          />
          <TextField
          margin="dense"
          name="memos"
          label="memo"
          type="text"
          fullWidth
          value={newMemo.memos}
          onChange={handleChange}
          />
          
          <Select name="subject"
          value={newMemo.subject}
          fullWidth
          onChange={(e)=>
            setNewMemo({...newMemo,subject:e.target.value})
          } >
  <MenuItem value="subjectt-1">Subject-1</MenuItem>
  <MenuItem value="subjectt-2">Subject-2</MenuItem>
  <MenuItem value="subjectt-3">Subject-3</MenuItem>
  <MenuItem value="subjectt-4">Subject-4</MenuItem>
  <MenuItem value="subjectt-5">Subject-5</MenuItem>
  <MenuItem value="subjectt-6">Subject-6</MenuItem>
</Select>
          <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleAddMemo} color="primary" variant="contained">Add Memo</Button>

          </DialogActions>


        </DialogContent>
      </Dialog>

      {/* Edit Memo Dialog */}
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit Memo</DialogTitle>
        <DialogContent>
          {["id", "date", "tittle", "memos"].map((field) => (
            <TextField
              key={field}
              margin="dense"
              name={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              type={field === "price" ? "number" : "text"}
              fullWidth
              value={editMemo[field]}
              onChange={handleChangeEdit}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="primary">Cancel</Button>
          <Button onClick={handleEditMemo} color="primary" variant="contained">Update</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
