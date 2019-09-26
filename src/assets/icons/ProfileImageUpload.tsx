import React from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

const ProfileImageUpload: React.FC<SvgIconProps> = (props) => (
    <SvgIcon {...props} viewBox="0 0 36 33">
      <path fill-rule="nonzero" d="M23.4 0L27 3.6h5.4A3.6 3.6 0 0 1 36 7.2v21.6a3.6 3.6 0 0 1-3.6 3.6H3.6A3.6 3.6 0 0 1 0 28.8V7.2a3.6 3.6 0 0 1 3.6-3.6H9L12.6 0h10.8zM18 9a9 9 0 1 0 9 9c0-4.977-4.05-9-9-9zm0 9.81c1.8 0 5.373.99 5.4 2.79a6.509 6.509 0 0 1-5.4 2.88 6.509 6.509 0 0 1-5.4-2.88c.027-1.8 3.6-2.79 5.4-2.79zm0-7.11a2.7 2.7 0 1 1 0 5.4 2.7 2.7 0 0 1 0-5.4zm11.963-5.663l-3 3.484h2v3.516h2V9.52h2l-3-3.484z"/>
    </SvgIcon>
  );

  export default ProfileImageUpload;
