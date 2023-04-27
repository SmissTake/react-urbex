import React, { Fragment, useEffect, useState } from 'react';
import {
  Text,
  FlatList,
} from 'react-native';
import Button from './Button';

const StarWars = () => {
    useEffect(() => {
        fetchAPI("https://swapi.dev/api/people/");
    }, []);

    const [data, setData] = useState([]);
    const fetchAPI = (url) => {
        fetch(url)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
    }

    return (
        <Fragment>
            <Text>Star Wars</Text>
            <FlatList
                data={data.results}
                renderItem={({item}) => (
                    <Text>{item.name} {item.height}</Text>
                )}
                keyExtractor={item => item.name}
            />
            <Button label="next" onPress={() => fetchAPI(data.next)} />
        </Fragment>
    )
}

export default StarWars;