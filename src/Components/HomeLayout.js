import React, { useEffect, useState } from "react";
import {
  getAllPokemon,
  getAllPokemonByType,
  getPokemon,
  getAllPokemonByName,
} from "../Service/pokemonService";
import PokemonCard from "./PokemonCard/PokemonCard";
import { Button, Grid } from "@material-ui/core";
import spinner from "../Assets/Spinner-0.4s-361px.gif";
import "../App.css";
import Chip from "@material-ui/core/Chip";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { FilterList } from "@material-ui/icons";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import { withStyles } from "@material-ui/core/styles";
import Search from "./Search";
import clsx from "clsx";
import pokemonTypesColor from "./Helpers/pokemonTypesColor";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const types = [
  "normal",
  "fighting",
  "flying",
  "poison",
  "ground",
  "rock",
  "bug",
  "ghost",
  "steel",
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "ice",
  "dragon",
  "dark",
  "fairy",
];

function HomeLayout({ classes }) {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const initialURL = `https://pokeapi.co/api/v2/pokemon?limit=${18}`;
  const [item, setItem] = useState([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialURL);
      setNextUrl(response.next);
      setPrevUrl(response.previous);

      await loadPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, [initialURL]);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const handleClickFilter = () => {
    setOpen(true);
  };

  const handleCloseFilter = () => {
    setOpen(false);
  };
  const changeFilterItem = (values) => {
    const data = [...item];
    const index = data.indexOf(values);
    if (index > -1) {
      data.splice(index, 1);
    } else {
      data.push(values);
    }
    setItem([...data]);
  };

  useEffect(() => {
    if (item !== null) {
      setLoading(true);
      let pokemonList = [];
      async function fetchData() {
        for (let i = 0; i < item.length; i++) {
          let response = await getAllPokemonByType(item[i]);
          const pokemons = [...response.pokemon, ...pokemonList];
          pokemonList = pokemons.slice(0);
        }
        await loadPokemonByFilter(pokemonList);
      }
      fetchData().then();
    }
  }, [item]);

  const loadPokemonByFilter = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        return await getPokemon(pokemon.pokemon);
      })
    );
    setPokemonData(_pokemonData);
    setLoading(false);
  };

  const renderSelected = (type) => {
    if (item.indexOf(type) === -1) {
      return "";
    }
    return classes.selected;
  };

  return (
    <div>
      {loading ? (
        <img className="spinner" src={spinner} alt="Loading" />
      ) : (
        <>
          <CardHeader
            avatar={"Filter"}
            action={
              <>
                <IconButton onClick={handleClickFilter}>
                  <FilterList />
                </IconButton>
              </>
            }
          />
          <Grid container justify="center">
            {pokemonData.map((pokemon, index) => (
              <Grid sm={12} xs={12} md={4} lg={4} xl={4} key={index}>
                <PokemonCard
                  to={`/pokemon/${pokemon.name}`}
                  key={pokemon.name}
                  pokemon={pokemon}
                  pokemonData={pokemonData}
                />
              </Grid>
            ))}
          </Grid>
          <Dialog
            open={open}
            onClose={handleCloseFilter}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            TransitionComponent={Transition}
            keepMounted
          >
            <DialogTitle id="alert-dialog-title">
              <FilterList />
              &nbsp;{"Filter!"}
            </DialogTitle>
            <DialogContent className={classes.dialog_content}>
              {types.map((type, index) => (
                <Chip
                  key={index}
                  onClick={() => changeFilterItem(type)}
                  label={type}
                  variant="outlined"
                  className={clsx(classes.chip_list_item, renderSelected(type))}
                  style={{ color: pokemonTypesColor[type] }}
                />
              ))}
            </DialogContent>
          </Dialog>
          <div className="button-pagination">
            <Button variant="outlined" onClick={prev}>
              Prev
            </Button>
            <Button variant="outlined" onClick={next}>
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default withStyles({
  chip_list_item: {
    marginLeft: "1%",
    marginTop: "1%",
    fontWeight: "300",
    letterSpacing: "1px",
  },
  dialog_content: {
    paddingBottom: "50px",
  },
  selected: {
    backgroundColor: "#e0e0e0",
  },
})(HomeLayout);
