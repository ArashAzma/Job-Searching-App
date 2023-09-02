import {
    View,
    Text,
    Dimensions,
    ScrollView,
    Image,
    Linking,
    TouchableOpacity,
    ActivityIndicator,
    TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import {
    useFocusEffect,
    useNavigation,
    useRoute,
} from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import useFetch from "../utils/fetchData";
import tw from "twrnc";
import ReadMore from "../components/ReadMore";
import ArrayList from "../components/ArrayList";
import ScrollButton from "../components/ScrollButton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons/faLink";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as lineHeart } from "@fortawesome/free-regular-svg-icons";
import { dbContext } from "../utils/database";
const JobScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;
    const { db } = useContext(dbContext);
    const { width } = Dimensions.get("window");
    const [liked, setLiked] = useState(false);
    const [activeAbout, setActiveAbout] = useState(true);
    const [activeReviews, setActiveReviews] = useState(false);
    const [activeOptions, setActiveOptions] = useState(false);
    const [activeResponses, setActiveResponses] = useState(false);
    const [activeQualification, setActiveQualification] = useState(false);

    const { jobDetails, isLoading, error, fetchJobDetails } = useFetch(
        "job-details",
        {
            job_id: id,
            extended_publisher_details: "false",
        }
    );
    useEffect(() => {
        fetchJobDetails();
    }, []);
    const handleActive = (activeState) => {
        setActiveAbout(activeState == "About");
        setActiveReviews(activeState == "Reviews");
        setActiveOptions(activeState == "Options");
        setActiveResponses(activeState == "Responses");
        setActiveQualification(activeState == "Qualifications");
    };
    const handleBackPress = () => {
        navigation.goBack();
    };
    const handleLike = async () => {
        try {
            if (!liked) {
                setLiked(true);
                db.transaction((tx) => {
                    tx.executeSql(
                        "INSERT INTO LIKES (jobID, employer_logo, employer_name, job_title, job_city) VALUES (?, ?, ?, ?, ?)",
                        [
                            jobDetails?.job_id,
                            jobDetails?.employer_logo,
                            jobDetails?.employer_name,
                            jobDetails?.job_title,
                            jobDetails?.job_city,
                        ],
                        (_, results) => {
                            // Success callback
                            console.log("Insert successful");
                        },
                        (_, error) => {
                            // Error callback
                            console.error("Insert error: ", error);
                            setLiked(false);
                            return true;
                        }
                    );
                });
            } else {
                setLiked(false);
                await db.transaction(async (tx) => {
                    await tx.executeSql(
                        "DELETE FROM LIKES WHERE jobID = ?",
                        [job.job_id],
                        (_, results) => {
                            if (results.rowsAffected > 0) {
                                console.log(
                                    "Row with job_id " +
                                        job.job_id +
                                        " deleted."
                                );
                            } else {
                                console.log(
                                    "No rows with job_id " +
                                        job.job_id +
                                        " found."
                                );
                                setLiked(true);
                            }
                        },
                        (_, error) => {
                            // Error callback
                            setLiked(true);
                            console.error("Delete error: ", error);
                        }
                    );
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    const checkIfIsLiked = () => {
        return new Promise((resolve, reject) => {
            try {
                db.transaction((tx) => {
                    tx.executeSql(
                        "SELECT * FROM LIKES WHERE jobID = ?",
                        [jobDetails?.job_id || jobDetails?.jobID],
                        (_, { rows }) => {
                            if (rows?.length > 0) {
                                resolve(true);
                            } else {
                                resolve(false);
                            }
                        },
                        (_, error) => {
                            console.error("Select error: ", error);
                            reject(error);
                        }
                    );
                });
            } catch (error) {
                console.error(error);
                reject(error);
            }
        });
    };
    useFocusEffect(
        React.useCallback(() => {
            checkIfIsLiked()
                .then((isLiked) => {
                    setLiked(isLiked);
                })
                .catch((error) => {
                    console.error(error);
                });
        }, [])
    );
    if (error) {
        return (
            <View>
                <SafeAreaView style={tw` bg-[#F8F6F4] p-3 mb-8`}>
                    <View style={tw`h-full items-center justify-center`}>
                        <Text style={tw`text-xl text-red-700 font-semibold`}>
                            There was an error
                        </Text>
                    </View>
                </SafeAreaView>
            </View>
        );
    }
    return (
        <View>
            <SafeAreaView style={tw` bg-[#F8F6F4] p-3 mb-8`}>
                <View style={tw`flex-row w-full justify-between mb-2 px-2`}>
                    <TouchableOpacity onPress={handleBackPress}>
                        <View style={tw`bg-blue-400 p-2 rounded-lg`}>
                            <FontAwesomeIcon
                                icon={faArrowLeft}
                                size={22}
                                color='white'
                            />
                        </View>
                    </TouchableOpacity>
                    {!liked ? (
                        <TouchableWithoutFeedback onPress={handleLike}>
                            <View style={tw`bg-[#FF6000] p-2 rounded-lg`}>
                                <FontAwesomeIcon
                                    icon={lineHeart}
                                    size={22}
                                    style={tw`text-white `}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    ) : (
                        <TouchableWithoutFeedback onPress={handleLike}>
                            <View style={tw`bg-[#FF6000] p-2 rounded-lg`}>
                                <FontAwesomeIcon
                                    icon={fullHeart}
                                    size={22}
                                    style={tw`text-white `}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                </View>
                <ScrollView
                    ref={(ref) => (this.scrollViewRef = ref)}
                    showsVerticalScrollIndicator={false}
                >
                    {isLoading ? (
                        <View style={tw`h-200 justify-center `}>
                            <ActivityIndicator size={42} />
                        </View>
                    ) : (
                        <View style={tw`p-6 rounded-xl gap-6 mb-8`}>
                            {/* image */}
                            <View style={tw`shadow-xl  items-center`}>
                                <Image
                                    source={{
                                        uri: jobDetails?.employer_logo,
                                    }}
                                    style={{
                                        ...tw`h-20 rounded-lg`,
                                        width: width / 4.6,
                                    }}
                                    resizeMode='contain'
                                />
                            </View>
                            {/* title */}
                            <View>
                                <Text
                                    style={tw`font-bold text-center text-2xl mb-2`}
                                >
                                    {jobDetails?.job_title}
                                </Text>
                                <View
                                    style={tw`flex-row gap-x-1 justify-center `}
                                >
                                    {jobDetails?.job_country && (
                                        <View>
                                            <Text>
                                                {jobDetails?.job_country} -
                                            </Text>
                                        </View>
                                    )}
                                    {jobDetails?.job_state && (
                                        <View>
                                            <Text>
                                                {jobDetails?.job_state} -
                                            </Text>
                                        </View>
                                    )}
                                    {jobDetails?.job_city && (
                                        <View>
                                            <Text>{jobDetails?.job_city} </Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                            {/* scrolls */}
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={tw`mb-6 `}
                            >
                                {jobDetails?.job_description?.length > 0 && (
                                    <ScrollButton
                                        title='About'
                                        y={this.aboutLayout?.y}
                                        active={activeAbout}
                                        handleActive={handleActive}
                                    />
                                )}
                                {jobDetails?.job_highlights?.Qualifications
                                    ?.length > 0 && (
                                    <ScrollButton
                                        title='Qualifications'
                                        y={this.qualificationsLayout?.y}
                                        active={activeQualification}
                                        handleActive={handleActive}
                                    />
                                )}
                                {jobDetails?.job_highlights?.Responsibilities
                                    ?.length > 0 && (
                                    <ScrollButton
                                        title='Responses'
                                        y={this.respLayout?.y}
                                        active={activeResponses}
                                        handleActive={handleActive}
                                    />
                                )}
                                {jobDetails?.apply_options?.length > 0 && (
                                    <ScrollButton
                                        title='Options'
                                        y={this.optionsLayout?.y}
                                        active={activeOptions}
                                        handleActive={handleActive}
                                    />
                                )}
                                {jobDetails?.employer_reviews?.length > 0 && (
                                    <ScrollButton
                                        title='Reviews'
                                        y={this.reviewsLayout?.y}
                                        active={activeReviews}
                                        handleActive={handleActive}
                                    />
                                )}
                            </ScrollView>
                            {/* about */}
                            <View
                                onLayout={(event) =>
                                    (this.aboutLayout =
                                        event.nativeEvent.layout)
                                }
                            >
                                <Text style={tw`text-xl font-bold mb-2`}>
                                    About the job
                                </Text>
                                <ReadMore text={jobDetails?.job_description} />
                            </View>
                            {/* Qualifications */}
                            {jobDetails?.job_highlights?.Qualifications
                                ?.length > 0 && (
                                <View
                                    onLayout={(event) =>
                                        (this.qualificationsLayout =
                                            event.nativeEvent.layout)
                                    }
                                >
                                    <ArrayList
                                        title='Qualifications'
                                        data={
                                            jobDetails?.job_highlights
                                                ?.Qualifications
                                        }
                                    />
                                </View>
                            )}
                            {/* resposibilites */}
                            {jobDetails?.job_highlights?.Responsibilities
                                ?.length > 0 && (
                                <View
                                    onLayout={(event) =>
                                        (this.respLayout =
                                            event.nativeEvent.layout)
                                    }
                                >
                                    <ArrayList
                                        title='Responsibilities'
                                        data={
                                            jobDetails?.job_highlights
                                                ?.Responsibilities
                                        }
                                    />
                                </View>
                            )}
                            {/* options */}
                            {jobDetails?.apply_options?.length > 0 && (
                                <View>
                                    <Text style={tw`text-xl font-bold mb-2`}>
                                        Apply options
                                    </Text>
                                    <View
                                        style={tw`flex-row gap-4`}
                                        onLayout={(event) =>
                                            (this.optionsLayout =
                                                event.nativeEvent.layout)
                                        }
                                    >
                                        {jobDetails?.apply_options?.map(
                                            (option) => {
                                                const {
                                                    publisher,
                                                    apply_link,
                                                } = option;
                                                return (
                                                    <View
                                                        style={tw`flex-row gap-2 items-center justify-center bg-white rounded-lg px-2 py-1 w-25`}
                                                    >
                                                        <Text
                                                            style={tw`text-4 `}
                                                        >
                                                            {publisher}
                                                        </Text>
                                                        <Text
                                                            style={{
                                                                color: "blue",
                                                            }}
                                                            onPress={() =>
                                                                Linking.openURL(
                                                                    {
                                                                        apply_link,
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faLink}
                                                                color='blue'
                                                            />
                                                        </Text>
                                                    </View>
                                                );
                                            }
                                        )}
                                    </View>
                                </View>
                            )}
                            {/* Reviews */}
                            {jobDetails?.employer_reviews?.length > 0 && (
                                <View
                                    onLayout={(event) =>
                                        (this.reviewsLayout =
                                            event.nativeEvent.layout)
                                    }
                                >
                                    <Text style={tw`text-xl font-bold`}>
                                        Reviews
                                    </Text>
                                    <ScrollView
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                    >
                                        {jobDetails?.employer_reviews?.map(
                                            (rew) => {
                                                return (
                                                    <View
                                                        style={tw`flex-row gap-2 items-center justify-center bg-white rounded-lg px-2 py-1 mr-4`}
                                                    >
                                                        <Text>
                                                            {rew.publisher}
                                                        </Text>
                                                        <Text>{rew.score}</Text>
                                                        <Text
                                                            style={{
                                                                color: "blue",
                                                            }}
                                                            onPress={() =>
                                                                Linking.openURL(
                                                                    rew.reviews_link
                                                                )
                                                            }
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faLink}
                                                                color='blue'
                                                            />
                                                        </Text>
                                                    </View>
                                                );
                                            }
                                        )}
                                    </ScrollView>
                                </View>
                            )}
                        </View>
                    )}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

export default JobScreen;
