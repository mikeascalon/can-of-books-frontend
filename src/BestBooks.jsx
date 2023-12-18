import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import UpdateBook from './UpdateBookModal.jsx';

const SERVER = import.meta.env.VITE_SERVER_URL;

function BestBooks(props) {
  

  useEffect(() => {
    const apiUrl = `${SERVER}/books`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('Books fetched successfully:', data);
        props.setBooks(data);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
      });
  }, []);


  function renderBooksCarousel() {
    console.log(props.books);
    return (
      <>
        <Carousel fade style={{ height: '200px' }}>
          {props.books.map((book) => (
            <Carousel.Item key={book._id}>
              <h3>{book.title}</h3>
              <p>{book.description}</p>
              <p>Status: {book.status}</p>
            </Carousel.Item>
          ))}
        </Carousel>
{props.show && (<UpdateBook setBooks={props.setBooks} show={props.show} books={props.books}/>)}
      </>
    );
  }

  return (
    <>
      <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
      {props.books.length ? (
        <>
          <div>
            {props.books.map((book) => (
              <h3 key={book._id}>
                {book.title}
                <button onClick={() => props.handleDelete(book._id)}>Delete</button>
                <button onClick={() => props.onUpdate(book)}>Update</button>
                
             
              </h3>
            ))}
          </div>
          {props.show && (
            <UpdateBook
              setBooks={props.setBooks}
              show={props.show}
              bookToUpdate={props.bookToUpdate}
            />
          )}
          {renderBooksCarousel()}
        </>
      ) : (
        <h4>No Books Found :</h4>
      )}
    </>
  );
}

export default BestBooks;
