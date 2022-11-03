import {put, fork, select, takeEvery, takeLatest, call} from 'redux-saga/effects';

import {retDatabase_type1} from '../types'

import {
    AT_SQLITE_DB_OPEN_START,
} from '../state_redux/actions_types';
import global_names from "../code_global/global_names";

const thisFile = "FILE_saga_AT_SQLITE_DB_OPEN_START"


const getDatabaseState = (state: any) => state.work_sqlile_database;

const to_do_function = async (action_to_exec: any) => {
    try {

        console.log('=== to_do_function ' + thisFile, action_to_exec.action.params_to_exec);
        console.log('=== action_to_exec.param_to_exec.sqlite_api_global ', action_to_exec.action.params_to_exec.sqlite_api_global);

        var retDatabase: retDatabase_type1 = {ret_database: '', ret_sqlite_api_global:'', ret_code: 'ERROR'}

        const monent = (Date.now()).toString();

        var handle_sqlite = action_to_exec.action.params_to_exec.sqlite_api_global;

        const ret_isDatabase = await handle_sqlite.isDatabase(global_names.db_work).then((res_isDatabase:any)=>{
            // alert("=== res_isDatabase "+JSON.stringify(res_isDatabase))
            return res_isDatabase.result
        })
        if (!ret_isDatabase) {
            alert("=== copyFromAssets ")
            await handle_sqlite.copyFromAssets();
            console.log('=== handle_sqlite.copyFromAssets ' + thisFile);
        }
            // alert("=== go after copyFromAssets")

                var t_Database = await handle_sqlite.createConnection(global_names.db_work);
                await t_Database.open()

                    console.log('=== t_Database ' + thisFile, t_Database);
                    retDatabase.ret_database = t_Database;
                    retDatabase.ret_sqlite_api_global = handle_sqlite;
                    retDatabase.ret_code = "OK"
                    return retDatabase;

    }
    catch (e) {
        alert("=== ERROR to_do_function "+thisFile + e)
        console.error("=== ERROR to_do_function "+thisFile,e)
    }

}

export function* exec_function(action: any) {

    console.log("=== exec_function " + thisFile)

    try {

         const work_sqlile_database:object = yield select(getDatabaseState);

            console.log("=== work_sqlile_database " +thisFile)
            console.log(work_sqlile_database)

         console.log("=== yield select database ", work_sqlile_database)
         if (!work_sqlile_database) {
            const response: retDatabase_type1 = yield call(to_do_function, {action})
            console.log("=== response yield call " + thisFile)
            console.log(response)

            const actionToPut = action

            actionToPut.type = action.type.replace("_START", "_SUCCESS")
            actionToPut.ret_database = response.ret_database;
            actionToPut.ret_sqlite_api_global = response.ret_sqlite_api_global;
            actionToPut.status = 'SUCCESS';

            yield put(
                actionToPut
            );

        } else {
            console.warn('=== work_sqlile_database already open, ignoring open request.');
        }

    } catch (e) {
        // yield put(setDatabaseError(error));
        console.error("=== ERROR exec_function "+thisFile,e)
    }

}


export function* watch_function(params: any) {

    console.log("=== watch_function " + thisFile)
    console.log(params)

    yield  (takeLatest(AT_SQLITE_DB_OPEN_START, exec_function));

}

export default function* () {

    console.log(" ")
    console.log(" ")
    console.log(" ")

    console.log("=== saga_function " + thisFile)
    // console.log( action )

    // SAGA CALL - RUN WATCHER
    yield call(watch_function, {p_params: 'here params_of_watchF_CALL_SAGA3'})

}
