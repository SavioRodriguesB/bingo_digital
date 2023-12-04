import axios from 'axios'
import router from '@/router'
import Swal from 'sweetalert2'

const axiosIns = axios.create({
// You can add your headers here
// ================================
   baseURL: 'http://localhost:5000/',
// timeout: 1000,
// headers: {'X-Custom-Header': 'foobar'}
})


// ℹ️ Add request interceptor to send the authorization header on each subsequent request after login
axiosIns.interceptors.request.use(config => {
  // Retrieve token from localStorage
  const token = localStorage.getItem('token_jwt')

  // If token is found
  if (token) {
    // Get request headers and if headers is undefined assign blank object
    config.headers = config.headers || {}

    // Set authorization header
    // ℹ️ JSON.parse will convert token to string
    config.headers.Authorization = token ? `Bearer ${token}` : ''
  }

  // Return modified config
  return config
})

// ℹ️ Add response interceptor to handle 401 response
axiosIns.interceptors.response.use(response => {
  return response
}, error => {
  // Handle error
  if (error.response.status === 403) {
    localStorage.removeItem('token_jwt')
    localStorage.removeItem('id_pessoa')
    window.dispatchEvent(new Event('storage'));
    Swal.fire({
      title: "Quem é você?",
      text: "Parece que seu token de autenticação expirou. Cliquei no botão abaixo para voltar ao login",
      icon: "question",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        router.push({name:"Login"})
      }
    });
  }
  else {
    return Promise.reject(error)
  }
})
export default axiosIns
