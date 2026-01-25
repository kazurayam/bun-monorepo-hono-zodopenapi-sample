// frontend/src/UserList.test.ts

import { describe, expect, test } from "bun:test";
import { UserList } from "./UserList";

describe('UserListコンポーネントのテスト', () => {
    test('UserListコンポーネントが正しくレンダリングされることを確認', () => {
        const userList = UserList();
        expect(userList).toBeDefined();
    });
});

