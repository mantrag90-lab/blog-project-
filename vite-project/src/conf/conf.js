const conf ={

    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_ProjectId),
    appwriteUrlDatabaseId: String(import.meta.env.VITE_DATABASE_ID),
    appwriteUrlCollectionId: String(import.meta.env.VITE_COLLECTION_ID),
    appwriteUrlBucketId: String(import.meta.env.VITE_BUCKET_ID)
}



export default conf