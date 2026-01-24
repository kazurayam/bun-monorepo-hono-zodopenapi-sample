// shared/src/schema.ts
import { z } from '@hono/zod-openapi';

// ユーザー情報のスキーマ
export const UserSchema = z.object({
    id: z
        .string()
        .openapi({
            example: 'user_123',
        }),
    name: z
        .string()
        .openapi({
            example: '山田太郎',
        }),
    email: z
        .email()
        .openapi({
            example: 'yamada@example.com',
        }),
    createdAt: z
        .iso.datetime()
        .openapi({
            example: '2025-01-01T00:00:00Z'
        })
});

// ユーザー作成のリクエストのスキーマ
export const CreateUserRequestSchema = z.object({
    name: z
        .string()
        .min(1)
        .max(100)
        .openapi({
            example: '山田太郎'
        }),
    email: z
        .email()
        .openapi({
            example: 'yamada@example.com'
        })
})

// ユーザー作成のレスポンスのスキーマ
export const CreateUserResponseSchema = z.object({
    success: z
        .boolean()
        .openapi({
            example: true
        }),
    data: UserSchema
})

// ユーザー一覧取得のクエリーパラメータのスキーマ
export const GetUsersQuerySchema = z.object({
    page: z
        .string()
        .optional()
        .openapi({
            example: '1'
        }),
    limit: z
        .string()
        .optional()
        .openapi({
            example: '20'
        })
})

// ユーザー一覧取得のレスポンスのスキーマ
export const GetUsersResponseSchema = z.object({
    success: z
        .boolean()
        .openapi({
            example: true
        }),
    data: z
        .array(UserSchema),
    pagination: z.object({
        page: z.number().openapi({ example: 1 }),
        limit: z.number().openapi({ example: 20 }),
        total: z.number().openapi({ example: 100 }),
    }),
})

// エラーレスポンスのスキーマ
export const ErrorResponseSchema = z.object({
    success: z.boolean().openapi({ example: false }),
    error: z.object({
        code: z.string().openapi({ example: 'VALIDATION_ERROR' }),
        message: z.string().openapi({ example: 'バリデーションの結果エラーが発生しました' })
    })
})

export type User = z.infer<typeof UserSchema>;
export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>;
export type CreateUserResponse = z.infer<typeof CreateUserResponseSchema>;
export type GetUsersQuery = z.infer<typeof GetUsersQuerySchema>;
export type GetUsersResponse = z.infer<typeof GetUsersResponseSchema>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
