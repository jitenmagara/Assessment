create DATABASE sqldb_3to4;
CREATE TABLE emp_mst ( 
    id INTEGER PRIMARY KEY AUTO_INCREMENT, 
    emp_name text NOT NULL, 
    emp_age integer NULL, 
    emp_salary integer NULL 
);
INSERT INTO emp_mst(`id`,`emp_name`,`emp_age`,`emp_salary`) VALUES ('',"pqr",29,55000);
INSERT INTO emp_mst(`id`,`emp_name`,`emp_age`,`emp_salary`) VALUES ('',"abcdfd",20,48700);
INSERT INTO emp_mst(`id`,`emp_name`,`emp_age`,`emp_salary`) VALUES ('',"xyz",45,45600);
INSERT INTO emp_mst(`id`,`emp_name`,`emp_age`,`emp_salary`) VALUES ('',"abv",55,78000);

SELECT * FROM `emp_mst`
SELECT * FROM `emp_mst` where emp_salary != NULL
SELECT * FROM `emp_mst` where emp_salary >=50000;
SELECT * FROM `emp_mst` LIMIT 4; //total first 4 records
SELECT * FROM `emp_mst` LIMIT 2,2; //2nd index - total 2 records
SELECT * FROM `emp_mst` ORDER by emp_salary ASC;    
SELECT * FROM `emp_mst` ORDER by emp_salary DESC;

SELECT * FROM `emp_mst` 
ORDER BY emp_salary DESC
LIMIT 1,1;

SELECT sum(emp_salary) FROM `emp_mst`;
SELECT MIN(emp_salary) FROM `emp_mst`;
SELECT MAX(emp_salary) FROM `emp_mst`;
SELECT AVG(emp_salary) FROM `emp_mst`;

SELECT * FROM `emp_mst` where emp_salary BETWEEN 20000 AND 50000

SELECT * FROM `emp_mst` where emp_name like 'a%';
SELECT * FROM `emp_mst` where emp_name like 'a_b%';
SELECT * FROM `emp_mst` where emp_name like '_b%';

SELECT * from emp_mst as e1,
emp_role_mst as e2 
where e1.id = e2.emp_id

SELECT e1.*,e2.rolename from emp_mst as e1,
emp_role_mst as e2 
where e1.id = e2.emp_id;

SELECT * from emp_mst as e1
left join emp_role_mst as e2 ON e2.emp_id = e1.id;

SELECT * from emp_mst as e1 join emp_role_mst as e2 ON e2.emp_id = e1.id;