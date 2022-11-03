
import React, {Component, useEffect, useState} from 'react';
import {IonButton, IonCard, IonCardContent, IonCardTitle, IonCol, IonGrid, IonRow, IonText} from "@ionic/react";
import {connect, useDispatch, useSelector} from "react-redux";
import {TextField, StandardTextFieldProps} from "@mui/material";
import {myTextFieldProps} from "../code_global/global_types";


type state_local_type = {
    event_name:string,
}

//=== DOC https://stackoverflow.com/questions/59988667/typescript-react-fcprops-confusion

//=== DOC https://www.appsloveworld.com/reactjs/200/74/is-it-a-correct-way-to-extend-material-ui-components-react-typescript

// const Component1 = (props:myProps &  RouteComponentProps) => {

// const Component1 = (props:any) => {

// const Component1: React.FC<myTextFieldProps> = (props) => {
const Component1: React.FC<myTextFieldProps> = (
        props: myTextFieldProps,
    ) => {


    //=== DOC https://codersera.com/blog/react-redux-hooks-with-typescript/
    const state_from_redux = useSelector((state: any) => {

        console.log("=== state",state)
        var st =  {
            mode_redraw_tab4_name: state.display.mode_redraw_tab4_name,
        }

        return st

    });

    const [state_local, set_state_local] = useState<state_local_type>( {'event_name':'000'} );

    useEffect(() => {
        console.log("=== props t1 ", props)

        if(props.onInit){
            props.onInit()
        }

        return () => {

        };
    }, []);

      useEffect(() => {
        return () => {

        };
    }, [state_local]);

    //=== DOC https://react-redux.js.org/using-react-redux/usage-with-typescript
    const dispatch = useDispatch()

    const do_change_mode_redraw_tab4_name = (e:any) =>{

        dispatch({
                type: 'AT_DISPLAY_ACTION',
                p_data: {p_data_items:
                            [
                                {key: 'mode_redraw_tab4_name', value: Date.now()},
                            ]
                        }
            }
        )

    }

        const prevState_set_key_val = ( p_prevState:state_local_type,k:string,v:any) => {
            var st = p_prevState
                st = {...p_prevState, [k]:v }
            return st;
        }

        return(

            <IonGrid>
                <IonRow>
                    <TextField
                        {...props as StandardTextFieldProps}
                        id={props.id_on_screen}
                        label={props.label_text}

                        value={state_from_redux.mode_redraw_tab4_name}

                        onFocus={(e)=>{
                            if(props.onFocus) {
                                props.onFocus(e);
                            }
                        }}

                        onChange={(e)=>{

                            if(props.onChange) {
                                props.onChange(e);
                            }

                            console.log("=== onChange local",111)
                                // props.onChange()

                            dispatch({
                                    type: 'AT_DISPLAY_ACTION',
                                    p_data: {p_data_items:
                                            [
                                                {key: 'mode_redraw_tab4_name', value: parseInt(e.target.value) },
                                            ]
                                    }
                                }
                            )

                            //=== DOC https://stackoverflow.com/questions/70191290/how-to-define-typescript-types-when-used-with-react-usestate-and-the-previous-st
                            //=== DOC https://stackoverflow.com/questions/11508463/javascript-set-object-key-by-variable
                            set_state_local( (prevState) => prevState ? prevState_set_key_val( prevState, 'event_name',e.target.id + ' '+ e.target.value.toString()):prevState )

                        }}

                    />
                </IonRow>

                <IonRow>
                    <TextField color="primary" id={'t_state'}
                        label="state_local.event_name"
                        value={state_local?.event_name}
                    />
                </IonRow>


                <IonRow>
                    <IonButton color="primary" id={'b1'}
                               onClick={(e)=>{
                                   console.log("=== b1")
                                   console.log(e)
                                   do_change_mode_redraw_tab4_name(e)
                                   // var el = document.getElementById("text_id1")
                                   // if (el) {
                                   //     el.innerHTML = Date.now().toString()
                                   // }
                                   // mode_redraw_tab4_name
                               }}
                    >
                        Change Global State
                    </IonButton>

                </IonRow>
            </IonGrid>

        )

}

export default ( Component1 )

