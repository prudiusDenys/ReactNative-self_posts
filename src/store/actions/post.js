import { LOAD_POSTS, REMOVE_POST, TOGGLE_BOOKED } from '../types'
import { DATA } from '../../data'

export const loadPostsAC = () => ({ type: LOAD_POSTS, payload: DATA })
export const toggleBookedAC = (id) => ({ type: TOGGLE_BOOKED, payload: id })
export const removePostAC = (id) => ({ type: REMOVE_POST, payload: id })
