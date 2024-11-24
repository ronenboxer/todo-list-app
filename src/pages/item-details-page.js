import { Box } from '@elementor/ui';
import { Link } from 'react-router-dom';
import { useTodo } from '../hooks/use-todo';

export function ItemsDetailsPage() {
    const todo = useTodo();

    return ( todo
        ? <Box>
            <h1>{ todo.description }</h1>
            <h2>{ todo.description }</h2>
            <p>Created at: { todo.description }</p>
            { todo.description
                ? <p>Updated at: { todo.description }</p>
                : null
            }
            <Link to={ `/item/${ todo.id }` }>Edit</Link>
        </Box>
        : <h1>404</h1>
    );
}