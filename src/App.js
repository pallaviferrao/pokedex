import logo from "./logo.svg";
import "./App.css";
import Pokedex from "./Pokedex.jsx";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
const client = new ApolloClient({
  uri: "https://graphql-pokeapi.vercel.app/api/graphql",
  cache: new InMemoryCache(),
});
function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Pokedex />
      </ApolloProvider>
    </div>
  );
}

export default App;
