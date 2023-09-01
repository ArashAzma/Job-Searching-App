import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as lineHeart } from "@fortawesome/free-regular-svg-icons";
import { dbContext } from "../utils/database";
import tw from "twrnc";
import { useFocusEffect } from "@react-navigation/native";
const JobCard = ({ job, handleJobPress }) => {
    const { db } = useContext(dbContext);
    const [liked, setLiked] = useState(false);
    const { width } = Dimensions.get("window");
    const checkIfIsLiked = () => {
        return new Promise((resolve, reject) => {
            try {
                db.transaction((tx) => {
                    tx.executeSql(
                        "SELECT * FROM LIKES WHERE jobID = ?",
                        [job.job_id],
                        (_, { rows }) => {
                            if (rows.length > 0) {
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
    const handleLike = async () => {
        try {
            if (!liked) {
                setLiked(true);
                db.transaction((tx) => {
                    tx.executeSql(
                        "INSERT INTO LIKES (jobID, employer_logo, employer_name, job_title, job_city) VALUES (?, ?, ?, ?, ?)",
                        [
                            job.job_id,
                            job.employer_logo,
                            job.employer_name,
                            job.job_title,
                            job.job_city,
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
    return (
        <TouchableOpacity onPress={() => handleJobPress(job.job_id)}>
            <View style={tw`w-70 bg-white rounded-md h-45 relative gap-2`}>
                {!liked ? (
                    <TouchableWithoutFeedback onPress={handleLike}>
                        <View>
                            <FontAwesomeIcon
                                icon={lineHeart}
                                size={24}
                                style={tw`text-[#FF6000] absolute top-5 right-5`}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                ) : (
                    <TouchableWithoutFeedback onPress={handleLike}>
                        <View>
                            <FontAwesomeIcon
                                icon={fullHeart}
                                size={24}
                                style={tw`text-[#FF6000] absolute top-5 right-5`}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                )}
                <View style={tw` rounded-lg`}>
                    <Image
                        source={{
                            uri: job.employer_logo,
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
                        {job.employer_name}
                    </Text>
                    <Text
                        style={tw`font-semibold text-[4.2]`}
                        numberOfLines={1}
                    >
                        {job.job_title}
                    </Text>
                    <Text style={tw`font-semibold `} numberOfLines={1}>
                        {job.job_city}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default JobCard;
