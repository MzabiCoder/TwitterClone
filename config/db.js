const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')


mongoose.set('useNewUrlParser', false);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);

const DBconnection = async () => {

    try {
        await mongoose.connect(db, {
            useNewUrlParser: true
        })
        console.log('mongoDB connected...');
    } catch (error) {
        console.log(error)
        process.exit(1)

    }


}

module.exports = DBconnection