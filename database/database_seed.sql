INSERT INTO
    users (
        username,
        password,
        first_name,
        last_name,
        email
    )
VALUES (
        'wappyfoo21',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Guzzy',
        'McDonaldson',
        'theguzz@test.com'
    ), (
        'chicklets33',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Markus',
        'Barkus',
        'markus@test.com'
    );

INSERT INTO
prompts (
    name,
    date,
    prompt_text,
    comments,
    user_id
),
(
    "Business Men",
    CURRENT_DATE,
    'Create a picture of businessmen meeting and striking a deal',
    'I get better pictures when I am more specific.',
    1
)