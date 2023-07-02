import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

const Button = ({
        onPress,
        label,
        styleButton,
        styleLabel,
        disabled,
        loading,
    }) => {

    return (
        <TouchableOpacity
            onPress={ onPress }
            style={[styleButton ? styleButton : styles.button, disabled && styles.disabledButton]}
            disabled={disabled}
        >
            {loading && <ActivityIndicator size="small" color="#0000ff" />}

            {!loading && 
            <Text
                style={styleLabel ? styleLabel : styles.label}
            >
                { label }
            </Text>}
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
    },
    disabledButton: {
        opacity: 0.5,
    },
};