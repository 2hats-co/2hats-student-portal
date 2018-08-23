import { INPUTS } from "./enums";
import {getPrompts} from './resumeBuilderPrompts'

import {UNIVERSITIES} from './universityList'

export const EDU = 'education'
const eduEmptyFields = (industry) => [
    {type:INPUTS.textField,name:'degree',label:'Degree',placeholder:'e.g. Bachelor of Commerce',isRequired:true},
{type:INPUTS.textField,name:'major',label:'Major (optional)',placeholder:'e.g. Accounting & Finance',isRequired:false},
{
    type:INPUTS.autoComplete,
    name:'university',
    label:'University/Tertiary Institution',
    list:UNIVERSITIES,
    isRequired:true
},
{type:INPUTS.monthPicker,name:'startDate',label:'Start',maxRefrence:'endDateValue',isRequired:true},
{type:INPUTS.monthPicker,name:'endDate',label:'End/Expected End',minRefrence:'startDateValue',isRequired:true},
{type:INPUTS.multiLine,name:'description',label:'description',placeholder:getPrompts(industry).edu,hint:'You should include your average mark and any key achievements related to your study.' ,isRequired:true}
]
const expEmptyFields = (industry) => [
    {type:INPUTS.textField,name:'title',label:'Position/Job Title',isRequired:true},
    {type:INPUTS.textField,name:'organisation',label:'Organisation',isRequired:true},
    {type:INPUTS.dropDown,name:'type',label:'Type of Experince',list:['Extra Curricular','Employment','Internship','Project'],isRequired:true},
    {type:INPUTS.monthPicker,name:'startDate',label:'Start',maxRefrence:'endDateValue',isRequired:true},
    {type:INPUTS.monthPicker,name:'endDate',label:'End',minRefrence:'startDateValue',toggle:{label:'This is my current position.',value:'Present',isSelected:false},isRequired:true},
    {type:INPUTS.multiLine,name:'description',label:'description',placeholder:getPrompts(industry).exp,hint:'This description should focus on your key achievements in this position/job.',isRequired:true}
]

export function getFormFields(type,industry){
    if(type===EDU){
        return eduEmptyFields(industry)
    }else{
        return expEmptyFields(industry)
    }
}
