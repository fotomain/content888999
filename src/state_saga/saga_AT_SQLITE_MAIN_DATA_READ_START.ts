
//=== DOC SLP1 https://en.wikipedia.org/wiki/SLP1
//=== DOC ITRANS https://en.wikipedia.org/wiki/ITRANS
//=== DOC Original WORKS https://www.sanskrit-lexicon.uni-koeln.de/scans/MWScan/2020/web/webtc/indexcaller.php
//aham
//ahaM
//ahaMD

import { put, fork, takeLatest, call } from 'redux-saga/effects';
//npm install to-single-quotes

import {DATA_main_type1} from '../types'

import {
    AT_SQLITE_MAIN_DATA_READ_START, IS_LOADING,
} from '../state_redux/actions_types';

const thisFile = "FILE_saga_AT_SQLITE_MAIN_DATA_READ_START"

type retObject_type = {
    ret_data:DATA_main_type1[],
    ret_code:string,
    error_message:string,
}


const gl_duplicate_quotes = (p_str:string) => {

    var tArr:string[] = p_str.split('')
    tArr = tArr.map((el:any)=>{
        if(el!=="'") { return el }
        else        { return  "''" }
    })
    return tArr.join('')

}

const asyncLocal_Storage = {
    setItem: function (key:string, value:string) {
        return Promise.resolve().then(function () {
            localStorage.setItem(key, value);
        });
    },
    getItem: function (key:string) {
        return Promise.resolve().then(function () {
            return localStorage.getItem(key);
        });
    }
};

const to_do_function = async(action_to_exec:any) => {

    var params = {
        action_to_exec: action_to_exec,
        what_read: 'no'
    }

    console.log("=== params.action_to_exec ", params.action_to_exec)
    var database1           = params.action_to_exec.action.params_to_exec.database_to_exec
    var sqlite_api_global1  = params.action_to_exec.action.params_to_exec.sqlite_api_global_to_exec
    var search_string1  = params.action_to_exec.action.params_to_exec.search_string
    console.log("=== database1 ", database1)

    if(IS_LOADING===database1){
        console.log("=== return - Just not enougth time to Load ")
        return { ret_code:'ERROR' , error_message:'Just not enougth time to Load: IS_LOADING == database1' }
    }

    var retObject = {ret_code: 'ERROR'}

                        const data = (Date.now()).toString();
                        asyncLocal_Storage.setItem('key_to_do_function_' + thisFile, data).then(function () {
                            return asyncLocal_Storage.getItem('mykey');
                        }).then(function (value) {
                            console.log('=== Value has been set to:', value);
                        });

                        console.log('=== waiting for value to become ' + data +
                            '. Current value: ', localStorage.getItem('mykey'));



    // // query to get all of the contacts from database
    // console.log("=== start   database1.query ")
    // await database1.open()

    console.log("=== database1", database1)


    //=== DOC https://stackoverflow.com/questions/28803520/does-sqlite3-have-prepared-statements-in-node-js
    //=== 3 WAYS
    // // Directly in the function arguments.
    //     db.run("UPDATE tbl SET name = ? WHERE id = ?", "bar", 2);
    //
    // // As an array.
    //     db.run("UPDATE tbl SET name = ? WHERE id = ?", [ "bar", 2 ]);
    //
    // // As an object with named parameters.
    //     db.run("UPDATE tbl SET name = $name WHERE id = $id", {
    //         $id: 2,
    //         $name: "bar"
    //    });

    // var search_string_to_sql = ''
    // if(search_string1 && search_string1!==''){
    //     search_string_to_sql = " WHERE key LIKE $par1 "
    // }
    //
    // db.execute('INSERT INTO MyTable(ID, Name) VALUES(?, ?)', 123, name);
    // var t_querry = "SELECT * FROM mw " + search_string_to_sql + " LIMIT 100 "
    // console.log("=== t_querry ", t_querry)

    //=== DOC https://stackoverflow.com/questions/34303706/binding-variables-to-sql-statements-using-node-sqlite3
    //=== DOC https://www.npmjs.com/package/to-single-quotes

    // search_string1 = "am%"

    try {

        //new main data -> STEP 6 !!! query from SQLite

        var f_pre_sql = await database1.query( "PRAGMA case_sensitive_like = 1" )

        var tSQL = "" +
            "SELECT * FROM content_types "

        var tRES= await database1.query( tSQL )

        console.log("=== tRES.values",tRES.values)


    search_string1 = gl_duplicate_quotes(search_string1)

    console.log("=== search_string1", search_string1)

    // var search_string_to_sql:string = "'%" + search_string1 + "%'"
    var search_string_to_sql:string = "'" + search_string1 + "%'"
    var search_string_to_sql_data:string = "'%" + search_string1 + "%'"

    var tSQLfinal = "" +
                        "SELECT quote(key) AS key_in_quotes, * FROM mw "


    //===  PROBLEM SQLite LIKE is already case-insensitiv
    //     SELECT quote(key) AS key_in_quotes, * FROM mw WHERE
    //
    //     SUBSTRING(key,1,1) = SUBSTRING('am',1,1)
    //     AND
    //     SUBSTRING(key,2,1) = SUBSTRING('am',2,1)
    //
    //     ORDER BY key ASC LIMIT 50
    if (search_string1!==""){
        tSQLfinal = tSQLfinal +
                        "WHERE "
                        +"  key     LIKE "+ search_string_to_sql+" "
                        // +"  COLLATE NOCASE "
                        // +"  OR  data    LIKE "+ search_string_to_sql_data
                        // +"  COLLATE NOCASE
    }


        tSQLfinal = tSQLfinal +" ORDER BY key ASC LIMIT 50 "

        // console.log("=== database1 ", database1)
        // alert("=== database1 " + database1)

        // var tSQLfinal =
        //     "SELECT * FROM mw LIMIT 10"

        // alert("=== tSQLfinal " + tSQLfinal)
        console.log("=== tSQLfinal ", tSQLfinal)

            //===
        var f_pre_sql = await database1.query( "PRAGMA case_sensitive_like = 1" )
            //===
        console.log("=== f_pre_sql ", f_pre_sql)
            //===alert("=== f_pre_sql ___ " + JSON.stringify(f_pre_sql))


        // ==========================
        // var isOk = localStorage.getItem("is")

            //===
            var f_querry1_res = await database1.query( tSQLfinal )
            //===
            // alert("=== f_querry1_res ___ " + JSON.stringify(f_querry1_res))

            console.log("=== f_querry1_res ", f_querry1_res)
            console.log("=== f_querry1_res ", f_querry1_res.values.length)
            console.log("=== f_querry1_res ", f_querry1_res.values)

    var arrToMap = f_querry1_res.values;
    var tDATA_main: DATA_main_type1[] = []

    arrToMap.map((v2: any) => {
        // console.log("=== arrToMap ",v2)
        var tBody = v2;
        // JSON.parse((JSON.stringify(v2)))
        tBody = tBody.data.match(/<body>(.*?)<\/body>/g).toString()
        //https://stackoverflow.com/questions/63437464/whats-the-fastest-way-to-remove-a-string-from-the-beginning-of-another-string-i
        tBody = tBody.replace('<body>', '')
        tBody = tBody.replace('</body>', '')
        var tGender = tBody.match(/<lex>(.*?)<\/lex>/g)
        var tGenderString =''

        if( null!=tGender ) {
            for (let kk = 0; kk < tGender.length ; kk++) {
                tBody = tBody.replace(tGender[kk], '')
                var tt = tGender[kk].replace('<lex>', '')
                tt = tt.replace('</lex>', '');
                tGenderString = tGenderString + tt
            }
        }
        if( tGenderString ==='' ) {
            tGenderString ='-'
        }
        // console.log("=== tGender",tGender)

        var tLexemForSpellingString =''
        var tLexemForSpelling = tBody.match(/<s>(.*?)<\/s>/g)

        if( null!=tLexemForSpelling ) {
            // tLexemForSpellingString = tLexemForSpelling[0]
            for (let kk = 0; kk < tLexemForSpelling.length ; kk++) {
                tBody = tBody.replace(tLexemForSpelling[kk], '')
                var tt = tLexemForSpelling[kk].replace('<s>', '')
                tt = tt.replace('</s>', '');
                tLexemForSpellingString = tLexemForSpellingString + tt
            }
        }
        tLexemForSpellingString = tLexemForSpellingString.replace('/','')


        tDATA_main.push({
            id: JSON.parse((JSON.stringify(v2))).lnum.toString(),
            title: JSON.parse((JSON.stringify(v2))).key.toString(),
            detail: tBody,
            gender: tGenderString,
            spelling: tLexemForSpellingString,
            page: JSON.parse((JSON.stringify(v2))).data.match(/<body>(.*?)<\/body>/g).toString(),
        });
    })

    var ret_filnal = {
        ret_data: tDATA_main,
        ret_code:  "OK"
    }

    // alert("=== to_do_function ret_filnal " + JSON.stringify(ret_filnal))
    // console.log("=== to_do_function ret_filnal ", ret_filnal)

    return ret_filnal
    }catch (e) {
        window.alert("=== ERROR 101 error_message:e " + e )
        return {ret_code:"ERROR", error_message:e}
    }

}

