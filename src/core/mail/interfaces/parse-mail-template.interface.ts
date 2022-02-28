import {ITemplateVariable} from '../../../interfaces/template-variable.interface';

export interface IParseMailTemplate {
    file: string;
    variables: ITemplateVariable;
}