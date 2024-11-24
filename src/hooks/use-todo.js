import { useParams } from "react-router-dom";
import { useTodos } from "./use-todos";

export function useTodo() {
    const router = useParams();
    const { todos } = useTodos();

    return router?.id
        ? todos.find( ( { id } ) => id === router.id )
        : null;
}