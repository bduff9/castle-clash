'use strict';

import React from 'react';
import styled from 'styled-components';

const SideBarEl = styled.section`
	grid-area: sidebar;
`;

const SideBar = () => (
	<SideBarEl>
		Context Aware Side Menu<br />
		TODO: put routes in here<br />
		to show/hide sidebar<br />
		based on current route
	</SideBarEl>
);

SideBar.propTypes = {};

export default SideBar;
