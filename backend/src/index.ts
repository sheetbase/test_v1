import { sheetbase } from '@sheetbase/server';
import { middleware as apiKeyMiddleware } from '@sheetbase/api-key';
import { sheets } from '@sheetbase/sheets';
import { gmail } from '@sheetbase/gmail';
import { auth, sheetsDriver } from '@sheetbase/user';
import { drive } from '@sheetbase/drive';

import { SHEETBASE_CONFIG } from './sheetbase.config';
import { MessageTemplating } from './templates/message';
import { OrderTemplating } from './templates/order';
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
  security: true,
});

const Gmail = gmail({
  prefix: 'Sheetbase',
  categories: {
    message: 'Messages',
    order: 'Orders',
  },
  templates: {
    message: MessageTemplating,
    order: OrderTemplating,
  },
});

const Auth = auth({
  encryptionSecret: 'secret',
  databaseDriver: sheetsDriver(Sheets.toAdmin()),
  authUrl: (mode, oobCode) => ScriptApp.getService().getUrl() +
    '?e=auth/action&' +
    `apiKey=${apiKey}&mode=${mode}&oobCode=${oobCode}`,
});

const Drive = drive({
  contentFolder: '',
});

/**
 * routes
 */

Sheets
.registerRoutes({
  router: Sheetbase.Router,
  middlewares: [ ApiKeyMiddleware ],
});

Auth
.registerRoutes({
  router: Sheetbase.Router,
  middlewares: [ ApiKeyMiddleware ],
});

Drive
.registerRoutes({
  router: Sheetbase.Router,
  middlewares: [ ApiKeyMiddleware ],
});

appRoutes();

// export for use elsewhere
export { Sheetbase, ApiKeyMiddleware, Sheets, Gmail, Auth, Drive };