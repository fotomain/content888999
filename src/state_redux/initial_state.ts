
export type initialStateType = {


    mode_redraw_tab4_name:number,
    mode_open_form_reg_lexemas_crud_create:boolean,
    work_sqlile_database:any,
    work_sqlite_api_global:any,
    work_List1_data:any,
    work_List1_ready:boolean,

    //new main data -> STEP 1
    work_list_content_types_data :any,
    work_list_content_types_ready:boolean,


}

export const initialState:initialStateType = {


    mode_redraw_tab4_name: (Date.now()),
    mode_open_form_reg_lexemas_crud_create:false,
    work_sqlile_database:null,
    work_sqlite_api_global:null,
    work_List1_data:null,
    work_List1_ready:false,

    //new main data -> STEP 2
    work_list_content_types_data :null,
    work_list_content_types_ready:false,


};


