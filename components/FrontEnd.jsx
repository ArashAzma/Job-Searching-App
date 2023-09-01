import { View, Text, Dimensions, FlatList } from "react-native";
import React, { useEffect } from "react";
import useFetch from "../utils/fetchData";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import JobCard from "./JobCard";
import LoadingScreen from "./LoadingScreen";
const FrontEndJobs = () => {
    const { width } = Dimensions.get("window");
    const { frontEndData, isLoading, error, fetchFrontEndData } = useFetch(
        "search",
        {
            query: "Front-End",
            num_pages: 1,
        }
    );
    const navigation = useNavigation();
    useEffect(() => {
        fetchFrontEndData();
    }, []);
    const handleJobPress = (id) => {
        navigation.navigate("JobDetails", { id });
    };
    return (
        <View style={tw``}>
            <SafeAreaView>
                <View
                    style={{
                        ...tw`px-4 h-60`,
                        width,
                    }}
                >
                    {isLoading ? (
                        <LoadingScreen />
                    ) : (
                        <>
                            <Text style={tw`text-xl font-bold mb-4`}>
                                Front-End Developers
                            </Text>
                            <FlatList
                                data={frontEndData}
                                horizontal
                                ItemSeparatorComponent={
                                    <View style={tw`w-4`}></View>
                                }
                                showsHorizontalScrollIndicator={false}
                                renderItem={(item) => {
                                    const { item: job } = item;
                                    return (
                                        <JobCard
                                            job={job}
                                            handleJobPress={handleJobPress}
                                        />
                                    );
                                }}
                            />
                        </>
                    )}
                </View>
            </SafeAreaView>
        </View>
    );
};

export default FrontEndJobs;
