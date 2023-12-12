import nodemailer from "nodemailer";
import { IMail } from "@types";

export class MailInstance {
    private static mailInstance: MailInstance;
    private transporter : nodemailer.Transporter

    private constructor() {
        this.transporter = nodemailer.createTransport({
            service: "GMAIL",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        })
    }

    public static getInstance(): MailInstance {
        if(! MailInstance.mailInstance) {
            MailInstance.mailInstance = new MailInstance();
        }   

        return this.mailInstance
    }

    public async sendEmail(
        mail: IMail
    ){
        return await this.transporter
            .sendMail({
                from: mail.from || process.env.MAIL_USER,
                to: mail.to,
                cc: mail.cc,
                bcc: mail.bcc,
                subject: mail.subject,
                text: mail.text,
                html: mail.html,
            })
    }

    //VERIFY CONNECTION
    public async verifyConnection() {
        return this.transporter.verify();
    }

    //CREATE TRANSPOTER
    public getTransporter() {
        return this.transporter;
    }

}