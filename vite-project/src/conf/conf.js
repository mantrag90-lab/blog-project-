const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL || import.meta.env.VITE_REACT_APP_APPWRITE_URL || '').trim(),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID || import.meta.env.VITE_ProjectId || '').trim(),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID || import.meta.env.VITE_DATABASE_ID || '').trim(),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID || import.meta.env.VITE_COLLECTION_ID || '').trim(),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID || import.meta.env.VITE_BUCKET_ID || '').trim(),
}

export default conf
