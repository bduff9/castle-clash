'use strict';

import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const HeaderNavLink = styled(NavLink)`
  border-right: 1px solid #CCC;
  padding: 0 20px;

	&:hover {
		text-decoration: underline;
	}

	&.${(props) => props.activeClassName} {
		text-decoration: underline;
		color: black;
    cursor: text;
    pointer-events: none;
	}
`;

HeaderNavLink.defaultProps = {
	activeClassName: 'active'
};

export default HeaderNavLink;
