

import React, {Component, useEffect} from 'react';
import {IonButton, IonCard, IonCardContent, IonCardTitle, IonCol, IonGrid, IonRow, IonText} from "@ionic/react";
import {connect} from "react-redux";
import {f_read_from_states} from "../code_global/global_functions";
import {initialState} from "../state_redux/initial_state";
import {function_AT_DISPLAY_ACTION} from "../state_redux/actions_functions";

interface myState {
    mode_redraw_tab4_name:number,
}

interface myProps {
    //=== DOC https://www.appliz.fr/blog/typescript-react
    mode_redraw_tab4_name:number,
    function_AT_DISPLAY_ACTION:typeof function_AT_DISPLAY_ACTION,
}

class Component1 extends Component<myProps,myState> {

    constructor(props:any) {
        super(props);
    }

    componentDidMount() {
        console.log("=== b1 componentDidMount ")
    }
    componentDidUpdate() {
        console.log("=== b1 componentDidUpdate ")
    }


    render() {

        const do_change_mode_redraw_tab4_name = (e:any) =>{

            this.props.function_AT_DISPLAY_ACTION(
                [
                    {key: 'mode_redraw_tab4_name', value: Date.now()},
                ]
            )

        }

        return (
            <IonGrid>
                <IonCol>
                    <IonButton color="primary" id={'b1'}
                               onClick={(e)=>{
                                   console.log("=== b1")
                                   console.log(e)
                                   do_change_mode_redraw_tab4_name(e)

                               }}
                    >
                        button1
                    </IonButton>

                    <IonText id="text_id_b1"
                    >
                        {this.props.mode_redraw_tab4_name}
                    </IonText>

                    {Object.entries( this.props )
                        .map((el, ii, aa) => {
                        return(
                            <IonCard key={ii} color={'primary'}>

                                <IonCardTitle color={'primary'}>
                                    {/*key */}
                                </IonCardTitle>
                                <IonCardContent  color={'primary'}>
                                    <IonRow>
                                        <IonCol className="ion-text-end black_on_white_color_class" >
                                            <IonText>
                                                {el[0]}
                                            </IonText>
                                        </IonCol>
                                        <IonCol>
                                            <IonText className="black_on_white_color_class" >
                                                {JSON.stringify( el[1] )}
                                            </IonText>
                                        </IonCol>
                                    </IonRow>
                                </IonCardContent>

                            </IonCard>
                        )
                    })}


                </IonCol>
            </IonGrid>
        );
    }
}


const read_from_state = (state:any) =>{

    console.log("=== read_from_state of Comp1 ", state)

    var ret_from_states = initialState

    ret_from_states = f_read_from_states({state:state}) as (typeof initialState)

    return ret_from_states

}

const write_to_state = {
    function_AT_DISPLAY_ACTION:function_AT_DISPLAY_ACTION,
}

export default connect(read_from_state,write_to_state)( Component1 );


