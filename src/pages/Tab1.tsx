
import {IonContent, IonHeader, IonItem, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import ExploreContainer from '../components_app/ExploreContainer';
import './Tab1.css';
import Tab1Container from "../components_app/Tab1Container";
import {f_read_from_states} from "../code_global/global_functions";
import {function_AT_DISPLAY_ACTION, function_AT_SQLITE_MAIN_DATA_READ_START} from "../state_redux/actions_functions";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion_cont1" fullscreen>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1 Toolbar</IonTitle>
          </IonToolbar>
        </IonHeader>

          {/*name="Tab 1 page"*/}
        <Tab1Container  />

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
    (Tab1 as any) as any);


;
