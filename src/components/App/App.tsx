import './App.scss';
import { Form } from '../Form/Form';
import React from 'react';
import { Header } from '../Header/Header';
import { Toolbar } from '@mui/material';
import { ToDoList } from '../ToDoList/ToDoList';

function App() {
    return (
        <React.Fragment>
            <Header />
            <Toolbar />
            <main className="app-main">
                <Form />
                <ToDoList />
            </main>
        </React.Fragment>
    );
}

export default App;
