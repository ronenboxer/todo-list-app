import { Box, Button, FilledInput, FormControl, FormGroup, FormLabel, Modal, Typography } from '@elementor/ui';
import { useTodo } from '../hooks/use-todo';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TodoService } from '../services/todo.service';
import { useTodos } from '../hooks/use-todos';
import { DELETE_TODO, SET_TODOS } from '../store/todos-reducer';

export function ItemsEditPage() {
    const todo = useTodo();
    const { todos, dispatch } = useTodos();
    const [ editedTodo, setEditedTodo ] = useState( { ...todo } );
    const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState( false );
    const navigate = useNavigate();

    useEffect( () => {
        if ( todo?.id && todo.id !== editedTodo.id ) {
            setEditedTodo( { ...todo } );
        }

        setIsDeleteModalOpen( false );
    }, [ todo ] );

    function onCloseModal( event, shouldDelete ) {
        event.preventDefault();

        if ( shouldDelete ) {
            TodoService.deleteItem( todo.id );
            dispatch( { type: DELETE_TODO, payload: todo.id } );
            navigate( '/' );
        }

        setIsDeleteModalOpen( false );
    }

    function saveTodo() {
        TodoService.editItem( { ...editedTodo, updatedAt: new Date() - 0 } );
        dispatch( { type: SET_TODOS, payload: todos.map( ( item ) => item.id === todo.id ? editedTodo : item ) } );
        navigate( '/' );
    }

    return ( todo
        ? <FormGroup sx={ {
            display: 'flex',
            flexDirection: 'column',
            width: '300px',
            gap: '24px',
        } }>
            <h1>Edit "{ todo.title }"</h1>
            <FormControl>
                <FormLabel sx={ { color: '#000' } }>
                    Title
                </FormLabel>
                <FilledInput value={ editedTodo.title } onChange={ ( { target } ) => setEditedTodo( { ...editedTodo, title: target.value } ) } />
            </FormControl>
            <FormControl>
                <FormLabel sx={ { color: '#000' } }>
                    Description
                </FormLabel>
                <FilledInput value={ editedTodo.description } onChange={ ( { target } ) => setEditedTodo( { ...editedTodo, description: target.value } ) } />
            </FormControl>

            <Button onClick={ saveTodo } disabled={ ! editedTodo.title?.trim() }>Save</Button>
            <Button onClick={ () => setIsDeleteModalOpen( true ) }>Delete</Button>
            <Button onClick={ () => navigate( '/' ) }>Cancel</Button>

            <Modal
				open={ isDeleteModalOpen }
			>
				<Box sx={ {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                } }>
					<Typography color={ 'primary' } variant="h6" component="h2">
						Are you sure you want to delete "{ todo.title }"?
					</Typography>
					<Button onClick={ ( ev ) => onCloseModal( ev, true ) }>Delete</Button>
					<Button onClick={ ( ev ) => onCloseModal( ev, false ) }>Cancel</Button>
				</Box>
			</Modal>
        </FormGroup>
        : <div>
            <h1>404</h1>
            <Button onClick={ () => navigate( "/" ) }>Go home</Button>
        </div>
    );
}