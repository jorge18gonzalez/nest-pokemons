export const EnvConfiguration=()=>({
    environment: process.env.NODE_ENV || 'dev',
    mongodb:process.env.MONGDB,
    port:process.env.PORT || 3002,
    defaultlimit:process.env.DEFAULT_LIMIT
})