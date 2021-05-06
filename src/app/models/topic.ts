import { Surveyor } from './Surveyor';
export class Topic{
    id: number;
    name: string;
    description: string;
    surveys: any[];
    surveyCount: number;
    surveyor: Surveyor;
    surveyorId: string;
}