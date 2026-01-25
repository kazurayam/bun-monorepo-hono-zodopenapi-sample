// frontend/src/api/client.ts

import { hc } from "hono/client";
import type { AppType } from "@kazurayam/bun-monorepo-hono-zodopenapi-sample-backend/server";
import type {
    CreateUserRequest,
    CreateUserResponse,
    ErrorResponse,
    GetUsersQuery,
    GetUsersResponse
} from "@kazurayam/bun-monorepo-hono-zodopenapi-sample-shared/schema";

// Hono RPCクライアントを作成
const client = hc<AppType>("http://localhost/api");

// ユーザー一覧を取得する関数
export const getUsers = async (query?: GetUsersQuery): Promise<GetUsersResponse> => {
    if (!client) { throw new Error("Hono client is not initialized"); }
    if (!client.users) { throw new Error("Hono client.users is not initialized"); }
    if (!client.users.$get) { throw new Error("Hono client.users.$get is not initialized"); }
    const response = await client.users.$get({
        query: {
            page: query?.page || "1",
            limit: query?.limit || "20",
        },
    });
    if (!response.ok) {
        throw new Error("ユーザー一覧の取得に失敗しました");
    }
    return await response.json();
};

// ユーザーを作成する関数
export const createUser = async (data: CreateUserRequest): Promise<CreateUserResponse> => {
    if (!client) { throw new Error("Hono client is not initialized"); }
    if (!client.users) { throw new Error("Hono client.users is not initialized"); }
    if (!client.users.$post) { throw new Error("Hono client.users.$post is not initialized"); }
    const response = await client.users.$post({
        json: data,
    });
    if (!response.ok) {
        const eRes: ErrorResponse = await response.json();
        throw new Error(eRes.error.message || "ユーザーの作成に失敗しました");
    }
    return await response.json();
};

