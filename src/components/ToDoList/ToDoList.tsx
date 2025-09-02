import { useContext, useMemo } from 'react';
import { SearchContext } from '../../entity/toDo/searchContext';
import { ToDoContext } from '../../entity/toDo/toDoContext';
import type { ToDoTask } from '../../entity/toDo';
import { ToDoItem } from './ToDoItem';
import './ToDoList.scss';

function textFilterFunc(task: ToDoTask, searchText: string): boolean {
    if (searchText) {
        return (
            task.header.toLowerCase().includes(searchText) ||
            task.text.toLowerCase().includes(searchText)
        );
    }

    return true;
}

export function ToDoList() {
    const { inputValue } = useContext(SearchContext);
    const { toDoList } = useContext(ToDoContext);

    const renderingToDoList = useMemo(() => {
        return toDoList.filter((task) => {
            const isPassTextFilter =
                inputValue == ''
                    ? true
                    : textFilterFunc(task, inputValue);

            return isPassTextFilter;
        });
    }, [toDoList, inputValue]);

    return (
        <ul className="todo-list">
            {renderingToDoList.map((task) => (
                <ToDoItem key={task.id} task={task} />
            ))}
        </ul>
    );
}
