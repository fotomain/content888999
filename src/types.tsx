//new main data -> STEP 5
export type  DATA_work_list_content_types_data = {
    content_type_guid:string,
    description:string,
    order_in_list:bigint,
}

export type  DATA_main_type1 = {
    id:string,
    // key:string,
    title:string,
    detail:string,
    gender:string,
    spelling:string,
    page:string,
}


export type retDatabase_type1 = {
    ret_sqlite_api_global: any,
    ret_database: any,
    ret_code: string,
}
