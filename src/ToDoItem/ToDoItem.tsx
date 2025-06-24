import { useState } from 'react';

type ToDoItemProps = {
    index: number;
    toDoArrayItem: string;
    deleteToDo: (index: number) => void;
};

export function ToDoItem(props: ToDoItemProps) {
    const [isEditMode, setIsEditMode] = useState(false);
    const [inputValue, setInputValue] = useState(props.toDoArrayItem);
    const [isDone, setIsDone] = useState(false);

    return (
        <li className={isDone ? 'complited' : 'in-progress'}>
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
                    props.deleteToDo(props.index);
                }}
            >
                {'[X]'}
            </button>
        </li>
    );
}
