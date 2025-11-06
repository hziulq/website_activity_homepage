-- データベースが作成された後、デフォルトのDB（通常はPOSTGRES_DBで指定したDB）に対して実行されます。

CREATE TABLE news_genres (
    id SERIAL PRIMARY KEY,
    genre_name VARCHAR(32)
);


CREATE TABLE news (
    id SERIAL PRIMARY KEY,
    post_date DATE DEFAULT CURRENT_TIMESTAMP,
    genre_id INTEGER,
    title VARCHAR(256),
    thumbnail_url VARCHAR(1024),
    content TEXT,
    FOREIGN KEY(genre_id) REFERENCES news_genres(id)
);


CREATE TABLE update_genres (
    id SERIAL PRIMARY KEY,
    genre_name VARCHAR(32)
);


CREATE TABLE updates (
    id SERIAL PRIMARY KEY,
    post_date DATE DEFAULT CURRENT_TIMESTAMP,
    genre_id INTEGER,
    title VARCHAR(256),
    content TEXT,
    FOREIGN KEY(genre_id) REFERENCES update_genres(id)
);


CREATE TABLE cources (
    id SERIAL PRIMARY KEY,
    cource_name VARCHAR(64)
);

CREATE TABLE grades (
    id SERIAL PRIMARY KEY,
    grade_name VARCHAR(32)
);

CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(64),
    photo_url VARCHAR(1024),
    cource_id INTEGER,
    enrollment_year DATE,
    grade_id INTEGER,
    github_url VARCHAR(1024),
    FOREIGN KEY(cource_id) REFERENCES cources(id),
    FOREIGN KEY(grade_id) REFERENCES grades(id)
);



CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    skill_name VARCHAR(32)
);


CREATE TABLE members_skills (
    id SERIAL PRIMARY KEY,
    member_id INTEGER,
    skill_id INTEGER,
    FOREIGN KEY(member_id) REFERENCES members(id),
    FOREIGN KEY(skill_id) REFERENCES skills(id)
);






-- TOP
-- news
-- update
-- contents

-- ABOUT

