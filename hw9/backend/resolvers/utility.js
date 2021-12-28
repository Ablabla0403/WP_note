const makeName = (name1, name2) => {
    return [name1, name2].sort().join("_");
}

// return the found user (can be null)
const checkUser = (db, name, errFunc) => {
    if (!name) throw new Error("Missing user name for " + errFunc);
    return db.UserModel.findOne({ name });
};

//return the found chatbox (can be null)
const checkChatBox = (db, chatBoxName, errFunc) => {
    if (!chatBoxName) throw new Error("Missing chatBoxName name for " + errFunc);
    return db.ChatBoxModel.findOne({ name: chatBoxName });
};
  
// make sure 
const checkMessage = async (db, from, to, message, errFunc) => {
    const chatBoxName = makeName(from, to);
    return {
        chatBox: await checkChatBox(db, chatBoxName, errFunc),
        sender: await checkUser(db, from, errFunc),
        to: await checkUser(db, to, errFunc)
    }
}

// make sure calling checkUser beforehand
const newUser = (db, name) => {
    return new db.UserModel({ name }).save();
};


// make sure calling checkMessage beforehand
const newMessage = (db, sender, body) => {
    return new db.MessageModel({ sender, body }).save();
};

const newChatBox = (db, chatBoxName) => {
    return new db.ChatBoxModel({ name: chatBoxName }).save();
};

export {
    makeName, 
    checkUser,
    checkMessage,
    checkChatBox,
    newUser,
    newMessage,
    newChatBox,
};
  