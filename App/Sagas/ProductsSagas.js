import { call, put } from 'redux-saga/effects'
import ProductsActions from '../Redux/ProductsRedux'

export function * getProducts (api, action) {
  const { data } = action

  const response = yield call(api.getProducts, data)

  console.log('res', response)

  if (response.ok) {
    yield put(ProductsActions.getProductsSuccess({
      data: response.data,
      lastPage: 'response.data.data.lastPage'
    }))
  } else {
    yield put(ProductsActions.getProductsFailure(response))
  }
}

export function * getDetail (api, action) {
  const { data } = action

  const response = yield call(api.getDetail, data)

  if (response.ok) {
    yield put(ProductsActions.getDetailSuccess(response.data.data))
  } else {
    yield put(ProductsActions.getDetailFailure(response))
  }
}

export function * moreProducts (api, action) {
  const { data } = action

  const response = yield call(api.getProducts, data)

  if (response.ok) {
    yield put(ProductsActions.moreProductsSuccess({
      data: response.data.data.data,
      page: data.page
    }))
  } else {
    yield put(ProductsActions.moreProductsFailure(response))
  }
}