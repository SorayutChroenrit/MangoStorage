import { useEffect, useState } from "react";
import { fetchProductData } from "./API";
import { fetchSerialNumberData } from "./API";
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
import MButton from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "bootstrap/dist/css/bootstrap.min.css";
function S_TableData() {
  const [data, setData] = useState([]);
  const [allPIDs, setAllPIDs] = useState([]);
  const [error, setError] = useState(null);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedItem, setSelectedItem] = useState(null);
  const [P_ID, setP_ID] = useState("");
  const [P_Name, setP_Name] = useState("");
  const [Quantity, setQuantity] = useState(0);
  const [image, setimage] = useState("");
  const [Owner, setOwner] = useState("");
  const [Shelf, setShelf] = useState("");
  const [show, setShow] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    P_ID: "",
    P_Name: "",
    Quantity: 0,
    Owner: "",
    Shelf: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ProductsData = await fetchProductData();
        setData(ProductsData);
        const allPIDs = ProductsData.map((item) => item.P_ID);
        setAllPIDs(allPIDs); // Set allPIDs state with array of P_IDs
      } catch (error) {
        setError(error.message);
      }
    };

    // Fetch data initially
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const SerialNumberData = await fetchSerialNumberData(); // Assuming fetchSerialNumberData() fetches data from somewhere
        const formattedData = SerialNumberData.map((item) => ({
          ...item,
          LastUpdated: formatDate(item.LastUpdated), // Formatting LastUpdated timestamp
        }));
        setData(formattedData);
      } catch (error) {
        setError(error.message);
      }
    };

    // Fetch data initially
    fetchData();
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const time = `${hours}:${minutes}:${seconds}`;
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${time} ${day}/${month}/${year}`;
  };

  // Function to handle file upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
      setimage(file);
    }
  };
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

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
  const handleChangeP_ID = (event) => {
    setP_ID(event.target.value);
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
      Shelf: item.Shelf || "",
      Owner: item.Owner || "",
    });
    setUploadedImage(`http://localhost:3001/images/${item.image}`);
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
      image,
    });

    const formData = new FormData();
    formData.append("image", image);
    formData.append("P_ID", P_ID);
    formData.append("P_Name", P_Name);
    formData.append("Quantity", Quantity);

    Axios.post("http://localhost:3001/createProduct", formData)
      .then(() => {
        // Show success message
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your product has been successfully created",
          showConfirmButton: false,
          timer: 1500,
        });

        // Reset form fields
        setP_ID("");
        setP_Name("");
        setQuantity("");
        setimage("");

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
    const formData = new FormData();
    formData.append("P_ID", P_ID);
    formData.append("P_Name", modalData.P_Name);
    formData.append("Quantity", modalData.Quantity);
    formData.append("image", image);

    Axios.put(`http://localhost:3001/updateProduct`, formData)
      .then((response) => {
        if (response.status === 200) {
          fetchProductData()
            .then((updatedData) => {
              setData(updatedData);
              setShowModal(false); // Close the modal after successful update
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your Product has been saved",
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.error("Error fetching updated data:", error);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error fetching updated data!",
              });
            });
        } else {
          throw new Error("Server response was not successful");
        }
      })
      .catch((error) => {
        console.error("Error sending data to API:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
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
          Add Product
        </Button>
        <div>
          <input
            type="search"
            placeholder="search..."
            style={{
              border: "1px solid black",
              borderRadius: "4px",
              textAlign: "center",
            }}
          />
        </div>
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
                  Product
                </StyledTableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <StyledTableSortLabel
                  active={orderBy === "S_ID"}
                  direction={orderBy === "S_ID" ? order : "asc"}
                  onClick={() => handleSort("S_ID")}
                >
                  Serial Number
                </StyledTableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <StyledTableSortLabel
                  active={orderBy === "P_Name"}
                  direction={orderBy === "P_Name" ? order : "asc"}
                  onClick={() => handleSort("P_Name")}
                >
                  Storage ID
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
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell>{item.P_ID}</StyledTableCell>
                  <StyledTableCell
                    style={{ padding: "0 10px", verticalAlign: "middle" }}
                  >
                    <img
                      src={`http://localhost:3001/images/${item.image}`}
                      style={{ width: "80px", marginRight: "10px" }}
                    />
                    {item.P_Name}
                  </StyledTableCell>
                  <StyledTableCell>{item.Serial_No}</StyledTableCell>
                  <StyledTableCell>{item.S_ID}</StyledTableCell>
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
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="myForm">
            <div className="row mb-12">
              <div
                className="col-md-12"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    overflow: "hidden",
                    border: "2px solid #ccc", // Added border style
                    marginBottom: "20px",
                  }}
                >
                  {!uploadedImage && (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "18px",
                      }}
                    >
                      Product Image
                    </div>
                  )}
                  {uploadedImage && (
                    <img
                      src={uploadedImage}
                      alt="Uploaded"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </div>
                <MButton
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload image
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    id="image"
                    name={image}
                  />
                </MButton>
              </div>
            </div>
            <div className="row mb-3 d-flex justify-content-center">
              <div className="col-md-3">
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    ProductID
                  </InputLabel>
                  <Select
                    id="P_ID"
                    label="Product ID"
                    name="P_ID"
                    value={P_ID}
                    onChange={handleChangeP_ID}
                  >
                    {/* Populate the dropdown with allPIDs */}
                    {allPIDs.map((pid) => (
                      <MenuItem key={pid} value={pid}>
                        {pid}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-4">
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
            <div className="row mb-12">
              <div
                className="col-md-12"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    overflow: "hidden",
                    border: "2px solid #ccc", // Added border style
                    marginBottom: "20px",
                  }}
                >
                  {!uploadedImage && (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "18px",
                      }}
                    >
                      <img
                        src={`http://localhost:3001/images/${
                          selectedItem && selectedItem.image
                        }`}
                        style={{ width: "80px", marginRight: "10px" }}
                        alt={selectedItem && selectedItem.P_Name}
                      />
                    </div>
                  )}
                  {uploadedImage && (
                    <img
                      src={uploadedImage}
                      alt="Uploaded"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </div>
                <MButton
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload image
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    id="image"
                    name={image}
                  />
                </MButton>
              </div>
            </div>
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

export default S_TableData;
