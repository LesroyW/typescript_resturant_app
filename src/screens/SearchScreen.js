import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SearchBar from "../Components/SearchBar";
import useResults from "../hooks/useResults";
import ResultsList from "../Components/ResultsList";


const SearchScreen = () => {
    const [term, setTerm] = useState('');
    const [searchApi, results, errorMessage] = useResults();

    console.log(results);

    const filterResultsByPrice = (price) => {
        return results.filter(result => {
            return result.price === price;
        });
    };

    return (
        <View>
            <SearchBar 
            term={term} 
            onTermChange={setTerm}
            onTermSubmit={() => searchApi(term)}
            />
           {errorMessage ? <Text>{errorMessage}</Text> : null}
            <Text>We have found {results.length}</Text>
            <ScrollView>
            <ResultsList title="Cost Effective" results={filterResultsByPrice('£')}/>
            <ResultsList title="Bit Pricer" results={filterResultsByPrice('££')}/>
            <ResultsList title="Big Spender" results={filterResultsByPrice('£££')}/>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({});

export default SearchScreen;