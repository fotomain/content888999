import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components_app/ExploreContainer';
import './Tab3.css';
import {IS_LOADING} from "../state_redux/actions_types";
import Comp_show_redux_state from "../components_app/Comp_show_redux_state";
import React, {useEffect} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {f_read_from_states} from "../code_global/global_functions";
import {function_AT_DISPLAY_ACTION, function_AT_SQLITE_MAIN_DATA_READ_START} from "../state_redux/actions_functions";

import './Tab4.css';
import Comp_reg_lexemas_form_1element from "../components_app/Comp_reg_lexemas_form_1element";

const Tab4: React.FC  = (props:any) => {
    useEffect(() => {

        console.log("=== Tab4 " + props.work_List1_ready )
        console.log("=== mode_redraw_tab4_name " + props.mode_redraw_tab4_name )

        return () => {

        };
    }, [props.mode_redraw_tab4_name, props.work_List1_ready,props.work_sqlile_database]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 4</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 4</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/*<ExploreContainer name="Tab 4 page" />*/}


              <Comp_show_redux_state/>


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
    (Tab4 as any) as any);


;


