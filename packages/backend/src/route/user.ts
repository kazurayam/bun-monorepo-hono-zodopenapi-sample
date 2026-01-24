// backend/src/route/user.ts

import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import type { RouteHandler } from "@hono/zod-openapi";
import {
    CreateUserRequestSchema,
    CreateUserResponseSchema,
    ErrorResponseSchema,
    GetUsersQuerySchema,
    GetUsersResponseSchema
} from "@kazurayam/ts2307error-in-monorepo-shared";

const app = new OpenAPIHono();

// ユーザー作成のエンドポイントのルートを定義する
const createUserRoute = createRoute({
    method: "post",
    path: "/users",
    request: {
        body: {
            content: {
                "application/json": {
                    schema: CreateUserRequestSchema
                }
            }
        }
    },
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: CreateUserResponseSchema,
                }
            },
            description: "ユーザーの作成に成功しました"
        },
        400: {
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                }
            },
            description: "バリデーションエラー"
        }
    },
    tags: ["Users"],
    summary: "ユーザーを作成",
    description: "新しいユーザーを作成します",
});

// ユーザー作成エンドポイントのハンドラー
const createUsersHandler: RouteHandler<typeof createUserRoute> = async (c) => {
    const body = c.req.valid("json");

    // ここでデータベースへ保存する
    const newUser = {
        id: `user_${Date.now()}`,
        name: body.name,
        email: body.email,
        createdAt: new Date().toISOString(),
    };

    return c.json(
        {
            success: true,
            data: newUser,
        },
        200
    );
};

// ユーザー一覧取得エンドポイントのルート定義
const getUsersRoute = createRoute({
    method: "get",
    path: "/users",
    request: {
        query: GetUsersQuerySchema,
    },
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: GetUsersResponseSchema,
                },
            },
            description: "ユーザー一覧の取得に成功しました",
        },
    },
    tags: ["Users"],
    summary: "ユーザー一覧を取得",
    description: "ユーザーの一覧を取得します"
});


// ユーザー一覧取得エンドポイントのハンドラー
const getUsersHandler: RouteHandler<typeof getUsersRoute> = async (c) => {
    const query = c.req.valid("query");
    const page = parseInt(query.page || "1");
    const limit = parseInt(query.limit || "20");

    // ここでデータベースからユーザー情報を取得する
    const users = [
        {
            id: "user_123",
            name: "山田太郎",
            email: "yamada@example.com",
            createdAt: "2025-01-01T00:00:00Z"
        },
        {
            id: "user_456",
            name: "佐藤花子",
            email: "sato@example.com",
            createdAt: "2025-01-02T00:00:00Z",
        },
    ];

    return c.json({
        success: true,
        data: users,
        pagination: {
            page,
            limit,
            total: 100,
        }
    });
};

// ルートとハンドラーを登録する
const routes = app
    .openapi(getUsersRoute, getUsersHandler)
    .openapi(createUserRoute, createUsersHandler);
// new OpenAPIHono()で定義したappに対し、openapiメソッドを使って
// ルートとハンドラを対応づけて登録し、routesという変数に格納する。

export { routes as usersApp }
// 最終的にroutes変数をexportする。backend/src/server.tsはAPIクライアントを
// 用いる際に usersApp という名前でimportする。
// APIクライアントはusersAppについて型推論を利用することができる。
