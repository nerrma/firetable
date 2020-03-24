import React from "react";
import { FieldProps } from "formik";
//import ReactJson from "react-json-view";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { makeStyles, createStyles, useTheme } from "@material-ui/core";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      backgroundColor:
        theme.palette.type === "light"
          ? "rgba(0, 0, 0, 0.09)"
          : "rgba(255, 255, 255, 0.09)",
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(2),

      margin: 0,
      width: "100%",
      minHeight: 56,
      overflowX: "auto",
    },
    table: {
      minWidth: 650,
    },
  })
);

const isValidJson = (val: any) => {
  try {
    if (typeof val === "string") JSON.parse(val);
    else JSON.stringify(val);
  } catch (error) {
    return false;
  }
  return true;
};

export default function JsonEditor({ form, field }: FieldProps) {
  const classes = useStyles();
  const theme = useTheme();

  const handleEdit = edit => {
    form.setFieldValue(field.name, edit.updated_src);
  };

  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell align="right">Retailer</TableCell>
              <TableCell align="right">Total Shares</TableCell>
              <TableCell align="right">First Purchase</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(field.value).map((val: any, index) => {
              return (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {val.name}
                  </TableCell>
                  <TableCell align="right">{val.shareTotal}</TableCell>
                  <TableCell align="right">
                    {val.firstPurchaseTimestamp}
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell component="th" scope="row">
                Testing 123
              </TableCell>
              <TableCell align="right">AYP</TableCell>
              <TableCell align="right">213</TableCell>
              <TableCell align="right">12:30</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
