import {StandardTextFieldProps} from "@mui/material";

const my_func = (e?:any) => {

    // console.log("=== my_Init")

}

export interface myTextFieldProps extends StandardTextFieldProps {

    id_on_screen: string,
    state_from_redux_name?: string,
    label_text?: string,
    onInit?:typeof my_func,
    onFocus?:typeof my_func,

}

