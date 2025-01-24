const Users = require('../Models/User')
const Request = require('../Models/Request')


/** View Home */
async function viewHome(req, res) {
    const loggedInUser = req.user;

    const users = await Users.find({});

    const requests = await Request.find({
        $or: [{ from: loggedInUser._id }, { to: loggedInUser._id }]
    });

    const requestStatuses = {};

    requests.forEach(element => {
        requestStatuses[element.from] = element.fromStatus; // Ensure both directions are tracked
        requestStatuses[element.to] = element.toStatus;

    });
    
    
    const filteredUsers = users.filter(user =>
        user._id.toString() !== loggedInUser._id.toString() &&
        requestStatuses[user._id] !== "requested from" &&
        requestStatuses[user._id] !== "friend"
    );

    console.log();
    
    return res.render('home', { users: filteredUsers, loggedInUser, requestStatuses });
}


/** Send Request */
async function sendRequest(req, res) {
    const { from, to } = req.body;

    try {

        await Request.create({
            from: from,
            to: to,
            fromStatus: "requested from",
            toStatus: "requested to",
        });

        return res.redirect('/home');
    }
    catch (err) {
        console.error(err);
        return res.status(500).send('Error sending request');
    }
}

/** Cancel Request */
async function cancelReq(req, res) {
    const toUser = req.params.id;
    const loginUser = req.user;

    const requests = await Request.findOne({
        $and: [{ from: loginUser }, { to: toUser }]
    });

    if (requests.fromStatus === "requested from") {
        await Request.deleteOne({ _id: requests._id })
    }

    return res.redirect('/home')
}

async function viewReq(req, res) {
    const { _id } = req.user

    const requestsFrom = await Request.find({
        $and: [{ to: _id }, { toStatus: `requested to` }]
    });

    const fromUserRecords = await Promise.all(
        requestsFrom.map(async (request) => {
            return await Users.findById(request.from); // Single user record
        })
    );


    return res.render('viewReq', { fromUserRecords, requestsFrom })
}

async function rejectReq(req, res) {
    const requestId = req.body.reject;

    await Request.findByIdAndDelete({ _id: requestId })
    return res.redirect('/viewReq')
}

async function acceptReq(req, res) {
    const requesteId = req.body.accept;   

    await Request.findByIdAndUpdate(
        { _id: requesteId },
        {
            fromStatus: 'friend',
            toStatus: 'friend',
        }
    )

    return res.redirect('/viewReq')
}

async function showfriend(req,res) { 
    
    const loggedInUser = req.user;

    const users = await Users.find({});

    //find login user in request table
    const requests = await Request.find({
        $or: [{ from: loggedInUser._id }, { to: loggedInUser._id }]
    });
    
    
    //filter request return only friend status of login user
    const friends = requests.filter((element) => {
       return element.fromStatus === 'friend'
    } )

    
    //fetch login user and friend user from Users table
    const result = users.filter((element) => {
        return friends.some((friend) => friend.from === element._id.toString() ||
         friend.to === element._id.toString())
    })
    
    //filter that login user not show in friend list
    const filterUser = result.filter((element) => {
        return loggedInUser._id.toString() !== element._id.toString()
    })
    
    
    return res.render('showfriend',{filterUser})
    
}

async function chats(req,res) {
    res.render('chat')
}

module.exports = {
    viewHome,
    sendRequest,
    cancelReq,
    viewReq,
    rejectReq,
    acceptReq,
    showfriend,
    chats,
}
