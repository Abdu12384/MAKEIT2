import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL;

interface RefreshTokenResponse {
  accessToken: string;
}

const clientAxiosInstance: AxiosInstance = axios.create({
  baseURL: `${BACKEND_URL}/client`,
  withCredentials: true,
});

// Response interceptor for handling token refresh
clientAxiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError): Promise<AxiosResponse | Promise<never>> => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post<RefreshTokenResponse>(
          `${BACKEND_URL}/client/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshResponse.data.accessToken;

        clientAxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        }

        return clientAxiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('🔁 Token refresh failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default clientAxiosInstance;
