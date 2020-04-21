import React, { useState, useEffect } from "react";
import { FieldProps } from "formik";
import ReactJson from "react-json-view";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
//import Fab from '@material-ui/core/Fab';
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import Checkbox from "@material-ui/core/Checkbox";
import {
  makeStyles,
  createStyles,
  withStyles,
  useTheme,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Autosave from "../Autosave";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#e22729",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

//const { updateCell } = useFiretableContext();

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
      minWidth: 250,
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

const HoldingCustomRow = ({ val, field, form, shareVal }) => {
  const [isEditing, setisEditing] = useState(false);
  const [shares, setShares] = useState(shareVal);
  const [save, setSave] = useState(false);
  //const [save] = Autosave(field.value);

  const handleEdit = () => {
    setSave(false);
    setisEditing(true);
  };

  const handleChange = (e, name) => {
    setShares(e.target.value);
  };

  const finalEdit = (retailerID: string) => {
    setisEditing(false);
    if (!isNaN(shares)) {
      //newval[retailerName].shareTotal = shares * Math.pow(10,8);
      let newval = {
        F63YLxlqsllN3Ry2tnZl: {
          shareTotal: field.value["F63YLxlqsllN3Ry2tnZl"]
            ? field.value["F63YLxlqsllN3Ry2tnZl"].shareTotal
            : 0,
        },

        dvJFrauoNHljAE4Gs6C4: {
          shareTotal: field.value["dvJFrauoNHljAE4Gs6C4"]
            ? field.value["dvJFrauoNHljAE4Gs6C4"].shareTotal
            : 0,
        },

        knKgDArbnBHAe8t0Hgyv: {
          shareTotal: field.value["knKgDArbnBHAe8t0Hgyv"]
            ? field.value["knKgDArbnBHAe8t0Hgyv"].shareTotal
            : 0,
        },
      };

      newval[retailerID].shareTotal = shares * Math.pow(10, 8);

      console.log("Field value ", field.value);
      console.log("New value ", newval);
      form.setFieldValue(field.name, newval);

      //form.setFieldValue(field.value.retailerName, newval);

      console.trace();
      console.log("Field: ", field);
      console.log("Form: ", form);
      setSave(true);
    } else {
      setShares(shareVal);
    }
  };
  console.log("value: " + JSON.stringify(val));
  let retailer = val[0];

  switch (val[0]) {
    case "F63YLxlqsllN3Ry2tnZl":
      retailer = "HFG (HelloFresh)";
      break;
    case "dvJFrauoNHljAE4Gs6C4":
      retailer = "AGL CommFac";
      break;
    case "knKgDArbnBHAe8t0Hgyv":
      retailer = "AVG (Australian Vintage)";
      break;
  }

  return (
    <TableRow>
      {save === true && <Autosave values={form.values} errors={form.errors} />}
      <TableCell component="th" scope="row">
        {retailer}
      </TableCell>

      {isEditing ? (
        <TableCell align="right">
          <TextField
            onChange={e => handleChange(e, val[0])}
            label="Shares"
            value={shares}
          />
        </TableCell>
      ) : (
        <TableCell align="right">{shares}</TableCell>
      )}
      <TableCell>
        {isEditing ? (
          <Tooltip title="Finish">
            <DoneIcon onClick={() => finalEdit(val[0])} />
          </Tooltip>
        ) : (
          <Tooltip title="Edit">
            <EditIcon onClick={() => handleEdit()} />
          </Tooltip>
        )}
      </TableCell>
    </TableRow>
  );
};

const HoldingsEditor = ({ form, field }) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Company</StyledTableCell>
            <StyledTableCell align="right">Total Shares</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(field.value).map((val: any, index) => {
            return (
              <HoldingCustomRow
                field={field}
                form={form}
                val={val}
                key={index}
                shareVal={val[1].shareTotal / Math.pow(10, 8)}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const PunchCustomRow = ({ field, form }) => {
  const [isEditing, setisEditing] = useState(false);
  const [active, setActive] = useState(field.value.active);
  const [count, setCount] = useState(field.value.count);
  const [details, setDetails] = useState(field.value.details);
  const [save, setSave] = useState(false);

  const handleEdit = () => {
    setisEditing(true);
  };

  const handleChange = e => {
    var name = e.target.getAttribute("name");
    setSave(false);
    switch (name) {
      case "active":
        setActive(e.target.checked);
        break;
      case "count":
        setCount(e.target.value);
        break;
      case "details":
        setDetails(e.target.value);
        break;
    }
  };

  const finalEdit = () => {
    setisEditing(false);
    let newval = {
      active: active ? active : false,
      count: count ? parseInt(count, 10) : 0,
      details: details ? details : "",
    };

    form.setFieldValue(field.name, newval);

    console.trace();
    console.log("Field: ", field);
    console.log("Form: ", form);
    setSave(true);
  };
  console.log("value: ", field.value);

  return (
    <TableRow>
      {save === true && <Autosave values={form.values} errors={form.errors} />}
      <TableCell align="right">
        {isEditing ? (
          <Checkbox
            onChange={e => handleChange(e)}
            checked={active}
            name="active"
          />
        ) : (
          <Checkbox
            onChange={e => handleChange(e)}
            checked={active}
            name="active"
            disabled
          />
        )}
      </TableCell>

      {isEditing ? (
        <TableCell align="right">
          <TextField
            onChange={e => handleChange(e)}
            name="count"
            label="Count"
            type="number"
            value={count}
          />
        </TableCell>
      ) : (
        <TableCell align="right">{count}</TableCell>
      )}

      {isEditing ? (
        <TableCell align="right">
          <TextField
            onChange={e => handleChange(e)}
            label="Details"
            name="details"
            value={details}
            inputProps={{ style: { fontSize: 14 } }}
            fullWidth={true}
          />
        </TableCell>
      ) : (
        <TableCell align="right">{details}</TableCell>
      )}
      <TableCell>
        {isEditing ? (
          <Tooltip title="Finish">
            <DoneIcon onClick={() => finalEdit()} />
          </Tooltip>
        ) : (
          <Tooltip title="Edit">
            <EditIcon onClick={() => handleEdit()} />
          </Tooltip>
        )}
      </TableCell>
    </TableRow>
  );
};

const PunchCardEditor = ({ form, field }) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Active</StyledTableCell>
            <StyledTableCell align="right">Count</StyledTableCell>
            <StyledTableCell align="right">Details</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <PunchCustomRow field={field} form={form} />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default function JsonEditor({ form, field }: FieldProps) {
  const classes = useStyles();
  const theme = useTheme();

  const handleEdit = edit => {
    form.setFieldValue(field.name, edit.updated_src);
  };

  return (
    <div className={classes.root}>
      {(() => {
        switch (field.name) {
          case "holdings":
            return <HoldingsEditor form={form} field={field} />;
          case "punchCard":
            return <PunchCardEditor form={form} field={field} />;
          default:
            return (
              <ReactJson
                src={isValidJson(field.value) ? field.value : {}}
                onEdit={handleEdit}
                onAdd={handleEdit}
                onDelete={handleEdit}
                theme={{
                  base00: "rgba(0, 0, 0, 0)",
                  base01: theme.palette.background.default,
                  base02: theme.palette.divider,
                  base03: "#93a1a1",
                  base04: theme.palette.text.disabled,
                  base05: theme.palette.text.secondary,
                  base06: "#073642",
                  base07: theme.palette.text.primary,
                  base08: "#d33682",
                  base09: "#cb4b16",
                  base0A: "#dc322f",
                  base0B: "#859900",
                  base0C: "#6c71c4",
                  base0D: theme.palette.text.secondary,
                  base0E: "#2aa198",
                  base0F: "#268bd2",
                }}
                iconStyle="triangle"
                style={{
                  fontFamily:
                    "SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace",
                  backgroundColor: "transparent",
                }}
              />
            );
        }
      })()}
    </div>
  );
}
