import { createContext, type ReactNode } from 'react';
import { useToDo, type UseToDoReturn } from './hooks/useToDo';
import { useToDoFromAPI } from './hooks/useToDoFromAPI';

export const ToDoContext = createContext<UseToDoReturn>(
    {} as UseToDoReturn
);

type Props = {
    children: ReactNode;
};

export const ToDoProvider = ({ children }: Props) => {
    const { createToDo, editToDo, deleteToDo, toDoList } =
        useToDoFromAPI();

    return (
        <ToDoContext.Provider
            value={{ createToDo, editToDo, deleteToDo, toDoList }}
        >
            {children}
        </ToDoContext.Provider>
    );
};
