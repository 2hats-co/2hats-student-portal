 // props: hasSteps, hasDivider, sections

import React from 'react';
import CardSection from './CardSection'

 
import { Grid } from '@material-ui/core';

function divderlocations(nSections){
    if (nSections <2) return;
    const nDividers = nSections-1 
    let positions = []
    for (let i = 0; i < nDividers; i++) { 
        positions.push(i*2+1);
    }
    return positions  
    }
         
function CardSections(props) {
    const {hasSteps,sections,hasDivider} = props
    const divider = <div style={{boxSizing: "border-box",height: '400px',width: '1px',border:'0.5px solid #979797'}}/>
    let items = sections.map((section,index)=> {
        return <CardSection
        key= {section.title}
        step={hasSteps&& index+1}
        title = {section.title}
        image = {section.image}
        description={section.description}
        button ={section.button}
        />
        })
        if(hasDivider){
        const dividersIndexes = divderlocations(sections.length)
        dividersIndexes.forEach((i)=> items.splice(i, 0, divider))
       }
    return(

    <Grid container 
    direction= 'row'
    justify='space-around'
   // spacing={16}
    style={{width:680, height:400}}
    >
    {items}
    
    </Grid>
)
}
export default CardSections