import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import React from "react";
import tw from "twrnc";
const SearchJobCard = ({ job, handleJobPress }) => {
    const { width } = Dimensions.get("window");
    return (
        <TouchableOpacity onPress={() => handleJobPress(job?.job_id)}>
            <View
                style={tw` flex-row w-90 bg-white rounded-md py-4  gap-2 items-center relative`}
            >
                <View style={tw` rounded-lg`}>
                    <Image
                        source={{
                            uri: job?.employer_logo,
                        }}
                        style={{
                            ...tw`h-20 rounded-lg`,
                            width: width / 4.6,
                        }}
                        resizeMode='contain'
                    />
                </View>
                <View style={tw`px-2 `}>
                    <Text style={tw`font-semibold opacity-50`}>
                        {job?.employer_name}
                    </Text>
                    <Text
                        style={tw`font-semibold text-[4.2] w-60`}
                        numberOfLines={2}
                    >
                        {job?.job_title}
                    </Text>
                    <Text style={tw`font-semibold `} numberOfLines={1}>
                        {job?.job_city}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default SearchJobCard;
