import { useEffect, useState } from "react";
import { fetchEmployeeData } from "./API";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  IconButton,
} from "@mui/material";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import "bootstrap/dist/css/bootstrap.min.css";
function TableData() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedItem, setSelectedItem] = useState(null);
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const [position, setPosition] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    username: "",
    password: "",
    position: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeeData = await fetchEmployeeData();
        setData(employeeData);
      } catch (error) {
        setError(error.message);
      }
    };

    // Fetch data initially
    fetchData();
  }, []);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
      fontSize: "16px !important",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: "16px !important",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const handleSort = (columnId) => {
    const isAsc = orderBy === columnId && order === "asc";
    setOrderBy(columnId);
    setOrder(isAsc ? "desc" : "asc");
    const sortedData = [...data].sort((a, b) => {
      if (isAsc) {
        return a[columnId] > b[columnId] ? -1 : 1;
      } else {
        return a[columnId] < b[columnId] ? -1 : 1;
      }
    });
    setData(sortedData);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setModalData({
      username: item.username,
      password: item.password,
      position: item.position || "",
    });
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalChange = (event) => {
    const { name, value } = event.target; // Extract name and value from event.target
    // Update modalData state
    setModalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChange = (event) => {
    setPosition(event.target.value);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addEmployee = () => {
    if (!username || !password || !position || password !== confirmPassword) {
      let errorMessage = "";
      if (!username || !password || !position) {
        errorMessage = "Please fill in all the fields!";
      } else if (password !== confirmPassword) {
        errorMessage = "Password and confirm password do not match!";
      } else {
        errorMessage = "Password must be at least 8 characters long!";
      }
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
      return;
    } else if (password.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must be at least 8 characters long!",
      });
      return;
    }
    console.log("Sending request to create employee:", {
      username,
      password,
      position,
    });
    Axios.post("http://localhost:3001/createUserAccount", {
      username,
      password,
      position,
    })
      .then(() => {
        // Show success message
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your account has been successfully created",
          showConfirmButton: false,
          timer: 1500,
        });
        // Close modal
        setShow(false);
        // Fetch the updated data from the '/employee' endpoint
        fetchEmployeeData()
          .then((fetchedData) => {
            console.log("Fetched data:", fetchedData);
            setData(fetchedData);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "An error occurred while fetching employee data!",
            });
          });
      })
      .catch((error) => {
        // Show error message
        console.error("Error adding employee:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred while creating the account!",
        });
      });
  };

  const handleUpdateClick = (id) => {
    Axios.get(`http://localhost:3001/UserAccount/${id}`)
      .then((response) => {
        const oldData = response.data; // Fetch old data from the server
        // Then, send the old and new data to the server for updating
        Axios.put(`http://localhost:3001/updateUserAccount`, {
          username: modalData.username || oldData.username, // Use new username if changed, otherwise use old username
          password: modalData.password || oldData.password, // Use new password if changed, otherwise use old password
          position: modalData.position || oldData.position, // Use new position if changed, otherwise use old position
          id: id,
        })
          .then((response) => {
            // Check if the server responded successfully
            if (response.status === 200) {
              // Check password length
              if (modalData.password.length < 8) {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Password must be at least 8 characters long!",
                });
                return;
              }

              // Fetch the updated data from the server
              fetchEmployeeData()
                .then((updatedData) => {
                  // Update the state with the new data
                  setData(updatedData);

                  // Display success message using SweetAlert2
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                })
                .catch((error) => {
                  console.error("Error fetching updated data:", error);
                  // Display error message using SweetAlert2
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error fetching updated data!",
                  });
                });
            } else {
              // If the server response is not successful, handle the error
              throw new Error("Server response was not successful");
            }
          })
          .catch((error) => {
            // Log and handle any errors that occur during the request
            console.error("Error sending data to API:", error);
            // Display error message using SweetAlert2
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          });
      })
      .catch((error) => {
        // Handle error fetching old data
        console.error("Error fetching old data:", error);
        // Display error message using SweetAlert2
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error fetching old data!",
        });
      });
  };

  const handleDeleteClick = (id) => {
    // Use SweetAlert2 to confirm deletion
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // If user confirms deletion, send delete request
        Axios.delete(`http://localhost:3001/deleteUser/${id}`)
          .then((response) => {
            console.log(response); // Log the response
            setData((prevData) => prevData.filter((val) => val.id !== id));
            Swal.fire("Deleted!", "Your data has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting item:", error); // Log any errors
            Swal.fire("Error!", "Failed to delete data.", "error");
          });
      }
    });
  };

  return (
    <Box>
      {error && <p>{error}</p>}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "10px",
          paddingRight: "1rem",
          paddingBottom: "1rem",
        }}
      >
        <h2 style={{ paddingLeft: "1rem" }}>User Account</h2>
        <Button variant="primary" onClick={handleShow}>
          Create Account
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          id="table-container"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === "id"}
                  direction={orderBy === "id" ? order : "asc"}
                  onClick={() => handleSort("id")}
                >
                  #
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === "username"}
                  direction={orderBy === "username" ? order : "asc"}
                  onClick={() => handleSort("username")}
                >
                  Username
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === "password"}
                  direction={orderBy === "password" ? order : "asc"}
                  onClick={() => handleSort("password")}
                >
                  Password
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === "position"}
                  direction={orderBy === "position" ? order : "asc"}
                  onClick={() => handleSort("position")}
                >
                  Position
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, i) => (
                <StyledTableRow key={i}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>{item.password}</TableCell>
                  <TableCell>{item.Position}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="edit"
                      style={{ color: "blue" }}
                      onClick={() => handleEditClick(item)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      style={{ color: "red" }}
                      onClick={() => handleDeleteClick(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* Modal Create Account */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="myForm">
            <div className="form-floating mb-3">
              <TextField
                id="username"
                label="Username"
                variant="outlined"
                fullWidth
                required
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
              />
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <TextField
                  id="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  required
                  name="password"
                  type="password"
                  onChange={(event) => {
                    setPassWord(event.target.value);
                  }}
                />
                <div className="form-floating mb-3 mb-md-0"></div>
              </div>
              <div className="col-md-6">
                <TextField
                  id="conpassword"
                  label="Confirm Password"
                  variant="outlined"
                  fullWidth
                  required
                  type="password"
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                  }}
                />
                <div className="form-floating mb-3 mb-md-0"></div>
              </div>
              <div className="form-check" style={{ marginTop: "1rem" }}>
                <div style={{ flex: "1", paddingRight: "16px" }}>
                  <div>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-helper-label">
                        Position
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={position}
                        label="Position"
                        onChange={handleChange}
                      >
                        <MenuItem value={"Admin"}>Admin</MenuItem>
                        <MenuItem value={"Staff"}>Staff</MenuItem>
                        <MenuItem value={"User"}>User</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={addEmployee}>
            Create Account
          </Button>
        </Modal.Footer>
      </Modal>
      {/* End of Modal Create Account */}
      {/* Modal Edit Account */}
      <Modal
        show={showModal}
        onHide={handleModalClose}
        size="lg
        "
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="myForm">
            <div className="form-floating mb-3">
              <TextField
                id="username"
                label="Username"
                variant="outlined"
                fullWidth
                required
                name="username"
                type="text"
                value={modalData.username}
                onChange={handleModalChange}
              />
            </div>
            <div className="form-floating mb-3">
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                fullWidth
                required
                name="password"
                type="password"
                value={modalData.password}
                onChange={handleModalChange}
              />
              <div className="form-floating mb-3 mb-md-0"></div>
            </div>
            <div className="form-check" style={{ marginTop: "1rem" }}>
              <div style={{ flex: "1", paddingRight: "16px" }}>
                <div>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Position
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={modalData.position}
                      onChange={handleModalChange}
                      name="position"
                      label="Position"
                    >
                      <MenuItem value={"Admin"}>Admin</MenuItem>
                      <MenuItem value={"Staff"}>Staff</MenuItem>
                      <MenuItem value={"User"}>User</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              handleUpdateClick(selectedItem.id, modalData.username)
            }
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Box>
  );
}

export default TableData;
