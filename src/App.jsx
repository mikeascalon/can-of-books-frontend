import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { useState, useEffect } from 'react';
import About from './About.jsx'



const SERVER = import.meta.env.VITE_SERVER_URL

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks(title = null) {
    let apiUrl = `${SERVER}/books`;

    if (title) {
      apiUrl += `?title=${title}`;
    }


    try {
      const response = await axios.get(apiUrl);
      setBooks(response.data);

    } catch (error) {
      console.error(error);
    }
  }

  function handleTitleSubmit(event) {
    event.preventDefault();
    const title = event.target.title.value;
    fetchBooks(title);
  }


  return (
    <>
      <Router>
        <nav>
          <h1>Can of Books</h1>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
        <Header />
        <Routes>
          <Route exact path="/" element={
            <div>
              <BestBooks books={books} />
              <h2>Filter by Title</h2>
              <form onSubmit={handleTitleSubmit}>
                <input name="title" />
                <button>ok</button>
              </form>

            </div>
          } />
          <Route path="/about" element={About()
            
          } />
        </Routes>
        <Footer />
      </Router >
    </>
  );

}

export default App;
