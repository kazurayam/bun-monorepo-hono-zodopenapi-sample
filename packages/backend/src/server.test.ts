import { describe, expect, test } from 'bun:test';
import app from './server';

describe('ユーザ一に関するテスト', () => {
    test('', async () => {
        const res = await app.request(
            new Request('http://localhost/api/users', {
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
        //console.log(text);
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
