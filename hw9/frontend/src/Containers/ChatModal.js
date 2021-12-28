import { useQuery } from "@apollo/client";
import { Modal, Select, Form } from "antd";
import { useEffect } from "react";
import { USERS_QUERY, USERS_SUBSCRIPTION } from "../graphql";

const { Option } = Select;

const ChatModal = ({ visible, setModalVisible, onCreate, setActiveKey, me }) => {
    const [form] = Form.useForm();
    const { loading, error, data, subscribeToMore } = useQuery(USERS_QUERY);

    useEffect(() => {
        try {
            subscribeToMore({
                document: USERS_SUBSCRIPTION,
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const newUser = subscriptionData.data.user.data;

                    return {
                        ...prev,
                        users: [newUser, ...prev.users]
                    };
                }
            });
        } catch(e) {}
    }, [subscribeToMore]);

    const notMe = data.users.filter((user) => {
        return user.name !== me;
    })

    return (
        <Modal
            title="Choose your friend to create a chat room"
            okText="Create"
            visible={visible}
            onOk={() => {
                onCreate()
                form.resetFields()
            }}
            onCancel={()=>{
                setModalVisible(false);
            }}
        >
            <Form
                layout="vertical"
                form={form}
                onValuesChange={( name ) => {
                    setActiveKey(name.users);
                }}
            >
                
                <Form.Item name='users' required label="users">
                    <Select placeholder="Please select user you want to chat with!">
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>Error...</p>
                        ) : (
                            notMe.map((user, id) => <Option value={user.name} key={id}>{user.name}</Option>
                        ))};
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ChatModal;