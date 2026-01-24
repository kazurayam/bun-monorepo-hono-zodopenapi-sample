import { describe, expect, test } from 'bun:test';
import { testClient } from 'hono/testing';
import app from './server';
import type { AppType } from './server';

describe('ユーザ一に関するテスト', () => {
    test('', async () => {
        const client = testClient<AppType>(app);
        const res = await client.users.$post({
            name: 'kazurayam',
            email: 'kazurayam@example.com'
        })
        expect(res.status).toBe(200);
        const body = await res.json();
        expect(body).toEqual({
            id: 1,
            name: 'kazurayam',
            email: 'kazurayam@example.com'

        });
    });
});
