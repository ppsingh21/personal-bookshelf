import React, { useState, useEffect } from 'react';

const Bookshelf = () => {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    setBookshelf(JSON.parse(localStorage.getItem('bookshelf')) || []);
  }, []);

  return (
    <div>
      <h1>My Bookshelf</h1>
      <div className="bookshelf-list">
        {bookshelf.map((book, index) => (
          <div key={index} className="book-card">
            <h2>{book.title}</h2>
            <p>Edition Count: {book.edition_count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookshelf;
