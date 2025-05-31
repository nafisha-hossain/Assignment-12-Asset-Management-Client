import axios from 'axios';

const saveTokenToLs = async (email) => {
  console.log(email, 'from join as em--------------------');
  const userInfo = { email };
  const { data } = await axios.post('https://asset-management-server-mu.vercel.app/jwt', userInfo);
  if (data.token) {
    localStorage.setItem('access-token', data.token);
  }
};

export { saveTokenToLs };
