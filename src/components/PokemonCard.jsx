import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Attacks } from "./Attacks";

export default function PokemonCard({ pokemon }) {
  return (
    <Card sx={{ display: "flex", flexDirection: "row" }}>
      <Box>
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          sx={{ padding: 1 }}
        >
          {pokemon.name}
        </Typography>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ padding: 1 }}
        >
          {"No: " + pokemon.number}
        </Typography>
        <CardMedia
          sx={{ width: 350 }}
          component="img"
          image={pokemon.image}
          alt={pokemon.name + " image"}
          aria-label={pokemon.name + " image"}
        />
      </Box>
      <CardContent sx={{ width: 400, height: 600 }}>
        <TableContainer component={Paper}>
          <Table aria-label="pokemon-details">
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  <b> Resistant: </b>
                </TableCell>
                <TableCell align="left">
                  {pokemon.resistant.join(", ")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <b> Weakness: </b>
                </TableCell>
                <TableCell align="left">
                  {pokemon.weaknesses.join(", ")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" colSpan={2}>
                  <b> Fast Attack: </b>
                  <Attacks attacks={pokemon.attacks.fast} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" colSpan={2}>
                  <b> Special Attack: </b>
                  <Attacks attacks={pokemon.attacks.special} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
