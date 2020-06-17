import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import styled from 'styled-components';

const initialStories = [
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

const getAsyncStories = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ data: { stories: initialStories } }), 2000)
  );

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getAsyncStories()
      .then((result) => {
        setStories(result.data.stories);
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
  }, []);

  const handleRemoveStory = (item) => {
    const newStories = stories.filter(
      (story) => item.objectID !== story.objectID
    );
    setStories(newStories);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />

      <InputWithLabel
        id='search'
        value={searchTerm}
        onInputChange={handleSearch}
        isFocused
      >
        <SearchText label='Search Stories: ' />
      </InputWithLabel>

      <hr />
      <Error isError={isError} />
      <Loading isLoading={isLoading}>
        <List stories={searchedStories} onRemoveItem={handleRemoveStory} />
      </Loading>
    </div>
  );
};

const Header = () => (
  <HeadingDiv>
    <Heading>My Hacker Stories</Heading>
  </HeadingDiv>
);

const SearchText = ({ label }) => (
  <>
    <b>{label}</b>
  </>
);

const InputWithLabel = ({
  type = 'text',
  id,
  value,
  onInputChange,
  isFocused,
  children,
}) => {
  const inputRef = useRef();

  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        ref={inputRef}
        type={type}
        value={value}
        id={id}
        onChange={onInputChange}
      />
    </>
  );
};

const List = ({ stories, onRemoveItem }) =>
  stories.map((item) => (
    <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
  ));

const Item = ({ item, onRemoveItem }) => (
  <div>
    <span>
      <a href={item.url}>{item.title} </a>
    </span>
    <span>{item.author} </span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
    <span>
      <Button type='button' onClick={() => onRemoveItem(item)}>
        Dismiss
      </Button>
    </span>
  </div>
);

const Error = ({ isError }) => {
  return isError && <p>Error!</p>;
};
const Loading = ({ isLoading, children }) => {
  return isLoading ? <LoadingTxt>Loading...</LoadingTxt> : children;
};

///////Styles///////

const Button = styled.button`
  padding: 5px;
  background-color: #cbc1de;
  margin-left: 1em;
  border-radius: 10px;
`;
const HeadingDiv = styled.div`
  background-color: #cbc1de;
`;
const Heading = styled.h1`
  font-family: helvetica;
  text-align: center;
  color: #31234a;
  font-size: 3em;
`;
const LoadingTxt = styled.h3`
  color: #31234a;
`;

export default App;
