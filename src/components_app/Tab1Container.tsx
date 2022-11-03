

//===WEB https://www.sanskrit-lexicon.uni-koeln.de/scans/MWScan/2020/web/webtc/indexcaller.php

import './Tab1Container.css';
//=== DOC
// https://stackoverflow.com/questions/62699840/ionic-react-trying-to-implement-a-filtering-search-bar-to-filter-pre-made-lists

// import Sanscript from "@sanskrit-coders/sanscript";


// https://github.com/sanskrit-coders/lipitva piwik_analytics.js

//npm install --save lipitva

import lip1 from 'lipitva';
import { Script } from 'lipitva/dist/enum';

import React, {useState, useEffect, useRef} from "react";
import {
    isPlatform,
    IonRadioGroup,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonPage,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonLabel,
    IonFooter,
    IonModal,
    IonIcon,
    IonSearchbar, IonText, IonList, IonListHeader, IonRadio, IonInput, IonToggle, IonFab, IonFabButton,
} from "@ionic/react";



//=== npm install -g @ionic/cli
// iii remove, camera, trash, close
// recording, search, home, document, logOutOutline }
import { mic, keypad, settings } from "ionicons/icons";
// options
import {Dialog} from "@capacitor/dialog";
// https://jasmine.github.io/pages/getting_started.html
// import any = jasmine.any;


import {IonPopover} from "@ionic/react";
import {connect} from "react-redux";
import {
    function_AT_DISPLAY_ACTION,
    function_AT_SQLITE_MAIN_DATA_READ_START
} from "../state_redux/actions_functions";
import {IS_LOADING} from "../state_redux/actions_types";
import {platform} from "os";
import {Capacitor} from "@capacitor/core";
import {DATA_main_type1} from "../types";
import Comp_show_redux_state from "./Comp_show_redux_state";
import {f_read_from_states} from "../code_global/global_functions";
import {withRouter} from "react-router-dom";


const tPlatform   = Capacitor.getPlatform()

var db1;

// <IonIcon icon={home} slot="start"></IonIcon>

export var DATA_main: DATA_main_type1[] = [];

interface ContainerProps {
    name: string;
}



