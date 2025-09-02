import { IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import styled from '@emotion/styled';
import { useContext } from 'react';
import { SearchContext } from '../../entity/toDo/searchContext';

const SearchTextField = styled(TextField)({
    height: '2em',
    width: '12em',
    boxShadow:
        'inset 4px 4px 12px rgb(0 0 0 / 50%), inset -4px -4px 12px rgb(255 255 255 / 10%)',
    borderRadius: '1rem',

    '& input[type="search"]::-webkit-search-cancel-button': {
        display: 'none',
    },
    '& input[type="search"]::-ms-clear': {
        display: 'none',
        width: 0,
        height: 0,
    },

    '& .MuiInputBase-root': {
        height: 'inherit',
        borderRadius: '1rem',

        '& fieldset': {
            borderColor: 'gray',
        },
        '& .MuiSvgIcon-root': {
            height: '0.8em',
            width: '0.8em',
            fill: 'gray',
            transition: 'none',
        },
        '& .MuiInputBase-input': {
            fontSize: '0.875rem',
        },
    },
    '& .MuiButtonBase-root': {
        padding: 0,
    },
    '&:hover': {
        '& .MuiInputBase-root fieldset': {
            borderColor: 'white',
        },
        '& .MuiSvgIcon-root': {
            fill: 'white',
        },
    },
    '& .Mui-focused': {
        '&.MuiInputBase-root fieldset': {
            borderWidth: 1,
        },
    },
});

export function Search() {
    const { inputValue, setInputValue } = useContext(SearchContext);

    return (
        <SearchTextField
            placeholder="Поиск"
            variant="outlined"
            type="search"
            value={inputValue}
            onChange={(e) => {
                setInputValue(e.target.value);
            }}
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    endAdornment: inputValue ? (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setInputValue('')}
                            >
                                <CloseIcon
                                    style={{ color: 'white' }}
                                />
                            </IconButton>
                        </InputAdornment>
                    ) : null,
                },
            }}
        />
    );
}
