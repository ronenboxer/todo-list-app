import { Button, FilledInput, FormControl, FormLabel, TableCell, TableRow } from "@elementor/ui";
import { useState } from "react";
import { TodoService } from "../services/todo.service";
import { makeId } from "../services/utils.service";
import { useTodos } from "../hooks/use-todos";
import { DELETE_TODO, SET_TODOS } from "../store/todos-reducer";

export function NewItem( { columns } ) {
    const { todos, dispatch } = useTodos();
    const [ newTodo, setNewTodo ] = useState( TodoService.newItem() );

    function saveNewItem() {
        dispatch( { type: SET_TODOS, payload: [ ...todos, newTodo ] } );

        TodoService
            .addItem( newTodo )
            .then( ( item ) => {
                if ( ! item ) {
                    console.error( 'Error saving item' );
                    setNewTodo( newTodo );
                }
            } );

        clearNewItem();
    }

    function clearNewItem() {
        setNewTodo( TodoService.newItem() );
    }

    function getComponent( key ) {
        switch ( key ) {
            case 'index':
                return 'New Item';

                case 'title':
                    return ( <FormControl>
                    <FilledInput size="small" value={ newTodo.title } onChange={ ( { target } ) => setNewTodo( { ...newTodo, title: target.value } ) } />
                </FormControl> );

            case 'description':
                return ( <FormControl>
                    <FilledInput size="small" value={ newTodo.description } onChange={ ( { target } ) => setNewTodo( { ...newTodo, description: target.value } ) } />
                </FormControl> );

            case 'actions':
                return (
                    <>
                        <Button onClick={ saveNewItem }  disabled={ ! newTodo.title?.trim() }>Save</Button>
                        <Button
                            onClick={ clearNewItem }
                            disabled={ ! newTodo.title?.trim() && ! newTodo.description?.trim() }
                        >Clear</Button>
                    </>
                );
        }

        return null;
    }

    return (
        <TableRow>
            { columns.map( ( column, index ) => (
                <TableCell key={ column.key }>
                    { getComponent( column.key ) }
                </TableCell>
            ) ) }
        </TableRow>
    );
}