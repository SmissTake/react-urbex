import { TouchableOpacity, Text } from "react-native";

const Button = ({onPress, label}) => {

    return (
        <TouchableOpacity
            onPress={ onPress }
            style={styles.button}
        >
            <Text>
                { label }
            </Text>
        </TouchableOpacity>
    );
};

export default Button;

const styles = {
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        margin: 10,
        borderRadius: 5,
        elevation: 20
    }
};