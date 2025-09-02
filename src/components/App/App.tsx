import { useContext, useMemo } from 'react';
import './App.scss';
import { ToDoItem } from '../ToDoItem/ToDoItem';
import { Form } from '../Form/Form';
import React from 'react';
import type { ToDoTask } from '../../entity/toDo';
import { Header } from '../Header/Header';
import { ToDoContext } from '../../entity/toDo/toDoContext';
import { SearchContext } from '../../entity/toDo/searchContext';
import { Toolbar } from '@mui/material';

function textFilterFunc(task: ToDoTask, searchText: string): boolean {
    if (searchText) {
        return task.text.includes(searchText);
    }

    return true;
}

function App() {
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
        <React.Fragment>
            <Header />
            <Toolbar />
            <main className="app-main">
                <Form />
                <ul className="todo-list">
                    {renderingToDoList.map((task) => (
                        <ToDoItem key={task.id} task={task} />
                    ))}
                </ul>
            </main>
        </React.Fragment>
    );
}

export default App;
