import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Stack, Avatar, Typography } from '@mui/material';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 100,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function Item() {
  const [ITEMLIST, setItemList] = useState([]);

  useEffect(() => {
    axios
      .get("/api/expiryTracker/getItems")
      .then((res) => {
        setItemList(res.data);
      })
      .catch((err) => {
        toast.error("Something went wrong. Please try agin later !");
      });
  }, []);

  return (
    <div>
      <div align="center">
        <h1>Item Summary</h1> <br />
        <br />
      </div>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 500 }}
          aria-label="customized table"
          align="center"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Item Name</StyledTableCell>
              <StyledTableCell align="right">Created Date</StyledTableCell>
              <StyledTableCell align="right">Expiry Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ITEMLIST.slice(
              // page * rowsPerPage,
              // page * rowsPerPage + rowsPerPage
            ).map((row) => {
              const { id, itemName, createdAt, expiryDate } = row;
              return (
                <TableRow hover key={id} tabIndex={-1}>
                  <TableCell component="th" scope="row">
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar>{itemName[0]}</Avatar>
                      <Typography variant="subtitle2" noWrap>
                        {itemName}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="left">{createdAt}</TableCell>
                  <TableCell align="left">{expiryDate}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>{" "}
      <br />
      <br />
      <div>
        <Button style={{ float: "left", bottom: 0 }}>
          <Link to="/item-add">Item-Add</Link>
        </Button>
        <Button style={{ float: "right", bottom: 0 }}>
          <Link to="/">Log-Out</Link>
        </Button>
      </div>
    </div>
  );
}
