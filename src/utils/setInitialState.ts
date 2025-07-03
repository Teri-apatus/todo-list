import { DEFAULT_TASK_LIST } from '../constants';
import { localStorageService } from './localStorage';

export const setInitialState = () => {
    const dataFromLS = localStorageService.get();
    if (dataFromLS && dataFromLS !== '[]') {
        try {
            return JSON.parse(dataFromLS);
        } catch (e) {
            console.log('error', e);
        }
    }
    return DEFAULT_TASK_LIST;
};
