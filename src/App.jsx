import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useState, useEffect } from 'react';


const SERVER = import.meta.env.VITE_SERVER_URL

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks(title = null) {
    let apiUrl = `${SERVER}/books`;


    try {
      const response = await axios.get(apiUrl);
      setBooks(response.data);

    } catch (error) {
      console.error(error);
    }
  }

  render();

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route
            exact path="/"
            element={<BestBooks books={books} />} />
        {/* PLACEHOLDER: add a route with a path of '/about' that renders the `About` component */}
      </Routes>
      <Footer />
    </Router >
      </>
    );

}

export default App;
