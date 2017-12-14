'use strict';

// Setup OAuth services
import './configure-services';

// Setup email services
import './configure-email';

// This defines a starting set of data to be loaded if the app is loaded with an empty db.
import './fixtures.js';

// This defines all the collections, publications and methods that the application provides as an API to the client
import '../../api/api';
