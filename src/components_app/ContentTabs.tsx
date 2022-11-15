import React  from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import {calendar, location, informationCircle, people, triangle, ellipse, square, settings, snow} from 'ionicons/icons';
import Tab1 from "../pages/Tab1";
import Tab2 from "../pages/Tab2";
import Tab3 from "../pages/Tab3";
import Tab4 from "../pages/Tab4";
import Tab5 from "../pages/Tab5";

interface ContentTabsProps { }

const ContentTabs: React.FC<ContentTabsProps> = () => {

    return (
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
    );
};

export default ContentTabs;
