import JtockAuth from 'j-tockauth'

const auth = new JtockAuth({
    host: "http://localhost:3001",
    prefixUrl: "/api",
    debug: false
  });

export default auth