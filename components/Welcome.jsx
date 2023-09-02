import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import SearchInput from "./SearchInput";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
const Welcome = () => {
    const navigation = useNavigation();
    const [search, setSearch] = useState("");
    const [dropOpen, setDropOpen] = useState(false);

    const handleLikes = () => {
        setDropOpen(false);
        navigation.navigate("Likes", { search });
    };
    const handleSearch = () => {
        navigation.navigate("Search", { search });
    };
    return (
        <View style={tw`h-40 w-full p-4 gap-y-4`}>
            <View style={tw`flex-row justify-between`}>
                <View>
                    <TouchableOpacity onPress={() => setDropOpen(!dropOpen)}>
                        <FontAwesomeIcon icon={faBars} size={22} />
                    </TouchableOpacity>
                    {dropOpen && (
                        <View
                            style={tw` w-65 bg-white absolute z-5 top-10 rounded-lg shadow-xl px-4 py-8 gap-4`}
                        >
                            <View>
                                <TouchableOpacity
                                    onPress={handleLikes}
                                    style={tw`flex-row items-center justify-between bg-gray-400 py-4 px-4 rounded-lg bg-opacity-80`}
                                >
                                    <Text
                                        style={tw`text-white font-semibold text-xl`}
                                    >
                                        Liked Jobs
                                    </Text>
                                    <FontAwesomeIcon
                                        icon={faArrowRight}
                                        size={22}
                                        color='white'
                                    />
                                </TouchableOpacity>
                            </View>
                            <View
                                style={tw`w-22 bg-gray-400 py-4 px-4 rounded-lg bg-opacity-80`}
                            >
                                <Text
                                    style={tw`text-white font-black text-xl `}
                                >
                                    Arash
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
            </View>
            <View style={tw`flex-0.5`}>
                <Text style={tw`font-bold text-xl`}>Find your perfect job</Text>
            </View>
            <SearchInput
                handleSearch={handleSearch}
                search={search}
                setSearch={setSearch}
            />
        </View>
    );
};

export default Welcome;
