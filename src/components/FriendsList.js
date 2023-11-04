import React from "react";
import axios from "axios";
import { axiosWithAuth } from "../util/axiosWithAuth";
import { useState, useEffect } from "react";
import AddFriend from "./AddFriend";

const initialFriendsList = [];

const FriendsList = ({friends, setFriends}) => {

    useEffect(()=> {
        axiosWithAuth().get(`http://localhost:9000/api/friends`)
        .then(res=>{
            setFriends(res.data);
        })
        .catch(err=>console.log(err))
    },[]);
   
    return(
        friends.map(friend=>{
            return(
                <div>
                    <h3>{friend.name}</h3>
                </div>
            )
        })

    )


}

export default FriendsList;