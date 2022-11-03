import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components_app/ExploreContainer';
import './Tab2.css';
import SearchBarBasic from "../components_basic/SearchBarBasic";
import { logOutOutline } from 'ionicons/icons';
import SearchBarLexemas from "../components_basic/SearchBarLexemas";

const p_call_on_change_t1=()=>{
    console.log("=== p_call_on_change " + Date.now())
}

const p_props_t1 = {
    call_on_change:p_call_on_change_t1(),
    onChange:p_call_on_change_t1()
}

const Tab2: React.FC = () => {


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>

            <IonTitle size="large">Tab 2</IonTitle>

          </IonToolbar>
        </IonHeader>

        <SearchBarLexemas //as TextField extended v1

            id_on_screen            ={'search_bar_lexema_main'}
            state_from_redux_name   ={'search_bar_lexema_main'}
            label_text              ={'"Text t01"'}

            onInit={(e:any)=>{
                console.log("=== onInit ",555)
                }
            }

            onFocus={(e:any)=>{
                console.log("=== onFocus ",999)
                console.log("=== e ",e)
                }
            }

            onChange={(e)=>{
                console.log("=== onChange ",888)
                console.log("=== e ",e)
                }
            }

            onBlur={(e)=>{
                console.log("=== onBlur ",1000)
                console.log("=== e ",e)
                }
            }

        />

        <ExploreContainer name="Tab 2 page" />

      </IonContent>
    </IonPage>
  );
};

export default Tab2;
