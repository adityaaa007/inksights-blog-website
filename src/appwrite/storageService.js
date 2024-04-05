import { Client, Storage, ID } from "appwrite";
import conf from "../conf/conf";

export class StorageService {
  client = new Client();
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl) // Your API Endpoint
      .setProject(conf.appwriteProjectId);
    this.bucket = new Storage(this.client);
  }

  // storage service
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("uploadFile error: " + error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("deletePost error: " + error);
      return false;
    }
  }

  getFilePreview(fileId) {
    const file = this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
    // console.log('file: '+file);
    return file;
  }
}

const storageService = new StorageService();
export default storageService;
