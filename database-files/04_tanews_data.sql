
USE TaNewsDB; 
SELECT 'Starting example data script' as message;

-- Ensure we're in strict SQL mode
SET SQL_MODE = "STRICT_ALL_TABLES";

-- Insert users into the `users` table
INSERT INTO users (user_id, name, email, password, image_url, is_admin, is_author) 
VALUES 
(1, 'Naman Rusia', 'naman@example.com', 'password123', 'https://media.licdn.com/dms/image/v2/D5603AQFrnFG94SE_Kw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1702636764199?e=1746662400&v=beta&t=uN73fAdOrxewzCRq3p226q8TbvN3gh0Id5tBWWeax9E', true, true),
(2, 'Rishi Dilip', 'rishi@example.com', 'password123', 'https://media.licdn.com/dms/image/v2/D5603AQEhJSSwLIdILQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1722561051233?e=1746662400&v=beta&t=wteaVUWTb8AN2M8Vmtw8oF_jvopWAGuDEO_Wfjcn67M', true, false),
(3, 'Aditya Patwal', 'aditya@example.com', 'password123', 'https://media.licdn.com/dms/image/v2/D4E03AQHT9SZ3V5J8DQ/profile-displayphoto-shrink_100_100/B4EZSyhNeLHgAU-/0/1738161838883?e=1746662400&v=beta&t=B5v2G4GY5kU5Jx_1Cm3WbpymutqamunjDWpl0megVRQ', true, false),
(4, 'Connor Karr', 'connor@example.com', 'password123', 'https://media.licdn.com/dms/image/v2/D4E03AQHhOpjA9BlKFA/profile-displayphoto-shrink_100_100/B4EZSby6pMHAAU-/0/1737780604088?e=1746662400&v=beta&t=THF3Vv6fOZnHc84ADR4mbZVOem1LEOcEyqUlgZ3qMy8', true, false),
(5, 'Daniel Ip', 'daniel@example.com', 'password123', 'https://media.licdn.com/dms/image/v2/D4E03AQHnn4ExE-b5Vw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1730306538483?e=1746662400&v=beta&t=T2ApUHZI_dhuK2RGzm4ia0neMk2JcHyvDiizgeQTZ_I', true, false);



SELECT 'Example data script completed successfully' as message;
