import {IonGrid, IonRow } from '@ionic/react';
import './SearchBarLexemas.css';
import SearchBarBasic from "./SearchBarBasic";
import React from "react";
import {myTextFieldProps} from "../code_global/global_types";


const SearchBarLexemas: React.FC<myTextFieldProps> = (
        props: myTextFieldProps,
    ) => {

  return (
      <IonGrid>
        <IonRow>
            <SearchBarBasic //as TextField extended v1
                {...props}
            />
        </IonRow>
      </IonGrid>
  );
};

export default SearchBarLexemas;
