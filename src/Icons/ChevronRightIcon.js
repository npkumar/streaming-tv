import React from 'react';
import Icon from './Icon';
import { ReactComponent } from './svg/chevron-right.svg';

const icon = <ReactComponent />;
const ChevronRightIcon = (props) => <Icon {...props} html={icon} />;

export default ChevronRightIcon;
