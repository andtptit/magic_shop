import React, {useContext, useState} from 'react'
import { SafeAreaView, StatusBar, ScrollView, TextInput, View } from 'react-native'
import Icon from "react-native-vector-icons/Feather"

import { apply } from "../Lib/OsmiProvider";
import styles from './Styles/SearchComponentStyles'

const SearchComponent = (props) => {
  const {...restProps} = props
  const [textSearch, setTextSearch] = useState('')

  const handleSubmit = (key) => {

    console.log('textSearch', key)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={apply('p-5')}>
            <View style={styles.inputForm}>
                <Icon name="search" size={20} />
                <TextInput
                placeholder="Tìm Kiếm"
                onChangeText={(value) => setTextSearch(value)}
                value={textSearch}
                style={styles.inputText}
                onKeyPress={ (event) => {
                    console.log(event.nativeEvent.key)
                    if(event.nativeEvent.key == "Enter"){
                        console.log(event.nativeEvent.key)
                        // () => handleSubmit(event.nativeEvent.key)
                        // this.signIn();
                    } 
                    else {
                        // alert('Something else Pressed') 
                        }
                    }
                }
                />
            </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SearchComponent
