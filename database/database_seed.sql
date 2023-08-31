INSERT INTO
    users (
        username,
        password,
        first_name,
        last_name,
        email
    )
VALUES (
        'user1',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Guzzy',
        'McDonaldson',
        'theguzz@test.com'
    ), (
        'user2',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Markus',
        'Barkus',
        'markus@test.com'
    ), (
        'user3',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Bun',
        'Bunnterton',
        'thebigbun@test.com'
    );

INSERT INTO
    prompts (
        username,
        title,
        date,
        prompt_text,
        comments
    )
VALUES (
        'user1',
        'Business Men',
        CURRENT_DATE,
        'Create a picture of businessmen meeting and striking a deal',
        'I get better pictures when I am more specific.'
    ), (
        'user2',
        'Flowers',
        CURRENT_DATE,
        'Create a picture of a field of flowers with a tree in the middle',
        'Need to refine this more.'
    ), (
        'user3',
        'Bunnies',
        CURRENT_DATE,
        'Create a picture of a rabbits hanging around a garden',
        'Maybe next time try hanging out in a field?'
    ), (
        'user1',
        'Clouds',
        CURRENT_DATE,
        'Show are cartoon picture of clouds floating in the sky',
        'I get better pictures when I am more specific.'
    ), (
        'user2',
        'Dancing',
        CURRENT_DATE,
        'Create a photo realistic shot of people dancing',
        'Need to refine this more.'
    ), (
        'user3',
        'The Mailman',
        CURRENT_DATE,
        'Show a mailman being chased by an angry dog',
        'Maybe next time try hanging out in a field?'
    );