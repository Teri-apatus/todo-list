import { createContext, useState, type ReactNode } from 'react';

type SearchContextType = {
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchContext = createContext<SearchContextType>(
    {} as SearchContextType
);

export const SearchProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [inputValue, setInputValue] = useState('');

    return (
        <SearchContext.Provider value={{ inputValue, setInputValue }}>
            {children}
        </SearchContext.Provider>
    );
};
