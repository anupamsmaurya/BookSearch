import { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BookList from './components/book-list';
import SearchInput from './components/search-input/search-input';

class App extends Component {
  render() {
    return (
      <>
        <SearchInput />
        <Router>
          <Switch>
            <Route exact path="/" component={BookList} />
            <BookList />
          </Switch>
        </Router>

      </>
    );
  }
}

export default App;
