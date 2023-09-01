import { TouchableHighlight, Text, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
const ScrollButton = ({ title, y, active, handleActive }) => {
    return (
        <TouchableOpacity
            onPress={() => {
                this.scrollViewRef.scrollTo({
                    y,
                    animated: true,
                });
                handleActive(title);
            }}
            style={tw`${
                active ? "bg-blue-900" : "bg-white"
            } rounded-lg p-1 px-2 mr-2`}
        >
            <Text style={tw`${active ? "text-white" : ""}`}>{title}</Text>
        </TouchableOpacity>
    );
};

export default ScrollButton;
