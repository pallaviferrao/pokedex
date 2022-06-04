import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Card from "./Card.jsx";
import "./index.css";
let pokemonMoves = [];
let personScore = 0;
let compScore = 0;
const FILMS_QUERY = gql`
  query ($game: String!) {
    allPokemon {
      name
      sprites {
        front_default
      }
      id
      abilities {
        id
        effect
      }
      moves(game: $game) {
        id
        name
        power
        effect
        damage_class
      }
    }
  }
`;
const Pokedex = () => {
  let youCards = [];
  const [cardPerson, setCardPerson] = useState([]);
  const [compCard, setCompCard] = useState({});
  const [winState, setWinState] = useState("");
  const { data, loading, error } = useQuery(FILMS_QUERY, {
    variables: {
      game: "red",
    },
  });
  //   useEffect(() => {
  //     let chooseThree = [];
  //     let abc = [];
  //     for (let i = 0; i < 5; i++) {
  //       chooseThree[i] = Math.floor(Math.random() * 1000);
  //       abc[i] = pokemonMoves[chooseThree[i]];
  //     }
  //     setCardPerson(abc);
  //   }, [pokemonMoves]);
  useEffect(() => {
    if (data) {
      pokemonMoves = data.allPokemon.reduce((agg, pokemon) => {
        if (pokemon.moves.length === 0) {
          return agg;
        }
        let moves = pokemon.moves.filter((poke) => {
          return (
            poke.power !== null &&
            poke.power !== undefined &&
            poke.power !== "undefined" &&
            typeof poke.power !== "undefined"
          );
        });
        moves.forEach((element) => {
          let poke = {
            image: pokemon.sprites.front_default,
            pokename: pokemon.name,
            moves: element,
          };
          agg = [...agg, poke];
        });
        return agg;
      }, []);
      let chooseThree = [];
      let abc = [];
      for (let i = 0; i < 5; i++) {
        chooseThree[i] = Math.floor(Math.random() * 2000);
        abc[i] = pokemonMoves[chooseThree[i]];
      }
      setCardPerson(abc);
    }
  }, [data]);
  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;
  const handleShowCard = () => {
    let rand = Math.floor(Math.random() * 2000);
    let card = pokemonMoves[rand];
    setCompCard(card);
  };
  const handleClickCard = (ind) => {
    let power = cardPerson[ind].moves.power;
    let compPower = compCard.moves.power;
    if (power > compPower) {
      personScore++;
    } else if (compPower > power) {
      compScore++;
    } else {
      personScore++;
      compScore++;
    }

    setCompCard({});
    let arr = [...cardPerson];

    arr.splice(ind, 1);
    if (arr.length === 0) {
      if (personScore > compScore) {
        setWinState("YOU WON!!!!");
      } else if (personScore > compScore) {
        setWinState("You Lost!");
      } else {
        setWinState("It's a draw");
      }
    }
    setCardPerson(arr);
  };
  const doNothing = () => {};
  return (
    <div className="pokeGame">
      <h1>Poke Dex Game</h1>
      <h4>Person Score {personScore}</h4>
      <h4>Computer Score {compScore}</h4>
      <h4>{winState}</h4>
      <div className="deck">
        {cardPerson.length > 0 &&
          cardPerson.map((pokemon, ind) => {
            return (
              <div>
                {
                  <Card
                    image={pokemon.image}
                    name={pokemon.pokename}
                    move={pokemon.moves.name}
                    power={pokemon.moves.power}
                    ind={ind}
                    onClick={() => {
                      handleClickCard(ind);
                    }}
                  ></Card>
                }
              </div>
            );
          })}
      </div>
      <div className="deck">
        {compCard && compCard.image && (
          <Card
            image={compCard.image}
            name={compCard.pokename}
            move={compCard.moves.name}
            ind={-1}
            power={compCard.moves.power}
            onClick={() => {
              doNothing();
            }}
          ></Card>
        )}
      </div>
      <div>
        <button
          className="deck"
          onClick={() => {
            handleShowCard();
          }}
        >
          Show Card
        </button>
      </div>
    </div>
  );
};
export default Pokedex;
