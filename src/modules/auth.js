import JtockAuth from 'j-tockauth'

const auth = new JtockAuth({
    host: process.env.REACT_APP_API_URL,
    prefixUrl: "/api",
    debug: false
  });

export default auth