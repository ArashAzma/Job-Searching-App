import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";
const ArrayList = ({ title, data }) => {
    return (
        <View>
            <Text style={tw`font-bold text-xl mb-4`}>{title}</Text>
            <View style={tw` bg-[#fff] rounded-lg p-2`}>
                {data?.map((output) => {
                    return (
                        <View style={tw`mb-2`} hey={output.toString()}>
                            <Text style={tw`text-4 font-semibold`}>
                                {output}
                            </Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

export default ArrayList;
