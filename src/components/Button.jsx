import { TouchableOpacity, Text } from "react-native";

const Button = ({onPress, label, styleButton, styleLabel}) => {

    return (
        <TouchableOpacity
            onPress={ onPress }
            style={styleButton ? styleButton : styles.button}
        >
            <Text
                style={styleLabel ? styleLabel : styles.label}
            >
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
    },
    label: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black"
    }
};