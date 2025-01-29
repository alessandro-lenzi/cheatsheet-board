import Hashids from 'hashids'

const hashids = new Hashids('', 16)
let sidSeed = 0

export const randomSid = () => {
  return hashids.encode(++sidSeed)
}
