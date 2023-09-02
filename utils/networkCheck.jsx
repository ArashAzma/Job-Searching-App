import React from "react";
import NetInfo from "@react-native-community/netinfo";
import { useState } from "react";
import { Text, View } from "react-native";
import tw from "twrnc";

const NetworkCheck = () => {
    const [online, setOnline] = useState(true);
    NetInfo.fetch().then((state) => {
        console.log(state.isInternetReachable);
        setOnline(state.isInternetReachable);
    });

    return (
        <View
            style={tw`${
                online ? "hidden" : ""
            } w-full h-15 absolute top-10 right-0 bg-red-700 shadow-2xl items-center justify-center`}
        >
            <Text style={tw`text-white text-xl font-black`}>
                You are currently offline !
            </Text>
        </View>
    );
};
export default NetworkCheck;
