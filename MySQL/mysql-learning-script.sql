use mydb;

create table beautiful_people (
	person_id integer auto_increment,
    first_name varchar(40) not null,
    last_name varchar(50) not null,
    date_of_birth date not null,
    primary key(person_id)
);

create table orders (
	person_id int,
	order_id integer auto_increment,
    number_of_items tinyint not null,
    order_created_at datetime default current_timestamp,
    primary key(order_id),
    foreign key (person_id) references beautiful_people(person_id),
    check(number_of_items > 0)
);

insert into `mydb`.`beautiful_people`
	(`first_name`, `last_name`,`date_of_birth`)
values
	('Daniel', 'Hoksza', str_to_date('15/2/1988', '%d/%m/%Y')),
    ('Adela', 'Tausova', str_to_date('12/3/1989', '%d/%m/%Y')),
    ('Oliver', 'Black', str_to_date('14/1/2015', '%d/%m/%Y')),
    ('Matyas', 'Russ', str_to_date('13/2/2013', '%d/%m/%Y'))
;

insert into `mydb`.`orders` 
	(`number_of_items`,`person_id`) 
values 
	(3,1), 
    (4,2), 
    (1,3), 
    (10,2)
;

create table profiles (
	profile_id integer auto_increment,
	person_id int,
    address text,
    profile_updated datetime default current_timestamp on update current_timestamp(),
    primary key (profile_id),
    foreign key (person_id) references beautiful_people(person_id)
);

insert into `mydb`.`profiles`
	(`address`, `person_id`)
values
	('Downing Street 17, London, E0EE21', 1),
    ('World Trade Center, New York, 9223', 2)
;

update `mydb`.`profiles` set `address` = 'Nusel 2280, Prague 3, 13000' where `person_id` = 2;
update `mydb`.`profiles` set `address` = '46 Hells Kitchen, Seattle, 98000' where `person_id` = 1;

# delete in the backwards order they were added (foreign key)

# delete from `mydb`.`profiles` where person_id = 1;
# delete from `mydb`.`orders` where person_id = 1;
# delete from `mydb`.`beautiful_people` where person_id = 1;

select * from mydb.orders;
select number_of_items, order_created_at as purchased from mydb.orders where person_id=1;
select count(number_of_items) as total_sales, sum(number_of_items) from mydb.orders where person_id=2;
#other methods include: avg, min and max
select distinct(number_of_items) from mydb.orders; #remove duplicate number_of_items
select concat(first_name, ' ', last_name) as full_name from `mydb`.`beautiful_people`;
-- 
--  select * from mydb.orders 
-- 	where order_created_at >= '2016-02-13 13:59:33'
--  and order_created_at <= '2016-02-16 13:59:33';

--  better way to do the same: 
select * from mydb.orders where order_created_at 
	between '2016-02-13 13:59:33' and '2016-02-16 13:59:33' 
    # reverse meaning with the words NOT BETWEEN
    and number_of_items > 3 
    # reverse meaning with the words AND NOT
    order by person_id; #descending "order by person_id desc;"
    
select person_id, count(number_of_items) from mydb.orders group by person_id;

select * from `mydb`.`beautiful_people` 
	join `mydb`.`profiles` 
    on beautiful_people.person_id = profiles.person_id;
    
select concat(beautiful_people.first_name, ' ', beautiful_people.last_name) as full_name,
	sum(orders.number_of_items) as items_total 
    from `mydb`.`beautiful_people` 
    right join `mydb`.`orders`
    on beautiful_people.person_id = orders.person_id
    group by beautiful_people.person_id;
    
