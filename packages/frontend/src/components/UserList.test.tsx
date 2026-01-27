// frontend/src/UserList.test.ts

import { describe, expect, test } from "bun:test";
import { render, screen, act } from "@testing-library/react";
import { UserList } from "./UserList";

describe('UserListコンポーネントのテスト', () => {
    test('HTMLが応答されることを確認', async () => {
        await act(async () => {
            render(<UserList />);
            const element = screen.getByText(/ユーザー一覧/i);
            expect(element).toBeDefined();
        })

    });
});

