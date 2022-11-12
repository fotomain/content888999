import {interface_state} from "./global_var";


export function f_read_from_states(p_params:any){

    var initVal=0;

    var ret : interface_state = {}
    var tState = p_params.state.display;

    Object.entries( tState ).reduce((pEl:any, cEl)=>{

                if(-1==["1","2","3","4","5","6","7","8","9","0"].indexOf(cEl[0].toString().substring(0,1))){
                    // console.log("=== ret1 " + cEl[0] )
                    ret[cEl[0]] = cEl[1]
                }

            },
            initVal
        )

    tState = p_params.state.sqlite;

    Object.entries( tState ).reduce((pEl:any, cEl)=>{

            if(-1==["1","2","3","4","5","6","7","8","9","0"].indexOf(cEl[0].toString().substring(0,1))){
                // console.log("=== ret1 " + cEl[0] )
                ret[cEl[0]] = cEl[1]
            }

        },
        initVal
    )

    return ret;

}


export const is_empty = (p:any) => {
    return (p)?true:false
}


