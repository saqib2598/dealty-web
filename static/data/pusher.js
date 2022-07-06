import Pusher from 'pusher-js'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const pusher = new Pusher(publicRuntimeConfig.pusherAppKey, {
    cluster: publicRuntimeConfig.pusherAppCluster,
    encrypted: true
})
