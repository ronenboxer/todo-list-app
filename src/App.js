import { useEffect, useReducer } from 'react';
import './assets/scss/main.scss';
import { HomePage } from './pages/home-page';
import { ItemsDetailsPage } from './pages/item-details-page';
import { ItemsEditPage } from './pages/item-edit-page';
import { ThemeProvider } from '@elementor/ui/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SET_TODOS, todosReducer } from './store/todos-reducer';
import { TodosContext } from './store/todos-context';
import { TodoService } from './services/todo.service';


function App() {
  const [ todos, dispatch ] = useReducer( todosReducer ,null );

  useEffect( () => {
    TodoService
      .getItems()
      .then( ( todos ) => {
        dispatch( { type: SET_TODOS, payload: todos } );
      } );
  }, [] );

  return (
    <TodosContext.Provider value={ { todos, dispatch } }>
      <ThemeProvider colorScheme="auto">
        <Router>
          <Routes>
            <Route path="/item/:id/edit" element={ <ItemsEditPage /> }/>
            <Route path="/item/:id" element={ <ItemsDetailsPage /> }/>
            <Route path="/" element={ <HomePage /> }/>
          </Routes>
        </Router>
      </ThemeProvider>
    </TodosContext.Provider>
  );
}

export default App;
