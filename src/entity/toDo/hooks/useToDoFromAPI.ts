import { useEffect, useState } from 'react';
import type { EditingTodo, ToDo } from '../type';
import { getToDos } from '../API';

export type UseToDoReturn = {
    createToDo: (header: string) => void;
    editToDo: (toDoTask: EditingTodo) => void;
    deleteToDo: (id: number) => void;
    toDoList: ToDo[];
};

export function useToDoFromAPI(): UseToDoReturn {
    const [toDoList, setToDoList] = useState<ToDo[]>([]);

    useEffect(() => {
        getToDos().then((toDoList) => setToDoList(toDoList));
    }, []);

    const createToDo = (header: string, text: string = '') => {
        const newToDo: ToDo = {
            id: Date.now(),
            header,
            text,
            isDone: false,
        };
        setToDoList((tasks) => {
            return [newToDo, ...tasks];
        });
    };

    const editToDo = (toDoTask: EditingTodo) => {
        setToDoList((tasks) => {
            const editedTasks: ToDo[] = tasks.map((task) => {
                if (task.id === toDoTask.id) {
                    return { ...task, ...toDoTask };
                }
                return task;
            });
            return editedTasks;
        });
    };

    const deleteToDo = (id: number) => {
        setToDoList((tasks) => {
            return tasks.filter((task) => task.id !== id);
        });
    };

    return {
        createToDo,
        editToDo,
        deleteToDo,
        toDoList,
    };
}
