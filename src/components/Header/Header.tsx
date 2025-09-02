import { AppBar, Switch, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { DARK_THEME_CLASS } from '../../constants';
import { styled } from '@mui/material/styles';
import { Search } from '../Search/Search';

const SwitchTheme = styled(Switch)({
    width: 50,
    height: '2rem',
    padding: 0,
    '& .MuiSwitch-switchBase': {
        margin: 0,
        padding: '0.35rem',
        '&.Mui-checked': {
            transform: 'translateX(22px)',
            '& + .MuiSwitch-track': {
                background: 'transparent',
                boxShadow:
                    'inset -4px 0px 3px rgb(255 255 255 / 5%), inset 4px 0px 3px rgb(0 0 0 / 30%)',
                opacity: 1,
            },
            '& .MuiSwitch-thumb': {
                backgroundImage: 'url(./src/assets/icons/moon.svg)',
            },
        },
    },
    '& .MuiSwitch-track': {
        background: 'transparent',
        boxShadow:
            'inset -4px 0px 3px rgb(0 0 0 / 30%), inset 4px 0px 3px rgb(255 255 255 / 5%)',
        borderRadius: '1rem',
        opacity: 1,
    },
    '& .MuiSwitch-thumb': {
        backgroundImage: 'url(./src/assets/icons/sun.svg)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        borderRadius: 0,
        width: '1.3rem',
        height: '1.3rem',
    },
    '&:hover': {
        '& .MuiSwitch-thumb': {
            backgroundImage: 'url(./src/assets/icons/sun--hover.svg)',
        },
        '& .Mui-checked': {
            '& .MuiSwitch-thumb': {
                backgroundImage:
                    'url(./src/assets/icons/moon--hover.svg)',
            },
        },
        '& .MuiSwitch-track': {
            background: 'linear-gradient(270deg, #1B229D, #2D38FF)',
        },
        '& .Mui-checked + .MuiSwitch-track': {
            background: 'linear-gradient(90deg, #ACA31D, #F6E729)',
        },
    },
});

export function Header() {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        if (isDark) {
            document.body.classList.add(DARK_THEME_CLASS);
        } else {
            document.body.classList.remove(DARK_THEME_CLASS);
        }
    }, [isDark]);

    return (
        <AppBar
            sx={{
                backgroundImage:
                    'linear-gradient(90deg, #041e19, #02110e)',
                color: '#ccc9f8',
            }}
        >
            <Toolbar sx={{ gap: '10px' }}>
                <Typography
                    variant="h6"
                    component="span"
                    align="left"
                    sx={{ flexGrow: 1 }}
                >
                    Список задач
                </Typography>
                <Search />
                <SwitchTheme
                    disableRipple
                    checked={isDark}
                    onChange={() => {
                        setIsDark((isDark) => !isDark);
                    }}
                ></SwitchTheme>
            </Toolbar>
        </AppBar>
    );
}
