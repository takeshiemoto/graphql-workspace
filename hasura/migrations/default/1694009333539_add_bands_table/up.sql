CREATE TABLE bands (
    id SERIAL PRIMARY KEY,         -- 一意のID
    name VARCHAR(255) NOT NULL,    -- バンド名
    formation_date DATE,           -- 結成日
    bio TEXT,                      -- バンドの簡単な経歴や説明
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   -- レコード作成日時
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP    -- レコード更新日時
);
