import nodemailer from 'nodemailer';
import HandlebarsMailTemplate from './handlebars-mail-template';
import {ISendMail} from '@core/mail/interfaces/send-mail-contact.interface';

export default class EtherealMail {
    static async sendEmail({ to, from, subject, templateData} : ISendMail): Promise<string | false> {
    const account = await nodemailer.createTestAccount();
    const mailTemplate = new HandlebarsMailTemplate();
        const transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        });
        const message = await transporter.sendMail({
            from: {
                name: from?.name || 'Equipe Wiki',
                address: from?.email || 'equipe@wiki.com.br'
            },
            to : {
                name: to.name,
                address: to.email,
            },
            subject,
            html: await mailTemplate.parse(templateData),
        });
        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
        return nodemailer.getTestMessageUrl(message);
    }
}