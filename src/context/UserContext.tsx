import { createContext, useState } from "react";


export const UserContext = createContext<{users:Record<string,any>,addUser: (id: number, value: any) => void}>({users:{},addUser:()=>{}});

export const UserProvider=(props:any)=>{

    const [users,setUsers]= useState({});
    function addUser(key:number,value:any){
        setUsers({ ...users, [key]: value });
    }
    return (
        <UserContext.Provider value={{users,addUser}}>
            {props.children}
        </UserContext.Provider>
    )
}