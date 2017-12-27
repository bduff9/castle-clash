'use strict';

import { bool, object, string } from 'prop-types';

export const authenticatedType = bool;

export const loggingInType = bool;

export const pageReadyType = bool;

export const userType = object; //TODO: can we make this more specific?

export const userIDType = string;
