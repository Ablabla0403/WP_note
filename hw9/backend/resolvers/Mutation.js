import { checkUser, newUser, makeName, checkChatBox, newChatBox, checkMessage, newMessage } from './Utility';

const Mutation = {
  async createMessage(parent, {from, to, message }, {db, pubsub }, info) {
    const { chatBox, sender } = await checkMessage(db, from, to, message, "createMessage");
    
    if (!chatBox) throw new Error("ChatBox not found for createMessage");
    if(!sender) throw new Error("User not found: " + from);

    const chatBoxName = makeName(from, to);
    const newMsg = await newMessage(db, sender, message);
    chatBox.messages.push(newMsg);
    await chatBox.save();

    pubsub.publish(`chatBox ${chatBoxName}`, {
      message: { 
        mutation: "CREATED",
        data: newMsg
      }
    });

    return newMsg;
  },
  
  async createChatBox(parent, { name1, name2 }, { db }, info) {
    if (!name1 || !name2)
      throw new Error("Missing chatBox name for CreateChatBox");
    
    if (!(await checkUser(db, name1, "createChatBox"))) {
      console.log("User does not exist for CreateChatBox: " + name1);
      await newUser(db, name1);
    }

    if (!(await checkUser(db, name2, "createChatBox"))) {
      console.log("User does not exist for CreateChatBox: " + name2);
      await newUser(db, name2);
    }
    
    const chatBoxName = makeName(name1, name2);
    let chatBox = 
      await checkChatBox(db, chatBoxName, "createChatBox");
    if (!chatBox) chatBox = await newChatBox(db, chatBoxName);

    return chatBox;
  },

  async createUser(parent, { name }, { db, pubsub }, info) {
    let user = await checkUser(db, name, "createUser");
    if (!user) user = await newUser(db, name);

    pubsub.publish('User', {
      user: {
        mutation: "CREATED",
        data: user
      }
    });

    return user;
  }
}
export default Mutation;