// frontend/src/components/UserList.tsx

import { useEffect, useState } from "react";
import { getUsers, createUser } from "../api/client";
import type { GetUsersResponse } from "@kazurayam/bun-monorepo-hono-zodopenapi-sample-shared/schema";

export const UserList = () => {
    const [users, setUsers] = useState<GetUsersResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // ユーザー一覧を取得
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const data = await getUsers({ page: "1", limit: "20" });
                setUsers(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "エラーが発生しました");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // ユーザーを作成
    const handleCreateUser = async () => {
        try {
            const newUser = await createUser({
                name: "新規ユーザ",
                email: "newuser@example.com",
            });
            console.log("作成されたユーザー:", newUser);
            // ユーザー一覧を再取得
            const data = await getUsers({ page: "1", limit: "20" });
            setUsers(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "エラーが発生しました");
        }
    };

    if (loading) return <div>読み込み中...</div>
    if (error) return <div>エラー: {error}</div>
    if (!users) return null;

    return (
        <div>
            <h2>ユーザー一覧</h2>
            <button onClick={handleCreateUser}>ユーザーを作成</button>
            <ul>
                {users.data.map((user: any) => (
                    <li key={user.id}>
                        {user.name} ({user.email})
                    </li>
                ))}
            </ul>
            <p>
                ページ: {users.pagination.page} / 全{users.pagination.total}件
            </p>
        </div>
    );
};
