import React, { useState, useEffect } from 'react'
import {
  KeyboardAvoidingView,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TextInput,
  StatusBar,
  Platform,
  Image,
  View,
  Text
} from 'react-native'
import { connect } from 'react-redux'
import ArrowBack from '../Components/ArrowBack'
import Button from '../Components/Button'
import Format from '../Lib/NumberFormat'

import OrderActions from '../Redux/OrderRedux'

import styles from './Styles/ProductDetailStyle'
import HeaderStyle from '../Navigation/Styles/NavigationStyles'
import { apply } from '../Lib/OsmiProvider'
import { stringify } from 'querystringify'

const { width } = Dimensions.get('window')
const OS = Platform.OS

const ProductDetail = props => {
  const { detail, navigation } = props
  const { data }  = detail
  // const stocks = navigation.getParam('stock', 0)
  const stocks = '5'
  const { formatMoney } = new Format()

  //State
  const [stock, setStock] = useState(stocks)
  const [qty, setQty] = useState(1)

  const nextEvent = () => {
    props.makeOrder({
      product_id: data.id,
      qty
    })
  }

  const onBuy = () => {
    if(props.user === null) {
      props.navigation.navigate('LoginScreen', { event: nextEvent })
    } else {
      props.makeOrder({
        product_id: data.id,
        qty
      })
    }
  }

  const onMin = () => {
    if(qty > stock) {
      setQty(stock)
    } else if(qty <= 1) {
      setQty(1)
    } else {
      setQty(qty-1)
    }
  }

  const onPlus = () => {
    qty < stock ? setQty(qty+1) : setQty(stock)
  }

  const onChange = (value) => {
    Number(value) > stock ? setQty(stock) : setQty(Number(value))
  }

  return (
    <SafeAreaView style={apply('bg-gray-100 flex')}>
      <StatusBar backgroundColor={apply("blue-500")} barStyle='light-content' />

        {detail?.fetching ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={apply('gray-900')} />
          </View>
        ) : (
          <KeyboardAvoidingView style={apply('flex')} behavior={OS === "ios" ? "padding" : null}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
              <Image style={{width: width, height: width}} resizeMode='cover' source={require('../assets/temp/sp5.jpeg')} />
              <View style={styles.detailSec}>
                <Text style={styles.price}>{formatMoney(250000) + ' VNĐ'}</Text>
                <Text style={styles.title}>{data.title}</Text>
                <Text style={styles.stock}>Kho: {stock} cái</Text>
              </View>
              <View style={styles.descSec}>
                <Text style={styles.descTitle}>Mô tả:</Text>
                <Text style={styles.desc}>
                THÔNG TIN Áo thun tay lỡ form rộng Crying Over 
                1. Kiểu dáng: Áo thun form rộng Crying Over mang kiểu dáng unisex, form rộng, dáng suông. Áo được in mặt trước là hình ảnh nghệ thuật và tên thương hiệu của shop, là kiểu áo phông cổ tròn trendy của genz.
                </Text>
              </View>
            </ScrollView>

            <View style={OS === 'ios' ? styles.iosFooter : styles.footer}>
              <View style={styles.qty}>
                <Text style={styles.qtyLabel}>Số lượng: </Text>
                <Button text='-' style={styles.btnQty} onPress={() => onMin()} />
                <TextInput style={styles.qtyInput} maxLength={4} onChangeText={(value) => onChange(value)} keyboardType='numeric' value={qty.toString()} underlineColorAndroid={apply('gray-500')} />
                <Button text='+' style={styles.btnQty} onPress={() => onPlus()} />
              </View>
              <Button text='Mua Ngay' onPress={() => onBuy()} style={styles.btnBuy} textStyle={styles.btnBuyLabel}/>
            </View>
          </KeyboardAvoidingView>
        )}
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  detail: state.products.detail,
  user: state.session.user
})

const mapDispatchToProps = (dispatch) => ({
  makeOrder: (value) => dispatch(OrderActions.makeOrderRequest(value))
})

ProductDetail.navigationOptions = ({ navigation }) => {
  const { params = {} } = navigation.state

  return {
    headerStyle: HeaderStyle.default,
    headerTitle: navigation.getParam('title', 'Product Detail'),
    headerLeft: () => <ArrowBack />,
    headerRight: () => <View />,
    headerTitleContainerStyle: {left: OS === 'ios' ? 0 : 55}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
