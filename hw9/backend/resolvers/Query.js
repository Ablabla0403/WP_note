import { makeName, checkChatBox } from './Utility';

const Query = {
    async chatBox(parent, { name1, name2 }, { db }, info) {
        if (!name1 || !name2) {
            return db.ChatBoxModel;
        }
        
        const chatBoxName = makeName(name1, name2);
        let chatBox = await checkChatBox(db, chatBoxName, "createChatBox");
        if (!chatBox) throw new Error ("ChatBox does not exist");

        return chatBox;
    },
    users(parent, args, { db }, info) {
        return db.UserModel.find({});
    }
}

export default Query;
