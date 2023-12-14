import { Bucket } from "@google-cloud/storage";
import { PrismaClient } from "@prisma/client";
import { PrismaInstance, StorageInstance } from "@services";
import { randomUUID } from "crypto";
import { MailInstance } from "@services";
import sharp from "sharp";

export abstract class BaseHandler {
    protected prisma: PrismaClient;
    protected bucket: Bucket;
    protected email : MailInstance;

    constructor() {
        this.prisma = PrismaInstance.getInstance().getClient();
        this.bucket = StorageInstance.getInstance().getBucket();
        this.email = MailInstance.getInstance();
    }

     protected uploadPictureFile = async (folder: string, pictureData: string) => {
        let filePath = "";
        try {
            const base64Image = pictureData.replace(/^data:image\/(png|jpeg);base64,/, '');
            const imageBuffer = Buffer.from(base64Image, "base64");

            // compress image buffer
            const compressedImageBuffer = await sharp(imageBuffer).resize(150, 150).toBuffer();
            // const compressedImageBuffer = imageBuffer

            // Get file extension {jpeg, png}
            const terminator = pictureData.indexOf(";");
            const imgExt = pictureData.substring(11, terminator);
            filePath = `${folder}/${randomUUID()}.${imgExt}`;

            // Upload image to Google Cloud Storage bucket
            const file = this.bucket.file(filePath);

            const stream = file.createWriteStream({
                metadata: {
                    contentType: `image/${imgExt}`,
                },
                resumable: false,
            });

            stream.on('error', (err: any) => {
                console.error(err);
                filePath = "";
                return filePath;
            });

            stream.end(compressedImageBuffer);

            return filePath;

        } catch (err: any) {
            console.error(err);
            filePath = "";
            return filePath;
        }
    }

    protected deletePictureFile = async (filePath: string) => {
        try {
            if(filePath === "") return;
            const file = this.bucket.file(filePath);
            await file.delete();

        } catch (err) {
            console.error(err);
        }
    }

    protected getSignedURL = async (filePath: string) => {
        try {
            const [url] = await this.bucket.file(filePath).getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
            });

            return url;
        } catch (err) {
            console.error(err);
            return "";
        }
    }

}