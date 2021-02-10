import './App.css';
import React,{useEffect, useState} from 'react';
import Recipe from './Recipe';

const App = () =>{

  const APP_ID = "05472913";
  const APP_KEY = "862f878ff3962f7be2886273cf750a76";

  const [recipes,setRecipes] = useState([]);
  const [search,setSearch] = useState('');
  const [query,setQuery] = useState('chicken');

  const exampleReq = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  useEffect(()=>{
    getRecipe();
  },[query]);

  const getRecipe = async () =>{
    const response = await fetch(exampleReq);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = ev =>{
    setSearch(ev.target.value);
  };

  const getSearch = ev =>{
    ev.preventDefault();
    setQuery(search);
    setSearch('');  
  };

  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" input={search} onChange={updateSearch}/>
        <button className="search-btn" type="submit">Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients}/>
      ))}
      </div>
    </div>
  );
}



export default App;
