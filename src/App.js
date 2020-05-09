import React, { div, useState } from 'react';
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
      objectID: 3,
    },
  ];

  const [searchTerm, setSearchTerm] = useState('React');

  const handleSearch = (event) => setSearchTerm(event.target.value);

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />

      <Search search={searchTerm} onSearch={handleSearch} />

      <hr />

      <List stories={searchedStories} />
    </div>
  );
};

const Header = () => (
  <HeadingDiv>
    <Heading>My Hacker Stories</Heading>
  </HeadingDiv>
);

const Search = ({ onSearch, search }) => {
  return (
    <div>
      <label htmlFor='search'>Search: </label>
      <input value={search} id='search' type='text' onChange={onSearch} />
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

///////Styles///////
const HeadingDiv = styled.div`
  background-color: #cbc1de;
`;
const Heading = styled.h1`
  text-align: center;
  color: #31234a;
  font-size: 3em;
`;

export default App;
