import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchBar from "../Components/SearchBar";
import yelp from "../api/yelp";

const SearchScreen = () => {
    const [term, setTerm] = useState('');
    const [results, setResults] = useState([]);
    const [errorMessgae, setErrorMessage] = useState('');

    const searchApi = async (searchTerm) => {
        try {
            const response = await yelp.get('/search', {
                params: {
                    limit: 50,
                    term: searchTerm,
                    location: 'London'
                }
        });
        setResults(response.data.businesses);
    } catch (err) {
        setErrorMessage('Something went wrong')
        }
    };

    return (
        <View>
            <SearchBar 
            term={term} 
            onTermChange={setTerm}
            onTermSubmit={() => searchApi(term)}
            />
           {errorMessgae ? <Text>{errorMessgae}</Text> : null}
            <Text>We have found {results.length}</Text>
        </View>
    )
};

const styles = StyleSheet.create({});

export default SearchScreen;