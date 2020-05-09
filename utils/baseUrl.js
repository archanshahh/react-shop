
const baseUrl = process.env.NODE_ENV === "production" 
? 'https://reactshopp.herokuapp.com' 
: 'http://localhost:3000';

// const baseUrl = 'http://reactshopp.herokuapp.com' ;
export default baseUrl;