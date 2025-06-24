import { useState } from 'react';

type FormProps = {
    toDoList: string[];
    setToDoList: (func: (toDoList: string[]) => string[]) => void;
};

export function Form(props: FormProps) {
    const [inputValue, setInputValue] = useState('');

    return (
        <form>
            {/* проверить на onSubmit */}
            <input
                value={inputValue}
                onChange={(event) => {
                    setInputValue(event.target.value);
                }}
            ></input>
            <button
                onClick={(event) => {
                    event.preventDefault();
                    props.setToDoList((toDoList) => {
                        return [...toDoList, inputValue];
                    });
                }}
            >
                Добавить
            </button>
        </form>
    );
}
