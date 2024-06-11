import React from 'react';

const BookCard = ({ book, addToBookshelf }) => {
  return (
    <div className="book-card">
      <h2>{book.title}</h2>
      <p>Edition Count: {book.edition_count}</p>
      <button onClick={() => addToBookshelf(book)}>Add to Bookshelf</button>
    </div>
  );
};

export default BookCard;
