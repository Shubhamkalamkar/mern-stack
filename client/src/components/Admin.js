import React from "react";
import { useEffect, useState } from 'react';

export const Admin = () => {
    const [users, setUsers] = useState([]);
    const [change, setChange] = useState(1);

    useEffect(() => {
        fetch('http://localhost:5000/getusers').then((res) => {
            return res.json()
        }).then((data) => {
            setUsers(data)
            console.log(data);
        })
    }, [change])

    const deleteUser= async (id)=>{
        console.log(id);
        const res = await fetch(`/${id}`, {
            method:'DELETE'
        })

        const data = await res.json();
        if(data.acknowledged===true || data){
            console.log(data)
            alert("deleted")
            setChange(change+1)
        } else{
            alert("something went wrong")
            console.log(data)
        }
        
    }

    return (
        <div>
            <table class="table table-striped">
                <thead>
                    <tr>

                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        users && users.map((item, index) => {
                            return (

                                <tr>

                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button type="button" class="btn btn-danger" onClick={()=>{deleteUser(item._id)}}>Delete</button>
                                    </td>


                                </tr>

                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}