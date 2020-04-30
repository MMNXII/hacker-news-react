import React, { div, Fragment, useState } from 'react';
import './App.css';

const App = () => {
  const [state, setState] = useState('yes');
  const toggle = () => {
    state === 'yes' ? setState('no') : setState('yes');
  };

  const greeting = 'hello';

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

  return (
    <div>
      <Search />
      <hr />

      <List stories={stories} />
      <p>{state}</p>
      <Greeting greeting={greeting} state={state} />
      <Button onClick={toggle} />
    </div>
  );
};

const Greeting = ({ greeting, state }) =>
  state === 'yes' ? <h1>{greeting}</h1> : null;

const Button = ({ onClick }) => (
  <button onClick={onClick} type='button'>
    Click
  </button>
);

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

const Search = () => {
  return (
    <Fragment>
      <h1>My Hacker Stories</h1>

      <label htmlFor='search'>Search:</label>
      <input id='search' type='text' maxLength='10' onChange={handleChange} />
    </Fragment>
  );
};

const handleChange = (event) => {
  const value = event.target.value;
  console.log(value);
};

export default App;
