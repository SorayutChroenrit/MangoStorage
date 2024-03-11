import { useEffect, useState } from "react";
import { fetchOrderData } from "./API";
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
function O_TableData() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedItem, setSelectedItem] = useState(null);
  const [OrderID, setOrderID] = useState("");
  const [Quantity, setQuantity] = useState(0);
  const [OrderDate, setOrderDate] = useState("");
  const [UserID, setUserID] = useState("");
  const [Total_Number, setTotalNumber] = useState("");
  const [Status, setStatus] = useState("");
  const [Owner, setOwner] = useState("");
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    OrderID: "",
    OrderDate: "",
    UserID: "",
    Total_Number: "",
    Status: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const OrderData = await fetchOrderData();
        // Convert datetime strings to local timezone
        const convertedData = OrderData.map((item) => {
          return {
            ...item,
            Order_date: new Date(item.Order_date).toLocaleString(),
          };
        });
        setData(convertedData);
      } catch (error) {
        setError(error.message);
      }
    };

    // Fetch data initially
    fetchData();
  }, []);

  useEffect(() => {
    // Find the highest OrderID
    if (data.length > 0) {
      const maxNumericOrderID = Math.max(
        ...data.map((item) => parseInt(item.OrderID.slice(1))) // Extract numeric part and find max
      );
      const nextOrderID = "O" + ("0000000" + (maxNumericOrderID + 1)).slice(-8); // Format back to original
      setOrderID(nextOrderID); // Set the next ID as the default label
    } else {
      // If no data is available, set a default label
      setOrderID("O00000001");
    }
  }, [data]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
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
  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };
  const handleChangeShelf = (event) => {
    setStatus(event.target.value);
  };
  const handleChangeOwner = (event) => {
    setOwner(event.target.value);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setModalData({
      OrderID: item.OrderID,
      OrderDate: item.OrderData,
      UserID: item.UserID,
      Total_Number: item.Total_Number,
      Status: item.Status,
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

  const addOrder = () => {
    if (!OrderID || !Status || !Quantity) {
      let errorMessage = "Please fill in all the fields!";
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
      return;
    }
    console.log("Sending request to create Product:", {
      OrderID,
      OrderDate,
      UserID,
      Total_Number,
      Status,
    });

    Axios.post("http://localhost:3001/createOrder", {
      OrderID,
      OrderDate,
      UserID,
      Total_Number,
      Status,
    })
      .then(() => {
        // Show success message
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Order has been successfully created",
          showConfirmButton: false,
          timer: 1500,
        });

        // Close modal
        setShow(false);

        // Fetch the updated data from the '/Product' endpoint
        fetchOrderData()
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

  const handleUpdateClick = (OrderID) => {
    Axios.get(`http://localhost:3001/Product`)
      .then((response) => {
        const oldData = response.data; // Fetch old data from the server
        // Then, send the old and new data to the server for updating
        Axios.put(`http://localhost:3001/updateProduct`, {
          UserID: modalData.UserID || oldData.UserID,
          Total_Number: modalData.Total_Number || oldData.Total_Number,
          Status: modalData.Status || oldData.Status,
          OrderID: OrderID,
          OrderDate: OrderDate,
        })
          .then((response) => {
            // Check if the server responded successfully
            if (response.status === 200) {
              // Fetch the updated data from the server
              fetchOrderData()
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

  const handleDeleteClick = (OrderID) => {
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
        Axios.delete(`http://localhost:3001/deleteOrder/${OrderID}`)
          .then((response) => {
            console.log(response); // Log the response
            setData((prevData) =>
              prevData.filter((val) => val.OrderID !== OrderID)
            );
            Swal.fire("Deleted!", "Your Order has been deleted.", "success");
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
        <h2 style={{ paddingLeft: "1rem" }}>Order Lists</h2>
        <Button variant="primary" onClick={handleShow}>
          Create Order
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
                  active={orderBy === "Order ID"}
                  direction={orderBy === "Order ID" ? order : "asc"}
                  onClick={() => handleSort("Order ID")}
                >
                  Order ID
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === "Total Items"}
                  direction={orderBy === "Total Items" ? order : "asc"}
                  onClick={() => handleSort("Total Items")}
                >
                  Total Items
                </TableSortLabel>
              </StyledTableCell>

              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === "Date"}
                  direction={orderBy === "Date" ? order : "asc"}
                  onClick={() => handleSort("Date")}
                >
                  Date
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === "Status"}
                  direction={orderBy === "Status" ? order : "asc"}
                  onClick={() => handleSort("Status")}
                >
                  Status
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
                  <StyledTableCell>{item.OrderID}</StyledTableCell>
                  <StyledTableCell>{item.Total_Number}</StyledTableCell>
                  <StyledTableCell>{item.Order_date}</StyledTableCell>
                  <StyledTableCell>
                    <button
                      className={`btn btn-sm ${
                        item.Status === "Waiting"
                          ? "btn-warning"
                          : "btn-success"
                      }`}
                    >
                      {item.Status}
                    </button>
                  </StyledTableCell>
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
                      onClick={() => handleDeleteClick(item.OrderID)}
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
          <Modal.Title>Create Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="myForm">
            <div className="row mb-3">
              <div className="col-md-3">
                <TextField
                  id="OrderID"
                  label="OrderID"
                  variant="outlined"
                  fullWidth
                  required
                  readOnly
                  value={OrderID}
                  name="OrderID"
                  type="text"
                />
              </div>
            </div>
            <div className="row mb-3" style={{ alignItems: "center" }}>
              <div className="col-md-6">
                <div className="form-check">
                  <div style={{ flex: "1" }}>
                    <div>
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Status
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          label="Status"
                          name="Status"
                          value={Status}
                          onChange={handleChangeStatus}
                          style={{ width: "300px" }}
                        >
                          <MenuItem value={"Waiting"}>Waiting</MenuItem>
                          <MenuItem value={"Completed"}>Completed</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
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
              </div>
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
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={addOrder}>
            Create Order
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
                  id="OrderID"
                  label="OrderID"
                  variant="outlined"
                  fullWidth
                  required
                  readOnly
                  value={OrderID}
                  name="OrderID"
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
                          // onChange={handleChangeOwner}
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
            onClick={() => handleUpdateClick(selectedItem.OrderID)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Box>
  );
}

export default O_TableData;
