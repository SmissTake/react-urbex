import React, { Fragment, useEffect, useState } from 'react';
import {
  Text,
  FlatList,
} from 'react-native';
import { API_URL } from "@env";

export default function PlacesList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}`)
            .then((response) => response.json())
            .then((json) => {
                setData(json);
                console.log(json);
            })
            .catch((error) => console.error(error))
    }, []);


    return (
        <Fragment>
            <Text>Places</Text>
            <FlatList
                data={data}
                renderItem={({item}) => (
                    <Text>{item.title} {item.town}</Text>
                )}
                keyExtractor={item => item.title}
            />
        </Fragment>
    )
}