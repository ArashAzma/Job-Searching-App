import { View, Text } from "react-native";
import React, { useCallback, useState } from "react";
import tw from "twrnc";
const ReadMore = ({ text }) => {
    const [textShown, setTextShown] = useState(false);
    const [lengthMore, setLengthMore] = useState(false);
    const onTextLayout = useCallback((e) => {
        setLengthMore(e.nativeEvent.lines.length >= 6);
    }, []);
    const toggleNumberOfLines = () => {
        setTextShown(!textShown);
    };
    return (
        <View style={tw`bg-[#fff] p-2 rounded-lg `}>
            <Text
                onTextLayout={onTextLayout}
                numberOfLines={textShown ? undefined : 6}
                style={{ ...tw`text-4`, lineHeight: 21 }}
            >
                {text}
            </Text>

            {lengthMore ? (
                <Text
                    onPress={toggleNumberOfLines}
                    style={{
                        ...tw`text-blue-900`,
                        lineHeight: 21,
                        marginTop: 10,
                    }}
                >
                    {textShown ? "Read less..." : "Read more..."}
                </Text>
            ) : null}
        </View>
    );
};

export default ReadMore;
