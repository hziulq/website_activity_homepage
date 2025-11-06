-- データベースが作成された後、デフォルトのDB（通常はPOSTGRES_DBで指定したDB）に対して実行されます。


INSERT INTO news_genres (genre_name) VALUES
('お知らせ'),
('LT会'),
('学園祭'),
('活動');


INSERT INTO news (genre_id, post_date, title, thumbnail_url, content) VALUES
(2, '2025/10/21', '第二回LT会を開催しました。','/images/thumbnail/001.png','今回のLT会「PostgreSQLとデータモデリング」は、非常に実践的で学びの多い時間となりました。普段からデータベース設計に関わる中で抱えていた疑問点や、よりモダンなPostgreSQLの機能の活用法について、具体例を通じて深く理解することができました。'),
(1, '2025/10/01', '学園祭にて、フランクフルト屋台の出店が確定しました。','',''),
(3, '2025/10/01', '学園祭にて、アプリ展示を行います。','',''),
(4, '2025/10/01', '一年生のアプリ制作が開始しました。','',''),
(4, '2025/8/20', 'U22にアプリを提出しました。','',''),
(4, '2025/8/21', 'マジカルミライにアプリを提出しました。','','');


INSERT INTO update_genres (genre_name) VALUES
('更新'),
('修正'),
('その他');



INSERT INTO updates (genre_id, post_date, title, content) VALUES
(1, '2025/10/30', 'dockerの立ち上げが成功しました','予定しているすべてのdocker containerの立ち上げが正常に動作することを確認しました。'),
(2, '2025/11/04', '管理人がCSSのコツをつかんできました。',''),
(3, '2025/11/05', '技育博2025に申し込みました。','');


INSERT INTO cources (cource_name) VALUES
('IT-AIコース'),
('IT-インフラコース'),
('IT-webコース'),
('AI-開発コース');



INSERT INTO members (full_name, face_photo, cource_id, enrollment_year, github_url) VALUES
('中村 陽太', '/images/members/中村 陽太.png', 1, '2025/04/01','https://github.com/hziulq/website_activity_homepage'),
('伴野 雅勝', '/images/members/伴野 雅勝.png', 2, '2024/04/01','https://github.com/hziulq/website_activity_homepage'),
('吉田 花', '/images/members/吉田 花.png', 3, '2023/04/01','https://github.com/hziulq/website_activity_homepage');




INSERT INTO skills (skill_name) VALUES
('C言語'),
('C++言語'),
('C#言語'),
('Python'),
('Java'),
('JavaScript'),
('Go'),
('Visual Basic'),
('Delphi/Object Pascal'),
('SQL'),
('Fortran'),
('Scratch'),
('PHP'),
('R'),
('Ada'),
('MATLAB'),
('Assembly Language'),
('Rust'),
('Perl'),
('COBOL');



INSERT INTO members_skills (member_id, skill_id) VALUES
(1,2),
(1,4),
(1,6),
(1,8),
(1,10);




-- TOP
-- news
-- update
-- contents

-- ABOUT

