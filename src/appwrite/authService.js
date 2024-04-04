import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl) // Your API Endpoint
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        // call login method

        return this.loginWithEmail({email, password});
      } else {
        return userAccount;
      }
    } catch (error) {
      // console.log('createAccount error: '+error);
      // return false;
      throw error;
    }
  }

  async loginWithEmail({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      // console.log('loginWithEmail error: '+error);
      // return false;
      throw error;
    }
  }

  async getCurrentUser () {
    try {
      return await this.account.get();
    } catch (error) {
      console.log('getCurrentUser error: '+error);
      // return false;
    }

    return null;

  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log('logout error: '+error);
      // return false;
    }
  }
}

const authService = new AuthService();

export default authService;
