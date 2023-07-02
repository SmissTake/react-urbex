import Carousel from 'react-native-snap-carousel';
import { Image, StyleSheet } from 'react-native';
 
export default function ImagesCarousel({ images }) {
    const renderItem = ({ item }) => {
        return (
            <Image
            source={{ uri: process.env.API_URL + "/" + item.url }}
                style={{ width: 350, height: 450 }}
            />
        );
    }
 
    return (
        <Carousel
            data={images}
            renderItem={renderItem}
            sliderWidth={350}
            borderRadius={5}
            itemWidth={350}
        />
    );
}