import { useState } from 'react';

export type ToDoTask = {
    id: number;
    text: string;
};

type ToDoItemProps = {
    task: ToDoTask;
    deleteToDo: (id: number) => void;
};

export function ToDoItem({ task, deleteToDo }: ToDoItemProps) {
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
                        setInputValue((inputValue) => {
                            inputValue = event.target.value;
                            return inputValue;
                        });
                    }}
                />
            ) : (
                <span>{inputValue}</span>
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
