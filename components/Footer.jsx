import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";
const Footer = () => {
    return (
        <View
            style={tw`h-15 w-full bg-[#311D3F] items-center justify-center mt-4 bg-opacity-95`}
        >
            <Text style={tw`text-white`}>
                "© Arash 2023 | All Rights Reserved
            </Text>
        </View>
    );
};

export default Footer;
