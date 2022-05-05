// a library to wrap and simplify api calls
import apisauce from 'apisauce'

const headers = {
  'ContentType': 'application/json',
  'Authorization': 'Token d5a705c1031abd1e977ff66de201a6e18/s11wXOvp6SkWXVbp/PxUVjIIy99jx+saeF3eqsGauI+0hJ2NKrNMLO/GCkBCk/'
}

// our "constructor"
const create = (baseURL = 'http://192.168.1.4/AppBanHangServer') => {

  const api = apisauce.create({
    baseURL,
    headers,
    timeout: 10000
  })

  // auth
  const authLogin = data => api.post(`/account/sign-in`, data)
  const authRegister = data => api.post(`/account/sign-up`, data)

  // product
  const getProducts = data => api.get(`/get_collection.php/${data.params}`)
  const getDetail = data => api.get(`/products${data}`)

  // category
  const getCategory = data => api.get(`/category`)
  const showCategory = data => api.get(`/category/${data}`)

  // profile
  const getProfile = data => api.get(`/account/profile`)

  // invoice
  const getInvoice = data => api.get(`/order?page=${data.params}&q=`)
  const showInvoice = data => api.get(`/order/${data}`)

  // order
  const makeOrder = data => api.post(`/order`, data)

  // payment
  const confirm = data => api.post(`/order/confirm`, data)

  return {
    // auth
    authLogin,
    authRegister,

    // product
    getProducts,
    getDetail,

    // category
    getCategory,
    showCategory,

    // profile
    getProfile,

    // invoice
    getInvoice,
    showInvoice,

    // order
    makeOrder,

    // payment
    confirm,

    api,
    headers
  }
}

export default {
  create
}
