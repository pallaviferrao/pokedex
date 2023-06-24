import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Card from "./Card.jsx";
import "./index.css";
let pokemonMoves = [];
let personScore = 0;
let compScore = 0;
const FILMS_QUERY = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      results {
        name
        image
      }
    }
  }
`;

const Pokedex = () => {
  const [cardPerson, setCardPerson] = useState([]);
  const [compCard, setCompCard] = useState({});
  const [winState, setWinState] = useState("");
  const { data, loading, error } = useQuery(FILMS_QUERY, {
    variables: {
      limit: 100,
    },
  });
  let movesList = [
    "fire",
    "punch",
    "water",
    "sing",
    "electricity",
    "hypnotise",
  ];
  useEffect(() => {
    if (data) {
      pokemonMoves = data.pokemons.results.reduce((agg, pokemon, ind) => {
        let poke = {
          image: pokemon.image,
          pokename: pokemon.name,
          moves: movesList[ind % movesList.length],
          power: Math.floor(Math.random() * 100),
        };
        agg = [...agg, poke];
        return agg;
      }, []);
      choosePokemons(pokemonMoves);
    }
  }, [data]);
  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  const choosePokemons = (pokemonMoves) => {
    let chooseRandom = [];
    let abc = [];
    for (let i = 0; i < 5; i++) {
      console.log(pokemonMoves);
      chooseRandom[i] = Math.floor(Math.random() * 100);
      abc[i] = pokemonMoves[chooseRandom[i]];
    }
    setCardPerson(abc);
  };

  const handleShowCard = () => {
    if (Object.keys(compCard).length === 0 && cardPerson.length > 0) {
      let rand = Math.floor(Math.random() * 100);
      let card = pokemonMoves[rand];
      setCompCard(card);
    }
  };

  const handleClickCard = (ind) => {
    let power = cardPerson[ind].power;
    let compPower = compCard.power;
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
      chooseWinner(personScore, compScore);
    }
    setCardPerson(arr);
  };

  const chooseWinner = (personScore, compScore) => {
    if (personScore > compScore) {
      setWinState("YOU WON!!!!");
    } else if (personScore < compScore) {
      setWinState("You Lost!");
    } else {
      setWinState("It's a draw");
    }
  };
  const doNothing = () => {};
  return (
    <div className="pokeGame">
      <h1 className="pokeGameName">Poke Dex Game</h1>
      <p>
        Person Score {personScore} / Computer Score {compScore}
      </p>
      <p>Click on show card for Computer to play it's game</p>
      <h4>{winState}</h4>
      <div className="deck">
        <div className="deckGame">
          {compCard && compCard.image && (
            <Card
              image={compCard.image}
              name={compCard.pokename}
              move={compCard.moves}
              ind={-1}
              power={compCard.power}
              onClick={() => {
                doNothing();
              }}
            ></Card>
          )}
        </div>
      </div>
      <div className="deck">
        {cardPerson.length > 0 &&
          cardPerson.map((pokemon, ind) => {
            return (
              <div class="deckGame">
                {
                  <Card
                    image={pokemon.image}
                    name={pokemon.pokename}
                    move={pokemon.moves}
                    power={pokemon.power}
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

      <div>
        <button
          className="showCard"
          onClick={() => {
            handleShowCard();
          }}
        >
          Show Card
        </button>
      </div>
      <button
        className="showCard"
        onClick={() => {
          window.location.reload(false);
        }}
      >
        Play Again
      </button>
    </div>
  );
};
export default Pokedex;
