// backend/src/server.test.ts

import { describe, expect, test } from 'bun:test';
import { Hono } from 'hono';

const app = new Hono();

describe('ユーザ一に関するテスト', () => {
    test('ユーザー一覧を取得する', async () => {
        const res = await app.request(
            new Request('http://localhost:5173/api/users', {
                method: 'GET',
            })
        );
        const text: string = await res.text();
        console.log(">>>" + text);
        // -> {"success":true,"data":[]}

        expect(res.status).toBe(200);
        const body = JSON.parse(text);
        expect(body).toHaveProperty('success');
        expect(body.success).toBe(true);
        expect(body).toHaveProperty('data');
        expect(Array.isArray(body.data)).toBe(true);
    });

    test('ユーザーを追加する', async () => {
        const res = await app.request(
            new Request('http://localhost:5173/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: 'kazurayam',
                    email: 'kazurayam@example.com'
                })
            })
        );
        expect(res.status).toBe(200);
        const text: string = await res.text();
        // console.log(text);
        // -> {"success":true,"data":{"id":"user_1769259070497","name":"kazurayam","email":"kazurayam@example.com","createdAt":"2026-01-24T12:51:10.497Z"}}
        const body = JSON.parse(text);
        expect(body).toHaveProperty('success');
        expect(body.success).toBe(true);
        expect(body).toHaveProperty('data');
        expect(body.data).toHaveProperty('id');
        expect(body.data).toHaveProperty('name');
        expect(body.data).toHaveProperty('email');
        expect(body.data.name).toEqual('kazurayam');
        expect(body.data.email).toEqual('kazurayam@example.com');
    });
});

describe('JSON形式のOpenAPIドキュメントを取得するテスト', () => {
    test('', async () => {
        const res = await app.request(
            new Request('http://localhost:5173/doc/ui', {
                method: 'GET',
            })
        );
        expect(res.status).toBe(200);
        const text: string = await res.text();
        //console.log(text);
        const body = JSON.parse(text);
        expect(body).toHaveProperty('openapi');
        expect(body.openapi).toBe('3.0.0');
        expect(body).toHaveProperty('info');
        expect(body.info).toHaveProperty('title');
        expect(body.info.title).toBe('API Documentation');
    });
});

