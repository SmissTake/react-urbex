import React, { Fragment, useEffect, useState } from "react";
import { Text, View } from "react-native";
import PlaceCard from "./PlaceCard";
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
      .catch((error) => console.error(error));
  }, []);

  return (
    <Fragment>
      <Text>Places</Text>
      <View >
        {data.map((place) => (
          <PlaceCard
            key={place._id}
            title={place.title}
            town={place.town}
            image={place.images[0].url}
          />
        ))}
      </View>
    </Fragment>
  );
}
