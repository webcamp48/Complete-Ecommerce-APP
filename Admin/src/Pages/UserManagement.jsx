import React, { useEffect } from 'react';
import './Styles/UserManagement.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserMange, fetchAllUserMange } from '../Redux/features/UserManagement/UserMangeSlice';
import Loader from '../Components/ReuseableComponent/Loader';

const UserManagement = () => {
    const dispatch = useDispatch();
    const { allUsers, loading, error } = useSelector((state) => state.userManage); 
    const IMAGE_URL = 'http://localhost:3002/images/userProfiles'

    // fetch all User
    useEffect(() => {
        dispatch(fetchAllUserMange());
    }, [dispatch]);

    // deleteUserHandler
    const deleteUserHandler = (id) => {
        // Delete user logic here
        if(window.confirm("Are You Sure You Want To Delete this User")){
            dispatch(deleteUserMange(id));
        }
    }

    if (loading) {
        return <Loader  size={8}/>;
    }

    if (error) {
        return <p className='nofound'>Error: User Management{error}</p>;
    }

    return (
        <section className="customer">
            <table className='customer-table'>
                <thead>
                    <tr>
                        <th># Id</th>
                        <th>Customer Name</th>
                        <th>Customer Email</th>
                        <th>Customer Phone</th>
                        <th>Customer Address</th>
                        <th>Customer ProfileImage</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allUsers?.map((user, index) => (
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.fullName}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.address}</td>
                            <td style={{width: "100px"}}>
                            <img 
                                src={user.profileImage ? `${IMAGE_URL}/${user.profileImage}` : "https://via.placeholder.com/150"} 
                                alt={user.fullName} 
                                style={{ width: "100%" }} 
                            />
                        </td>
                        <td><button className='delete-btn' onClick={() => deleteUserHandler(user._id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default UserManagement;
