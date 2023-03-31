create table contactForm (
    title varchar(100) not null,
    email varchar(100) not null,
    username varchar(50) not null,
    link text,
    category ENUM("question", "comment", "concern") not null,
    message text not null,
    primary key(username)
);