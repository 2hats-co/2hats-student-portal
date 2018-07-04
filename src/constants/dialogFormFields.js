import { INPUTS } from "./enums";

export const EDU = 'education'
const eduEmptyFields = [
    {type:INPUTS.textField,name:'degree',label:'Degree',placeholder:'e.g. Bachelor of Commerce',isRequired:true},
{type:INPUTS.textField,name:'major',label:'Major (optional)',placeholder:'e.g. Accounting & Finance',isRequired:false},
{type:INPUTS.dropDown,name:'university',label:'University',options:['USYD','UNSW','UTS'],isRequired:true},
{type:INPUTS.datePicker,name:'startDate',label:'Start',isRequired:true},
{type:INPUTS.datePicker,name:'endDate',label:'End/Expected End',isRequired:true},
{type:INPUTS.multiLine,name:'description',label:'Discription(Optional)',placeholder:`E.g.:
- Re-created 3hats' key product page, which resulted in 50% more page visits
- Created the wireframes and prototypes of a new feature`,hint:'This description should focus on your key achievenment and career-relevant experience.' ,isRequired:false}
]
const expEmptyFields = [
    {type:INPUTS.dropDown,name:'type',label:'Type of Experince',options:['USYD','UNSW','UTS'],isRequired:true},
    {type:INPUTS.textField,name:'organisation',label:'Organisation',isRequired:true},
    {type:INPUTS.datePicker,name:'startDate',label:'Start',isRequired:true},
    {type:INPUTS.datePicker,name:'endDate',label:'End/Expected End',isRequired:true},
    {type:INPUTS.multiLine,name:'description',label:'Discription',placeholder:`E.g.:
    - Re-created 3hats' key product page, which resulted in 50% more page visits
    - Created the wireframes and prototypes of a new feature`,
    hint:'This description should focus on your key achievement in this job/position.',isRequired:true}
]

export function getFormFields(type,prompts){
    console.log(type)
    if(type===EDU){
        console.log(type)
        return eduEmptyFields
    }else{
        return expEmptyFields
    }

}