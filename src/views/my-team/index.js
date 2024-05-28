import { useEffect, useState } from 'react';
import { Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, Tooltip, TablePagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import * as yup from 'yup'; // Import yup for validation
import { useFormik } from 'formik'; // Import useFormik for form handling
import MainCard from 'ui-component/cards/MainCard';
import { EditNoteOutlined, FilterAltOutlined, SearchOutlined } from '@mui/icons-material';

// ==============================|| SAMPLE PAGE ||============================== //

const Myteam = () => {
  const [open, setOpen] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [viewDetailsIndex, setViewDetailsIndex] = useState(null);
  const [memberDetails, setMemberDetails] = useState(null);
  const [searchTerm,setSearchTerm]=useState('')
  const [team, setTeam] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '', 
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
      email: yup.string().email('Invalid email address').required('Email is required'),
      mobile: yup.string().required('Mobile number is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      const newMember = { name: values.name, email: values.email, mobile: values.mobile }; // Include mobile number in new member object
      if (selectedMember !== null) {
        const updatedMembers = [...teamMembers];
        updatedMembers[selectedMember] = newMember;
        setTeamMembers(updatedMembers);
        setSelectedMember(null);
      } else {
        setTeamMembers([...teamMembers, newMember]);
      }
      resetForm(); 
      handleClose();
    },
  });

useEffect(() => {
  const savedTeamMembers = JSON.parse(localStorage.getItem('myTeamMembers')); // Use 'myTeamMembers' key
  if (savedTeamMembers) {
    setTeamMembers(savedTeamMembers);
  }
}, []);

useEffect(() => {
  localStorage.setItem('myTeamMembers', JSON.stringify(teamMembers)); // Use 'myTeamMembers' key
}, [teamMembers]);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (index) => {
    formik.setValues({
      name: teamMembers[index].name,
      email: teamMembers[index].email,
      mobile: teamMembers[index].mobile, 
    });
    setSelectedMember(index);
    handleOpen();
  };

  const handleDelete = (index) => {
    const updatedMembers = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(updatedMembers);
  };

  const handleViewDetails = (index) => {
    if (viewDetailsIndex === index) {
      setViewDetailsIndex(null);
      setMemberDetails(null);
    } else {
      setViewDetailsIndex(index);
      setMemberDetails(teamMembers[index]);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  return (
    <MainCard title="My Team">
      <Typography variant="body2">
        <Button variant="contained" style={{ backgroundColor: "#fc8019", position: 'absolute', right: "5%", top: '18%' }} onClick={handleOpen}>
          Add Member
        </Button>

        <TextField
                label="Search"
                variant="outlined"
                style={{height:"10px !important", width: '300px',position: 'absolute', left: "45%", top: '17%', }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                    endAdornment: (
                            <IconButton>
                                <SearchOutlined/>
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

        <Button variant="text" style={{color:"#fc8019", position: 'absolute', right: "13%", top: '18%' }}>
                <FilterAltOutlined/> Result:{teamMembers.length}
            </Button>
        <Dialog open={open} onClose={handleClose}>
          <form onSubmit={formik.handleSubmit}>
            <DialogTitle>{selectedMember !== null ? 'Edit' : 'Add'} Team Member</DialogTitle>
            <DialogContent>
              <TextField
                id="team-member-name"
                name="name"
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                sx={{
                  '& input:focus + fieldset': {
                      borderColor: 'black !important',
                  },
                  '& .MuiInputLabel-root': {
                      color: 'black !important',
                  },
              }}
              />
              <TextField
                id="team-member-email"
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{
                  '& input:focus + fieldset': {
                      borderColor: 'black !important',
                  },
                  '& .MuiInputLabel-root': {
                      color: 'black !important',
                  },
              }}
              />
              <TextField
                id="team-member-mobile" 
                name="mobile"
                label="Mobile" 
                variant="outlined"
                fullWidth
                margin="normal"
                value={formik.values.mobile}
                onChange={formik.handleChange}
                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                helperText={formik.touched.mobile && formik.errors.mobile}
                sx={{
                  '& input:focus + fieldset': {
                      borderColor: 'black !important',
                  },
                  '& .MuiInputLabel-root': {
                      color: 'black !important',
                  },
              }}
              />
            </DialogContent>
            <DialogActions style={{marginRight:"20px",marginBottom:"10px"}}>
              <Button onClick={handleClose} style={{ backgroundColor: "#fc8019" }} variant="contained">
                Cancel
              </Button>
              <Button type="submit" style={{ backgroundColor: "#fc8019" }} variant="contained">
                {selectedMember !== null ? 'Edit' : 'Add'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        {teamMembers.length > 0 && (
          <>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>NAME</TableCell>
                    <TableCell>EMAIL</TableCell>
                    <TableCell>MOBILE</TableCell> 
                    <TableCell>ACTION</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teamMembers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((member, index) => (
                    <TableRow key={index}>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.mobile}</TableCell> {/* Display mobile number */}
                      <TableCell>

                      <Tooltip title="View Details">
                          <IconButton onClick={() => handleViewDetails(page * rowsPerPage + index)}>
                            <VisibilityOutlinedIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Edit">
                          <IconButton onClick={() => handleEdit(page * rowsPerPage + index)}>
                            <EditNoteOutlined style={{color:"green"}} />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete">
                          <IconButton onClick={() => handleDelete(page * rowsPerPage + index)}>
                            <DeleteIcon style={{color:"red"}}/>
                          </IconButton>
                        </Tooltip>

                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {memberDetails && (
              <Dialog open={Boolean(memberDetails)} onClose={() => setMemberDetails(null)}>
                <DialogTitle>Member Details</DialogTitle>
                <DialogContent>
                  <Typography variant="body1">Name: {memberDetails.name}</Typography>
                  <Typography variant="body1">Email: {memberDetails.email}</Typography>
                  <Typography variant="body1">Mobile: {memberDetails.mobile}</Typography> {/* Display mobile number */}
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setMemberDetails(null)}>Close</Button>
                </DialogActions>
              </Dialog>
            )}
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={teamMembers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              showFirstButton
              showLastButton
            />
          </>
        )}
      </Typography>
    </MainCard>
  );
};

export default Myteam;
