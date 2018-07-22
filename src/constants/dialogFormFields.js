import { INPUTS } from "./enums";
import {getPrompts} from './resumeBuilderPrompts'

export const UNIVERSITIES= (city)=> {
    switch (city) {
        case 'sydney':
            return ['Australian Catholic University','Macquarie University','University of New South Wales','University of Sydney','University of Technology Sydney','Western Sydney University']
        default:
            break;
    }
}

export const EDU = 'education'
const eduEmptyFields = (industry) => [
    {type:INPUTS.textField,name:'degree',label:'Degree',placeholder:'e.g. Bachelor of Commerce',isRequired:true},
{type:INPUTS.textField,name:'major',label:'Major (optional)',placeholder:'e.g. Accounting & Finance',isRequired:false},
{type:INPUTS.dropDown,name:'university',label:'University',list:UNIVERSITIES('sydney'),isRequired:true},
{type:INPUTS.monthPicker,name:'startDate',label:'Start',isRequired:true},
{type:INPUTS.monthPicker,name:'endDate',label:'End',isRequired:true},
{type:INPUTS.multiLine,name:'description',label:'Discription(Optional)',placeholder:getPrompts(industry).edu,hint:'This description should focus on your key achievenment and career-relevant experience.' ,isRequired:false}
]
const expEmptyFields = (industry) => [
   
    {type:INPUTS.textField,name:'title',label:'Position/Job Title',isRequired:true},
    {type:INPUTS.textField,name:'company',label:'Organisation',isRequired:true},
    {type:INPUTS.dropDown,name:'type',label:'Type of Experince',list:['Extra Curricular','Employment','Project'],isRequired:true},
    {type:INPUTS.monthPicker,name:'startDate',label:'Start',isRequired:true},
    {type:INPUTS.monthPicker,name:'endDate',label:'End',toggle:{label:'This is my current position.',value:'Present',isSelected:false},isRequired:true},
    {type:INPUTS.multiLine,name:'description',label:'Discription',placeholder:getPrompts(industry).exp,isRequired:true}
]

export function getFormFields(type,industry){
    if(type===EDU){
        return eduEmptyFields(industry)
    }else{
        return expEmptyFields(industry)
    }
}
