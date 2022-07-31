import React from 'react';
import Icon from './Icon';
import { ReactComponent } from './svg/chevron-left.svg';

const icon = <ReactComponent />;
const ChevronLeftIcon = (props) => <Icon {...props} html={icon} />;

export default ChevronLeftIcon;
