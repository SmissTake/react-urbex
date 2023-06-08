import Carousel from 'react-native-snap-carousel';
import { Image } from 'react-native';
 
export default function ImagesCarousel({ images }) {
    const renderItem = ({ item }) => {
        return (
            <Image
            source={{ uri: process.env.API_URL + "/" + item.url }}
                style={{ width: 300, height: 300 }}
            />
        );
    }
 
    return (
        <Carousel
            data={images}
            renderItem={renderItem}
            sliderWidth={300}
            itemWidth={300}
        />
    );
}