const Search: React.FC = (props:any) => {

    const [toggle_settings_mode_case_sensitiv, set_toggle_settings_mode_case_sensitiv] = useState(false)
    const [radio_settings_mode_substring_in, set_radio_settings_mode_substring_in] = useState("substring_in_title");
    const [radio_settings_mode_substring_from, set_radio_settings_mode_substring_from] = useState("substring_from_start");
    const [radio_settings_mode_search_inline, set_radio_settings_mode_search_inline] = useState("real_time");
    const [show_settings_window, set_show_settings_window] = useState(false)
    const [work_List1_data, set_work_List1_data] = useState([]);
    const [getDataLocal_stable, set_getDataLocal_stable] = useState(false);
    const [sqlite_ConnectionOpened, set_sqlite_ConnectionOpened] = useState(false);
    const [listIsEmpty, set_listIsEmpty] = useState(true);
    const [search_string, set_search_string] = useState<string>('');
    const [filteredSearch, setFilteredSearch] = useState<DATA_main_type1[]>([])

    const [showModal, setShowModal] = useState(false);
    // const [mode_open_form_reg_lexemas_crud_create, set_mode_open_form_reg_lexemas_crud_create] = useState(false);
    const [mode_close_form_reg_lexemas_crud_create, set_mode_close_form_reg_lexemas_crud_create] = useState(false);

    type objectKV = {k:any, v:any}
    const [log1, setLog] = useState<string[]>([]);
    const [arrDicList, setDicList] = useState<objectKV[]>([]);
    const [DATA_main, set_DATA_main] = useState<DATA_main_type1[]>([]);

    const [local_Refresher, set_local_Refresher] = useState<boolean>(false);

    const errMess = useRef("");
    const showAlert = async (message: string) => {
        await Dialog.alert({
            title: 'Error Dialog',
            message: message,
        });
    };

    const ref1 = React.useRef<HTMLIonSearchbarElement>(null);

    const [rerender, setRerender] = useState(); // or any state

    // STEP1
    useEffect(() => {
        setAfterRender(true); // (1) will be called after DOM rendered
    }, [rerender]); // or don't set any if you want to listen to all re-render events


    const [afterRender, setAfterRender] = useState(false);// internal state


    //=== DOC https://medium.com/geographit/accessing-react-state-in-event-listeners-with-usestate-and-useref-hooks-8cceee73c559
    const ref_search_string = useRef(search_string);
    const adv_set_search_string = (p_data:string) =>{
        ref_search_string.current = p_data
        set_search_string(p_data)
    }

    const call_do_search = ( event:any ) => {
        console.log("=== ref_search_string.current "+Date.now(),ref_search_string.current)
        do_search({
            database_to_exec: props.work_sqlile_database,
            sqlite_api_global_to_exec: props.work_sqlite_api_global,
            search_string: ref_search_string.current,
        })
    }

    // STEP2 WORK WHEN DOM IS READY = LOADED
    useEffect(() => {
        if (!afterRender || (IS_LOADING===props.work_sqlile_database) ) return;
        // here DOM is loaded and you can query DOM elements
        // then reset

            var input2 = document.getElementById("input_search_string_id");
            console.log("=== input2 ", input2)
            if(input2){

                var icon2 = input2.querySelector('.searchbar-search-icon');
                if (icon2){
                    console.log("== icon2", icon2)
                    icon2.setAttribute("id", "icon777");
                    //pointerEvents

                    var icon3 = document.getElementById("icon777")
                    if(icon3){
                        icon3.style.pointerEvents = 'all';
                        icon3.addEventListener( 'click', (event) => call_do_search(event))

                    }
                }
            }


        // TOP STEP2
        setAfterRender(false);
    }, [afterRender, props.work_sqlile_database]);


    useEffect(() => {

        if( mode_close_form_reg_lexemas_crud_create ){
            console.log("=== useEffect mode_close_form_reg_lexemas_crud_create ", mode_close_form_reg_lexemas_crud_create)
            // set_mode_open_form_reg_lexemas_crud_create(false)
            props.function_AT_DISPLAY_ACTION(
                [
                    {key: 'mode_open_form_reg_lexemas_crud_create', value: false},
                ]
            )
            set_mode_close_form_reg_lexemas_crud_create(false)
        }

    }, [mode_close_form_reg_lexemas_crud_create])

    // useEffect(() => {
    //
    //     console.log("=== useEffect mode_open_form_reg_lexemas_crud_create ", props.mode_open_form_reg_lexemas_crud_create)
    //     set_mode_open_form_reg_lexemas_crud_create(props.mode_open_form_reg_lexemas_crud_create)
    //
    // }, [props.mode_open_form_reg_lexemas_crud_create])

    useEffect(() => {

        console.log("=== cunstructor 000 Tab1Container.tsx ")

        // alert(Sanscript.t('aham', 'itrans', 'devanagari'))

         // const tVal = lip0.t({
         //     data: 'रामालयम्',
         //     from: Script.DEVANAGARI,
         //     to: Script.TELUGU,
         // }); // equals to రామాలయమ్
         //
         // const tVal1 = lip0.t({
         //     data: 'aham',
         //     from: Script.ITRANS,
         //     to: Script.DEVANAGARI,
         // });

         // alert(tVal1)

     },[])


     useEffect(() => {

         //===alert("=== props.work_List1_ready " + props.work_List1_ready.toString())



         if(props.work_List1_ready){
             var tList = props.work_List1_data
             //===alert("=== props.work_List1_data " + props.work_List1_data.toString())
             //===alert("=== tList " + JSON.stringify(tList))
             if (tList) {
                 //===alert("=== props.work_List1_data +++ " + props.work_List1_data.length)
                 //===alert("=== tList " + JSON.stringify(tList))
                 set_work_List1_data(tList)
                 setFilteredSearch(tList)
                 set_DATA_main(tList)
                 set_listIsEmpty(false)
                 //===alert("=== set all data OK")
                 //

             }
         }

     },[props.work_List1_ready,props.work_List1_data])

    useEffect(() => {

        //=== saga start action when previous is finished
        console.log("=== props.work_sqlile_database ",props.work_sqlile_database)
        // function fLoad2() {

            if(IS_LOADING!==props.work_sqlile_database){

                console.log("=== GO function_AT_SQLITE_MAIN_DATA_READ_START ")
                props.function_AT_SQLITE_MAIN_DATA_READ_START({
                    database_to_exec:   props.work_sqlile_database,
                    sqlite_api_global_to_exec:   props.work_sqlite_api_global,
                    search_string:      search_string,
                })


            }

        // }
        // document.addEventListener("deviceready", fLoad2);


    },[props.work_sqlile_database])

    const do_search:any = (p_props:any) => {

        props.function_AT_SQLITE_MAIN_DATA_READ_START(p_props)

    }


    useEffect(() => {

        if("real_time"==radio_settings_mode_search_inline){
            const delayDebounceFn = setTimeout(() => {
                // Send Axios request here
                console.log("=== useEffect = search_string", search_string)

                console.log("=== GO function_AT_SQLITE_MAIN_DATA_READ_START ")
                do_search({
                    database_to_exec:   props.work_sqlile_database,
                    sqlite_api_global_to_exec:   props.work_sqlite_api_global,
                    search_string:      search_string,
                })
            }, 2000)



            console.log("=== not used ", search_string)

            return () => clearTimeout(delayDebounceFn)
        }
    },[
         search_string,
    ])

    const  onSearchIconClick:any = () =>{

    }

    let goMic:any = (ev:any) =>{

        console.log("=== goMic ")
        alert("=== goMic - Coming soon!...")

    }

    let go_keypad:any = (ev:any) =>{

        props.function_AT_DISPLAY_ACTION(
            [
                {key: 'mode_redraw_tab4_name', value: Date.now()},
            ]
        )

        console.log("=== go_keypad ")
        // alert("=== go_keypad - Coming soon!...")


         //=== var ob1 = window.document.getElementById('card_index_0')!;
         //    console.log("=== ob1 ", ob1)
         //    console.log("=== ob1 classList ", ob1.classList)

        // console.log("=== cladd card", t1)


    }

    let go_toggle_sensitivity:any = (ev:any) =>{
        console.log("=== go_toggle_sensitivity ",ev.detail.checked)
        set_toggle_settings_mode_case_sensitiv(ev.detail.checked)
    }

    let go_settings:any = (ev:any) =>{

        console.log("=== go_settings ")
        // alert("=== go_settings - Coming soon!...")

        set_show_settings_window(true)

    }

    const modal_settings = useRef<HTMLIonModalElement>(null);

    return (
        //=== no Page no Card !!!
        <IonContent>
            <IonHeader>

                <IonToolbar>
                    <IonTitle>Dictionary</IonTitle>
                </IonToolbar>

                {/*{(listIsEmpty && (IS_LOADING!==props.work_sqlile_database))?'':*/}
                {/*    <Comp_show_redux_state/>*/}
                {/*}*/}

                <IonToolbar>
                    <IonGrid> <IonRow>
                        {/*<IonCol id={'input_search'} >*/}

                        {/*/!*=== DOC IonSearchbar on icon press https://forum.ionicframework.com/t/ionic-search-bar-search-icon-clicked*/}
                        <IonSearchbar value={search_string} id={'input_search_string_id'}
                                      ref = {ref1}
                                      className="search_bar"
                                      placeholder={'input word to search'}
                                      color={'black'}

                                      // class="searchbar-search-icon sc-ion-searchbar-md
                                      // clearText={`clear search`}
                                      // showClearButton="always"
                                      // clearIcon="close"



                                      onIonClear={e=>{
                                          console.log("=== onIonClear 111")}}

                                      onIonChange={ e => {
                                            console.log("=== e1 search_string ", e)

                                            if(!e.detail.value) {
                                                console.log("=== set empty ")
                                                // set_search_string('')
                                                adv_set_search_string('')
                                            } else {
                                                console.log("=== set full ", e.detail.value)
                                                // set_search_string(e.detail.value)
                                                adv_set_search_string(e.detail.value)
                                            }
                                        }}
                        >


                        </IonSearchbar>
                        {/*IonSearchbar*/}


                                <IonButton id="btn_settings_id" buttonType={'primary'} className="btn_settings"
                                           onClick={(e)    => go_settings(e)}
                                           onMouseOver={(e)    => {
                                               set_show_settings_window(true)}
                                           }
                                           onTouchEnd={(e) => go_settings(e)}
                                >

                                    <IonIcon className="btn_settings_icon" color="primary"
                                             icon={settings}
                                        // slot="end"
                                        // slot="center"
                                    ></IonIcon>

                                </IonButton>



                        <IonButton buttonType={'primary'} className="btn_keypad" color="primary"
                            onClick={(e)    => go_keypad(e)}
                            onTouchEnd={(e) => go_keypad(e)}
                        >

                            <IonIcon className="btn_keypad_icon" color="primary"
                                     icon={keypad}
                                     // slot="end"
                                     // slot="center"
                            ></IonIcon>

                        </IonButton>

                        {/*<IonButton buttonType={'primary'} className="btn_mic" color="primary"*/}
                        {/*    onClick={(e) => goMic(e)}*/}
                        {/*    onTouchEnd={(e) => goMic(e)}*/}
                        {/*>*/}

                        {/*    <IonIcon className="btn_mic_icon" color="primary"*/}
                        {/*             icon={mic}*/}
                        {/*             // slot="end"*/}
                        {/*             // slot="center"*/}
                        {/*    ></IonIcon>*/}

                        {/*</IonButton>*/}


                        {/*</IonCol>*/}
                        {/*</IonItem>*/}
                    </IonRow>

                    <IonRow>

                                <IonPopover id={'popover_settings_id'}
                                            className={'popover_settings_class'}
                                            trigger="btn_settings_id"
                                            triggerAction="hover"
                                            isOpen={show_settings_window}
                                            keyboardClose={true}

                                >

                                    {/*--ion-safe-area-left*/}
                                    <IonGrid
                                        id="settings_window_id_1"
                                        className="settings_window_class"
                                             //=== WORKS
                                             //=== NO DELETE onMouseLeave={(e)    => {
                                             //     console.log("=== go close " + Date.now())
                                             //     set_show_settings_window(false)}
                                             // }
                                    >
                                    {/*<IonCard>*/}
                                        <IonTitle className={'settings_class_titile'}><h3>Settings</h3></IonTitle>
                                    {/*</IonCard>*/}
                                <IonRow>
                                    <IonCol>
                                        {/*=== radio +*/}
                                        <IonRow> {/*mode_substring_from*/}

                                            <IonRadioGroup className={'radio_group_class1'}
                                                value={
                                                    radio_settings_mode_substring_from
                                                }
                                                onIonChange={e=>{

                                                console.log("=== e   ",e);
                                                console.log("=== mode_search_inline "+JSON.stringify(e.detail));
                                                set_radio_settings_mode_substring_from(e.detail.value)

                                            }}>
                                                <IonListHeader className={'list_header_class1'}>
                                                    <IonLabel>
                                                        Search method
                                                    </IonLabel>
                                                </IonListHeader>

                                                <IonList className='list_how_to_search'>

                                                    <IonItem className='ion_item_how_to_search'>
                                                        <p className='radio_item_box1_class'>strong: It = It&lt;&gt;It+is</p>
                                                        <IonRadio slot="start" value="substring_from_strong"  className='radio_item1' />
                                                    </IonItem>

                                                    <IonItem className='ion_item_how_to_search'>
                                                        <p className='radio_item_box1_class'>start: It = It+is</p>
                                                        <IonRadio slot="start" value="substring_from_start"  className='radio_item1' />
                                                    </IonItem>

                                                    <IonItem>
                                                        <p className='radio_item_box1_class'>in: It = is It in</p>
                                                        <IonRadio slot="start" value="substring_from_anywhere" className='radio_item1' />
                                                    </IonItem>

                                                    <IonItem>
                                                        <p className='radio_item_box1_class'>end:It = after It</p>
                                                        <IonRadio slot="start" value="substring_from_end" className='radio_item1' />
                                                    </IonItem>
                                                </IonList>

                                            </IonRadioGroup>

                                        </IonRow>
                                        {/*=== radio -*/}

                                        {/*=== radio +*/}
                                        <IonRow> {/*mode_substring_in*/}

                                            <IonRadioGroup value={
                                                radio_settings_mode_substring_in
                                            }  onIonChange={e=>{

                                                console.log("=== e   ",e);
                                                console.log("=== mode_search_in "+JSON.stringify(e.detail));
                                                set_radio_settings_mode_substring_in(e.detail.value)

                                            }}>
                                                <IonListHeader className={'list_header_class1'}>
                                                    <IonLabel>
                                                        Search substring in
                                                    </IonLabel>
                                                </IonListHeader>

                                                <IonList className='list_how_to_search'>
                                                    <IonItem className='ion_item_how_to_search'>
                                                        <p className='radio_item_box1_class'>in title</p>
                                                        <IonRadio slot="start" value="substring_in_title"  className='radio_item1' />
                                                    </IonItem>

                                                    <IonItem>
                                                        <p className='radio_item_box1_class'>in details</p>
                                                        <IonRadio slot="start" value="substring_in_details" className='radio_item1' />
                                                    </IonItem>

                                                    <IonItem>
                                                        <p className='radio_item_box1_class'>in any</p>
                                                        <IonRadio slot="start" value="substring_in_any" className='radio_item1' />
                                                    </IonItem>

                                                    <IonItem>
                                                        <p className='radio_item_box1_class'>in every</p>
                                                        <IonRadio slot="start" value="substring_in_every" className='radio_item1' />
                                                    </IonItem>





                                                </IonList>

                                            </IonRadioGroup>

                                        </IonRow>
                                        {/*=== radio -*/}

                                        {/*=== radio +*/}
                                        <IonRow> {/*mode_search_inline*/}

                                            <IonRadioGroup value={
                                                radio_settings_mode_search_inline
                                            }  onIonChange={e=>{

                                                console.log("=== e   ",e);
                                                console.log("=== mode_search_from "+JSON.stringify(e.detail));
                                                set_radio_settings_mode_search_inline(e.detail.value)

                                            }}>

                                                <IonListHeader className={'list_header_class1'}>
                                                    <IonLabel>
                                                        Search when pressed
                                                    </IonLabel>
                                                </IonListHeader>

                                                <IonList className='list_how_to_search'>
                                                    <IonItem className='ion_item_how_to_search'>
                                                        <p className='radio_item_box1_class'>key pressed</p>
                                                        <IonRadio slot="start" value="real_time"  className='radio_item1' />
                                                    </IonItem>

                                                    <IonItem>
                                                        <p className='radio_item_box1_class'>button pressed</p>
                                                        <IonRadio slot="start" value="after_input" className='radio_item1' />
                                                    </IonItem>
                                                </IonList>

                                            </IonRadioGroup>

                                        </IonRow>
                                        {/*=== radio -*/}
                                    </IonCol>
                                    <IonCol>
                                        <IonItem>
                                            <IonToggle
                                                id="settings_togle_id"
                                                className="settings_class_togle"
                                                color={'primary'}
                                                checked={toggle_settings_mode_case_sensitiv}
                                                onIonChange={(e)=>go_toggle_sensitivity(e)}
                                            />
                                            <IonLabel>A=a sensitivity</IonLabel>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>


                        </IonPopover>

                    </IonRow>


                    </IonGrid>

                </IonToolbar>
                {/*<IonGrid>*/}
                {/*    <IonRow>*/}
                {/*        <IonIcon ></IonIcon>*/}
                {/*    </IonRow>*/}
                {/*</IonGrid>*/}
            </IonHeader>



            {(listIsEmpty)?
                <IonContent className="list_is_empty_css">
                    <IonText>   Loading Data...</IonText>
                </IonContent>
                :
                ''
            }

            {/*{(true) ? '' :*/}

            {( listIsEmpty ) ? '' :


                <IonContent className="ion-padding">
                    <IonGrid>
                        <IonRow>

                            {filteredSearch.map((search,card_index) => (
                                <IonCol
                                    size="12"
                                    size-xs="12"
                                    size-sm="6"
                                    size-md="4"
                                    size-lg="4"
                                    key={search.id}
                                >
                                    <IonCard id={'card_index_'+card_index} className='reg_lexemas_card_class'>
                                        <IonCardHeader>
                                            <IonCardTitle color={("web"==tPlatform)?"card_title":'card_title'}>
                                                {lip1.t({
                                                    data:   search.title, //'aham',
                                                    from:   Script.SLP1,
                                                    to:     Script.DEVANAGARI,
                                                })}
                                            </IonCardTitle>
                                            <IonCardTitle color={'primary'}>
                                                {search.title}
                                            </IonCardTitle>

                                        </IonCardHeader>
                                        <IonCardContent>
                                            {/*{search.spelling}*/}
                                            spelling: {lip1.t({
                                                data:   search.spelling, //'aham',
                                                from:   Script.SLP1,
                                                to:     Script.DEVANAGARI,
                                            })}
                                        </IonCardContent>
                                        <IonCardContent>
                                            {search.id}
                                        </IonCardContent>
                                        <IonCardContent>

                                            <IonInput>{search.detail}</IonInput>
                                            <IonInput color={'color_brown'}>gender: {search.gender}</IonInput>

                                        </IonCardContent>
                                        <IonFooter className="ion-text-right">
                                            <IonButton
                                                color="primary"
                                                fill="clear"
                                                routerLink={search.page}
                                            >
                                                Expertise
                                            </IonButton>
                                        </IonFooter>
                                    </IonCard>
                                </IonCol>
                            ))}


                            {/*<IonModal id="example-modal" ref={modal} trigger="open-modal">*/}

                            {/*=== modal_settings + */}
                            <IonCol className="ion-text-center">
                                <IonModal id="modal_reg_lexemas_crud_create_form_id" isOpen={props.mode_open_form_reg_lexemas_crud_create}>

                                    {

                                    }

                                    <p> mode_open_form_reg_lexemas_crud_create {props.mode_open_form_reg_lexemas_crud_create} </p>

                                    <IonRow>

                                    </IonRow>

                                    <IonRow className="row_ok_cancel">
                                        <IonButton className="btn_ok_cancel"
                                                   color="light"
                                                   onClick={(e) =>  {
                                                       console.log("=== onClick Cancel")
                                                       set_mode_close_form_reg_lexemas_crud_create(true)


                                                   }}
                                        >
                                            Cancel
                                        </IonButton>
                                        <IonButton className="btn_ok_cancel"
                                                   color="primary"
                                                   onClick={(e) =>   {
                                                       console.log("=== onClick OK")
                                                       set_mode_close_form_reg_lexemas_crud_create(true)


                                                   }}
                                        >
                                            Ok
                                        </IonButton>
                                    </IonRow>

                                </IonModal>
                            </IonCol>
                            {/*=== modal_settings - */}

                            {/*=== modal_card + */}
                            <IonCol className="ion-text-center">
                                <IonModal isOpen={showModal}>
                                    {/*cssClass="my-custom-class"*/}

                                    <p>This is modal content</p>
                                    <IonButton
                                        color="secondary"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close Modal
                                    </IonButton>
                                </IonModal>
                            </IonCol>
                            {/*=== modal_card - */}

                        </IonRow>
                    </IonGrid>
                </IonContent>
            }
            <IonGrid>
                <IonRow>
                    <IonButton color="secondary" onClick={() => setShowModal(true)}>
                        Information
                    </IonButton>
                </IonRow>
            </IonGrid>
        </IonContent>
    )

}; //React.FC

const ReadFromState_mapStateToProps = (state:any) =>
{
    console.log("=== ReadFromState_mapStateToProps")
    console.log(state)

    var ret1 = f_read_from_states({state:state})
    console.log("=== ret1 ",ret1)

    let ret2 = {...ret1,
        mode_open_form_reg_lexemas_crud_create:state.display.mode_open_form_reg_lexemas_crud_create,

        work_List1_data:        state.sqlite.work_List1_data,
        work_List1_ready:       state.sqlite.work_List1_ready,
        work_sqlile_database:   state.sqlite.work_sqlile_database,
        work_sqlite_api_global: state.sqlite.work_sqlite_api_global,
    }
    console.log("=== ret2 ",ret2)
    return ret2
}

const WriteToState_mapDispatchToProps = {

    function_AT_SQLITE_MAIN_DATA_READ_START:function_AT_SQLITE_MAIN_DATA_READ_START,
    function_AT_DISPLAY_ACTION:function_AT_DISPLAY_ACTION,

}

export default
withRouter(
    connect(ReadFromState_mapStateToProps, WriteToState_mapDispatchToProps)
    (Search as any) as any);

