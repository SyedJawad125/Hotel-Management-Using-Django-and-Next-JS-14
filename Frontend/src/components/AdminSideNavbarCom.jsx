'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';

const Sidebar = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    setIsAuthenticated(!!token);
    setUserRole(role);
  }, []);

  const handleNavigation = (path) => {
    if (router.pathname !== path) {
      router.push(path);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    router.push('/Login');
  };

  const links = useMemo(
    () => [
      { name: 'Adminpage', path: '/admindashboard', roleRestricted: true },
      { name: 'Employee Record', path: '/employeepage', roleRestricted: true },
      { name: 'Images', path: '/imagespage', roleRestricted: true },
      { name: 'Rooms', path: '/roomspage', roleRestricted: true },
      { name: 'Booking', path: '/bookingpage', roleRestricted: true },
      { name: 'Client Self Detail', path: '/clientselfpage', roleRestricted: false },
      { name: 'Public Site', path: '/', roleRestricted: false },
    ],
    []
  );

  return (
    <div className="flex">
      <div className="w-55 h-screen bg-gray-800 text-white p-4 flex flex-col justify-between fixed top-0 left-0">
        <div>
          <h2 className="text-2xl mb-6">Admin Panel</h2>
          <nav>
            {links
              .filter(link => !link.roleRestricted || userRole !== '8')
              .map(link => (
                <div
                  key={link.path}
                  onClick={() => handleNavigation(link.path)}
                  className={`block py-2.5 px-4 rounded cursor-pointer ${
                    router.pathname === link.path ? 'bg-gray-700' : 'hover:text-red-500 px-3 py-2'
                  }`}
                >
                  {link.name}
                </div>
              ))}
          </nav>
        </div>
        <div className="space-y-2">
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="w-full py-2 px-4 bg-red-600 rounded hover:bg-red-500"
            >
              Logout
            </button>
          ) : (
            <div
              onClick={() => handleNavigation('/Login')}
              className="block py-2 px-4 bg-green-600 rounded hover:bg-green-500 text-center cursor-pointer"
            >
              Login
            </div>
          )}
          <div className="flex justify-end">
            <button
              onClick={() => handleNavigation('/changepassword')}
              className="block py-2 px-4 bg-green-700 rounded hover:bg-green-500 text-center cursor-pointer"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;




// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useState, useEffect } from 'react';

// const Sidebar = () => {
//   const router = useRouter();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userRole, setUserRole] = useState(null); // State to store the user role

//   // Function to determine if a link is active
//   const isActive = (pathname) => router.pathname === pathname;

//   useEffect(() => {
//     // Check authentication status and user role only on the client side
//     const token = localStorage.getItem('token');
//     const role = localStorage.getItem('role'); // Assume role is stored in localStorage
//     setIsAuthenticated(!!token);
//     setUserRole(role); // Store the role in the state
//   }, []);

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role'); // Remove role on logout
//     setIsAuthenticated(false);
//     router.push('/Login');
//   };

//   const handleChangepassword = () => {
//     router.push("/changepassword");
//   };

//   return (
//     <div className="flex">
//       <div className="w-55 h-screen bg-gray-800 text-white p-4 flex flex-col justify-between fixed top-0 left-0">
//         <div>
//           <h2 className="text-2xl mb-6">Admin Panel</h2>
//           <nav>
//             {/* Conditionally render links based on the user's role */}
//             {userRole !== '8' && (
//               <>
//               <Link href="/admindashboard">
//                 <div className={`block py-2.5 px-4 rounded ${isActive('/admindashboard') ? 'bg-gray-700' : 'hover:text-red-500 px-3 py-2'}`}>
//                   Adminpage
//                 </div>
//               </Link>
//               <Link href="/employeepage">
//                 <div className={`block py-2.5 px-4 rounded ${isActive('/employeepage') ? 'bg-gray-700' : 'hover:text-red-500 px-3 py-2'}`}>
//                   Employee Record
//                 </div>
//               </Link>
//               <Link href="/imagespage">
//                 <div className={`block py-2.5 px-4 rounded ${isActive('/imagesepage') ? 'bg-gray-700' : 'hover:text-red-500 px-3 py-2'}`}>
//                   Images
//                 </div>
//               </Link>
//               <Link href="/roomspage">
//                 <div className={`block py-2.5 px-4 rounded ${isActive('/roomspage') ? 'bg-gray-700' : 'hover:text-red-500 px-3 py-2'}`}>
//                   Rooms
//                 </div>
//               </Link>
//               <Link href="/bookingpage">
//                 <div className={`block py-2.5 px-4 rounded ${isActive('/bookingpage') ? 'bg-gray-700' : 'hover:text-red-500 px-3 py-2'}`}>
//                   Booking
//                 </div>
//               </Link>
//               </>
//              )} 
//             <Link href="/clientselfpage">
//               <div className={`block py-2.5 px-4 rounded ${isActive('/clientselfpage') ? 'bg-gray-700' : 'hover:text-red-500 px-3 py-2'}`}>
//                 Client Self Detail
//               </div>
//             </Link>
//             <Link href="/">
//               <div className={`block py-2.5 px-4 rounded ${isActive('/') ? 'bg-gray-700' : 'hover:text-red-500 px-3 py-2'}`}>
//                 Public Site
//               </div>
//             </Link>
//           </nav>
//         </div>
//         <div className="space-y-2"> {/* Added space-y-2 to control the gap between elements */}
//           {isAuthenticated ? (
//             <button onClick={logout} className="w-full py-2 px-4 bg-red-600 rounded hover:bg-red-500">
//               Logout
//             </button>
//           ) : (
//             <Link href="/Login">
//               <div className="block py-2 px-4 bg-green-600 rounded hover:bg-green-500 text-center cursor-pointer">
//                 Login
//               </div>
//             </Link>
//           )}
//           <div className="flex justify-end">
//             <button 
//               onClick={handleChangepassword} 
//               className="block py-2 px-4 bg-green-700 rounded hover:bg-green-500 text-center cursor-pointer">
//               Change Password
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
