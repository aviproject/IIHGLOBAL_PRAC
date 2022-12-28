import { Card, Spin } from "antd";
import React from "react";

interface ProfileProps {
  profileData:Record<string,any>
  loader?:boolean
}
export const Profile: React.FC<ProfileProps> = ({loader,profileData }) => {

  return (
    <div style={{ marginLeft: 80, marginTop: 120 }}>
      <Card title="User profile" bordered={false} style={{ width: 300 }}>
        {loader ? 
          <Spin /> :
          <>
            <div>Name : {profileData.name ? profileData.name : null}</div>
            <div>Usernme : {profileData.username ? profileData.username: null}</div>
            <div>Address : {profileData.address ? profileData?.address.street: null}</div>
            <div>phone : {profileData.phone ? profileData.phone : null}</div>
          </> 
        }
      </Card>
    </div>
  );
};
