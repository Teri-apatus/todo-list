import { useState } from 'react';
import type { ToDoTask } from '../ToDoItem/ToDoItem';

type FormProps = {
    setToDoList: React.Dispatch<React.SetStateAction<ToDoTask[]>>;
};

export function Form({ setToDoList }: FormProps) {
    const [inputValue, setInputValue] = useState('');

    const onAddTaskButtonClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();
        const newTask = {
            id: Date.now(),
            text: inputValue,
        };
        setToDoList((toDoList) => {
            return [...toDoList, newTask];
        });
    };

    return (
        <form>
            <input
                value={inputValue}
                onChange={(event) => {
                    setInputValue(event.target.value);
                }}
            ></input>
            <button onClick={onAddTaskButtonClick}>Добавить</button>
        </form>
    );
}
