CREATE TABLE artists (
    id SERIAL PRIMARY KEY,         -- 一意のID
    name VARCHAR(255) NOT NULL,    -- アーティスト名
    birth_date DATE,               -- 生年月日（アーティストが個人の場合）
    bio TEXT,                      -- アーティストの簡単な経歴や説明
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   -- レコード作成日時
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP    -- レコード更新日時
);
