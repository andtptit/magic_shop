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
                <Text style={styles.price}>{formatMoney(250000) + ' VN??'}</Text>
                <Text style={styles.title}>{data.title}</Text>
                <Text style={styles.stock}>Kho: {stock} c??i</Text>
              </View>
              <View style={styles.descSec}>
                <Text style={styles.descTitle}>M?? t???:</Text>
                <Text style={styles.desc}>
                TH??NG TIN ??o thun tay l??? form r???ng Crying Over 
                1. Ki???u d??ng: ??o thun form r???ng Crying Over mang ki???u d??ng unisex, form r???ng, d??ng su??ng. ??o ???????c in m???t tr?????c l?? h??nh ???nh ngh??? thu???t v?? t??n th????ng hi???u c???a shop, l?? ki???u ??o ph??ng c??? tr??n trendy c???a genz.
                </Text>
              </View>
            </ScrollView>

            <View style={OS === 'ios' ? styles.iosFooter : styles.footer}>
              <View style={styles.qty}>
                <Text style={styles.qtyLabel}>S??? l?????ng: </Text>
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
