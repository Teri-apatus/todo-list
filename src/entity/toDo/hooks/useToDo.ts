import { useEffect, useState } from 'react';
import type { EditingTodo, ToDo } from '../type';
import { localStorageService } from '../../../utils/localStorage';
import { DEFAULT_TASK_LIST } from '../../../constants';

export type UseToDoReturn = {
    createToDo: (header: string) => void;
    editToDo: (toDoTask: EditingTodo) => void;
    deleteToDo: (id: number) => void;
    toDoList: ToDo[];
};

export function useToDo(): UseToDoReturn {
    const [toDoList, setToDoList] = useState<ToDo[]>(
        getTodoListSavedInLS
    );

    useEffect(() => {
        localStorageService.set(JSON.stringify(toDoList));
    }, [toDoList]);

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

const getTodoListSavedInLS = (): ToDo[] => {
    const dataFromLS = localStorageService.get();
    if (dataFromLS && dataFromLS !== '[]') {
        try {
            return JSON.parse(dataFromLS);
        } catch (e) {
            console.log('error', e);
        }
    }
    return DEFAULT_TASK_LIST;
};
