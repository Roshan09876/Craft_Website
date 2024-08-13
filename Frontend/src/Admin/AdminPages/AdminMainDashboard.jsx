import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import { getActivityLogsApi } from '../../api/Api';


const AdminMainDashboard = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await getActivityLogsApi();
                const data = response.data;
                if (data.success) {
                    setActivities(data.activities);
                } else {
                    throw new Error('Failed to fetch activities');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <div className='px-10 py-10'>
                <h1 className='text-2xl font-semibold mb-4'>Activity Logs</h1>
                <table className='min-w-full bg-white border border-gray-200'>
                    <thead>
                        <tr>
                            <th className='py-2 px-4 border-b'>ID</th>
                            <th className='py-2 px-4 border-b'>Email</th>
                            <th className='py-2 px-4 border-b'>Role</th>
                            <th className='py-2 px-4 border-b'>Success</th>
                            <th className='py-2 px-4 border-b'>Message</th>
                            <th className='py-2 px-4 border-b'>Endpoint</th>
                            <th className='py-2 px-4 border-b'>Request Details</th>
                            <th className='py-2 px-4 border-b'>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activities.map(activity => (
                            <tr key={activity._id}>
                                <td className='py-2 px-4 border-b'>{activity._id}</td>
                                <td className='py-2 px-4 border-b'>{activity.email}</td>
                                <td className='py-2 px-4 border-b'>{activity.role}</td>
                                <td className='py-2 px-4 border-b'>{activity.success ? 'Yes' : 'No'}</td>
                                <td className='py-2 px-4 border-b'>{activity.message}</td>
                                <td className='py-2 px-4 border-b'>{activity.endpoint}</td>
                                <td className='py-2 px-4 border-b'>{activity.requestDetails}</td>
                                <td className='py-2 px-4 border-b'>{new Date(activity.timestamp).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    );
};

export default AdminMainDashboard;
