import React, { useState, useEffect } from "react";
import {
  TextField,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
} from "@mui/material";

import Model from "./Model";

const MyTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [modelOpen, setModelOpen] = useState(false);
  const [moreDtata, setMoreData] = useState([]);
  const ShowMore = async (id) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    setMoreData(data);
  };
  const getTodoList = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "GET",
    });
    const data = await response.json();
    setTodoList(data);
  };

  useEffect(() => {
    getTodoList();
  }, []);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredData = todoList.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div style={{ margin: "35px" }}>
      {!modelOpen ? (
        <>
          <TextField
            label="Search"
            value={searchValue}
            onChange={handleSearchChange}
            style={{ float: "right", margin: "10px" }}
          />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ border: "3px solid black" }}>
                    Todo Id
                  </TableCell>
                  <TableCell style={{ border: "3px solid black" }}>
                    Title
                  </TableCell>
                  <TableCell style={{ border: "3px solid black" }}>
                    Status
                  </TableCell>
                  <TableCell style={{ border: "3px solid black" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((item, ind) => (
                  <TableRow key={ind}>
                    <TableCell style={{ border: "1px solid black" }}>
                      {item.userId}
                    </TableCell>
                    <TableCell style={{ border: "1px solid black" }}>
                      {item.title}
                    </TableCell>
                    <TableCell style={{ border: "1px solid black" }}>
                      {item.completed.toString()}
                    </TableCell>
                    <TableCell style={{ border: "1px solid black" }}>
                      <Button
                        onClick={() => {
                          ShowMore(ind + 1);
                          setModelOpen(true);
                        }}
                        variant="contained"
                        color="primary"
                      >
                        Show More
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <>
          <Model
            title="User Details"
            close={() => {
              setModelOpen(false);
            }}
          >
            <div>
              <p>
                <strong>TODO ID:</strong> {moreDtata.id}
              </p>
              <p>
                <strong>Title:</strong> {filteredData[moreDtata.id].title}
              </p>
              <p>
                <strong>User ID:</strong> {filteredData[moreDtata.id].userId}
              </p>
              <p>
                <strong>Name:</strong> {moreDtata.name}
              </p>
              <p>
                <strong>Email:</strong> {moreDtata.email}
              </p>
            </div>
          </Model>
        </>
      )}
    </div>
  );
};

export default MyTable;
