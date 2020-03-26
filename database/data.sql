INSERT INTO "user"
    ("username", "password", "securityLevel", "email", "role", "user_levels", "points")
VALUES
    ('allenlucke', '$2b$10$4hdodp7k6YIQzaiX6.Oj.OAl8mwr30XCejxkpwgfOYA6N34HS9Sy.', 20, 'allenlucke@gmail.com', 'Developer', 2, 120),
    ('testUser', '$2b$10$4hdodp7k6YIQzaiX6.Oj.OAl8mwr30XCejxkpwgfOYA6N34HS9Sy.', 1, 'allenlucke@gmail.com', 'Developer', 2, 120);

-- pre-load some colors
INSERT INTO "colors" ("label", "hex_code")
VALUES ('Red', '#ff0000'),
    ('Yellow', '#ffff00'),
    ('Blue', '#0000ff'),
    ('Green', '#00ff00');
        
--preload some levels
INSERT INTO "levels" ("qualifier")
VALUES  (0),
        (100),
        (200),
        (300),
        (400),
        (500),
        (750),
        (1000),
        (2000),
        (3000),
        (4000),
        (5000);

--preload some achievements
INSERT INTO "achievements" ("achievement", "points")
VALUES ('Add color by name', 20),
        ('Add color by hex code', 30),
        ('Add Block', 10);

-- pre-load some blocks for initial render
INSERT INTO "blocks" ("colors_id", "user_id", "achievements_id")
VALUES (4, 1, 3),
    (3, 1, 3),
    (2, 1, 3),
    (1, 1, 3),
    (4, 2, 3),
    (3, 2, 3),
    (2, 2, 3),
    (1, 2, 3);

INSERT INTO "colors_user" ("colors_id", "user_id", "achievements_id")
VALUES (1, 1, 1),
    (2, 1, 1),
    (3, 1, 1),
    (4, 1, 1),
    (1, 2, 1),
    (2, 2, 1),
    (3, 2, 1),
    (4, 2, 1);