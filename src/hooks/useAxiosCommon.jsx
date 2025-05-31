import axios from 'axios';
const axiosCommon = axios.create({
  baseURL: 'https://asset-management-server-mu.vercel.app',
});

const useAxiosCommon = () => {
  return axiosCommon;
};

export default useAxiosCommon;
