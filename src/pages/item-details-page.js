import { Box } from "@elementor/ui";
import { Link, useParams } from "react-router-dom";
import { useTodo } from "../hooks/use-todo";

export function ItemsDetailsPage() {
    const todo = useTodo();

    return ( todo
        ? <Box>
            <h1>{ todo.title }</h1>
            <h2>{ todo.description }</h2>
            <p>Created at: { new Date( todo.createdAt ).toLocaleString() }</p>
            { todo.updatedAt
                ? <p>Updated at: { new Date( todo.updatedAt ).toLocaleString() }</p>
                : null
            }
            <Link to={ `/item/${ todo.id }/edit` }>Edit</Link>
        </Box>
        : <h1>404</h1>
    );
}