import React, {useState} from 'react';
import { Text } from "react-native";
import Button from "./Button";
import { Fragment } from "react";

const Counter = () => {
    const [compteur, setCompteur] = useState(0);
    const incrementCount = () => setCompteur(prevCount => prevCount + 1);

    return (
        <Fragment>
            <Text>Count : { compteur }</Text>
            <Button label="Click" onClick={incrementCount} />
        </Fragment>
    );
};

export default Counter;