export function* exec_function(action:any) {

    console.log( "=== exec_function " + thisFile)
    try{
        //=== DOC https://vhudyma-blog.eu/yield-expression-implicitly-results-in-an-any-type-because-its-containing-generator-lacks-a-return-type-annotation/
        const response:retObject_type = yield call(to_do_function,{ action })
        console.log("=== response yield call " + thisFile)
        console.log(response)

        if (response.ret_code=="ERROR") { return }

        const actionToPut              = action

                actionToPut.type               = action.type.replace("_START", "_SUCCESS")
                // actionToPut.data_to_state      = '=== action.data_to_state = ' + Date.now().toString();
                actionToPut.ret_data_to_state  = response.ret_data;
                actionToPut.status             = 'SUCCESS'

                console.log("=== actionToPut ", actionToPut)
                // alert("=== actionToPut " + JSON.stringify(actionToPut))

            yield put(
                actionToPut
            );
    }
    catch (e) {
        console.error("=== ERROR exec_function "+thisFile,e)
    }

}


export function* watch_function(params:any) {

    console.log( "=== watch_function " + thisFile)
    console.log(params)

    yield  (takeLatest(AT_SQLITE_MAIN_DATA_READ_START, exec_function));

}

export default function* () {

    console.log(" ")
    console.log(" ")
    console.log(" ")

    console.log( "=== saga_function " + thisFile)
    // console.log( action )

    // SAGA CALL - RUN WATCHER
    yield call(watch_function, {p_params:'here params_of_watchF_CALL_SAGA3'})

}
