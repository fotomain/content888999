import {
    IS_LOADING,
    AT_SQLITE_MAIN_DATA_READ_START,
    AT_SQLITE_MAIN_DATA_READ_SUCCESS, AT_SQLITE_DB_OPEN_SUCCESS, AT_SQLITE_DB_OPEN_START,

} from '../state_redux/actions_types';

import {initialState} from '../state_redux/initial_state';
import {interface_state} from "../code_global/global_var";

const thisFile = "FILE_sqite_reducer_crud"

export default (state = initialState, action:any) => {
    const debug1 = 0;
    console.log(" ")
    console.log(" ")
    console.log(" ")
    console.log("=== REDUCER "+ thisFile + Date.now())


    var initVal=0;
    var tState : interface_state = {}
    console.log( "=== state sqite_crud_reducer ", state)
    Object.entries( state ).reduce((ind:any, el)=>{

            if(-1==["1","2","3","4","5","6","7","8","9","0"].indexOf(el[0].toString().substring(0,1))){
                // console.log("=== ret1 " + cEl[0] )
                // console.log("=== crud el state  ", el)

                if(-1==[
                    "work_sqlile_database",
                    "work_sqlite_api_global",
                    "work_List1_data",
                    "work_List1_ready",
                ].indexOf(el[0])){
                    //contunue
                }else {
                    tState[el[0]] = el[1]
                }
            }
        },
        initVal
    )

    console.log("=== tState ", tState)


    if(AT_SQLITE_DB_OPEN_START == action.type ) {

        // console.log("=== action START ",action)

        const ret = {
            ...tState,
            ['work_sqlile_database']: IS_LOADING,
            ['work_sqlite_api_global']: action.params_to_exec.sqlite_api_global,
        }

        return ret;
    }

    if(AT_SQLITE_DB_OPEN_SUCCESS == action.type ) {
        console.log("=== if AT_SQLITE_DB_OPEN_SUCCESS ", action)
        const ret = {
            ...tState,
            ['work_sqlile_database']: action.ret_database,

        }

        return ret;
    }

    if(AT_SQLITE_MAIN_DATA_READ_START == action.type ) {
        const ret = {
            ...tState,
            ['work_List1_data']: IS_LOADING,
            ['work_List1_ready']: false,
        }

        return ret;
    }

    if(AT_SQLITE_MAIN_DATA_READ_SUCCESS == action.type ) {

        // console.log("=== if AT_SQLITE_MAIN_DATA_READ_SUCCESS ", action)
        // alert("=== if AT_SQLITE_MAIN_DATA_READ_SUCCESS action.ret_data_to_state " + JSON.stringify(action.ret_data_to_state))
        const ret = {
            ...tState,
            ['work_List1_data']:    action.ret_data_to_state,
            ['work_List1_ready']:   true,
        }
        return ret;
    }

    return state;
}
