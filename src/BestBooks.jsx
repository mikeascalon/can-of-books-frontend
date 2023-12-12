import React from 'react';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }


  /* TODO: Make a GET request to your API to fetch all the books from the database  */

  render() {
   fetch('/books')
      .then(response => response.json())
      .then(data => {
        console.log('Books fetched successfully:', data);
        // Update the state with the fetched books
        this.setState({ books: data });
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
    /* TODO: render all the books in a Carousel */


    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <p>Book Carousel coming soon</p>
        ) : (
          <h3>No Books Found :</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
