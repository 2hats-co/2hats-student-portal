 // props: hasSteps, hasDivider, sections

import React from 'react';
import CardSection from './CardSection'

 
import { Grid } from '@material-ui/core';

         
function CardSections(props) {
    const {hasSteps,sections,hasDivider} = props
    const nSections = sections.length
    return(

    <Grid container 
    direction= 'row'
    justify='space-between'
    spacing={16}
   
    style={{width:800}}
    >
    {sections.map((section,index)=> {
    console.log(index<nSections-1)
    return <CardSection
    key= {section.title}
    step={hasSteps&& index+1}
    title = {section.title}
    image = {section.image}
    description={section.description}
    button ={section.button}
    />
    
    })}
    </Grid>
 
   
)
}
export default CardSections