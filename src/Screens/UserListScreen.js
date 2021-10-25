import React, { useEffect } from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { Table,Button } from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux'
import {listUsers,deleteUsers} from '../Actions/userAction'
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import {  FaCheck, FaEdit,  FaTrash} from 'react-icons/fa'

function UserListScreen({history}) {
    const dispatch= useDispatch()
    const userList = useSelector(state=> state.usersList)
    const {loading,error,users} = userList

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin

    const userDelete = useSelector(state=> state.userDelete)
    const {success:successDelete} = userDelete

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        }else{
            history.push('/login')
        }
        
    },[dispatch,history,successDelete])

    const deleteHandler= (id)=>{
        if(window.confirm(`Are you sure you want to delete user`))
        {
            dispatch(deleteUsers(id))
        }
        
    }

    return (
        <div>
            <h1>Users</h1>
            {loading ? (<Loader/>) :
            error ? (<Message variant="danger">{error}</Message>):
            (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>

                        </tr>
                     
                        
                    </thead>
                    <tbody>
                        {users.map(user=>(
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? (
                                    <FaCheck style={{color: "green"}}/>
                                  
                                ):
                                (<FaCheck style={{color: "red"}}/>)}</td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button variant="light">
                                            <FaEdit/>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant="danger" onClick={()=> deleteHandler(user._id)}>
                                            <FaTrash/>
                                        </Button>
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            
        </div>
    );
};

export default UserListScreen;