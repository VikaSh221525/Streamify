import { axiosInstance } from "./axios";

export const signUp = async (signUpData) => {
    const response = await axiosInstance.post("/auth/signup", signUpData);
    return response.data;
}

export const getAuthUser = async () => {
    const res = await axiosInstance.get('/auth/me');
    return res.data;
}
export const completeOnboarding = async (userData) =>{
    try {
        const res = await axiosInstance.post("/auth/onboarding", userData);
        return res.data
    } catch (error) {
        console.log("Error in getAuthUser: ", error);
        return null;
    }
}

export const login = async (loginData) => {
    const response = await axiosInstance.post("/auth/login", loginData);
    return response.data;
}

export const logout = async () => {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
}

