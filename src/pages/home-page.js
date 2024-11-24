import { Box, Button } from "@elementor/ui";
import { ItemList } from "../components/item-list";
import { useTodos } from "../hooks/use-todos";
import { TodoService } from "../services/todo.service";
import { SET_TODOS } from "../store/todos-reducer";

export function HomePage() {
    const { dispatch } = useTodos();
    const { todos } = useTodos();

    function restoreDefault() {
        dispatch( { type: SET_TODOS, payload: null } );

        TodoService
            .restoreDefault()
            .then( ( todos ) => {
                dispatch( { type: 'SET_TODOS', payload: todos } );
            } )
    }

    function deleteAll() {
        todos.forEach( ( { id } ) => {
            TodoService.deleteItem( id ) ;
        } );

        dispatch( { type: SET_TODOS, payload: [] } );
    }

    return (
        <>
            <h1>Home Page - My todo list</h1>
            <Box>
                <Button onClick={ restoreDefault }>Restore default</Button>
                <Button onClick={ deleteAll }>Delete All</Button>
            </Box>
            {
                todos
                ? <ItemList items={ todos.map( ( _, index ) => ( { ..._, index } ) ) }/>
                : <h1>Loading...</h1>
            }
        </>
    )
}