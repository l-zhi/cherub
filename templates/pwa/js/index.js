/* eslint-disable no-console */
import '../css/app.scss'

var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
  // [::1] is the IPv6 localhost address.
  window.location.hostname === '[::1]' ||
  // 127.0.0.1/8 is considered localhost for IPv4.
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
)

if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || isLocalhost) ) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // 注册成功
      console.log('ServiceWorker registration successful with scope: ', registration.scope)
    }).catch(function(err) {
      // 注册失败 :(
      console.warn('ServiceWorker registration failed: ', err)
    })
  })
}