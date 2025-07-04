class LocalStorageService {
    private key: string;

    constructor(key: string) {
        this.key = key;
    }

    get() {
        return localStorage.getItem(this.key);
    }

    set(value: string) {
        localStorage.setItem(this.key, value);
    }
}

export const localStorageService = new LocalStorageService(
    'toDoList'
);
