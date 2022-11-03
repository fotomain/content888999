
import {
    IonButton,
    IonCard,
    IonContent,
    IonGrid,
    IonRow,
    IonHeader,
    IonIcon,
    IonItem,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import ExploreContainer from '../components_app/ExploreContainer';
import './Tab5.css';

import {IS_LOADING} from "../state_redux/actions_types";
import Comp_show_redux_state from "../components_app/Comp_show_redux_state";
import React, {useEffect, useRef, useState} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {f_read_from_states} from "../code_global/global_functions";
import {function_AT_DISPLAY_ACTION, function_AT_SQLITE_MAIN_DATA_READ_START} from "../state_redux/actions_functions";

import './Tab4.css';
import Comp_reg_lexemas_form_1element from "../components_app/Comp_reg_lexemas_form_1element";

import {
    createTheme, InputAdornment, TextField, ThemeProvider
    , experimental_sx as sx, CardContent
} from "@mui/material";
import {close, keypad, search, settings} from "ionicons/icons";

// yarn add @mui/icons-material
import { alpha, styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';


//=== DOC cool  https://smartdevpreneur.com/override-textfield-border-color-in-material-ui/#Outlined_Variant
//              https://codesandbox.io/s/mui-5-textfield-sx-prop-7u3fx?file=/SXPropDemo.tsx:535-536

const theme1 = createTheme({
    components: {

        MuiTextField: {
            styleOverrides: {
                root:sx({
                    "& .MuiOutlinedInput-root": {
                        "& > fieldset": {
                            // borderColor: "orange",
                            border: "2px solid orange",
                        },
                    },
                    "& .MuiOutlinedInput-root:hover": {
                        "& > fieldset": {
                            // borderColor: "orange",
                            border: "2px solid red",
                        },
                    },
                    "& .MuiOutlinedInput-root.Mui-focused": {
                        "& > fieldset": {
                            // borderColor: "orange",
                            border: "2px solid var(--ion-color-primary)",
                        },
                    },
                }),

            }
        },
        //
        MuiInput: {
            styleOverrides: {
                root: {
                    //color: 'var(--ion-color-secondary)',
                    //color: 'var(--ion-color-primary)',
                    paddingLeft:'5px',
                    paddingRight:'10px',
                    paddingBottom:'3px',
                    color: '#56ff00',
                    fontWeight:'bold',
                    fontSize:25,
                    fontFamily: 'Monospace',
                    '&::before': {
                        borderBottom: '5px solid var(--ion-color-secondary)',
                    },
                },

                underline: {
                    borderColor: 'var(--ion-color-primary)',
                    "&&:hover::before": {
                        // borderColor: 'var(--ion-color-primary)'
                        borderBottom: '5px solid var(--ion-color-primary) ',
                    }
                }
            }
        },
        //
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontSize: '0.95rem', //before focus
                    paddingLeft:'30px',
                    paddingTop:'5px',

                },
                shrink: {
                    fontSize: '0.6rem', //after focus
                    transform: 'translate(-25px, 0) scale(1) !important',
                },
                outlined: {
                    transform: 'translate(14px, 16px) scale(1)',
                },
            },
        },
    }
});


