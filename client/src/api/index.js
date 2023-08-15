import axios from 'axios'
const API = axios.create({baseURL: process.env.REACT_APP_PRODUCTION === "false" ? 'http://localhost:5010/' : process.env.REACT_APP_API_URL})

//status
export const getStatus = () => API.get('/status/getStatus')

//twitch
export const getTokens = (authorizationCode) => API.get('/twitch/getTokens', {headers: {'authorizationCode': authorizationCode}})
export const checkToken = (accessToken) => API.get('/twitch/checkToken', {headers: {'accessToken': accessToken}})
export const refreshToken = (refreshToken) => API.get('/twitch/refreshToken', {headers: {'refreshToken': refreshToken}})
export const askForAcces = (user) => API.get('/twitch/askForAcces', {headers: {'userId': user.userId, 'login': user.login}})
export const changeAccessStatus = (accessLink, action) => API.get('/twitch/changeAccessStatus', {headers: {'accessLink': accessLink, 'action': action}})

//lichess
export const startGame = (options, accessToken, lichessNick) => API.get('/lichess/startGame', {headers: {'options': JSON.stringify(options), 'accessToken': accessToken, 'lichessNick': lichessNick}})
export const getGame = (accessToken) => API.get('/lichess/getGame', {headers:  {'accessToken': accessToken}})
