import './Input_search_lexema.css';
import {IonInput} from "@ionic/react";

interface ContainerProps {
  name: string;
}

const Input_search_lexema: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
        <IonInput value={name}></IonInput>
    </div>
  );
};

export default Input_search_lexema;
