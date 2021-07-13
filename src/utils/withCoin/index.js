import { round } from "../math"

export const withCoin = (num,coin="$",precision = 0) => `${coin} ${round(num,precision)}`