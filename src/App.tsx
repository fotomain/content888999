
// my8shop-v1-dictionary-sqlite

//=== new place
// npm install --save --legacy-peer-deps;
// ionic build --prod; ionic cap copy --prod; ionic serve

// ionic cap add android; ionic build --prod; ionic cap copy --prod

// ionic build --prod; ionic cap copy --prod; ionic serve

// ionic build --prod; ionic cap copy --prod; ionic serve --browser=chrome --browserOption "/new-window"

//=== do this the first time fot def br-r
//=== ionic serve -f safari

//capacitor comunity sqlite why database from assets is not save updates

// ionic build --prod; ionic cap copy --prod; ionic serve --browser=firefox

// ionic build --prod; ionic cap copy --prod; ionic serve

import { Redirect, Route } from 'react-router-dom';
import {Capacitor} from "@capacitor/core";

//=== npm install @capacitor/device
//=== DOC https://ionicframework.com/docs/native/device
// import { Device } from '@capacitor/device';


//npm i react-redux
//npm i redux-saga
import { connect } from 'react-redux';
import './App.css';

import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    setupIonicReact,
    isPlatform,
    IonFab,
    IonFabButton,
    IonFabList,
    IonText,
    IonRow,
    IonItemDivider,
    IonCol,
    IonContent,
    IonChip,
    IonButton
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {
    add,
    addCircle,
    ellipse,
    list,
    logoWhatsapp,
    settings,
    shareSocial,
    snow,
    square,
    triangle
} from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

// mysettigs +
import { SQLiteHook, useSQLite } from 'react-sqlite-hook';

// npm add react-redux
// npm add redux-saga
// mysettigs -


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import React, {useEffect, useRef, useState} from "react";
import {log} from "util";
import {
    function_AT_DISPLAY_ACTION,
    function_AT_SQLITE_DB_OPEN_START,

} from "./state_redux/actions_functions";
import {IS_LOADING} from "./state_redux/actions_types";
import Tab4 from "./pages/Tab4";
import uuid_v1 from "./code_global/uuid_v1";
import global_names from "./code_global/global_names";
import Tab5 from "./pages/Tab5";

// mysettigs +
interface JsonListenerInterface {
  jsonListeners: boolean,
  setJsonListeners: React.Dispatch<React.SetStateAction<boolean>>,
}
interface existingConnInterface {
  existConn: boolean,
  setExistConn: React.Dispatch<React.SetStateAction<boolean>>,
}

// Singleton SQLite Hook
export let sqlite_api: SQLiteHook;
export let sqlite_api_global: SQLiteHook;
// Existing Connections Store
export let existingConn: existingConnInterface;
// Is Json Listeners used
export let isJsonListeners: JsonListenerInterface;
// mysettigs -



setupIonicReact();


