const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    
    kodepesanan: {
        type: String
    },
    jenisgas: {
        type: String
    },
    jumlahpesanan: {
        type: String
    },
    alamatpenerima: {
        type: String
    },
    atasnama: {
        type: String
    }

})

module.exports = mongoose.model('gas', userSchema)