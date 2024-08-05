import React, { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';

const Profile = () => {
    const { user, getProfile } = useContext(AuthContext);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                await getProfile();
            } catch (error) {
                console.log(`Error Fetching Profile: ${error}`);
            }
        };
        fetchUser();
    }, [getProfile]);

    return (
        <div className='px-10 py-10'>
            <h1 className='font-extrabold text-3xl'>Profile..</h1>
            <div className='shadow-lg'>
                <div className='px-10 py-5'>
                    {user ? (
                        <div >
                            <p>Name: {user.firstName}</p>
                            <p>Email: {user.email}</p>
                            <p>Username: {user.userName}</p>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
