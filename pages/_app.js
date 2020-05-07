import App from "next/app";
import Layout from "../components/_App/Layout";
import {parseCookies} from 'nookies';
import {redirectUser} from '../utils/auth';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const {token} = parseCookies(ctx);

    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    if(!token){
      const isProtectedRoute = ctx.pathname === '/account' || ctx.pathname === '/create';
      if(isProtectedRoute){
        redirectUser(ctx, '/login');
      }
      else{
        try {
          // const payload = {headers: {Authorization:token}}
        } catch (error) {
          
        }
      }
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
