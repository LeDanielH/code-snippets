# create database mydb2;
use mydb2;
create table articles (
		id integer auto_increment,
		person_id int not null,
		title varchar(200),
		content text,
    primary key(id)
);

insert into articles ( person_id, title, content) 
	values 
		(1, 'article 1', 'some text in the article'),
		(1, 'article 2', 'more some text in the article'),
		(1, 'article 3', 'even more some text in the article'),
		(1, 'article 4', 'most some text in the article')
;
select * from articles where title like '%article%'; # match anything with the word article inside it
# strings that begin with: 'article%'
select * from articles where content like 'mor%';