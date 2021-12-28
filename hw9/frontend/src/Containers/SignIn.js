import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Title from "../Components/Title";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_USER_MUTATION, USERS_QUERY, USERS_SUBSCRIPTION } from "../graphql";
import { useCallback, useEffect } from "react";

const SignIn = ({ me, setMe, setSignedIn, displayStatus }) => {
    const { loading, error, data, subscribeToMore } = useQuery(USERS_QUERY);
    const [addUser] = useMutation(CREATE_USER_MUTATION);
    
    useEffect(() => {
        try {
            subscribeToMore({
                document: USERS_SUBSCRIPTION,
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const newUser = subscriptionData.data.user.name;

                    return {
                        ...prev,
                        users: [newUser, ...prev.users]
                    };
                }
            });
        } catch(e) {}
    }, [subscribeToMore]);

    const handleSignIn = useCallback(() => {
        addUser({
            variables: {
                name: me
            }
        })
    }, [addUser, me]);

    return (
        <>
            <Title>
                <h1>My Chat Room</h1>
            </Title>
            <Input.Search
                prefix={<UserOutlined />}
                value={me}
                enterButton="Sign In" loading={loading}
                onChange={(e) => setMe(e.target.value)}
                placeholder="Enter your name"
                size="large" style={{ width: 300, margin: 50 }}
                onSearch={(name) => {
                    if (!name)
                        displayStatus({
                            type: "error",
                            msg: "Missing user name! Create an user for you now.",
                        });
                    else {
                        handleSignIn()
                        setSignedIn(true);
                    };
                }}
            />
        </>
    );
};
export default SignIn;