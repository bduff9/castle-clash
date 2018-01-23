'use strict';

import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const HeaderNavLink = styled(NavLink)`
	border-right: 1px solid #CCC;

	&:last-child {
		border-right: none;
	}

	&.${(props) => props.activeClassName} {
		font-weight: bold;
    cursor: text;
    pointer-events: none;
	}
`;

HeaderNavLink.defaultProps = {
	activeClassName: 'active'
};

export default HeaderNavLink;
