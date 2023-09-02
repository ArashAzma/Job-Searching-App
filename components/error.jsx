import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { useNavigation } from "@react-navigation/native";
const Error = () => {
    const navigation = useNavigation();
    const handleBackPress = () => {
        navigation.goBack();
    };
    return (
        <View>
            <SafeAreaView style={tw` bg-[#F8F6F4] p-3 mb-8`}>
                <View style={tw`h-full items-center justify-center`}>
                    <TouchableOpacity onPress={handleBackPress}>
                        <View style={tw`bg-blue-400 p-2 rounded-lg`}>
                            <FontAwesomeIcon
                                icon={faArrowLeft}
                                size={32}
                                color='white'
                            />
                        </View>
                    </TouchableOpacity>
                    <Text style={tw`text-xl text-red-700 font-semibold`}>
                        There was an error
                    </Text>
                </View>
            </SafeAreaView>
        </View>
    );
};

export default Error;
