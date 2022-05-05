import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  FlatList,
  View,
  Text,
  StatusBar,
  ScrollView
} from 'react-native'
import { connect } from "react-redux";
import ProductsActions from "../Redux/ProductsRedux";
import CardProduct from '../Components/CardProduct'

import styles from './Styles/HomeStyle'
import HeaderStyle from "../Navigation/Styles/NavigationStyles";
import { apply } from '../Lib/OsmiProvider'
import ImagesSwiper from "react-native-image-swiper";
import SearchComponent from '../Components/SearchComponent';

const Home = props => {
  const { products, navigation } = props
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    props.getProductsList({ params: '?page=1' })
  }, [])

  const pullRefresh = () => {
    props.getProductsList({ params: '?page=1' })
  }

  const renderItem = ({ item, index }) => (
    <CardProduct
      item={item}
      onPress={() => onPress(item)}
    />
  )

  const onEndReached = async() => {
    const { page, lastPage, isLoadMore } = props.products

    if (!isLoadMore && (page < lastPage)) {
      const newPage = page + 1

      props.moreProducts({ params: `?page=${newPage}`, page: newPage })
    }
  }

  const onPress = (item) => {
    props.getDetail('/' + item?.slug)
    navigation.navigate('ProductDetail', {title: item.title, stock: item.stock})
  }

  const customImg = [
    "https://firebasestorage.googleapis.com/v0/b/lotapp-9e84d.appspot.com/o/aster.jpg?alt=media&token=166e66b0-9c8e-4803-918e-25762c58dbda",
    "https://firebasestorage.googleapis.com/v0/b/lotapp-9e84d.appspot.com/o/fan.jpg?alt=media&token=b419d507-9de8-4c4c-97e3-6b4eb2202e68",
    "https://firebasestorage.googleapis.com/v0/b/lotapp-9e84d.appspot.com/o/stone.jpg?alt=media&token=e9d41537-7f26-4bfd-86eb-c2ef6fc58a9c"
  ];

  return (
    <SafeAreaView style={apply('flex bg-gray-100 p-3')}>
      <SearchComponent style={apply('h-25')}/>
      {products?.fetching ? (
        <View style={styles.emptyState}>
          <ActivityIndicator size="large" color={apply('gray-900')} />
        </View>
      ) : (
        <View style={{flex: 1}}>
            {/* <ScrollView>
              <Text style={styles.title}>Top Sản Phẩm Khuyến Mãi</Text>
              <ImagesSwiper
                images={customImg}
                autoplay={true} 
                autoplayTimeout={1.5}
                showsPagination={true}
                width={400} 
                height={200} 
              /> */}
            <FlatList
              data={products.data}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              initialNumToRender={8}
              contentContainerStyle={apply('bg-gray-100 py-2')}
              renderItem={renderItem}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={() => pullRefresh()} />
              }
              onEndReached={onEndReached}
              horizontal={false}
              numColumns={2}
              key={2}
              onEndReachedThreshold={0.1}
              ListEmptyComponent={() =>
                <View style={styles.emptyState}>
                  <Text>No data.</Text>
                </View>
              }
              ListFooterComponent={() =>
                products?.isLoadMore && (
                  <View style={styles.emptyState}>
                    <ActivityIndicator size="large" color={apply("gray-900")} />
                  </View>
                )
              }
            />
          {/* </ScrollView> */}
        </View>
      )}
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  products: state.products.list,
  detail: state.products.detail
})

const mapDispatchToProps = (dispatch) => ({
  getProductsList: value => dispatch(ProductsActions.getProductsRequest(value)),
  moreProducts: value => dispatch(ProductsActions.moreProductsRequest(value)),
  getDetail: value => dispatch(ProductsActions.getDetailRequest(value))
})

Home.navigationOptions = ({ navigation }) => {
  const { params = {} } = navigation.state

  return {
    headerStyle: HeaderStyle.default,
    headerTitle: 'Home',
    headerTitleStyle: apply("text-center"),
    headerLayoutPreset: 'center'
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
