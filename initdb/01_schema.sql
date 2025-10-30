-- データベースが作成された後、デフォルトのDB（通常はPOSTGRES_DBで指定したDB）に対して実行されます。

-- テーブルの作成
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100)
);

-- 初期データの投入
INSERT INTO users (username, email) VALUES
('alice', 'alice@example.com'),
('bob', 'bob@example.com'),
('charlie', 'charlie@examle.com');