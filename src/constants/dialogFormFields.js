import { INPUTS } from "./enums";
import {getPrompts} from './resumeBuilderPrompts'

export const UNIVERSITIES= (city)=> {
    switch (city) {
        case 'sydney':
            return ['Australian Catholic University','Macquarie University','University of New South Wales','University of Sydney','University of Technology Sydney','Western Sydney University','University of Notre Dame','University of Wollongong','University of Newcastle']
        default:
            break;
    }
}

export const EDU = 'education'
const eduEmptyFields = (industry) => [
    {type:INPUTS.textField,name:'degree',label:'Degree',placeholder:'e.g. Bachelor of Commerce',isRequired:true},
{type:INPUTS.textField,name:'major',label:'Major (optional)',placeholder:'e.g. Accounting & Finance',isRequired:false},
{type:INPUTS.dropDown,name:'university',label:'University',list:UNIVERSITIES('sydney'),isRequired:true},
{type:INPUTS.monthPicker,name:'startDate',label:'Start',maxRefrence:'endDateValue',isRequired:true},
{type:INPUTS.monthPicker,name:'endDate',label:'End',minRefrence:'startDateValue',isRequired:true},
{type:INPUTS.multiLine,name:'description',label:'Description',placeholder:getPrompts(industry).edu,hint:'This description should focus on your key achievenment and career-relevant experience.' ,isRequired:true}
]
const expEmptyFields = (industry) => [
    {type:INPUTS.textField,name:'title',label:'Position/Job Title',isRequired:true},
    {type:INPUTS.textField,name:'organisation',label:'Organisation',isRequired:true},
    {type:INPUTS.dropDown,name:'type',label:'Type of Experince',list:['Extra Curricular','Employment','Internship','Project'],isRequired:true},
    {type:INPUTS.monthPicker,name:'startDate',label:'Start',maxRefrence:'endDateValue',isRequired:true},
    {type:INPUTS.monthPicker,name:'endDate',label:'End',minRefrence:'startDateValue',toggle:{label:'This is my current position.',value:'Present',isSelected:false},isRequired:true},
    {type:INPUTS.multiLine,name:'description',label:'Description',placeholder:getPrompts(industry).exp,hint:'This description should focus on your key achievement in this job/position.',isRequired:true}
]

export function getFormFields(type,industry){
    if(type===EDU){
        return eduEmptyFields(industry)
    }else{
        return expEmptyFields(industry)
    }
}
