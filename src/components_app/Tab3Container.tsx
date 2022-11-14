import './Tab3Container.css';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {f_read_from_states} from "../code_global/global_functions";
import {
    function_AT_CRUD_READ,
    function_AT_DISPLAY_ACTION,
    function_AT_SQLITE_MAIN_DATA_READ_START
} from "../state_redux/actions_functions";
import React, {useEffect} from "react";
import {IonContent, IonRow, IonText} from "@ionic/react";


interface ContainerProps {
  name: string;
}


const Tab3Container: React.FC = (props:any) => {

    useEffect(() => {

        console.log("=== GO function_AT_CRUD_READ ")
        //new main data -> STEP 10

        props.function_AT_CRUD_READ({
            database_to_exec:   props.work_sqlile_database,
            sqlite_api_global_to_exec:   props.work_sqlite_api_global,
            entity:             "content_types",
            state_data_name:    "work_list_content_types_data",
            state_ready_name:   "work_list_content_types_ready"
        })

        props.function_AT_CRUD_READ({
            database_to_exec:   props.work_sqlile_database,
            sqlite_api_global_to_exec:   props.work_sqlite_api_global,
            entity:             "content_posts",
            state_data_name:    "work_list_content_posts_data",
            state_ready_name:   "work_list_content_posts_ready"
        })

    },[props.work_sqlile_database])


    return (
    <div className="container">
        {(!props.work_list_content_posts_ready)?
            <IonContent className="list_is_empty_css">
                <IonText>   Loading Data...</IonText>
            </IonContent>
            :
            ''
        }

        {(!props.work_list_content_posts_ready) ? '' :
            props.work_list_content_posts_data.map((ee:any,ii:any) => (
            <IonRow key={ee.content_post_guid}>
                <div>{ee.description}</div>
            </IonRow>))

        }

      <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
    </div>
  );
};

const ReadFromState_mapStateToProps = (state:any) =>
{
    console.log("=== Tab3Container")
    console.log(state)

    var ret1 = f_read_from_states({state:state})
    console.log("=== Tab3Container ret1 ",ret1)

    let ret2 = {...ret1,

        //new main data -> STEP 4
        work_list_content_posts_data:   state.sqlite.work_list_content_posts_data,
        work_list_content_posts_ready:  state.sqlite.work_list_content_posts_ready,

        work_sqlile_database:   state.sqlite.work_sqlile_database,
        work_sqlite_api_global: state.sqlite.work_sqlite_api_global,
    }
    console.log("=== Tab3Container ret2 ",ret2)
    return ret2
}

const WriteToState_mapDispatchToProps = {

    function_AT_CRUD_READ:function_AT_CRUD_READ,
    function_AT_DISPLAY_ACTION:function_AT_DISPLAY_ACTION,

}

export default
withRouter(
    connect(ReadFromState_mapStateToProps, WriteToState_mapDispatchToProps)
    (Tab3Container as any) as any);

