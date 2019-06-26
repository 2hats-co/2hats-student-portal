import React from 'react';

import OneCardTwo from 'components/OneCardTwo';

const DashboardContainer = () => (
  <OneCardTwo
    title={<>Marketing & Growth Line 2 of Title</>}
    industry={['tech']}
    time="3 June"
    description="What is sales? Why sales? What does sales people do? Tell you why sales is one of the most important skill to masterTell you why sales is one of the most important skill. What is sales? Why sales? What does sales people do? Tell you why sales is one of the most important skill to masterTell you why sales is one of the most important skill"
    status={{ label: 'Ongoing', variant: 'closed' }}
    media={
      {
        type: 'image',
        src:
          'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
      }
      /*{
        type: 'video',
        src: 'https://www.youtube.com/embed/OHmg4McYrds',
        //src: 'https://player.vimeo.com/video/330927676',
      }*/
    }
    //route="/assessment?id=x4VBl4oeMLL7bKykXP42&yours=true"
    route="/dashboard"
    action="Continue"
    skills={[
      { id: 'HPI2hWHnZoN6Smsul0Nw', title: 'BeanShell Scripting' },
      { id: 'fK2ljHUbMr3kHj49l1cB', title: 'Web Design' },
      { id: 'Ql9N0HppOUovkrqsLDSm', title: 'Postman Skills' },
      { id: 'SUIfZoQNGAM5geLnfuMh', title: 'Web App Essentials' },
      { id: 'SUIfZoQNGAM5geLnfuMhx', title: 'Web App Essentials 2' },
    ]}
    skillsHeader="Required"
    //icon="https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
    icon="industry"
  />
);

export default DashboardContainer;
