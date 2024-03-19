import { useEffect, useState } from "react";
import { fetchProductData } from "./API";
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
function P_TableData() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedItem, setSelectedItem] = useState(null);
  const [P_ID, setP_ID] = useState("");
  const [P_Name, setP_Name] = useState("");
  const [Quantity, setQuantity] = useState(0);
  const [Owner, setOwner] = useState("");
  const [Shelf, setShelf] = useState("");
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    P_ID: "",
    P_Name: "",
    Quantity: 0,
    Owner: "",
    Shelf: "",
    LastUpdated: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ProductsData = await fetchProductData();
        setData(ProductsData);
      } catch (error) {
        setError(error.message);
      }
    };

    // Fetch data initially
    fetchData();
  }, []);

  useEffect(() => {
    // Find the highest P_ID
    if (data.length > 0) {
      const maxNumericP_ID = Math.max(
        ...data.map((item) => parseInt(item.P_ID.slice(1))) // Extract numeric part and find max
      );
      const nextP_ID = "P" + ("000" + (maxNumericP_ID + 1)).slice(-3); // Format back to original
      setP_ID(nextP_ID); // Set the next ID as the default label
    } else {
      // If no data is available, set a default label
      setP_ID("P001");
    }
  }, [data]);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
      fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
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
  const StyledTableSortLabel = styled(TableSortLabel)(({ theme }) => ({
    // Styling for the sort icon
    "& .MuiTableSortLabel-icon": {
      color: theme.palette.common.white, // Set the color to white
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
  const handleChangeOwner = (event) => {
    setOwner(event.target.value);
  };
  const handleChangeShelf = (event) => {
    setShelf(event.target.value);
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
      P_Name: item.P_Name,
      Quantity: item.Quantity,
      LastUpdated: item.LastUpdated, // Set position from selected item
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addProduct = () => {
    // Get the current date and time
    const currentDate = new Date();

    // Format the date as desired
    const formattedDate = `${currentDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })} , ${currentDate.toLocaleDateString()}`;

    if (!P_Name || !Quantity) {
      let errorMessage = "Please fill in all the fields!";
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
      return;
    }

    console.log("Sending request to create Product:", {
      P_ID,
      P_Name,
      Quantity,
      LastUpdated: formattedDate, // Set LastUpdated to the current date and time
    });

    Axios.post("http://localhost:3001/createProduct", {
      P_ID,
      P_Name,
      Quantity,
      LastUpdated: formattedDate, // Set LastUpdated to the current date and time
    })
      .then(() => {
        // Show success message
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your product has been successfully created",
          showConfirmButton: false,
          timer: 1500,
        });

        // Close modal
        setShow(false);

        // Fetch the updated data from the '/Product' endpoint
        fetchProductData()
          .then((fetchedData) => {
            console.log("Fetched data:", fetchedData);
            setData(fetchedData);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "An error occurred while fetching Product data!",
            });
          });
      })
      .catch((error) => {
        // Show error message
        console.error("Error adding Product:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred while creating the product!",
        });
      });
  };

  const handleUpdateClick = (P_ID) => {
    Axios.get(`http://localhost:3001/Product`)
      .then((response) => {
        const oldData = response.data; // Fetch old data from the server
        // Then, send the old and new data to the server for updating
        Axios.put(`http://localhost:3001/updateProduct`, {
          P_Name: modalData.P_Name || oldData.P_Name, // Use new username if changed, otherwise use old username
          Quantity: modalData.Quantity || oldData.Quantity, // Use new password if changed, otherwise use old password
          P_ID: P_ID,
        })
          .then((response) => {
            // Check if the server responded successfully
            if (response.status === 200) {
              // Fetch the updated data from the server
              fetchProductData()
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

  const handleDeleteClick = (P_ID) => {
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
        Axios.delete(`http://localhost:3001/deleteProduct/${P_ID}`)
          .then((response) => {
            console.log(response); // Log the response
            setData((prevData) => prevData.filter((val) => val.P_ID !== P_ID));
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
        <h2 style={{ paddingLeft: "1rem" }}>Product Lists</h2>
        <Button variant="primary" onClick={handleShow}>
          Create Product
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
                <StyledTableSortLabel
                  active={orderBy === "P_ID"}
                  direction={orderBy === "P_ID" ? order : "asc"}
                  onClick={() => handleSort("P_ID")}
                >
                  Product ID
                </StyledTableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <StyledTableSortLabel
                  active={orderBy === "P_Name"}
                  direction={orderBy === "P_Name" ? order : "asc"}
                  onClick={() => handleSort("P_Name")}
                >
                  Product Name
                </StyledTableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <StyledTableSortLabel
                  active={orderBy === "Quantity"}
                  direction={orderBy === "Quantity" ? order : "asc"}
                  onClick={() => handleSort("Quantity")}
                >
                  Quantity
                </StyledTableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <StyledTableSortLabel
                  active={orderBy === "LastUpdated"}
                  direction={orderBy === "LastUpdated" ? order : "asc"}
                  onClick={() => handleSort("LastUpdated")}
                >
                  Last Updated
                </StyledTableSortLabel>
              </StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell>{item.P_ID}</StyledTableCell>
                  <StyledTableCell>{item.P_Name}</StyledTableCell>
                  <StyledTableCell>{item.Quantity}</StyledTableCell>
                  <StyledTableCell>{item.LastUpdated}</StyledTableCell>
                  <StyledTableCell>
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
                      onClick={() => handleDeleteClick(item.P_ID)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
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
      {/* Modal Create Product */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="myForm">
            <div className="row mb-3">
              <div className="col-md-2">
                <TextField
                  id="P_ID"
                  label="Product ID"
                  variant="outlined"
                  fullWidth
                  required
                  readOnly
                  value={P_ID}
                  name="P_ID"
                  type="text"
                />
              </div>
              <div className="col-md-5">
                <TextField
                  id="P_Name"
                  label="Product Name"
                  variant="outlined"
                  fullWidth
                  required
                  name="P_Name"
                  type="text"
                  onChange={(event) => {
                    setP_Name(event.target.value);
                  }}
                />
              </div>
              <div className="col-md-4">
                <TextField
                  id="Quantity"
                  label="Quantity"
                  variant="outlined"
                  fullWidth
                  required
                  name="Quantity"
                  type="Number"
                  onChange={(event) => {
                    setQuantity(event.target.value);
                  }}
                />
                <div className="form-floating mb-3 mb-md-0"></div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-3">
                <div className="form-check">
                  <div style={{ flex: "1" }}>
                    <div>
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Owner
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          label="Owner"
                          name="Owner"
                          value={Owner}
                          onChange={handleChangeOwner}
                        >
                          <MenuItem value={"U001"}>U001</MenuItem>
                          <MenuItem value={"U002"}>U002</MenuItem>
                          <MenuItem value={"U003"}>U003</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-check">
                  <div style={{ flex: "1" }}>
                    <div>
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Shelf
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          label="Shelf"
                          name="Shelf"
                          value={Shelf}
                          onChange={handleChangeShelf}
                        >
                          <MenuItem value={"A001"}>A001</MenuItem>
                          <MenuItem value={"A002"}>A002</MenuItem>
                          <MenuItem value={"A003"}>A003</MenuItem>
                          <MenuItem value={"B001"}>B001</MenuItem>
                          <MenuItem value={"B002"}>B002</MenuItem>
                          <MenuItem value={"B003"}>B003</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
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
          <Button variant="success" onClick={addProduct}>
            Create Product
          </Button>
        </Modal.Footer>
      </Modal>
      {/* End of Modal Create Product */}

      {/* Modal Edit Product */}
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
            <div className="row mb-3">
              <div className="col-md-2">
                <TextField
                  id="P_ID"
                  label="Product ID"
                  variant="outlined"
                  fullWidth
                  required
                  readOnly
                  value={P_ID}
                  name="P_ID"
                  type="text"
                />
              </div>
              <div className="col-md-5">
                <TextField
                  id="P_Name"
                  label="Product Name"
                  variant="outlined"
                  fullWidth
                  required
                  name="P_Name"
                  type="text"
                  value={modalData.P_Name}
                  onChange={handleModalChange}
                />
              </div>
              <div className="col-md-4">
                <TextField
                  id="Quantity"
                  label="Quantity"
                  variant="outlined"
                  fullWidth
                  required
                  name="Quantity"
                  type="Number"
                  value={modalData.Quantity}
                  onChange={handleModalChange}
                />
                <div className="form-floating mb-3 mb-md-0"></div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-4">
                <div className="form-check">
                  <div style={{ flex: "1" }}>
                    <div>
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Owner
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          label="Owner"
                          name="Owner"
                          value={modalData.Owner}
                          onChange={handleChangeOwner}
                        >
                          <MenuItem value={"U001"}>U001</MenuItem>
                          <MenuItem value={"U002"}>U002</MenuItem>
                          <MenuItem value={"U003"}>U003</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-check">
                  <div style={{ flex: "1" }}>
                    <div>
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Shelf
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          label="Shelf"
                          name="Shelf"
                          value={modalData.Shelf}
                          onChange={handleChangeShelf}
                        >
                          <MenuItem value={"A001"}>A001</MenuItem>
                          <MenuItem value={"A002"}>A002</MenuItem>
                          <MenuItem value={"A003"}>A003</MenuItem>
                          <MenuItem value={"B001"}>B001</MenuItem>
                          <MenuItem value={"B002"}>B002</MenuItem>
                          <MenuItem value={"B003"}>B003</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
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
            onClick={() => handleUpdateClick(selectedItem.P_ID)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Box>
  );
}

export default P_TableData;
