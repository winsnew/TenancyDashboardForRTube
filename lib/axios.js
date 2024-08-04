import Axios from 'axios'

const getCsrfToken = () => {
    const name = 'XSRF-TOKEN';
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return decodeURIComponent(cookie.substring(name.length + 1));
      }
    }
    return null;
  };

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With' : 'XMLHttpRequest',
    },
    withCredentials: true,
    // withXSRFToken: true
})

axios.interceptors.request.use(config => {
    const token = getCsrfToken();
    if (token) {
      config.headers['X-XSRF-TOKEN'] = token;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });


export default axios