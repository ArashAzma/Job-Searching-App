import { View, ScrollView, SafeAreaView, RefreshControl } from "react-native";
import React from "react";
import Welcome from "../components/Welcome";
import tw from "twrnc";
import BackEndJobs from "../components/BackEndJobs";
import PopularJobs from "./../components/PopularJobs";
import FrontEndJobs from "../components/FrontEnd";
import Footer from "../components/Footer";
import MachineLearningJobs from "../components/MachineLearningJobs";
const HomeScreen = () => {
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);
    return (
        <View style={tw`flex-1 justify-center items-center`}>
            <SafeAreaView style={tw`items-center mt-12 `}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={tw`bg-[#F8F6F4]`}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <View style={tw`w-full items-center `}>
                        <Welcome />
                        <PopularJobs />
                        <BackEndJobs />
                        <FrontEndJobs />
                        <MachineLearningJobs />
                        <Footer />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

export default HomeScreen;
