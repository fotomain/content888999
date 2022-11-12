
export type initialStateType = {


    mode_redraw_tab4_name:number,
    mode_open_form_reg_lexemas_crud_create:boolean,
    work_sqlile_database:any,
    work_sqlite_api_global:any,
    work_List1_data:any,
    work_List1_ready:boolean,

}

export const initialState:initialStateType = {


    mode_redraw_tab4_name: (Date.now()),
    mode_open_form_reg_lexemas_crud_create:false,
    work_sqlile_database:null,
    work_sqlite_api_global:null,
    work_List1_data:null,
    work_List1_ready:false,
};


