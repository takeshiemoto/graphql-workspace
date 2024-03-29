-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE TABLE band_members (
--     band_id INTEGER NOT NULL REFERENCES bands(id) ON DELETE CASCADE,    -- バンドのID
--     artist_id INTEGER NOT NULL REFERENCES artists(id) ON DELETE CASCADE, -- アーティストのID
--     join_date DATE,               -- 参加日
--     leave_date DATE,              -- 脱退日（まだバンドに所属している場合はNULL）
--     role VARCHAR(255),            -- 役割/ポジション（例: ボーカル, ギター, ドラムなど）
--     PRIMARY KEY (band_id, artist_id),  -- 同じアーティストが同じバンドに複数回参加することはないため、これら2つのカラムの組み合わせを主キーとします
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   -- レコード作成日時
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP    -- レコード更新日時
-- );
