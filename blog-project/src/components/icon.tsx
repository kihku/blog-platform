import React from 'react';
import * as Icons from '@mui/icons-material';

const Icon = ({ iconName, ...props }) => {
  const IconComponent = Icons[iconName];

  if (!IconComponent) {
    console.error(`Icon "${iconName}" not found`);
    return null; // You can return a default icon or an empty element here
  }

  return <IconComponent {...props} />;
};

export default Icon;