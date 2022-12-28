
import { Form, Button, InputNumber, notification } from "antd";
import React, { useContext, useState } from "react";
import { UserContext } from "./context/UserContext";
import { Profile } from "./Profile";
interface AppProps {}
export const App: React.FC<AppProps> = () => {
  const [loader, setLoder] = useState(false);
  const { users, addUser } = useContext(UserContext);
  const [profile, setProfile] = useState<Record<string, any>>({});

  /**
   * @Function onFinish
   * @description get user Data with making API call iusersf user data not exists
   * @params users
   */
  const onFinish = (values: { id: string }) => {
    if (!!!users[values.id]) {
      setLoder(true);
      fetch(`https://jsonplaceholder.typicode.com/users/${values.id}`)
        .then((response) => {
          if (response.status === 200) {
            notification.success({ message: "Data Fetch Succesully" });
            return response.json();
          } else {
            // addUser(users,null)
            notification.error({
              message: "Failed to fetch user,User not fountd",
            });
          }
        })
        .then((data) => {
          addUser(data.id, data);
          setLoder(false);
          setProfile(data);
        })
        .catch((error) => {
          setLoder(false);
        });
      
    } else {
      notification.info({
        message: "User Data already exists, no need to fetch",
      });
      setProfile(users[values.id]);
    }
  };


  return (
    <React.Fragment>
      <div className="">
        <Form onFinish={onFinish}>
          <div style={{ marginTop: 15, marginLeft: 80 }}>
            <Form.Item
              label="InputNumber"
              name="id"
              rules={[{ required: true, message: "Please input number" }]}
            >
              <InputNumber style={{ paddingLeft: 20 }} />
            </Form.Item>
          </div>
          <Form.Item style={{ marginLeft: 135 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div>
        <Profile profileData={profile} loader={loader} />
      </div>
    </React.Fragment>
  );
};
