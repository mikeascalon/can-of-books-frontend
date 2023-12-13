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
import AddBook from './BookFormModal.jsx'
import './App.css';



const SERVER = import.meta.env.VITE_SERVER_URL
const API_URL = `${SERVER}/books`;

function App() {
  const [books, setBooks] = useState([]);
  const [showAddBookModal, setShowAddBookModal] = useState(false);

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

  function handleAddBookSubmit(event) {
    event.preventDefault();
    const title = event.target.title.value;
    fetchBooks(title);
  }

  async function handleBookCreate(bookData) {
    const response = await axios.post(API_URL, bookData);
    const newBook = response.data;
    setBooks([...books, newBook]);

  }

  async function handleDelete(bookToDelete) {
    const url = `${API_URL}/${bookToDelete._id}`;

    try {
      await axios.delete(url);
      const filteredBooks = books.filter(book => book._id !== bookToDelete._id);
      setBooks(filteredBooks);
    } catch (error) {
      console.error(error);
    }
  }




  return (
    <>
      <Router>
        <nav>
          <h1>Can of Books</h1>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <button onClick={() => setShowAddBookModal(true)}>Add Book</button> {/* Open modal */}
        </nav>
        <Header />
        <Routes>
          <Route exact path="/" element={
            <div>
              <BestBooks books={books}
                onDelete={handleDelete} />
              <h2>Filter by Title</h2>
              <form onSubmit={handleTitleSubmit}>
                <input name="title" />
                <button>ok</button>
              </form>

            </div>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/create" element={
            <div>
              <AddBook onCreate={handleBookCreate} />
              <form onSubmit={handleAddBookSubmit}>
                <input name="title" />
                <button>ok</button>
              </form>
            </div>
          } />
        </Routes>
        <Footer />
        {showAddBookModal && ( // Display modal if showAddBookModal is true
          <AddBook
            onCreate={(bookData) => {
              handleBookCreate(bookData);
              setShowAddBookModal(false); // Close modal after creating book
            }}
          />
        )}
      </Router >
    </>
  );

}

export default App;
