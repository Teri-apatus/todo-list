import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './components/App/App.tsx';
import { StrictMode } from 'react';
import { ToDoProvider } from './entity/toDo/toDoContext.tsx';
import { SearchProvider } from './entity/toDo/searchContext.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ToDoProvider>
            <SearchProvider>
                {' '}
                <App />
            </SearchProvider>
        </ToDoProvider>
    </StrictMode>
);
