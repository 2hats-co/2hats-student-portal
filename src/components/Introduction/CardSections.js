import React from 'react';
import CardSection from './CardSection'

import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';


function divderlocations(nSections) {
    if (nSections < 2) return;
    const nDividers = nSections - 1
    let positions = []
    for (let i = 0; i < nDividers; i++) {
        positions.push(i * 2 + 1);
    }
    return positions
}
function CardSections(props) {
    const { hasSteps, sections, hasDivider,width } = props
    const divider= (key) => <div key={key} style={{ boxSizing: "border-box", height: '400px', width: '1px', border: '0.5px solid #979797' }} />
    let items = sections.map((section, index) => {
        return <CardSection
            key={section.title}
            step={hasSteps && index + 1}
            title={section.title}
            image={section.image}
            description={section.description}
            button={section.button}
        />
    })
    if (hasDivider) {
        const dividersIndexes = divderlocations(sections.length)
        dividersIndexes.forEach((i) => items.splice(i, 0, divider(`divder${i}`)))
    }
    return (

        <Grid container
            direction='row'
            justify='space-between'
            style={{ margin:20, width: '100%', height: 400 }}
        >
            {items}

        </Grid>
    )
}
CardSections.propTypes = {
    width: PropTypes.number.isRequired,
    hasDivider: PropTypes.bool,
    hasSteps: PropTypes.bool,
    sections: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.any.isRequired,
        description: PropTypes.string.isRequired,
        button: PropTypes.shape({ 
            label: PropTypes.string, 
            action: PropTypes.func 
        })
    })
    ).isRequired,
};
export default CardSections