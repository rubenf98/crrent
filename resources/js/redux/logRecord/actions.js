import { types } from "./types";
import axios from "axios";

export const fetchLogRecords = () => ({
    type: types.FETCH_LOG_RECORDS,
    payload: axios.get(`${window.location.origin}/api/logRecord`)
})

