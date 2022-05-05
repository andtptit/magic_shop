import React, { memo, useContext, useState } from 'react'
import { TouchableOpacity,Image, View, Text } from 'react-native'

import styles from './Styles/CardProduct'
import { NavigationContext } from "react-navigation"
import Format from '../Lib/NumberFormat'

const CardProduct = (props) => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const {item, ...restProps} = props
  const navigation = useContext(NavigationContext)

  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.card} {...restProps}>
      <Image source={require('../assets/temp/sp5.jpeg')} style={styles.thumb} resizeMode="cover" />
      <View style={styles.content}>
        <Text style={styles.price}>{new Format().formatMoney(item?.price + '$' ?? 0 + '$')}</Text>
        <Text style={styles.title}>{item?.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default memo(CardProduct)
