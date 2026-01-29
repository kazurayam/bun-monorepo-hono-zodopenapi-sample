// backend/src/server.ts

import { OpenAPIHono } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';
import { usersApp } from './route/user';

// Honoアプリケーションを作成する
export const app = new OpenAPIHono()
    // ユーザー関連のルートを登録
    .route('/api', usersApp);

// OpenAPI仕様書のエンドポイント
app.doc('/doc', {
        openapi: '3.0.0',
        info: {
            version: '1.0.0',
            title: 'API Documentation',
            description: 'Hono + Zod-OpenAPIを使用したAPI',
        },
    });

// Swagger UIのエンドポイント
// http://localhost:5173/doc/ui でアクセス可能
app.get('/doc/ui', swaggerUI({ url: '/doc' }));

export default {
    port: 5173,
    fetch: app.fetch
};

// フロントエンドがHono RPCを使用する際に型情報を利用できるようにする
export type AppType = typeof usersApp;  // typeof app ではない!ことに注意
