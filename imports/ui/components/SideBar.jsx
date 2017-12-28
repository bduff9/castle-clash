'use strict';

import React from 'react';
import styled from 'styled-components';

const SideBarEl = styled.section`
	grid-area: sidebar;
`;

const SideBar = () => (
	<SideBarEl>SideHeader</SideBarEl>
);

SideBar.propTypes = {};

export default SideBar;
