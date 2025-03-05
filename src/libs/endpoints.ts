import { API } from './api';
import apiEndpoints from '@/libs/api-endpoints';

export const adminLogin = async (email: string, password: string) => {
    try {
      const response = await API.post(apiEndpoints.authentication.adminLogin, { email, password });
  
      // Extract the token and other data from the response
      const { data } = response;
      const accessToken = data.data.accessToken.token; // Access the token from the nested structure
      const user = data.data.user; // Access the user data
      const refreshToken = data.data.refreshToken.token; // Access the refresh token
  
      return {
        success: true,
        message: data.message, // Include the message from the response
        token: accessToken, // Return the access token
        user, // Return the user data
        refreshToken, // Return the refresh token
      };
    } catch (error) {
      console.error('Error during admin login:', error);
      return {
        success: false,
        message: 'Login failed. Please try again.', // Include the error message from the API if available
      };
    }
  };

  export const getUserStats = async () => {
    const response = await API.get(apiEndpoints.admin.userStats);
    return response.data;
  };

export const getUsers = async () => {
    try {
        const response = await API.get(apiEndpoints.admin.getUsers);
        return response.data;
      } catch (error) {
        console.error('Error fetching signups:', error);
        throw error;
      }
};

export const fetchPolicies = async (type: string) => {
    try {
      const response = await API.get(apiEndpoints.admin.getPolicies(type)); // Pass the type directly
      return response.data;
    } catch (error) {
      console.error('Error fetching policies:', error);
      throw error;
    }
  };