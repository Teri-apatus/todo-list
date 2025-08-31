import { useContext, useState } from 'react';
import './Form.scss';
import { ToDoContext } from '../../entity/toDo/toDoContext';
import { IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';

export function Form() {
    const { createToDo } = useContext(ToDoContext);
    const [inputValue, setInputValue] = useState('');

    const onAddTaskButtonClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();
        const text = inputValue.trim();
        if (text) {
            createToDo(text);
            setInputValue('');
        }
    };

    const onInputKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const text = inputValue.trim();
            if (text) {
                createToDo(text);
                setInputValue('');
            }
        }
    };

    return (
        <form className="add-task-form">
            <input
                className="add-task-form__input"
                value={inputValue}
                placeholder="Добавить задачу"
                onChange={(event) => {
                    setInputValue(event.target.value);
                }}
                onKeyDown={onInputKeyDown}
            ></input>
            <IconButton
                className="add-task-form__button"
                type="button"
                onClick={onAddTaskButtonClick}
            >
                <Add />
            </IconButton>
        </form>
    );
}
