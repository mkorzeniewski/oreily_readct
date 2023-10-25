import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

function App() {
  const [word, setWord] = useState('');

  const [photo, setPhoto] = useState('');

  function handleSearchSubmit(e) {
    e.preventDefault();
    console.log(word);
    fetch(
      `https://api.unsplash.com/photos/random/?query=${word}&client_id=${UNSPLASH_KEY}`,
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPhoto(data.urls.regular);
        setWord('');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="App">
      <Header title="Images Gallery" />
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit} />
      <div>
        <img src={photo} alt="Italian Trulli"></img>
      </div>
    </div>
  );
}

export default App;
