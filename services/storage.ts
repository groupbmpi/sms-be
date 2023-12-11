import { Bucket, Storage } from '@google-cloud/storage';

export class StorageInstance{
    private static storageInstance : StorageInstance;

    private _storage: Storage;

    private _bucket: Bucket;

    private constructor() {
        this._storage = new Storage({
            projectId: process.env.GOOGLE_STORAGE_PROJECT_ID,
            scopes: 'https://www.googleapis.com/auth/cloud-platform',
            credentials: {
              client_email: process.env.GOOGLE_STORAGE_EMAIL,
              private_key: (process.env.GOOGLE_STORAGE_PRIVATE_KEY || "").split(String.raw`\n`).join('\n')
            }
        });
        this._bucket = this._storage.bucket(process.env.GOOGLE_STORAGE_BUCKET_NAME || "");
    }

    public static getInstance(): StorageInstance {
        if(! StorageInstance.storageInstance) {
            StorageInstance.storageInstance = new StorageInstance();
        }
        
        return StorageInstance.storageInstance;
    }

    public getStorage(): Storage {
        return this._storage;
    }

    public getBucket(): Bucket {
        return this._bucket;
    }
}