import { View, Text, ScrollView } from "react-native";
import React from "react";
import ContentLoader from "react-native-easy-content-loader";

const LoadingScreen = () => {
    return (
        <ContentLoader
            active
            avatar
            pRows={3}
            pWidth={["100%", 200, "25%"]}
            pHeight={[15, 15, 15]}
        />
    );
};

export default LoadingScreen;
