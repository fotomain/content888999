
import React, {useState} from 'react'
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import {f_read_from_states} from "../code_global/global_functions";
import {function_AT_DISPLAY_ACTION} from "../state_redux/actions_functions";
import Comp_show_redux_state from "./Comp_show_redux_state";
import {History} from "history";
import {IonCol, IonGrid, IonInput, IonItemDivider, IonLabel, IonRow, IonText, IonTitle} from "@ionic/react";

import {Grid, TextField} from "@mui/material";

type Props = {
    history: History;
}

type State = {
    component_name:string,
    history: History,

    lexema_guid: string,
    lexema_title: string,
    lexema_content: string,
    actual_from: Date,
    actual_to: Date,

    expertise_title: string,
    expertise_content: string,

}


function Comp_reg_lexemas_form_1element(p_params:any) {

    var localState = {

        lexema_guid: '',
        lexema_title: '',
        lexema_content: '',
        actual_from: new Date(),
        actual_to: new Date(),

        expertise_title:  '',
        expertise_content:  '',

    }
    type object_key1 = keyof typeof localState;



    const [form_value, set_form_value] = useState(localState);

    //PLAN
    // SEARCH GIT IonInput @material/web
    // go mat bundle npm i material-components-web
    // import here
    // set class


    const handle_change_field = (event:any) => {

        console.log("=== handleChange  " + event.target.value)

        var tform_value = form_value;
        tform_value[ event.target.name as object_key1 ]=event.target.value;
        set_form_value( tform_value )

    }

    return (

        <Grid item marginTop={'1rem'} xs={3} sx={{ m: 1, width: '25ch' }} >
            <TextField
                id="id_outlined-password-input"
                label="Current pssword"

                name="user_password_current"
                type="password"
                autoComplete="current-password"
                value={form_value.lexema_title}
                onChange={(e)=>handle_change_field(e)}
            />
        </Grid>


    )
}

//************************************
//***************   WriteToState
//************************************


// REACT REGISTER IN PROPS #2_SAGA2
const WriteToState_mapDispatchToProps = {
    function_AT_DISPLAY_ACTION:function_AT_DISPLAY_ACTION,
}

//************************************
//***************   ReadFromState
//************************************
const ReadFromState_mapStateToProps = (state:any) =>
{
    // console.log("=== mapStateToProps")
    // console.log(state)
    var ret1 = f_read_from_states({state:state})
    return ret1

}

// Comp_reg_lexemas_form_1element
export default
withRouter(
    connect(ReadFromState_mapStateToProps, WriteToState_mapDispatchToProps)
    (Comp_reg_lexemas_form_1element as any) as any);

