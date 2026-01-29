import { Hono } from 'hono';
import type { FC } from 'hono/jsx';  // FC stands for Function Component
import { UserList } from './components/UserList';

const app = new Hono();

const Layout: FC = (props) => {
    return (
        <html>
            <head>
                <title>Hono with JSX</title>
            </head>
            <body>{props.children}</body>
        </html>
    );
}

const Top: FC<{ messages: string[] }> = (props: {
    messages: string[]
}) => {
    return (
        <Layout>
            <h1>Welcome to Hono with JSX</h1>
            <h2>Messages</h2>
            <ul>
                {props.messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
            <UserList />
        </Layout>
    );
}

app.get('/', (c) => {
    const messages = ['Good morning', 'Hello', 'Good night'];
    return c.html(<Top messages={messages} />);
});

export default {
    port: 3000,
    fetch: app.fetch
};
