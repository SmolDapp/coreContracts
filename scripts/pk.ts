import { generatePrivateKey } from 'viem/accounts'

const privateKey = generatePrivateKey()

console.warn(privateKey)