import { View, TextInput, TouchableWithoutFeedback } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import React from "react";
import tw from "twrnc";
const SearchInput = ({ handleSearch, search, setSearch }) => {
    return (
        <View style={tw`flex-1 flex-row justify-between`}>
            <TextInput
                style={tw`bg-[#F4EEEE] h-15 px-2 w-[80%] rounded-lg`}
                value={search}
                onChangeText={(text) => setSearch(text)}
                placeholder='What are you looking for?'
                onSubmitEditing={handleSearch}
            />
            <TouchableWithoutFeedback onPress={handleSearch}>
                <View
                    style={tw`h-15 w-15 bg-[#FF6000] items-center justify-center rounded-lg`}
                >
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        size={24}
                        color='white'
                    />
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default SearchInput;
