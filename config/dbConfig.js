module.exports={
    HOST:'localhost',
    USER:'postgres',
    PASSWORD:process.env.PG_PASSWORD,
    DB:'crud',
    dialect:'postgres',

    pool:{
        max:10,
        min:0,
        acquire:60000,

    }

}