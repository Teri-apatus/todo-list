import { useContext, useLayoutEffect, useRef, useState } from 'react';
import './ToDoItem.scss';
import type { ToDoTask } from '../../../entity/toDo';
import { ToDoContext } from '../../../entity/toDo/toDoContext';
import { Checkbox, IconButton } from '@mui/material';
import {
    Cancel,
    CheckCircle,
    CircleOutlined,
    DeleteForever,
    Edit,
    TaskAltOutlined,
} from '@mui/icons-material';
import styled from '@emotion/styled';

const TaskCheckbox = styled(Checkbox)({
    '&:hover': {
        backgroundColor: 'transparent',
    },
    '& .MuiSvgIcon-root': {
        color: '#F6F1D5',
        backgroundImage:
            'radial-gradient(circle, #F6F1D566 50%, transparent 50%)',
    },
    '&:hover .MuiSvgIcon-root': {
        color: 'var(--danger-color)',
        backgroundImage:
            'radial-gradient(circle, #93032e66 50%, transparent 50%)',
    },
    '&.Mui-checked .MuiSvgIcon-root': {
        color: 'var(--check-color)',
        backgroundImage: 'none',
    },
});

const EditButton = styled(IconButton)({
    '&:hover .MuiSvgIcon-root': { color: 'var(--edit-color)' },
    '&[disabled]': {
        color: 'var(--disabled-color)',
    },
});

const UpdateButton = styled(IconButton)({
    '&:hover .MuiSvgIcon-root': {
        color: 'var(--save-color)',
    },
});

const CancelButton = styled(IconButton)({
    '&:hover .MuiSvgIcon-root': { color: 'var(--cancel-color)' },
});

const DeleteButton = styled(IconButton)({
    '&:hover .MuiSvgIcon-root': { color: 'var(--delete-color)' },
});

type ToDoItemProps = {
    task: ToDoTask;
};

export function ToDoItem({ task }: ToDoItemProps) {
    const { editToDo, deleteToDo } = useContext(ToDoContext);
    const [isEditMode, setIsEditMode] = useState(false);
    const [headerValue, setHeaderValue] = useState(task.header);
    const [textValue, setTextValue] = useState(task.text);
    const itemNodeRef = useRef<HTMLLIElement | null>(null);
    const [isShowExpandButton, setIsShowExpandButton] =
        useState(false);
    useLayoutEffect(() => {
        console.log('useEffect');
        if (!itemNodeRef.current) return;
        itemNodeRef.current.classList.add('todo-item--expanded');
        const expandedHeight =
            itemNodeRef.current.getBoundingClientRect().height;
        itemNodeRef.current.classList.remove('todo-item--expanded');
        const normalHeight =
            itemNodeRef.current.getBoundingClientRect().height;
        if (normalHeight !== expandedHeight) {
            setIsShowExpandButton(true);
        }
    }, []);

    const onItemClick = () => {
        if (!itemNodeRef.current) return;
        itemNodeRef.current.classList.toggle('todo-item--expanded');
    };

    return (
        <li
            ref={itemNodeRef}
            className={`todo-item${
                task.isDone ? ' todo-item--completed' : ''
            }`}
        >
            <TaskCheckbox
                className="todo-item__button todo-item__button-check"
                disableRipple
                disabled={isEditMode}
                checked={task.isDone}
                onChange={() => {
                    editToDo({
                        header: task.header,
                        id: task.id,
                        isDone: !task.isDone,
                    });
                }}
                icon={<CircleOutlined />}
                checkedIcon={<TaskAltOutlined />}
            />
            <div className="todo-item__content">
                {isEditMode ? (
                    <>
                        <textarea
                            className="todo-item__input todo-item__input-header"
                            value={headerValue}
                            onChange={(e) => {
                                setHeaderValue(e.target.value);
                            }}
                            rows={1}
                        />
                        <textarea
                            className="todo-item__input todo-item__input-text"
                            value={textValue}
                            onChange={(e) => {
                                setTextValue(e.target.value);
                            }}
                            rows={4}
                        />
                    </>
                ) : (
                    <>
                        <h2 className="todo-item__header">
                            {headerValue}
                        </h2>
                        <pre className="todo-item__text">
                            {textValue}
                        </pre>
                    </>
                )}
            </div>

            <div className="todo-item__button-container">
                {isEditMode ? (
                    <>
                        <UpdateButton
                            className="todo-item__button todo-item__button-update"
                            disableRipple
                            onClick={() => {
                                editToDo({
                                    header: headerValue,
                                    id: task.id,
                                    text: textValue,
                                });
                                setIsEditMode(
                                    (isEditMode) => !isEditMode
                                );
                            }}
                        >
                            <CheckCircle />
                        </UpdateButton>{' '}
                        <CancelButton
                            className="todo-item__button todo-item__button-cancel"
                            disableRipple
                            onClick={() => {
                                setIsEditMode(
                                    (isEditMode) => !isEditMode
                                );
                                setHeaderValue(task.header);
                                setTextValue(task.text);
                            }}
                        >
                            <Cancel />
                        </CancelButton>
                    </>
                ) : (
                    <EditButton
                        className="todo-item__button todo-item__button-edit"
                        disabled={task.isDone}
                        disableRipple
                        onClick={() => {
                            setIsEditMode(
                                (isEditMode) => !isEditMode
                            );
                        }}
                    >
                        <Edit />
                    </EditButton>
                )}
                <DeleteButton
                    className="todo-item__button todo-item__button-delete"
                    disableRipple
                    onClick={() => {
                        deleteToDo(task.id);
                    }}
                >
                    <DeleteForever />
                </DeleteButton>
            </div>
            {isShowExpandButton && (
                <button
                    className="todo-item__button todo-item__button-expand"
                    onClick={onItemClick}
                ></button>
            )}
        </li>
    );
}
