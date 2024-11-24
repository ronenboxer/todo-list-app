import { useContext } from "react";
import { TodosContext } from "../store/todos-context";

export function useTodos() {
    return useContext( TodosContext );
}