import { API } from './api';
import apiEndpoints from '@/libs/api-endpoints';
import { v4 as uuidv4 } from 'uuid';

export const adminLogin = async (email: string, password: string) => {
  try {
    const deviceId = uuidv4();
    const payload = { email, password, deviceId }; // Add the required field
    console.log('Request Payload:', payload); // Log the payload
    const response = await API.post(apiEndpoints.authentication.adminLogin, payload);

    // Extract the token and other data from the response
    const { data } = response;
    const accessToken = data.data.accessToken.token;
    const user = data.data.user;
    const refreshToken = data.data.refreshToken.token;

    return {
      success: true,
      message: data.message,
      token: accessToken,
      user,
      refreshToken,
    };
  } catch (error: any) {
    console.error('Error during admin login:', error);
    const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
    return {
      success: false,
      message: errorMessage,
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