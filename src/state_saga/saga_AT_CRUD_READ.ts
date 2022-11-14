import {put, fork, select, takeEvery, takeLatest, call} from 'redux-saga/effects';

import {retDatabase_type1} from '../types'

import {
    AT_CRUD_READ, IS_LOADING,
} from '../state_redux/actions_types';
import global_names from "../code_global/global_names";

const thisFile = "FILE_saga_AT_CRUD_READ"

const getDatabaseState = (state: any) => state.work_sqlile_database;

const to_do_function = async (action_to_exec: any) => {
    try {

        console.log('=== to_do_function ' + thisFile );
        console.log('=== action_to_exec ', action_to_exec );

        var database1  = action_to_exec.action.params_to_exec.database_to_exec

        if(IS_LOADING==database1){ return }

        var f_pre_sql = await database1.query( "PRAGMA case_sensitive_like = 1" )

        var tSQL = "" +
            "SELECT * FROM content_types "

        var tRES= await database1.query( tSQL )

        console.log("=== tRES.values",tRES.values)

        return tRES


    }
    catch (e) {
        alert("=== ERROR to_do_function "+thisFile + e)
        console.error("=== ERROR to_do_function "+thisFile,e)
    }

}

export function* exec_function(action: any) {

    console.log("=== exec_function " + thisFile)

    try {

            const response:any[] = yield call(to_do_function, {action})
            console.log("=== response yield call " + thisFile)
            console.log(response)

            const actionToPut = action

            // actionToPut.type = action.type.replace("_START", "_SUCCESS")
            // actionToPut.ret_database = response.ret_database;
            // actionToPut.ret_sqlite_api_global = response.ret_sqlite_api_global;
            // actionToPut.status = 'SUCCESS';
            //
            // yield put(
            //     actionToPut
            // );

    } catch (e) {
        // yield put(setDatabaseError(error));
        console.error("=== ERROR exec_function "+thisFile,e)
    }

}

export function* watch_function(params: any) {

    console.log("=== watch_function " + thisFile)
    console.log(params)

    yield  (takeLatest(AT_CRUD_READ, exec_function));

}

export default function* () {

    console.log(" ")
    console.log(" ")
    console.log(" ")

    console.log("=== saga_function " + thisFile)
    // console.log( action )

    // SAGA CALL - RUN WATCHER
    yield call(watch_function, {p_params: 'here params_of_watch'+thisFile})

}
