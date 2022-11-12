
import {
    AT_DISPLAY_ACTION,
    AT_SQLITE_DB_OPEN_START,
    AT_SQLITE_MAIN_DATA_READ_START
} from './actions_types';

export const function_AT_DISPLAY_ACTION = (p_params:any) => ({

    type    : AT_DISPLAY_ACTION,
    p_data  : {p_data_items:p_params},

})

export const function_AT_SQLITE_MAIN_DATA_READ_START = (params:any) => ({
    type: AT_SQLITE_MAIN_DATA_READ_START,
    status: 'STARTED',
    params_to_exec:params
});

export const function_AT_SQLITE_DB_OPEN_START = (params:any) => ({
    type: AT_SQLITE_DB_OPEN_START,
    status: 'STARTED',
    params_to_exec:params
                        // {database_name:'dic1_mw'}
});

