import {IMailContact} from '@core/mail/interfaces/mail-contact.interface';
import {IParseMailTemplate} from '@core/mail/interfaces/parse-mail-template.interface';

export interface ISendMail {
    to: IMailContact;
    from?: IMailContact;
    subject: string;
    templateData: IParseMailTemplate;
}