const Tab5: React.FC  = (props:any) => {

    const ref1 = React.useRef<HTMLIonSearchbarElement>(null);

    const go_clear_proc =(ev:any)=>{
        console.log("=== go_clear_proc",ev)
        set_search_string('')
        if(ref1.current) {
            ref1.current.focus()
        }
    }
    const go_search_proc =(ev:any)=>{
        console.log("=== go_search_proc",ev)
    }

    const [show_props1_start_end, set_show_props1_start_end] = useState(false);

    const start1 = {
        startAdornment: (
            <InputAdornment id="ador1_id" position="start">
                <CloseIcon className="icon_class"
                   onClick={(e)=>{
                    go_clear_proc(e)
                }}/>
            </InputAdornment>
        )
    }

    const end1 = {
        endAdornment: (
            <InputAdornment id="ador2_id" position="end">
                <SearchIcon className="icon_class"
                            onClick={(e)=>{
                    go_search_proc(e)
                }}/>
            </InputAdornment>
        )
    }

    const props1 = {

    }

    const props1_start = {
        props1,
        ...start1
    }

    const props1_end = {
        props1,
        ...end1
    }
    const props1_start_end = {
        props1,
        ...start1
        ,
        ...end1
        ,
    }


    useEffect(() => {

        console.log("=== Tab5 " + props.work_List1_ready )
        console.log("=== mode_redraw_tab5_name " + props.mode_redraw_tab4_name )

        return () => {

        };
    }, [props.work_List1_ready,props.work_sqlile_database]);
    //=== COOL DOC https://codesandbox.io/s/material-ui-drawer-8p6wv?file=/src/pages/index.js

    const [search_string, set_search_string] = useState<string>('');

    useEffect(() => {

        if ( ''==search_string ) {
            // set_show_props1_start_end(false)
            console.log(ref1)
        }

        return () => {
            // effect
        };
    }, [search_string]);



    return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 5</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 5</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/*<ExploreContainer name="Tab 4 page" />*/}

          <IonGrid>



              <IonRow>
                  <IonCard>

                      <ThemeProvider theme={theme1}>
                          <TextField
                              id="input_search1"
                              inputRef={ref1}
                              // className={}
                              // color="primary"
                              // sx={style1}
                              value={search_string}
                              label="Search..."
                              InputProps={(show_props1_start_end) ? props1_start_end : props1}
                              variant="standard"
                              onFocus={(e)=>{
                                  console.log("=== onFocus_input_search")
                                  set_show_props1_start_end(true)
                              }}
                              onBlur={(e)=>{
                                  console.log("=== onBlur_input_search ", search_string)
                                  if(''==search_string) {
                                      set_show_props1_start_end(false)
                                  }
                              }}

                              onChange={ (e) => {
                                  console.log("=== onChange search_string ", e.target.value)
                                  set_search_string(e.target.value)
                                }
                              }


                                  />
                      </ThemeProvider>

                  </IonCard>
              </IonRow>



              <IonRow>
                  <IonCard>
                      <Comp_reg_lexemas_form_1element/>
                  </IonCard>
              </IonRow>

              <IonRow>
                  <IonCard>
                      <TextField
                          // sx={style1}
                          id="standard-basic"
                          label="Search"
                          variant="standard"
                      />
                  </IonCard>
              </IonRow>

              <IonRow>
                  <IonCard>
                      <CardContent>
                          <ThemeProvider theme={theme1}>
                              <TextField
                                  // sx={style1}
                                  id="standard-basic"
                                  label="Search"
                                  variant="outlined"
                              />
                          </ThemeProvider>
                      </CardContent>
                  </IonCard>
              </IonRow>
              <IonRow>

                  <IonCard>
                      <ThemeProvider theme={theme1}>
                          <TextField
                              // sx={style1}
                              id="standard-basic"
                              label="filled"
                              variant="filled"
                          />
                      </ThemeProvider>
                  </IonCard>

              </IonRow>

          </IonGrid>


      </IonContent>
    </IonPage>
  );
};


const ReadFromState_mapStateToProps = (state:any) =>
{
    console.log("=== ReadFromState_mapStateToProps")
    console.log(state)

    var ret1_from_states = f_read_from_states({state:state})
    console.log("=== ret1_from_states ",ret1_from_states)
    return ret1_from_states
}

const WriteToState_mapDispatchToProps = {
    function_AT_SQLITE_MAIN_DATA_READ_START:function_AT_SQLITE_MAIN_DATA_READ_START,
    function_AT_DISPLAY_ACTION:function_AT_DISPLAY_ACTION,

}

export default
withRouter(
    connect(ReadFromState_mapStateToProps, WriteToState_mapDispatchToProps)
    (Tab5 as any) as any);
