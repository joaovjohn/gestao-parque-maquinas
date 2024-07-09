import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import "./styles.css";
import DeleteIcon from "@mui/icons-material/Delete";

export const CustomTable = ({
  title,
  columns,
  data,
  onEdit,
  onDelete,
  customButton,
}) => {
  return (
    <div
      className="card-table"
      style={{ flexDirection: "column", width: "100%" }}
    >
      <h3>{title}</h3>
      <TableContainer component={Paper} style={{ boxShadow: "0" }}>
        <Table style={{ boxShadow: "0" }}>
          <TableHead>
            <TableRow>
              {columns?.map((column) => (
                <TableCell key={column.id} style={{ fontWeight: 600 }}>
                  {column.label}
                </TableCell>
              ))}
              {(!!onEdit || !!onDelete || !!customButton) && (
                <TableCell style={{ fontWeight: 600 }} />
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <TableRow key={row.id}>
                {columns?.map((column) => (
                  <TableCell key={column.id}>
                    {column?.type === "data"
                      ? new Date(row[column.id]).toLocaleDateString()
                      : row[column.id]}
                  </TableCell>
                ))}
                {(!!onEdit || !!onDelete || !!customButton) && (
                  <TableCell>
                    {!!onEdit && (
                      <IconButton onClick={() => onEdit(row.id)}>
                        <EditIcon />
                      </IconButton>
                    )}
                    {!!onDelete && (
                      <IconButton onClick={() => onDelete(row.id)}>
                        <DeleteIcon />
                      </IconButton>
                    )}
                    {!!customButton && customButton}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