const App: React.FC = (props:any) => {


  //mysettigs +
  const message = useRef("");
  const [isModal,setIsModal] = useState(false);

  const onProgressImport = async (progress: string) => {
    if(isJsonListeners.jsonListeners) {
      if(!isModal) setIsModal(true);
      message.current = message.current.concat(`${progress}\n`);
    }
  }
  const onProgressExport = async (progress: string) => {
    if(isJsonListeners.jsonListeners) {
      if(!isModal) setIsModal(true);
      message.current = message.current.concat(`${progress}\n`);
    }
  }

  // !!!!! if you do not want to use the progress events !!!!!
  // since react-sqlite-hook 2.1.0
  // sqlite = useSQLite()
  // before
  // sqlite = useSQLite({})
  // !!!!!                                               !!!!!

  // sqlite_api = useSQLite({
  //   onProgressImport,
  //   onProgressExport
  // })

  sqlite_api_global = useSQLite({
    onProgressImport,
    onProgressExport
  })

  // Sqlite_initdb(sqlite_api_global).catch(() => window.alert("=== sqlite_initdb ERROR INITIALIZING"));
  // ooo.Sqlite_initdb(sqlite_api_global).catch(() => window.alert("=== sqlite_initdb ERROR INITIALIZING"));

  // console.log("=== sqlite_api_global")
  // console.log(sqlite_api_global)
  //mysettigs -



    useEffect(() => {

    // function fLoad1() {

        console.log("=== uuid1 ", uuid_v1(null,null,null))

        props.function_AT_SQLITE_DB_OPEN_START({

            sqlite_api_global:sqlite_api_global,
            database_name:global_names.db_work

        })

      console.log("=== fLoad1")

      console.log("=== isPlatform ", isPlatform)
      //
      //=== npm i cordova-plugin-unique-device-id2
      // const  os1 =require('os').networkInterfaces()
      // console.log("=== os1 ",os1)


    // }
    // document.addEventListener("deviceready", fLoad1);

  },[])
    //=== DOC align https://ionicframework.com/docs/layout/css-utilities
    //=== APP COLORS https://ionicframework.com/docs/theming/themes#stepped-colors
    //=== STEP steped https://ionicframework.com/docs/theming/themes#stepped-colors

  const tPlatform   = Capacitor.getPlatform()

  const app_theme1 = {

      //=== TEXT
      "--ion-text-color": 'black',
      "--ion-text-color-rgb": '255,255,255',
      "--ion-item-color": '255,255,255',
      "--ion-item-background": '#000000',

      "--ion-card-background": 'white',
      //=== TEXT
      "--ion-card-color": 'green',

      //rgba(55,52,52,0.16)

      //=== GLOBAL
      "--ion-color-primary": '#6200ea',
      //=== GLOBAL BACKGROUND
      "--ion-background-color": 'rgba(55,52,52,0.11)',
      //=== GLOBAL TOOLBAR PANEL
      "--ion-toolbar-background": 'white',
      //=== GLOBAL TABBAR PANEL
      "--ion-tab-bar-background": 'rgba(98,0,234,0.19)', // FULL PANEL
      "--ion-tab-bar-color-selected": '#6200ea', // ACTIVE
      "--ion-tab-bar-color": 'rgba(98,0,234,0.4)', // NOT ACTIVE
      //--ion-tab-bar-color:'green';



      "--ion-color-primary-rgb": '195, 231, 255',
      "--ion-color-primary-contrast": '#000000',
      "--ion-color-primary-contrast-rgb": '0,0,0',
      "--ion-color-primary-shade": '#5600ce',
      "--ion-color-primary-tint": '#721aec',

      "--ion-color-secondary": '#9fa8da',
      "--ion-color-secondary-rgb": '159,168,218',
      "--ion-color-secondary-contrast": '#000000',
      "--ion-color-secondary-contrast-rgb": '0,0,0',
      "--ion-color-secondary-shade": '#8c94c0',
      "--ion-color-secondary-tint": '#a9b1de',

      "--ion-color-tertiary": '#e1bee7',
      "--ion-color-tertiary-rgb": '225,190,231',
      "--ion-color-tertiary-contrast": '#000000',
      "--ion-color-tertiary-contrast-rgb": '0,0,0',
      "--ion-color-tertiary-shade": '#c6a7cb',
      "--ion-color-tertiary-tint": '#e4c5e9',

}


const app_theme2 = {

      //=== TEXT
      "--ion-text-color": '#011D35',
      "--ion-text-color-rgb": '255,255,255',
      "--ion-item-color": '255,255,255',
      "--ion-item-background": 'white', /*=== NOT DELETE background_main*/

      "--ion-card-background": 'white',

      //=== TEXT
      "--ion-card-color": '#373434',

      // "--ion-color-primary": '#C3E7FF',
      "--ion-color-primary": '#008080FF', //teal
      "--ion-color-primary-rgb": '0, 128, 128',
      "--ion-color-primary-contrast": '#ffffff',
      "--ion-color-primary-contrast-rgb": '255,255,255',
      "--ion-color-primary-shade": '#accbe0',
      "--ion-color-primary-tint": '#c9e9ff',

      "--ion-color-secondary": '#9fa8da',
      "--ion-color-secondary-rgb": '159,168,218',
      "--ion-color-secondary-contrast": '#721aec',
      "--ion-color-secondary-contrast-rgb": '0,0,0',
      "--ion-color-secondary-shade": '#8c94c0',
      "--ion-color-secondary-tint": '#a9b1de',

        "--ion-color-light": '#f4f5f8',
        "--ion-color-light-rgb": '244,245,248',
        "--ion-color-light-contrast": '#721aec',
        "--ion-color-light-contrast-rgb": '114,26,236',
        "--ion-color-light-shade": '#d7d8da',
        "--ion-color-light-tint": '#f5f6f9',

}

    const open_form_reg_lexemas_crud_create = (ev:any) => {

        console.log("=== open_form_reg_lexemas_crud_create")
        props.function_AT_DISPLAY_ACTION(
            [
                {key: 'mode_open_form_reg_lexemas_crud_create', value: true},
            ]
        )
    }
    const reg_lexemas_add_button_on_click = (ev:any) => {
        console.log("=== reg_lexemas_add_button_on_click")
        open_form_reg_lexemas_crud_create(ev)
    }

return(
  <IonApp style={("web"===tPlatform)?app_theme2:app_theme2} >
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/tab1">
            <Tab1/>
          </Route>
          <Route exact path="/tab2">
            <Tab2/>
          </Route>
          <Route path="/tab3">
            <Tab3/>
          </Route>
          <Route path="/tab4">
            <Tab4/>
          </Route>
          <Route path="/tab5">
            <Tab5/>
          </Route>
          <Route exact path="/">
            <Redirect to="/tab1"/>
          </Route>
        </IonRouterOutlet>


        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            {/*mysettigs + */}

            {/*mysettigs - */}
            <IonIcon icon={triangle}/>
            <IonLabel>Tab 1</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={ellipse}/>
            <IonLabel>Tab 2</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={square}/>
            <IonLabel>Tab 3</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab4" href="/tab4">
            <IonIcon icon={settings}/>
            <IonLabel>Tab 4</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab5" href="/tab5">
            <IonIcon icon={snow}/>
            <IonLabel>Tab 5</IonLabel>
          </IonTabButton>
        </IonTabBar>

      </IonTabs>

        <IonFab slot={'fixed'} horizontal={'end'} vertical={'bottom'}>

            <IonFabButton className={'fab_main_class'} color={'primary'} size={'small'} type={'button'} translucent={true}
                          onClick={(e)=>{
                              console.log("=== IonFabButton")}
                          }
            >
                <IonIcon className={'fab_main_icon_class'} icon={add}></IonIcon>
            </IonFabButton>
            <IonFabList  color={'primary'} side={'top'}>
                <IonCol className={'fab_list_main_class'}>

                    <IonRow className={'fab_list_main_row_class'}

                    >
                        <IonCol className={'col1'} size={'small'} color={'secondary'}>
                            <IonText color={'primary'} className={'txt1'}>
                                Share list
                            </IonText>
                        </IonCol>
                        <IonCol className={'col2'} color={'secondary'}>

                                <IonIcon className={'fab_list_main_row_icon_class'} icon={shareSocial} />

                        </IonCol>
                    </IonRow>

                    <IonRow id="reg_lexemas_add_button" className={'fab_list_main_row_class'}
                            onClick={(e)=>{
                                console.log("===  reg_lexemas_add_button ")
                                reg_lexemas_add_button_on_click(e)
                            }}
                    >
                        <IonCol className={'col1'} size={'small'} color={'secondary'}>
                            <IonText color={'primary'} className={'txt1'}>
                                Add Lexema
                            </IonText>
                        </IonCol>
                        <IonCol className={'col2'}  color={'secondary'}>

                                <IonIcon className={'fab_list_main_row_icon_class'} icon={list} />

                        </IonCol>
                    </IonRow>

                </IonCol>
            </IonFabList>

        </IonFab>

    </IonReactRouter>
  </IonApp>
)

};


const ReadFromState_mapStateToProps = (state:any) =>
{

   console.log("=== ReadFromState_mapStateToProps")
   console.log(state)

      let ret1 = {
        work_List1_data:    state.sqlite.work_List1_data,
        work_List1_ready:   state.sqlite.work_List1_ready,
        work_sqlile_database:  state.sqlite.work_sqlile_database,
      }

    return ret1
  }

const WriteToState_mapDispatchToProps = {
  function_AT_SQLITE_DB_OPEN_START:function_AT_SQLITE_DB_OPEN_START,
    function_AT_DISPLAY_ACTION:function_AT_DISPLAY_ACTION,
}

export default connect(ReadFromState_mapStateToProps, WriteToState_mapDispatchToProps)(App);
