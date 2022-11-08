
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//mysettigs +
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { defineCustomElements as jeepSqlite, applyPolyfills, JSX as LocalJSX  } from "jeep-sqlite/loader";
import { HTMLAttributes } from 'react';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

// mysettigs +
// npm i react-redux
import { Provider } from 'react-redux';
import configureStore from './state_redux/store';
const store = configureStore({  });
// mysettigs -

type StencilToReact<T> = {
    [P in keyof T]?: T[P] & Omit<HTMLAttributes<Element>, 'className'> & {
    class?: string;
};
} ;

declare global {
    export namespace JSX {
        interface IntrinsicElements extends StencilToReact<LocalJSX.IntrinsicElements> {
        }
    }
}

applyPolyfills().then(() => {
    jeepSqlite(window);
});
//mysettigs -

//mysettigs +
//window.addEventListener('DOMContentLoaded', async () => {


window.addEventListener('DOMContentLoaded', async () => {

    const platform = Capacitor.getPlatform();
    const sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite)
    // alert('=== platform === ' + platform.toString())
    if(platform === "web") {
        const jeepEl = document.createElement("jeep-sqlite");
        document.body.appendChild(jeepEl);
        await customElements.whenDefined('jeep-sqlite');
        await sqlite.initWebStore();
    }
    const ret = await sqlite.checkConnectionsConsistency();
    const isConn = (await sqlite.isConnection("db_issue99")).result;
    var db: SQLiteDBConnection
    try {
        if (ret.result && isConn) {
            db = await sqlite.retrieveConnection("db_issue99");
            console.log("=== db retrieveConnection ",db)
        } else {
            db = await sqlite.createConnection("db_issue99", false, "no-encryption", 1);
            console.log("=== db createConnection ",db)
        }

        await db.open();
        //PRIMARY KEY NOT NULL
        //NOT NULL
        let query = `
            CREATE TABLE IF NOT EXISTS test (
              id INTEGER ,
              name TEXT 
        );
        `


        let query2 = `
            SELECT * FROM test
        `

        const res: any = await db.execute(query).then(res=> async () => {


        })

                const doInsertUpdateTest=false
                if (doInsertUpdateTest)
                {
                    // console.log(55555555)
                    //=== UPDATE INSERT AND SAVE DATA TEST
                    //=== INSERT INTO test (id,name) VALUES (11111,'2222222')
                    let query1 = `
                    INSERT INTO test (id,name) VALUES (11111,'2222222')
                    `
                    const res1: any = await db.execute(query1);
                    alert("=== res1 === "+JSON.stringify(res1))
                    console.log(`=== sqlite test result 1 : ${JSON.stringify(res1)}`);

                }
        const res2: any = await db.query(query2);
        // alert("=== res2 === "+JSON.stringify(res2))

        console.log(`=== sqlite test result 2 : ${JSON.stringify(res2)}`);

        await db.close();
        await sqlite.closeConnection("db_issue99");

        //mysettigs -

        ReactDOM.render(
            <React.StrictMode>
                <Provider store={store}>
                    <App />
                </Provider>
            </React.StrictMode>,
            document.getElementById('root')
        );

        //mysettigs +

        // If you want your app to work offline and load faster, you can change
        // unregister() to register() below. Note this comes with some pitfalls.
        // Learn more about service workers: https://bit.ly/CRA-PWA
        serviceWorkerRegistration.unregister();
        // If you want to start measuring performance in your app, pass a function
        // to log results (for example: reportWebVitals(console.log))
        // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
        reportWebVitals();

    } catch (err) {
        console.log(`Error: ${err}`);
        throw new Error(`Error: ${err}`)
    }

});
//mysettigs -



