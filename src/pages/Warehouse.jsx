/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BoxImage from "../images/box.png";
import Scroll from "../data/Scroll";
import S_TableData from "../data/S_table";

export const Warehouse = () => {
  const [todayDate, setTodayDate] = useState("");

  const [loadedShelves, setLoadedShelves] = useState(21);
  const [emptyShelves, setEmptyShelves] = useState(34);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const totalShelves = loadedShelves + emptyShelves;
    const storageUsedPercentage = (loadedShelves / totalShelves) * 100;
    setValue(storageUsedPercentage);
  }, [loadedShelves, emptyShelves]);

  const circumference = 2 * Math.PI * 115;
  const offset = circumference - (value / 100) * circumference;

  useEffect(() => {
    // Function to get today's date in the format YYYY-MM-DD
    const getTodayDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      let month = today.getMonth() + 1;
      let day = today.getDate();

      // Add leading zero if month/day is less than 10
      if (month < 10) {
        month = `0${month}`;
      }
      if (day < 10) {
        day = `0${day}`;
      }

      return `${year}-${month}-${day}`;
    };

    // Set today's date when the component mounts
    setTodayDate(getTodayDate());
  }, []);

  const handleDateChange = (event) => {
    setTodayDate(event.target.value);
  };

  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Warehouse</h1>
          <ol
            className="breadcrumb mb-4"
            style={{
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
            }}
          >
            <li className="breadcrumb-item">
              <Link to={"/dashboard"}>Dashboard</Link>
            </li>
            <li className="breadcrumb-item active">Warehouse</li>
          </ol>
        </div>
        <div className="row">
          <div className="col-xl-9">
            <div className="card-body">
              <S_TableData />
            </div>
            <div className="card-body">
              <div className="col-xl-9 col-12">
                <div className="box position-static">
                  <div className="box-header">
                    <h4 className="box-title">Storage Overview</h4>
                    <div className="box-controls pull-right">
                      <input
                        className="form-control no-border bg-lightest"
                        id="e"
                        type="date"
                        value={todayDate}
                        onChange={handleDateChange}
                      />
                    </div>
                  </div>
                  <div className="box-body">
                    <div className="row mb-20">
                      <div className="col-lg-3 col-md-6 col-12">
                        <div className="row g-0 row-cols-auto">
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning-light d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">Empty</h4>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">
                                        Row 3 #124578
                                      </h4>
                                      <p className="text-white">
                                        H60 x W60 x 20 KG
                                      </p>
                                      <p className="mb-0 text-white-50">
                                        Delivered 06:15PM
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">
                                        Row 3 #124578
                                      </h4>
                                      <p className="text-white">
                                        H60 x W60 x 20 KG
                                      </p>
                                      <p className="mb-0 text-white-50">
                                        Delivered 06:15PM
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">
                                        Row 3 #124578
                                      </h4>
                                      <p className="text-white">
                                        H60 x W60 x 20 KG
                                      </p>
                                      <p className="mb-0 text-white-50">
                                        Delivered 06:15PM
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning-light d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">Empty</h4>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning-light d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">Empty</h4>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning-light d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">Empty</h4>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning-light d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">Empty</h4>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-12">
                        <div className="row g-0 row-cols-auto">
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">
                                        Row 3 #124578
                                      </h4>
                                      <p className="text-white">
                                        H60 x W60 x 20 KG
                                      </p>
                                      <p className="mb-0 text-white-50">
                                        Delivered 06:15PM
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">
                                        Row 3 #124578
                                      </h4>
                                      <p className="text-white">
                                        H60 x W60 x 20 KG
                                      </p>
                                      <p className="mb-0 text-white-50">
                                        Delivered 06:15PM
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning-light d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">Empty</h4>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning-light d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">Empty</h4>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning-light d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">Empty</h4>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <div className="w-40 h-40 m-5"> </div>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning-light d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">Empty</h4>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning-light d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">Empty</h4>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-12">
                        <div className="row g-0 row-cols-auto">
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning-light d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">Empty</h4>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning-light d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">Empty</h4>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning-light d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />{" "}
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">Empty</h4>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning-light d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">Empty</h4>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning-light d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">Empty</h4>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning-light d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">Empty</h4>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning-light d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">Empty</h4>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning-light d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">Empty</h4>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning-light d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">Empty</h4>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning-light d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">Empty</h4>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning-light d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">Empty</h4>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning-light d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">Empty</h4>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning-light d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">Empty</h4>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <div className="w-40 h-40 m-5"> </div>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning-light d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">Empty</h4>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning-light d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">Empty</h4>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning-light d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">Empty</h4>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-md-6 col-12">
                        <div className="row g-0 row-cols-auto">
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">
                                        Row 3 #124578
                                      </h4>
                                      <p className="text-white">
                                        H60 x W60 x 20 KG
                                      </p>
                                      <p className="mb-0 text-white-50">
                                        Delivered 06:15PM
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">
                                        Row 3 #124578
                                      </h4>
                                      <p className="text-white">
                                        H60 x W60 x 20 KG
                                      </p>
                                      <p className="mb-0 text-white-50">
                                        Delivered 06:15PM
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">
                                        Row 3 #124578
                                      </h4>
                                      <p className="text-white">
                                        H60 x W60 x 20 KG
                                      </p>
                                      <p className="mb-0 text-white-50">
                                        Delivered 06:15PM
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">
                                        Row 3 #124578
                                      </h4>
                                      <p className="text-white">
                                        H60 x W60 x 20 KG
                                      </p>
                                      <p className="mb-0 text-white-50">
                                        Delivered 06:15PM
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">
                                        Row 3 #124578
                                      </h4>
                                      <p className="text-white">
                                        H60 x W60 x 20 KG
                                      </p>
                                      <p className="mb-0 text-white-50">
                                        Delivered 06:15PM
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">
                                        Row 3 #124578
                                      </h4>
                                      <p className="text-white">
                                        H60 x W60 x 20 KG
                                      </p>
                                      <p className="mb-0 text-white-50">
                                        Delivered 06:15PM
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">
                                        Row 3 #124578
                                      </h4>
                                      <p className="text-white">
                                        H60 x W60 x 20 KG
                                      </p>
                                      <p className="mb-0 text-white-50">
                                        Delivered 06:15PM
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning-light d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">Empty</h4>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-12">
                        <div className="row g-0 row-cols-auto">
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">
                                        Row 3 #124578
                                      </h4>
                                      <p className="text-white">
                                        H60 x W60 x 20 KG
                                      </p>
                                      <p className="mb-0 text-white-50">
                                        Delivered 06:15PM
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">
                                        Row 3 #124578
                                      </h4>
                                      <p className="text-white">
                                        H60 x W60 x 20 KG
                                      </p>
                                      <p className="mb-0 text-white-50">
                                        Delivered 06:15PM
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">
                                        Row 3 #124578
                                      </h4>
                                      <p className="text-white">
                                        H60 x W60 x 20 KG
                                      </p>
                                      <p className="mb-0 text-white-50">
                                        Delivered 06:15PM
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <div className="w-40 h-40 m-5"> </div>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning-light d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">Empty</h4>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning-light d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">Empty</h4>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-12">
                        <div className="row g-0 row-cols-auto">
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning-light d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">Empty</h4>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning-light d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">Empty</h4>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">
                                        Row 3 #124578
                                      </h4>
                                      <p className="text-white">
                                        H60 x W60 x 20 KG
                                      </p>
                                      <p className="mb-0 text-white-50">
                                        Delivered 06:15PM
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <div className="w-40 h-40 m-5"> </div>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">
                                        Row 3 #124578
                                      </h4>
                                      <p className="text-white">
                                        H60 x W60 x 20 KG
                                      </p>
                                      <p className="mb-0 text-white-50">
                                        Delivered 06:15PM
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">
                                        Row 3 #124578
                                      </h4>
                                      <p className="text-white">
                                        H60 x W60 x 20 KG
                                      </p>
                                      <p className="mb-0 text-white-50">
                                        Delivered 06:15PM
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">
                                        Row 3 #124578
                                      </h4>
                                      <p className="text-white">
                                        H60 x W60 x 20 KG
                                      </p>
                                      <p className="mb-0 text-white-50">
                                        Delivered 06:15PM
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">
                                        Row 3 #124578
                                      </h4>
                                      <p className="text-white">
                                        H60 x W60 x 20 KG
                                      </p>
                                      <p className="mb-0 text-white-50">
                                        Delivered 06:15PM
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning-light d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">Empty</h4>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning-light d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">Empty</h4>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col">
                            <div className="section-bx">
                              <a className="w-40 h-40 m-5 bg-warning d-block rounded10">
                                <div className="bx-dec">
                                  <div className="section-dec d-flex align-items-center">
                                    <div className="box-img">
                                      <img
                                        src={BoxImage}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="dec">
                                      <h4 className="text-white my-0">
                                        Row 3 #124578
                                      </h4>
                                      <p className="text-white">
                                        H60 x W60 x 20 KG
                                      </p>
                                      <p className="mb-0 text-white-50">
                                        Delivered 06:15PM
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3">
            <div className="col-xl-12">
              <div className="box bg-success">
                <div className="box-header">
                  <h4 style={{ color: "white" }}>Storage usage</h4>
                </div>
                <div className="card-body">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <svg
                      width={250}
                      height={250}
                      viewBox="-31.25 -31.25 312.5 312.5"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ transform: "rotate(-90deg)" }}
                    >
                      <circle
                        r={115}
                        cx={125}
                        cy={125}
                        fill="transparent"
                        stroke="#73bda4"
                        strokeWidth="16px"
                        strokeDasharray="722.2px"
                        strokeDashoffset={0}
                      />
                      <circle
                        r={115}
                        cx={125}
                        cy={125}
                        stroke="#ffb43f"
                        strokeWidth="16px"
                        strokeLinecap="round"
                        strokeDashoffset={`${offset}px`}
                        fill="transparent"
                        strokeDasharray="722.2px"
                      />
                      <text
                        x="80px"
                        y="100px"
                        fill="#ffffff"
                        fontSize="52px"
                        fontWeight="bold"
                        style={{
                          transform: "rotate(90deg) translate(0px, -216px)",
                        }}
                      >
                        {Math.round(value)}%
                      </text>
                      <text
                        x="65px"
                        y="150px"
                        fill="#ffffff"
                        fontSize="20px"
                        style={{
                          transform: "rotate(90deg) translate(0px, -216px)",
                        }}
                      >
                        Location used
                      </text>
                    </svg>
                  </div>
                  <div className="mt-50 d-flex justify-content-evenly">
                    <div className="text-center">
                      <p className="mb-0 text-white-50">Loaded</p>
                      <h4 className="mb-0 text-white">
                        {loadedShelves} Shelves
                      </h4>
                    </div>
                    <div className="text-center">
                      <p className="mb-0 text-white-50">Empty</p>
                      <h4 className="mb-0 text-white">
                        {emptyShelves} Shelves
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="box" id="bt-sellers">
              <div className="box-header">
                <h4 className="box-title">Latest order added</h4>
              </div>
              <div className="box-body">
                <Scroll height="400px">
                  <div className="box-shadowed p-10 mb-10 rounded10">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="my-5">AirPods Max</h5>
                        <p className="mb-0">P001 </p>
                      </div>
                      <div>
                        <h3 className="my-5">124 Units</h3>
                        <p className="mb-0">
                          <span>P001 </span> | <strong>$72,931</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="box-shadowed p-10 mb-10 rounded10">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="my-5">Darcy Side Table</h5>
                        <p className="mb-0">BR 3039</p>
                      </div>
                      <div>
                        <h3 className="my-5">107 Units</h3>
                        <p className="mb-0">
                          <span>$188 per unit</span> | <strong>$20,116</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="box-shadowed p-10 mb-10 rounded10">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="my-5">Clarissa Chaise</h5>
                        <p className="mb-0">BR 8129</p>
                      </div>
                      <div>
                        <h3 className="my-5">102 Units</h3>
                        <p className="mb-0">
                          <span>$980 per unit</span> | <strong>$99,960</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="box-shadowed p-10 mb-10 rounded10">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="my-5">Sheffield Bedframe</h5>
                        <p className="mb-0">BR 8129</p>
                      </div>
                      <div>
                        <h3 className="my-5">98 Units</h3>
                        <p className="mb-0">
                          <span>$1400 per unit</span> |{" "}
                          <strong>$137,200</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="box-shadowed p-10 mb-10 rounded10">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="my-5">Amelia Floorlamp</h5>
                        <p className="mb-0">BR 8129</p>
                      </div>
                      <div>
                        <h3 className="my-5">93 Units</h3>
                        <p className="mb-0">
                          <span>$110 per unit</span> | <strong>$10,230</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="box-shadowed p-10 mb-10 rounded10">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="my-5">Kelly Bookshelf</h5>
                        <p className="mb-0">BR 8129</p>
                      </div>
                      <div>
                        <h3 className="my-5">124 Units</h3>
                        <p className="mb-0">
                          <span>$588 per unit</span> | <strong>$72,931</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="box-shadowed p-10 mb-10 rounded10">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="my-5">Darcy Side Table</h5>
                        <p className="mb-0">BR 3039</p>
                      </div>
                      <div>
                        <h3 className="my-5">107 Units</h3>
                        <p className="mb-0">
                          <span>$188 per unit</span> | <strong>$20,116</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="box-shadowed p-10 mb-10 rounded10">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="my-5">Clarissa Chaise</h5>
                        <p className="mb-0">BR 8129</p>
                      </div>
                      <div>
                        <h3 className="my-5">102 Units</h3>
                        <p className="mb-0">
                          <span>$980 per unit</span> | <strong>$99,960</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="box-shadowed p-10 mb-10 rounded10">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="my-5">Sheffield Bedframe</h5>
                        <p className="mb-0">BR 8129</p>
                      </div>
                      <div>
                        <h3 className="my-5">98 Units</h3>
                        <p className="mb-0">
                          <span>$1400 per unit</span> |{" "}
                          <strong>$137,200</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="box-shadowed p-10 mb-10 rounded10">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="my-5">Amelia Floorlamp</h5>
                        <p className="mb-0">BR 8129</p>
                      </div>
                      <div>
                        <h3 className="my-5">93 Units</h3>
                        <p className="mb-0">
                          <span>$110 per unit</span> | <strong>$10,230</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </Scroll>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
