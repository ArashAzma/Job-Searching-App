import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import tw from "twrnc";
import { dbContext } from "../utils/database";
import JobCard from "../components/JobCard";
import SearchJobCard from "../components/searchJobCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const LikesScreen = () => {
    const { db } = useContext(dbContext);
    const [data, setData] = useState([]);
    const navigation = useNavigation();
    const handleJobPress = (id) => {
        navigation.navigate("JobDetails", { id });
    };
    const readDataFromTable = async () => {
        try {
            console.log("Data from the LIKES table:");
            await db.transaction(async (tx) => {
                tx.executeSql(
                    "SELECT * FROM LIKES",
                    [],
                    (_, { rows }) => {
                        const data = rows._array; // Convert the result to an array
                        setData(data);
                        console.log("Data from the LIKES table:", data);
                    },
                    (_, error) => {
                        console.error("Select error: ", error);
                    }
                );
            });
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        readDataFromTable();
    }, []);
    return (
        <View style={tw`bg-[#F8F6F4] h-full items-center`}>
            <SafeAreaView style={tw`h-full items-center w-full px-4 py-8`}>
                <View
                    style={tw`my-8 bg-[#FF6000] w-full items-center p-2 py-4 rounded-lg`}
                >
                    <Text style={tw`text-2xl font-semibold text-white`}>
                        Your liked Jobs
                    </Text>
                </View>
                <FlatList
                    data={data}
                    ItemSeparatorComponent={<View style={tw`w-4 h-4`}></View>}
                    showsVerticalScrollIndicator={false}
                    renderItem={(item) => {
                        const { item: job } = item;
                        return (
                            <SearchJobCard
                                job={job}
                                handleJobPress={handleJobPress}
                                key={item.id}
                            />
                        );
                    }}
                    keyExtractor={(item) => item.id}
                />
            </SafeAreaView>
        </View>
    );
};

export default LikesScreen;
