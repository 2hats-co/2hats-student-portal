import { INPUTS } from "./enums";
import {getPrompts} from './resumeBuilderPrompts'
export const EDU = 'education'
const eduEmptyFields = (industry) => [
    {type:INPUTS.textField,name:'degree',label:'Degree',placeholder:'e.g. Bachelor of Commerce',isRequired:true},
{type:INPUTS.textField,name:'major',label:'Major (optional)',placeholder:'e.g. Accounting & Finance',isRequired:false},
{type:INPUTS.dropDown,name:'university',label:'University',options:['USYD','UNSW','UTS'],isRequired:true},
{type:INPUTS.monthPicker,name:'startDate',label:'Start',isRequired:true},
{type:INPUTS.monthPicker,name:'endDate',label:'End/Expected End',toggle:{label:'This is my current position.',value:'Present',isSelected:false},isRequired:true},
{type:INPUTS.multiLine,name:'description',label:'Discription(Optional)',placeholder:getPrompts(industry).edu,hint:'This description should focus on your key achievenment and career-relevant experience.' ,isRequired:false}
]
const expEmptyFields = (industry) => [
   
    {type:INPUTS.textField,name:'title',label:'Position/Job Title',isRequired:true},
    {type:INPUTS.textField,name:'company',label:'Organisation',isRequired:true},
    {type:INPUTS.dropDown,name:'type',label:'Type of Experince',options:['Extra Curricular','Employment','Project'],isRequired:true},
    {type:INPUTS.datePicker,name:'startDate',label:'Start',isRequired:true},
    {type:INPUTS.datePicker,name:'endDate',label:'End/Expected End',isRequired:true},
    {type:INPUTS.multiLine,name:'description',label:'Discription',placeholder:getPrompts(industry).exp,isRequired:true}
]

export function getFormFields(type,industry){
    if(type===EDU){
        return eduEmptyFields(industry)
    }else{
        return expEmptyFields(industry)
    }

}

// {degree:"Bachelor of Commerce - Accounting",university:"University of New South Wales",startDate:"Feb 2016",endDate:"Dec 2017",description:`- 85+ WAM
//   - Winner of FMAA Management Consulting Case Competition
//   - President of AIESEC UNSW`}