import conf from "../conf/conf";
import {
  Client,
  ID,
  Databases,
  Storage,
  Query,
  Permission,
  Role,
} from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // CREATE POST
  async createPost({ title, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          title: title,
          Content: content,               // ✅ EXACT column name
          featuredImg: featuredImage,     // ✅ EXACT column name
          status: status,
          userId: userId,
        },
        [
          Permission.read(Role.any()),
          Permission.update(Role.user(userId)),
          Permission.delete(Role.user(userId)),
        ]
      );
    } catch (error) {
      throw error;
    }
  }

  // UPDATE POST
  async updatePost(documentId, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        documentId,
        {
          title: title,
          Content: content,
          featuredImg: featuredImage,
          status: status,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async deletePost(documentId) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        documentId
      );
      return true;
    } catch {
      return false;
    }
  }

  async getPost(documentId) {
    return await this.databases.getDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      documentId
    );
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    return await this.databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      queries
    );
  }

  // FILES
  async uploadFile(file) {
    return await this.bucket.createFile(
      conf.appwriteBucketId,
      ID.unique(),
      file
    );
  }

  async deleteFile(fileId) {
    await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
    return true;
  }

  getFilePreview(fileId) {
    if (!fileId) return null;
    try {
      return this.bucket.getFileView(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.error("Error getting file preview:", error);
      return null;
    }
  }
}

const service = new Service();
export default service;
