import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';

import withNavigation from '../components/withNavigation';
import OneCard from '../components/OneCard';

import StarIcon from '@material-ui/icons/StarRounded';
import CancelIcon from '@material-ui/icons/CancelRounded';
import WarningIcon from '@material-ui/icons/WarningRounded';
import MusicIcon from '@material-ui/icons/MusicNote';

const DashboardContainer = props => {
  const { className } = props;

  return (
    <Slide direction="up" in>
      <div className={className} style={{ padding: 1 }}>
        <Grid container style={{ padding: 8 }}>
          <OneCard
            title="Bony-eared assfish"
            secondaryText="The bony-eared assfish is a bathypelagic species of cusk-eel found in tropical and sub-tropical oceans at depths of from 1,171 to 4,415 metres. It has been found as far north as Queen Charlotte Sound off British Columbia's coast. This species grows to a length of 37.5 centimetres SL."
            primaryAction="Learn more"
            route="https://en.wikipedia.org/wiki/Bony-eared_assfish"
            image="http://www.digitaljournal.com/img/8/4/3/0/8/3/i/2/8/7/o/assfish-4.JPG"
            tertiaryText={['bony', 'eared', 'assfish']}
            indicator={<StarIcon />}
            banner="Really elusive"
            tertiaryIndicator={
              <>
                Failed
                <CancelIcon />
              </>
            }
          />

          <OneCard
            title="Finland"
            secondaryText="Finland is not a real country. Not only is it not a real country but there is actually no landmass there at all, and the space between Sweden and Russia is actually empty ocean."
            primaryAction="Get #woke"
            route="https://www.reddit.com/r/finlandConspiracy/"
            indicator={<WarningIcon />}
            gradient="linear-gradient(-140deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)"
          />

          <OneCard
            title="Toxic by Britney Spears"
            secondaryText={`Baby, can't you see 
I'm calling
A guy like you should wear a warning
It's dangerous
I'm falling
There's no escape
I can't wait
I need a hit
Baby, give me it
You're dangerous
I'm loving it`}
            primaryAction="Get lit"
            route="https://www.youtube.com/watch?v=LOZuxwVk7TU"
            video="https://www.youtube.com/embed/LOZuxwVk7TU"
            indicator={<MusicIcon />}
            banner="Truly iconic"
          />

          <OneCard
            title="Default card"
            secondaryText="There is nothing special about this card. This is the minimum number of required props."
            primaryAction="Action"
            route="#"
          />
        </Grid>
      </div>
    </Slide>
  );
};

DashboardContainer.propTypes = {
  className: PropTypes.string,
};

export default withNavigation(DashboardContainer);
