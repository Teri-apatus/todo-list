import { useState } from 'react';

export type ToDoTask = {
    id: number;
    text: string;
};

type ToDoItemProps = {
    task: ToDoTask;
    editToDo: (id: number, text: string) => void;
    deleteToDo: (id: number) => void;
};

export function ToDoItem({
    task,
    editToDo,
    deleteToDo,
}: ToDoItemProps) {
    const [isEditMode, setIsEditMode] = useState(false);
    const [inputValue, setInputValue] = useState(task.text);
    const [isDone, setIsDone] = useState(false);

    return (
        <li className={isDone ? 'completed' : 'in-progress'}>
            <input
                type="checkbox"
                onChange={() => {
                    setIsDone((isDone) => !isDone);
                }}
            ></input>
            <button
                onClick={() => {
                    setIsEditMode((isEditMode) => !isEditMode);
                }}
            >
                {'[+]'}
            </button>
            {isEditMode ? (
                <input
                    value={inputValue}
                    onChange={(event) => {
                        const newValue = event.target.value;
                        setInputValue(newValue);
                        editToDo(task.id, newValue);
                    }}
                />
            ) : (
                <span>{task.text}</span>
            )}{' '}
            <button
                onClick={() => {
                    deleteToDo(task.id);
                }}
            >
                {'[X]'}
            </button>
        </li>
    );
}
