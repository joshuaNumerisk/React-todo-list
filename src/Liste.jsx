import React, { useEffect, useState } from "react";
import moment from "moment";
import { useTable } from "react-table";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();
const Liste = () => {
  const [listeTaches, setListeTaches] = useState([]);
  const [texte, setTexte] = useState("");
  const [statut, setStatut] = useState("A Faire");
  const [champ, setChamp] = useState("");
  const [champStatut, setChampStatut] = useState("A Faire");
  const [champRecherche, setChampRecherche] = useState("");

  const ajouterTache = () => {
    debugger;

    setListeTaches([
      ...listeTaches,
      {
        texteAfaire: texte,
        statut,
        date: moment().format("MMMM Do YYYY, h:mm:ss a"),
        dateModification: "Il n'y a pas de modification ",
      },
    ]);
    /*On réinstialise les valeurs statut et Texte */
    setStatut("A Faire");
    setTexte("");
  };

  const modifierTache = (index) => {
    const tempList = [...listeTaches];

    if (champ !== "") {
      debugger;
      tempList[index].texteAfaire = champ;
      tempList[index].statut = champStatut;
      tempList[index].dateModification = moment().format(
        "MMMM Do YYYY, h:mm:ss a"
      );

      setListeTaches(tempList);
      return;
    }
    tempList[index].statut = champStatut;
    tempList[index].dateModification = moment().format(
      "MMMM Do YYYY, h:mm:ss a"
    );
    setListeTaches(tempList);
  };
  const supprimerTache = (index) => {
    debugger;
    const tempList = [...listeTaches];
    tempList.splice(index, 1);
    setListeTaches(tempList);
  };
  const supprimerTaches = () => {
    const tempList = [...listeTaches];
    tempList.length = 0;
    setListeTaches(tempList);
  };

  const supprimerTachesTerminer = () => {
    const tempList = [...listeTaches];
    for (const tache of tempList) {
      if (tache.statut === "Fait") {
        tempList.splice(tache, 1);
        setListeTaches(tempList);
      }
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Tache",
        accessor: "texteAfaire", // accessor is the "key" in the data
      },
      {
        Header: "Statut",
        accessor: "statut",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Date de modification",
        accessor: "dateModification",
      },
    ],
    []
  );

  const data = listeTaches;

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const rechercher = (value) => {
    debugger;
    if (value !== "") {
      for (let tache of listeTaches) {
        if (tache.texteAfaire === value) {
          return (
            tache.texteAfaire +
            " " +
            tache.statut +
            " " +
            tache.date +
            " " +
            tache.dateModification
          );
        }
      }
      return "Cette Tache n'existe pas";
    }
  };
  const triOrdreAlphabetique = () => {
    debugger;
    const tempList = [...listeTaches];
    tempList.sort(function compare(a, b) {
      if (a.texteAfaire < b.texteAfaire) return -1;
      if (a.texteAfaire > b.texteAfaire) return 1;
      return 0;
    });
    setListeTaches(tempList);
  };
  const triDateDeCreation = () => {
    debugger;
    const tempList = [...listeTaches];
    tempList.sort(function compare(a, b) {
      if (a.date < b.date) return -1;
      if (a.date > b.date) return 1;
      return 0;
    });
    setListeTaches(tempList);
  };

  const triDateDeModification = () => {
    debugger;
    const tempList = [...listeTaches];
    tempList.sort(function compare(a, b) {
      if (a.dateModification < b.dateModification) return -1;
      if (a.dateModification > b.dateModification) return 1;
      return 0;
    });
    setListeTaches(tempList);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xl">
          <CssBaseline />
          <Grid item xs={12}>
            <label>Tache :</label>
            <input
              type="text"
              value={texte}
              onChange={(event) => setTexte(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <label>
              Statut de la tâche :
              <select
                value={statut}
                onChange={(event) => setStatut(event.target.value)}
              >
                <option value="A faire">A faire</option>
                <option value="Fait">Fait</option>
              </select>
            </label>
          </Grid>
          <Button variant="contained" onClick={ajouterTache}>
            Ajouter une tache
          </Button>
          {listeTaches.map((tache, index) => {
            return (
              <div key={index}>
                <div>Titre:{tache.texteAfaire}</div>
                <div>Statut: {tache.statut}</div>
                <div>Date de création : {tache.date}</div>
                <div>Date de Modification : {tache.dateModification}</div>

                <label>Modifier la Tache :</label>
                <input
                  type="text"
                  onChange={(event) => setChamp(event.target.value)}
                />

                <label>
                  Statut de la tâche :
                  <select
                    onChange={(event) => setChampStatut(event.target.value)}
                  >
                    <option value="A faire">A faire</option>
                    <option value="Fait">Fait</option>
                  </select>
                </label>

                <Button
                  variant="contained"
                  onClick={() => modifierTache(index, tache)}
                >
                  Modifier une Tache
                </Button>
                <Button
                  variant="contained"
                  onClick={() => supprimerTache(index)}
                >
                  Supprimer une Tache
                </Button>
              </div>
            );
          })}
          <Button variant="contained" onClick={triOrdreAlphabetique}>
            Tri par ordre alphabétique
          </Button>

          <Button variant="contained" onClick={triDateDeCreation}>
            Tri par date de création
          </Button>

          <Button variant="contained" onClick={triDateDeModification}>
            Tri par date de modificaton
          </Button>

          <table {...getTableProps()}>
            <thead>
              {
                // Loop over the header rows
                headerGroups.map((headerGroup) => (
                  // Apply the header row props
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {
                      // Loop over the headers in each row
                      headerGroup.headers.map((column) => (
                        // Apply the header cell props
                        <th {...column.getHeaderProps()}>
                          {
                            // Render the header
                            column.render("Header")
                          }
                        </th>
                      ))
                    }
                  </tr>
                ))
              }
            </thead>
            {/* Apply the table body props */}
            <tbody {...getTableBodyProps()}>
              {
                // Loop over the table rows
                rows.map((row) => {
                  // Prepare the row for display
                  prepareRow(row);
                  return (
                    // Apply the row props
                    <tr {...row.getRowProps()}>
                      {
                        // Loop over the rows cells
                        row.cells.map((cell) => {
                          // Apply the cell props
                          return (
                            <td {...cell.getCellProps()}>
                              {
                                // Render the cell contents
                                cell.render("Cell")
                              }
                            </td>
                          );
                        })
                      }
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
          <Button variant="contained" onClick={supprimerTaches}>
            Supprimer toutes les tâches
          </Button>
          <Button variant="contained" onClick={supprimerTachesTerminer}>
            Supprimer les tâches effectuées
          </Button>
          <label>Recercher une tache</label>
          <input
            type="search"
            onChange={(event) => setChampRecherche(event.target.value)}
          />
          <button onClick={(event) => rechercher(champRecherche)}>
            Search
          </button>
          <p>{rechercher(champRecherche)}</p>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Liste;
