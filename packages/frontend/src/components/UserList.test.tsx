// frontend/src/UserList.test.ts

import { describe, expect, test } from "bun:test";
import { render, screen } from "@testing-library/react";
import { UserList } from "./UserList";

describe('UserListコンポーネントのテスト', () => {
    test('UserListコンポーネントが正しくレンダリングされることを確認', () => {
        render(<UserList />);
        const element = screen.getByText(/読み込み中/i);
        expect(element).toBeDefined();
    });
});

