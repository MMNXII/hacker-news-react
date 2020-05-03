import React, { div, Fragment, useState } from 'react';
import './App.css';
import styled from 'styled-components';

const App = () => {
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <Search searchTerm={searchTerm} onChange={handleChange} />

      <hr />

      <List stories={stories} />
    </div>
  );
};

const List = ({ stories }) =>
  stories.map((item) => (
    <div key={item.objectID}>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
    </div>
  ));

const Search = ({ searchTerm, onChange }) => (
  <Fragment>
    <HeaderDiv>
      <Header>My Hacker Stories</Header>
    </HeaderDiv>

    <label htmlFor='search'>Search: </label>
    <input id='search' type='text' onChange={onChange} />

    <p>
      Searching for <strong>{searchTerm}</strong>.
    </p>
  </Fragment>
);

///////Styles///////
const Header = styled.h1`
  text-align: center;
  color: #31234a;
  font-size: 4em;
`;
const HeaderDiv = styled.div`
  background-color: #cbc1de;
`;

export default App;
