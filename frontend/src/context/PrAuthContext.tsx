// import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
// import { validateToken, signOut } from "../Api/apiService"; // Import from your new axios file

// interface AuthContextType {
//   isAuthenticated: boolean;
//   loading: boolean;
//   login: () => void; // Helper to update state manually
//   logout: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(true);

//   // 1. Check if user is logged in when the app starts (Page Refresh)
//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         await validateToken(); // Hits backend. If 200 OK, cookie is valid.
//         setIsAuthenticated(true);
//       } catch (error) {
//         setIsAuthenticated(false);
//       } finally {
//         setLoading(false);
//       }
//     };
//     checkAuth();
//   }, []);

//   // 2. Helper function to update state after successful login form submit
//   const login = () => {
//     setIsAuthenticated(true);
//   };

//   // 3. Logout function
//   const logout = async () => {
//     try {
//       await signOut(); // Tells backend to delete cookie
//       setIsAuthenticated(false);
//     } catch (error) {
//       console.error("Logout failed", error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
//       {!loading && children} 
//     </AuthContext.Provider>
//   );
// };

// // Custom Hook to use the context easily
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error('useAuth must be used within an AuthProvider');
//   return context;
// };