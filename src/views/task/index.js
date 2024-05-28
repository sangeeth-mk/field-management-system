import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
    Button,
    Dialog,
    TextField,
    Typography,
    DialogActions,
    DialogTitle,
    DialogContent,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    IconButton,
    Tooltip,
    TablePagination,
    FormControl,
    // InputLabel,
    Select,
    MenuItem,
    Grid,
    TextareaAutosize,
    Box,
    Tab
} from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { EditNoteOutlined, FilterAlt, SearchOutlined } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { TabContext, TabPanel } from "@mui/lab";
import Tabs from '@mui/material/Tabs';


const Task = () => {
    const [open, setOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [viewDetailsIndex, setViewDetailsIndex] = useState(null);
    const [taskDetails, setTaskDetails] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [value, setValue] = useState('1');
    const [page, setPage] = useState(0);



    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      };



    const formik = useFormik({
        initialValues: {
            taskname: "",
            taskdescription: "",
            taskstatus: "",
            taskpriority: "",
            startdate: null,
            enddate: null,
            clientname: "",
            mobile: "",
            location: "",
            email: "",
            imgurl: ""
        },
        validate: (values) => {
            const errors = {};
            if (!values.taskname) {
                errors.taskname = 'Required';
            }
            if (!values.taskdescription) {
                errors.taskdescription = 'Required';
            }
            if (!values.taskstatus) {
                errors.taskstatus = 'Required';
            }
            if (!values.taskpriority) {
                errors.taskpriority = 'Required';
            }

            if (!values.startdate) {
                errors.startdate = 'Required';
            }
            if (!values.enddate) {
                errors.enddate = 'Required';
            }
            if (!values.clientname) {
                errors.clientname = 'Required';
            }
            if (!values.mobile) {
                errors.mobile = 'Required';
            }
            if (!values.location) {
                errors.location = 'Required';
            }
            if (!values.email) {
                errors.email = 'Required';
            }
            return errors;
        },
        onSubmit: (values, { resetForm }) => {
            const newTask = { ...values };
            if (selectedTask !== null) {
                const updatedTasks = [...tasks];
                updatedTasks[selectedTask] = newTask;
                setTasks(updatedTasks);
                setSelectedTask(null);
            } else {
                setTasks([...tasks, newTask]);
            }
            resetForm();
            handleClose();
        }
    });

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks) {
            setTasks(savedTasks);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleViewDetails = (index) => {
        if (viewDetailsIndex === index) {
            setViewDetailsIndex(null);
            setTaskDetails(null);
        } else {
            setViewDetailsIndex(index);
            setTaskDetails(tasks[index]);
        }
    };

    const handleEdit = (index) => {
        formik.setValues({
            ...tasks[index]
        });
        setSelectedTask(index);
        handleOpen();
    };


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDelete = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
    };

    const filteredTasks = tasks.filter(task =>
        task.taskname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.taskdescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.taskstatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.taskpriority.toLowerCase().includes(searchTerm.toLowerCase())

    );

    const getStatusColor = (status) => {
        switch (status) {
            case "active":
                return "#68BBE3";
            case "created":
                return "#FDE002";
            case "suspended":
                return "#FFA303";
            case "completed":
                return "#5CD85A";
            case "cancelled":
                return "#D2342A";
            case "deleted":
                return "#808080";
            default:
                return "#000000";
        }
    }

    return (

        <MainCard title="My Task">
            <Typography variant="body2">

                    <Button variant="text" style={{ color: "#fc8019", background: "white", border: "1px solid",position: 'absolute', right: "11%", top: '18%' }}>
                        <FilterAlt /> Result:{filteredTasks.length}
                    </Button>

                    <Button variant="contained" style={{ backgroundColor: "#fc8019",position: 'absolute', right: "5%", top: '18%' }} onClick={handleOpen}>
                        + Add
                    </Button>



                <TextField
                    label="Search"
                    variant="outlined"
                    style={{ height: "10px !important", width: '500px', position: 'absolute', left: "35%", top: '17%', }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <IconButton>
                                <SearchOutlined />
                            </IconButton>
                        )
                    }}

                    sx={{
                        // '& input': {
                        //     height: '10px', 
                        // },
                        '& input:focus + fieldset': {
                            borderColor: '#C7C7C7 !important',
                        },
                        '& .MuiInputLabel-root': {
                            color: 'black !important',

                        },
                    }}
                />



                <Dialog open={open} onClose={handleClose} >
                    <form onSubmit={formik.handleSubmit}>
                        <DialogTitle>{selectedTask !== null ? 'Edit' : 'Add'} Task
                            <IconButton
                                aria-label="close"
                                onClick={handleClose}
                                sx={{
                                    position: 'absolute',
                                    right: 8,
                                    top: 8,
                                    color: '#3f3e3c'
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>


                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="Item One" value="1" />
                                    <Tab label="Item Two" value="2" />
                                </Tabs>
                            </Box>
                            <TabPanel value='1'>
                                <DialogContent>
                                    <Grid container spacing={3}>
                                        <Grid item xs={4} sx={{marginTop:"0"}}>
                                    {/* <label htmlFor="task-name" style={{color:"black"}}>Title</label> */}
                                            <TextField
                                                id="task-name"
                                                name="taskname"
                                                label="Title"
                                                variant="outlined"
                                                fullWidth
                                                value={formik.values.taskname}
                                                onChange={formik.handleChange}
                                                error={formik.touched.taskname && Boolean(formik.errors.taskname)}
                                                helperText={formik.touched.taskname && formik.errors.taskname}
                                                // style={{ marginBottom: '1rem', marginTop: "1rem" }}
                                                sx={{
                                                    '& input:focus + fieldset': {
                                                        borderColor: '#EAEAEA  !important',
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: 'black !important',
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <FormControl variant="outlined" fullWidth>
                                                <Select
                                                    id="taskstatus-label"
                                                    name="taskstatus"
                                                    value={formik.values.taskstatus}
                                                    onChange={formik.handleChange}
                                                    label="Task status"
                                                    // style={{ marginBottom: '1rem', marginTop: "1rem", border: 'none',
                                                    //     borderBottom: '1px solid black' }}

                                                    InputProps={{
                                                        sx: { borderColor: 'red' }
                                                    }}

                                                >
                                                    <MenuItem value="active">Active</MenuItem>
                                                    <MenuItem value="created">Created</MenuItem>
                                                    <MenuItem value="suspended">Suspended</MenuItem>
                                                    <MenuItem value="completed">Completed</MenuItem>
                                                    <MenuItem value="cancelled">Cancelled</MenuItem>
                                                    <MenuItem value="deleted">Deleted</MenuItem>
                                                </Select>

                                               

                                                {formik.touched.taskstatus && formik.errors.taskstatus && (
                                                    <Typography variant="body2" color="error">{formik.errors.taskstatus}</Typography>
                                                )}
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <FormControl variant="outlined" fullWidth>
                                            {/* <label htmlFor="assigned-to" style={{color:"black"}}>Assigned To</label> */}
                                                <Select
                                                    // labelId="assigned-to-label"
                                                    id="assigned-to"
                                                    label="Assigned to"
                                                    name="assignedto"
                                                    value={formik.values.assignedto}
                                                    onChange={formik.handleChange}
                                                    sx={{
                                                        '& input:focus + fieldset': {
                                                            borderColor: '#EAEAEA  !important',
                                                        },
                                                        '& .MuiInputLabel-root': {
                                                            color: 'black !important',
                                                        },
                                                    }}
                                                >
                                                    <MenuItem value="accountant">Accountant</MenuItem>
                                                    <MenuItem value="operator">Operator</MenuItem>
                                                    <MenuItem value="executive">Field executive</MenuItem>
                                                    <MenuItem value="manager">Manager</MenuItem>
                                                </Select>
                                                {formik.touched.assignedto && formik.errors.assignedto && (
                                                    <Typography variant="body2" color="error">{formik.errors.assignedto}</Typography>
                                                )}
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={3}>
                                        <Grid item xs={4} sx={{marginTop:"15px"}}>
                                        {/* <label htmlFor="start-date" style={{color:"black"}}>start date</label> */}

                                            <TextField
                                                id="start-date"
                                                name="startdate"
                                                label="Start Date"
                                                type="date"
                                                variant="outlined"
                                                fullWidth
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                value={formik.values.startdate}
                                                onChange={formik.handleChange}
                                                error={formik.touched.startdate && Boolean(formik.errors.startdate)}
                                                helperText={formik.touched.startdate && formik.errors.startdate}
                                                sx={{
                                                    '& input:focus + fieldset': {
                                                        borderColor: '#EAEAEA !important',
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: 'black !important',
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={4} sx={{marginTop:"15px"}}>
                                        {/* <label htmlFor="end-date" style={{color:"black"}}>end date</label> */}

                                            <TextField
                                                id="end-date"
                                                name="enddate"
                                                label="End Date"
                                                type="date"
                                                variant="outlined"
                                                fullWidth
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                value={formik.values.enddate}
                                                onChange={formik.handleChange}
                                                error={formik.touched.enddate && Boolean(formik.errors.enddate)}
                                                helperText={formik.touched.enddate && formik.errors.enddate}
                                                sx={{
                                                    '& input:focus + fieldset': {
                                                        borderColor: '#EAEAEA  !important',
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: 'black !important',
                                                    },
                                                   
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={4} sx={{marginTop:"15px"}}>
                                            <FormControl variant="outlined" fullWidth>
                                            {/* <InputLabel id="task-priority">Task Priority</InputLabel> */}

                                                <Select
                                                    labelId="task-priority-label"
                                                    id="task-priority"
                                                    name="taskpriority"
                                                    label="Priority"
                                                    value={formik.values.taskpriority}
                                                    onChange={formik.handleChange}
                                                    sx={{
                                                        '& input:focus + fieldset': {
                                                            borderColor: '#EAEAEA  !important',
                                                        },
                                                        '& .MuiInputLabel-root': {
                                                            color: 'black !important',
                                                        },
                                                    }}
                                                >
                                                    <MenuItem value="low">Low</MenuItem>
                                                    <MenuItem value="medium">Medium</MenuItem>
                                                    <MenuItem value="high">High</MenuItem>
                                                </Select>
                                                {formik.touched.taskpriority && formik.errors.taskpriority && (
                                                    <Typography variant="body2" color="error">{formik.errors.taskpriority}</Typography>
                                                )}
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>

                                        <TextareaAutosize
                                            id="task-description"
                                            name="taskdescription"
                                            label="taskdescription"
                                            placeholder="Task Description"
                                            style={{ width: '100%', minHeight: '100px', maxHeight: ' 200px', minWidth: '100px', maxWidth: '200px%', padding: '9px', borderRadius: '10px', border: '1px solid lightgrey', marginBottom: '1rem', marginTop: '1rem' }}
                                            rowsMin={3}
                                            variant="outlined"
                                            fullWidth
                                            value={formik.values.taskdescription}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            sx={{
                                                '& input:focus + fieldset': {
                                                    borderColor: '#EAEAEA  !important',
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: 'black !important',
                                                },

                                                '& input:placeholder + fieldset': {
                                                    borderColor: '#EAEAEA  !important', color: 'black !important'
                                                }

                                            }}
                                        />
                                        {formik.touched.taskdescription && formik.errors.taskdescription && (
                                            <Typography variant="body2" color="error">{formik.errors.taskdescription}</Typography>
                                        )}
                                    </Grid>
                                </DialogContent>
                            </TabPanel>
                            

<TabPanel value='2'>
  <DialogContent style={{ marginTop: "-15px" }}>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <TextField
                                    id="client-name"
                                    name="clientname"
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    value={formik.values.clientname}
                                    onChange={formik.handleChange}
                                    error={formik.touched.clientname && Boolean(formik.errors.clientname)}
                                    helperText={formik.touched.clientname && formik.errors.clientname}
                                    style={{ marginBottom: '1rem',marginTop:'1rem' }}
                                    sx={{
                                        '& input:focus + fieldset': {
                                            borderColor: '#EAEAEA  !important',
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: 'black !important',
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="location"
                                    name="location"
                                    label="Location"
                                    variant="outlined"
                                    fullWidth
                                    value={formik.values.location}
                                    onChange={formik.handleChange}
                                    error={formik.touched.location && Boolean(formik.errors.location)}
                                    helperText={formik.touched.location && formik.errors.location}
                                    style={{ marginBottom: '1rem',marginTop:'1rem' }}
                                    sx={{
                                        '& input:focus + fieldset': {
                                            borderColor: '#EAEAEA  !important',
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: 'black !important',
                                        },
                                    }}
                                />
                            </Grid>
                        <Grid item xs={4}>
                                <TextField
                                    id="mobile"
                                    name="mobile"
                                    label="Mobile"
                                    variant="outlined"
                                    fullWidth
                                    value={formik.values.mobile}
                                    onChange={formik.handleChange}
                                    error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                                    helperText={formik.touched.mobile && formik.errors.mobile}
                                    style={{ marginBottom: '2rem' }}
                                    sx={{
                                        '& input:focus + fieldset': {
                                            borderColor: '#EAEAEA  !important',
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: 'black !important',
                                        },
                                        marginTop:"15px"
                                    }}
                                />
                             </Grid>
                            </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                            <TextField
                                    id="email"
                                    name="email"
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                    style={{ marginBottom: '1rem' }}
                                    sx={{
                                        '& input:focus + fieldset': {
                                            borderColor: '#EAEAEA  !important',
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: 'black !important',
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                            <TextField
                                    id="website"
                                    name="website"
                                    label="Website"
                                    variant="outlined"
                                    fullWidth
                                    value={formik.values.website}
                                    onChange={formik.handleChange}
                                    error={formik.touched.website && Boolean(formik.errors.website)}
                                    helperText={formik.touched.website && formik.errors.website}
                                    style={{ marginBottom: '1rem' }}
                                    sx={{
                                        '& input:focus + fieldset': {
                                            borderColor: '#EAEAEA  !important',
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: 'black !important',
                                        },
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3} sx={{marginTop:'20px'}}>
                            <Grid item xs={4}>
                                <TextField
                                    id="spocname"
                                    name="spocname"
                                    label="SPOC Name"
                                    variant="outlined"
                                    fullWidth
                                    value={formik.values.spocname}
                                    onChange={formik.handleChange}
                                    error={formik.touched.spocname && Boolean(formik.errors.spocname)}
                                    helperText={formik.touched.spocname && formik.errors.spocname}
                                    style={{ marginBottom: '1rem' }}
                                    sx={{
                                        '& input:focus + fieldset': {
                                            borderColor: '#EAEAEA  !important',
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: 'black !important',
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                            <TextField
                                    id="spocmobile"
                                    name="spocmobile"
                                    label="SPOC Mobile"
                                    variant="outlined"
                                    fullWidth
                                    value={formik.values.spocmobile}
                                    onChange={formik.handleChange}
                                    error={formik.touched.spocmobile && Boolean(formik.errors.spocmobile)}
                                    helperText={formik.touched.spocmobile && formik.errors.spocmobile}
                                    style={{ marginBottom: '1rem' }}
                                    sx={{
                                        '& input:focus + fieldset': {
                                            borderColor: '#EAEAEA  !important',
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: 'black !important',
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="designation"
                                    name="designation"
                                    label="SPOC Designation"
                                    // type="file"
                                    variant="outlined"
                                    fullWidth
                                    value={formik.values.designation}
                                    onChange={formik.handleChange}
                                    error={formik.touched.designation && Boolean(formik.errors.designation)}
                                    helperText={formik.touched.designation && formik.errors.designation}
                                    style={{ marginBottom: '1rem' }}
                                    sx={{
                                        '& input:focus + fieldset': {
                                            borderColor: '#EAEAEA !important',
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: 'black !important',
                                        },
                                    }}
                                />
                            </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <TextField
                                    id="mobile"
                                    name="mobile"
                                    label="Mobile"
                                    variant="outlined"
                                    fullWidth
                                    value={formik.values.mobile}
                                    onChange={formik.handleChange}
                                    error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                                    helperText={formik.touched.mobile && formik.errors.mobile}
                                    style={{ marginBottom: '1rem' }}
                                    sx={{
                                        '& input:focus + fieldset': {
                                            borderColor: '#EAEAEA  !important',
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: 'black !important',
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                            <TextField
                                    id="spocemail"
                                    name="spocemail"
                                    label="SPOC Email"
                                    variant="outlined"
                                    fullWidth
                                    value={formik.values.spocemail}
                                    onChange={formik.handleChange}
                                    error={formik.touched.spocemail && Boolean(formik.errors.spocemail)}
                                    helperText={formik.touched.spocemail && formik.errors.spocemail}
                                    style={{ marginBottom: '1rem' }}
                                    sx={{
                                        '& input:focus + fieldset': {
                                            borderColor: '#EAEAEA  !important',
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: 'black !important',
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="whatsapp"
                                    name="whatsapp"
                                    label="Whatsapp"
                                    // type="file"
                                    variant="outlined"
                                    fullWidth
                                    value={formik.values.whatsapp}
                                    onChange={formik.handleChange}
                                    error={formik.touched.whatsapp && Boolean(formik.errors.whatsapp)}
                                    helperText={formik.touched.whatsapp && formik.errors.whatsapp}
                                    style={{ marginBottom: '1rem' }}
                                    sx={{
                                        '& input:focus + fieldset': {
                                            borderColor: '#EAEAEA !important',
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: 'black !important',
                                        },
                                    }}
                                />
                            </Grid>
                            <DialogActions style={{marginRight:"1rem",marginBottom:".5rem",display:"flex",justifyContent:"space-between"}}>
                        {/* <Button onClick={handleClose} style={{color:"black", backgroundColor: "#eeeeee",marginLeft:"1rem" }} variant="contained">
                            Cancel
                        </Button> */}
                        <Button type="submit" style={{ backgroundColor: "#fc8019" }} variant="contained">
                            {selectedTask !== null ? 'Edit' : 'Submit'}
                        </Button>
                    </DialogActions>
                        </Grid>
                    </DialogContent>
  </TabPanel>

                        </TabContext>





                    </form>
                </Dialog>
                {filteredTasks.length > 0 && (
                    <>
                        <TableContainer component={Paper} sx={{borderRadius:0}}>
                            <Table>
                                <TableHead>
                                    <TableRow style={{backgroundColor:"#eeeeee"}}>
                                        
                                        <TableCell sx={{ textAlign: "left" }}>TASK TITLE</TableCell>
                                        <TableCell sx={{ textAlign: "left" }}>TASK DESCRIPTION</TableCell>
                                        <TableCell sx={{ textAlign: "left" }}>TASK PRIORITY</TableCell>
                                        <TableCell sx={{ textAlign: "left" }}>STATUS</TableCell>
                                        <TableCell sx={{ textAlign: "left" }}>ACTIONS</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredTasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task, index) => (
                                        <TableRow key={index}>
                                        <TableCell >{capitalizeFirstLetter(task.taskname)}</TableCell>
                                        <TableCell  >{capitalizeFirstLetter(task.taskdescription)}</TableCell>
                                            <TableCell  >{capitalizeFirstLetter(task.taskpriority)}</TableCell>
                                            <TableCell sx={{ textAlign: "left" }}><Button variant="contained" style={{ backgroundColor: getStatusColor(task.taskstatus) }} sx={{ fontWeight: 'bolder' }}>{task.taskstatus}</Button></TableCell>
                                            <TableCell sx={{ textAlign: "left" }}>
                                                <Tooltip title="View">
                                                    <IconButton onClick={() => handleViewDetails(index)}>
                                                        <VisibilityOutlinedIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Edit">
                                                    <IconButton onClick={() => handleEdit(index)}>
                                                        <EditNoteOutlined style={{ color: "#228B22" }} />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <IconButton onClick={() => handleDelete(index)}>
                                                        <DeleteIcon style={{ color: "#FF3131" }} />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {taskDetails && (
                            <Dialog open={Boolean(taskDetails)} onClose={() => setTaskDetails(null)}>
                                <DialogTitle>Task Details</DialogTitle>
                                <DialogContent sx={{
                                    marginTop: '10px',
                                    borderRadius: '8px',

                                }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                sx={{
                                                    marginTop: "10px",
                                                    '& input:focus + fieldset': {
                                                        borderColor: '#EAEAEA !important',
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: 'black !important',
                                                    },
                                                }}
                                                label="Task Name"
                                                variant="outlined"
                                                fullWidth
                                                // disabled
                                                value={taskDetails.taskname}
                                            // InputProps={{ disableUnderline: true }}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                sx={{
                                                    marginTop: "10px",
                                                    '& input:focus + fieldset': {
                                                        borderColor: '#EAEAEA !important',
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: 'black !important',
                                                    },
                                                }}
                                                label="Task Description"
                                                variant="outlined"
                                                fullWidth
                                                // disabled
                                                value={taskDetails.taskdescription}
                                                InputProps={{ disableUnderline: true }}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                sx={{
                                                    '& input:focus + fieldset': {
                                                        borderColor: '#EAEAEA !important',
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: 'black !important',
                                                    },
                                                }}
                                                label="Task Status"
                                                variant="outlined"
                                                fullWidth
                                                // disabled
                                                value={taskDetails.taskstatus}
                                                InputProps={{ disableUnderline: true }}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                sx={{
                                                    '& input:focus + fieldset': {
                                                        borderColor: '#EAEAEA !important',
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: 'black !important',
                                                    },
                                                }}
                                                label="Task Priority"
                                                variant="outlined"
                                                fullWidth
                                                // disabled
                                                value={taskDetails.taskpriority}
                                                InputProps={{ disableUnderline: true }}
                                            />
                                        </Grid>
                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => setTaskDetails(null)} color="primary">Close</Button>
                                </DialogActions>
                            </Dialog>
                        )}

                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={filteredTasks.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </>
                )}
            </Typography>

        </MainCard>
    );
};

export default Task;
