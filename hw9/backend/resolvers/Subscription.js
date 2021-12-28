import { makeName, checkChatBox, checkUser } from "./Utility";

const Subscription = {
    message: {
        async subscribe(parent, { from, to }, { db, pubsub }, info) {
            const chatBoxName = makeName(from, to);
            let Box = await checkChatBox(db, chatBoxName, "checkChatBox");

            if(!Box) {
                throw new Error('Chatbox not found');
            }

            return pubsub.asyncIterator(`chatBox ${chatBoxName}`);
        }
    },
    user: {
        subscribe(parent, args, { db, pubsub }, info) {
            return pubsub.asyncIterator('User');
        }
    }
};

export default Subscription;