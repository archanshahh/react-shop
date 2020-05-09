
const baseUrl = process.env.NODE_ENV === "production" 
? 'http://reactshopp.herokuapp.com' 
: 'http://localhost:3000';

export default baseUrl;