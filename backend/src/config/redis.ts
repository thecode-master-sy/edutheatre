
<<<<<<< HEAD
// export default function redisConfig(key: string){
//
//     return {
//         'dev': {
//             host: '127.0.0.1',
//             port: 6379
//         },
//         'prod':{
//
//         }
//     }[key];
// }
=======
export default function redisConfig(key: string){

    return {
        'dev': {
            host: '127.0.0.1',
            port: 6379
        },
        'prod': "rediss://default:AcaEAAIncDE2ZGJjNDA5MjJiYjE0OGZhOTk3NzA4ZGE1ZWViZDg0MnAxNTA4MjA@eminent-beagle-50820.upstash.io:6379"
    }[key];
}
>>>>>>> 7fa6a9aa1fad00011e0be70956242ef26d8541c6
