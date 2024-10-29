// // hooks/useSessionCheck.js
// import { useState, useEffect } from 'react';

// /**
//  * @typedef {Object} SessionStatus
//  * @property {boolean} active - Indicates if the session is active.
//  * @property {string} [username] - The username of the logged-in user.
//  */

// /**
//  * Custom hook to check user session status.
//  * @returns {SessionStatus | null} The session status or null if not yet loaded.
//  */
// const useSessionCheck = () => {
//     const [sessionStatus, setSessionStatus] = useState(null);

//     useEffect(() => {
//         const checkSession = async () => {
//             try {
//                 const response = await fetch('/user/api/check-session/', {
//                     method: 'GET',
//                     credentials: 'include'
//                 });
                
//                 if (response.ok) {
//                     const data = await response.json();
//                     setSessionStatus({ active: true, username: data.username });
//                 } else {
//                     setSessionStatus({ active: false });
//                 }
//             } catch (error) {
//                 console.error("Error checking session:", error);
//                 setSessionStatus({ active: false });
//             }
//         };
        
//         checkSession();
//     }, []);

//     return sessionStatus;
// };

// export default useSessionCheck;






// // pages/dashboard.js  , this is page code and make in pages.

// import { useEffect } from 'react';
// import useSessionCheck from "@/components/useSessionCheck";
// import { useRouter } from 'next/router';

// const Dashboard = () => {
//     const sessionStatus = useSessionCheck();
//     const router = useRouter();

//     useEffect(() => {
//         if (sessionStatus && sessionStatus.active === false) {
//             router.push('/login');
//         }
//     }, [sessionStatus, router]);

//     if (sessionStatus === null) {
//         return <p>Loading...</p>;
//     }

//     return (
//         <div>
//             {sessionStatus.active ? (
//                 <p>Welcome back, {sessionStatus.username}!</p>
//             ) : (
//                 <p>Redirecting to login...</p>
//             )}
//         </div>
//     );
// };

// export default Dashboard;
