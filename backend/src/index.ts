import { sheetbase } from '@sheetbase/server';
import { middleware as apiKeyMiddleware } from '@sheetbase/api-key';
import { sheets } from '@sheetbase/sheets';

import { SHEETBASE_CONFIG } from './sheetbase.config';
import appRoutes from './routes/index';

// configs
const { apiKey, databaseId } = SHEETBASE_CONFIG;

/**
 * modules
 */

const Sheetbase = sheetbase({
    allowMethodsWhenDoGet: true, // for dev, should remove when in production
});

const ApiKeyMiddleware = apiKeyMiddleware({ key: apiKey });

const Sheets = sheets({
    databaseId,
    security: {
        categories: { '.read': true },
        tags: { '.read': true },
        pages: { '.read': true },
        posts: { '.read': true },
    },
});

/**
 * routes
 */

Sheets
.registerRoutes({
    router: Sheetbase.Router,
    middlewares: [ ApiKeyMiddleware ],
    disabledRoutes: [],
});

appRoutes();

// export for use elsewhere
export { Sheetbase, ApiKeyMiddleware, Sheets };