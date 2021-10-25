import React from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

export const Attacks = ({ attacks }) => {
  return (
    <TableContainer>
      <Table aria-label="pokemon-attack-details">
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Damage</TableCell>
        </TableRow>
        {attacks.map((attack) => (
          <TableRow>
            <TableCell>{attack.name}</TableCell>
            <TableCell>{attack.type}</TableCell>
            <TableCell>{attack.damage}</TableCell>
          </TableRow>
        ))}
      </Table>
    </TableContainer>
  );
};

