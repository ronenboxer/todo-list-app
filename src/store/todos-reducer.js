export const SET_TODOS = 'SET_TODOS';
export const DELETE_TODO = 'DELETE_TODO';

export function todosReducer( todos, action ) {
    switch ( action.type ) {
        case SET_TODOS:
            return action.payload;

            case DELETE_TODO:
                return todos.filter( ( { id } ) => id !== action.payload );

        default:
            return todos;
    }
}