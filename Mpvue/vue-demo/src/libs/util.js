// import { forEach, hasOneOf } from '@/libs/tools'

export const TOKEN_KEY = 'token'
export const TOURL_KEY = 'tourl'
export const USER_INFO_KET = 'userinfo'

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token)
}

export const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) return token
  else return false
}

export const setUserInfo = (userinfo) => {
  localStorage.setItem(USER_INFO_KET, JSON.stringify(userinfo))
}

export const getUserInfo = () => {
  const userinfo = localStorage.getItem(USER_INFO_KET)
  if (userinfo) {
    try {
      return JSON.parse(userinfo)
    } catch (e) {
      return false
    }
  } else return false
}

export const setToUrl = (toUrl) => {
  localStorage.setItem(TOURL_KEY, toUrl)
}

export const getToUrl = () => {
  return localStorage.getItem(TOURL_KEY)
}

export const hasChild = (item) => {
  return item.children && item.children.length !== 0
}
