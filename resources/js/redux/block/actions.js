import { types } from "./types";
import axios from "axios";

export const fetchBlocks = (level) => ({
    type: types.FETCH_BLOCKS,
    payload: axios.get(`${window.location.origin}/api/blockedDates?level_id=${level}`)
})

