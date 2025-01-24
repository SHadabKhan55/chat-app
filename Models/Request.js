const mongoose = require('mongoose');

const url = "mongodb://127.0.0.1:27017/chat-app"

async function getConnect(){
   await mongoose.connect(url)
}

getConnect()

const requestSchema = new mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    fromStatus: {
        type: String,
        default: 'pending',
        enum: ['pending', 'requested from','friend'],
    },
    toStatus: {
        type: String,
        default: 'pending',
        enum: ['pending',  'requested to','friend'],
    },
});

const Request = mongoose.model('requests', requestSchema);

module.exports = Request;
