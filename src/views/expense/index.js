import React, { useState } from "react";
import { Button, TextField, Select, MenuItem } from "@mui/material";
import { DatePicker } from "@mui/lab";
import MainCard from "ui-component/cards/MainCard";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';

const buttonStyle = {
  margin: '2px',
};

const Expense = () => {
  const currentDate = new Date(); // Get current date
  const [expense, setExpense] = useState({
    id: "",
    name: "",
    type: "travel",
    amount: "",
    date: currentDate, // Set initial date to current date
    customType: "", // Additional state for custom type
    image: null // State for image file
  });

  const handleExpenseChange = (event) => {
    const { name, value } = event.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleDateChange = (date) => {
    setExpense({ ...expense, date });
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setExpense({ ...expense, image: imageFile });
  };

  const addExpense = () => {
    if (expense.type && expense.amount && expense.date) {
      console.log("Expense:", expense);
      // Handle image upload here
      // You can use FormData or any other method to upload the image
      setExpense({
        id: "",
        name: "",
        type: "travel",
        amount: "",
        date: currentDate,
        customType: "",
        image: null // Reset image state
      });
    }
  };

  const deleteExpense = () => {
    // Implement delete logic for expense
  };
  
  const editExpense = () => {
    // Implement edit logic for expense
  };

  return (
    <div>
      <MainCard title="Expense">
        <DatePicker
          label="Date"
          value={expense.date}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
          style={{ marginBottom: "16px" }}
        />
        <TextField
          name="id"
          label="ID"
          value={expense.id}
          onChange={handleExpenseChange}
          style={{ marginBottom: "16px", width: "50px", marginRight: "5px" }}
        />
        <TextField
          name="name"
          label="Name"
          value={expense.name}
          onChange={handleExpenseChange}
          style={{ marginBottom: "16px", marginRight: "5px" }}
        />
        <Select
          name="type"
          value={expense.type}
          onChange={handleExpenseChange}
          label="Type"
          style={{ marginBottom: "16px", marginRight: "5px" }}
        >
          <MenuItem value="travel">Travel</MenuItem>
          <MenuItem value="food">Food</MenuItem>
          <MenuItem value="custom">Custom</MenuItem>
        </Select>
        {expense.type === "custom" && (
          <TextField
            name="customType"
            label="Custom Type"
            value={expense.customType}
            onChange={handleExpenseChange}
            style={{ marginBottom: "16px", marginRight: "5px", width: '100px' }}
          />
        )}
        <TextField
          name="amount"
          label="Amount"
          type="number"
          value={expense.amount}
          onChange={handleExpenseChange}
          style={{ marginBottom: "16px", marginRight: "5px", width: "100px" }}
        />
        {/* Styled file input for image upload */}
        <label htmlFor="image-upload">
          <Button component="span" variant="contained" color="primary">
            Upload Bill
          </Button>
          <input 
            type="file" 
            id="image-upload"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }} // Hide the actual input element
          />
        </label>
        <Button onClick={addExpense} color="primary" >Add Expense</Button>
        <Button onClick={editExpense} color="primary" style={buttonStyle} startIcon={<EditNoteIcon className='actn-icon2' style={{ fontSize: '30px' }} />}></Button>
        <Button onClick={deleteExpense} color="error" sx = {buttonStyle}  startIcon={<DeleteIcon className='actn-icon2' style={{ fontSize: '30px' }} />}></Button>
      </MainCard>
    </div>
  );
};

export default Expense;