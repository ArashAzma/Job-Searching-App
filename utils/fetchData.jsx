import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useFetch = (endpoint, query) => {
    const [popularData, setPopularData] = useState([]);
    const [backEndData, setBackEndData] = useState([]);
    const [frontEndData, setFrontEndData] = useState([]);
    const [machineLearninData, setMachineLearninData] = useState([]);
    const [jobDetails, setJobDetails] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: "GET",
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
            "X-RapidAPI-Key":
                "366663fe56msh77c437bef7c21fbp1d9530jsne9d24f7764bd",
            "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
        params: { ...query },
    };
    const fetchJobDetails = async () => {
        setIsLoading(true);
        try {
            const response = await axios.request(options);
            setJobDetails(response.data.data[0]);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
        // }
    };
    const fetchPopularData = async () => {
        setIsLoading(true);
        const value = await AsyncStorage.getItem("@popular");
        if (value) {
            setPopularData(JSON.parse(value));
            console.log("FROM STORAGE");
            setIsLoading(false);
        } else {
            try {
                console.log("FROM API");
                const response = await axios.request(options);
                setPopularData(response.data.data);
                await AsyncStorage.setItem(
                    "@popular",
                    JSON.stringify(response.data.data)
                );
                setIsLoading(false);
            } catch (error) {
                setError(error);
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
    };
    const fetchBackEndData = async () => {
        setIsLoading(true);
        const value = await AsyncStorage.getItem("@backEnd");
        if (value) {
            setBackEndData(JSON.parse(value));
            console.log("FROM STORAGE");
            setIsLoading(false);
        } else {
            try {
                console.log("FROM API");
                const response = await axios.request(options);
                setBackEndData(response.data.data);
                await AsyncStorage.setItem(
                    "@backEnd",
                    JSON.stringify(response.data.data)
                );
                setIsLoading(false);
            } catch (error) {
                setError(error);
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
    };
    const fetchFrontEndData = async () => {
        setIsLoading(true);
        const value = await AsyncStorage.getItem("@frontEnd");
        if (value) {
            setFrontEndData(JSON.parse(value));
            console.log("FROM STORAGE");
            setIsLoading(false);
        } else {
            try {
                console.log("FROM API");
                const response = await axios.request(options);
                setFrontEndData(response.data.data);
                await AsyncStorage.setItem(
                    "@frontEnd",
                    JSON.stringify(response.data.data)
                );
                setIsLoading(false);
            } catch (error) {
                setError(error);
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
    };
    const fetchMachineLearningData = async () => {
        setIsLoading(true);
        const value = await AsyncStorage.getItem("@machineLearning");
        if (value) {
            setMachineLearninData(JSON.parse(value));
            console.log("FROM STORAGE");
            setIsLoading(false);
        } else {
            try {
                console.log("FROM API");
                const response = await axios.request(options);
                setMachineLearninData(response.data.data);
                await AsyncStorage.setItem(
                    "@machineLearning",
                    JSON.stringify(response.data.data)
                );
                setIsLoading(false);
            } catch (error) {
                setError(error);
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
    };
    const fetchSearchData = async () => {
        setIsLoading(true);
        // const value = await AsyncStorage.getItem("@search");
        // if (value) {
        //     setSearchData(JSON.parse(value));
        //     console.log("API SEARCH");
        //     setIsLoading(false);
        // } else {
        try {
            const response = await axios.request(options);
            setSearchData(response.data.data);
            // await AsyncStorage.setItem(
            //     "@search",
            //     JSON.stringify(response.data.data)
            // );
            setIsLoading(false);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
        // }
    };

    return {
        popularData,
        jobDetails,
        searchData,
        backEndData,
        frontEndData,
        machineLearninData,

        fetchPopularData,
        fetchBackEndData,
        fetchFrontEndData,
        fetchMachineLearningData,
        fetchJobDetails,
        fetchSearchData,
        isLoading,

        error,
    };
};

export default useFetch;
