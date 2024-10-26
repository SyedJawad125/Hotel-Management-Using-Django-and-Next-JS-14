// // pages/dashboard.js
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
