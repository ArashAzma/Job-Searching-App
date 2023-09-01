import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    Dimensions,
    ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import useFetch from "../utils/fetchData";
import tw from "twrnc";
import SearchJobCard from "../components/searchJobCard";
import SearchInput from "../components/SearchInput";
import LoadingScreen from "../components/LoadingScreen";
const SearchScreen = () => {
    const { width } = Dimensions.get("window");
    const [search, setSearch] = useState("");
    const route = useRoute();
    const navigation = useNavigation();
    const { search: value } = route.params;
    const { searchData, isLoading, error, fetchSearchData } = useFetch(
        "search",
        {
            query: value,
            num_pages: 1,
        }
    );
    const handleSearch = () => {
        navigation.push("Search", { search });
    };
    const handleJobPress = (id) => {
        navigation.navigate("JobDetails", { id });
    };
    useEffect(() => {
        fetchSearchData();
    }, []);
    return (
        <View style={tw`bg-[#F8F6F4]`}>
            <SafeAreaView>
                {isLoading ? (
                    <ScrollView>
                        <SafeAreaView style={tw`flex-1 gap-y-12 mt-26 px-8`}>
                            <LoadingScreen />
                            <LoadingScreen />
                            <LoadingScreen />
                            <LoadingScreen />
                            <LoadingScreen />
                            <LoadingScreen />
                        </SafeAreaView>
                    </ScrollView>
                ) : (
                    <View style={tw`items-center mt-8`}>
                        <View style={tw`h-20`}>
                            <SearchInput
                                handleSearch={handleSearch}
                                search={search}
                                setSearch={setSearch}
                            />
                        </View>
                        <FlatList
                            data={searchData}
                            ItemSeparatorComponent={
                                <View style={tw`w-4 h-4`}></View>
                            }
                            showsVerticalScrollIndicator={false}
                            renderItem={(item) => {
                                const { item: job } = item;
                                return (
                                    <SearchJobCard
                                        job={job}
                                        handleJobPress={handleJobPress}
                                        key={job.id}
                                    />
                                );
                            }}
                            keyExtractor={(item) => item.id}
                        />
                    </View>
                )}
            </SafeAreaView>
        </View>
    );
};

export default SearchScreen;
