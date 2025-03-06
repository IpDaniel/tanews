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

-- Insert sample articles into the `articles` table
-- Insert sample articles into the `articles` table
INSERT INTO articles (article_id, title, text, read_time, publish_date, update_date, head_url)
VALUES 
(1, 'Bethesda Community Center Receives $2M Grant for Renovations', 
'The Bethesda Community Center is set to undergo a transformative renovation after being awarded a $2 million grant...', 
5, '2024-03-15', NOW(), 'https://www.greaterbethesdachamber.org/uploads/1/1/8/4/118438767/bethesda-metro-plaza_2_orig.jpg'),

(2, 'City Unveils New Downtown Bike Lanes for Safer, Greener Commuting', 
'City planners are celebrating the completion of a network of dedicated bike lanes throughout the downtown area...', 
4, '2024-03-14', NOW(), 'https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg.webp'),

(3, 'Harvest Table Expands with Second Location in Riverside', 
'Harvest Table, the beloved farm-to-table restaurant known for its fresh, locally sourced dishes, has officially opened its second location...', 
3, '2024-03-13', NOW(), 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'),

(4, 'AI Cybersecurity Firm SecureFlow Secures $10M in Series A Funding', 
'Bethesda-based AI startup SecureFlow has announced a $10 million Series A funding round, marking a pivotal moment in the company’s growth...', 
6, '2024-03-12', NOW(), 'https://upenn.brightspotcdn.com/dims4/default/12a51cb/2147483647/strip/true/crop/1000x750+0+125/resize/1600x1200!/format/webp/quality/90/?url=http%3A%2F%2Fwharton-brightspot.s3.us-east-2.amazonaws.com%2Fd4%2Fb9%2F598447bf43dc9266655cc895ca14%2Fsecureflow.png'),

(5, 'Historic Strand Theater Announces Exciting Summer Arts Program', 
'The Strand Theater, a historic cultural landmark, has unveiled its ambitious summer arts program, promising an exciting season of creativity...', 
4, '2024-03-11', NOW(), 'https://lh3.googleusercontent.com/ci/AL18g_Ss5Z6l4HReSAUWzCTWrRY7PmOQla1xioNk0SG9eVV1f67d7Exq4E2x7s3BE28BDgakYsOOFCs=s1200'),

(6, 'Local Schools Launch Ambitious Green Futures Environmental Program', 
'Local schools have taken a significant step toward combating climate change with the launch of an innovative environmental initiative...', 
5, '2024-03-10', NOW(), 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrg0Wpj2i6cggHOjZuUPIddg39QnsQu0hK-g&s');


-- Insert authorship relationships into `article_authors`
INSERT INTO article_authors (user_id, article_id)
VALUES 
((SELECT user_id FROM users WHERE name = 'Naman Rusia'), 1),
((SELECT user_id FROM users WHERE name = 'Rishi Dilip'), 2),
((SELECT user_id FROM users WHERE name = 'Aditya Patwal'), 3),
((SELECT user_id FROM users WHERE name = 'Connor Karr'), 4),
((SELECT user_id FROM users WHERE name = 'Daniel Ip'), 5);

SELECT 'Example data script completed successfully' as message;

-- Insert sample articles into the `articles` table
INSERT INTO articles (title, text, read_time, publish_date, update_date, head_url)
VALUES 
(
    'Local Community Garden Flourishes Amid Urban Landscape', 
    'In the heart of the city, a once-abandoned lot has transformed into a thriving community garden, bringing together residents from all walks of life. This green oasis not only provides fresh produce but also fosters a sense of unity and purpose among volunteers. The garden''s coordinator, Maria Lopez, shared, "What started as a small project has blossomed into a vital part of our community. It''s amazing to see how nature can bring people together." With over 50 types of vegetables, fruits, and herbs, the garden supplies local markets and restaurants, promoting sustainable urban agriculture. Workshops on gardening and sustainability are held monthly, attracting participants eager to learn and contribute. Future plans include expanding the garden to include a children''s play area and hosting seasonal festivals to celebrate the harvests.', 
    4, 
    '2025-02-15', 
    '2025-02-16', 
    'https://i.ytimg.com/vi/sxrzdev5l3A/maxresdefault.jpg'
),
(
    'Tech Start-Up Launches Innovative App to Reduce Food Waste', 
    'A local tech start-up has unveiled a new app designed to connect restaurants with surplus food to charities in need. This innovative solution aims to tackle the growing issue of food waste while supporting communities facing food insecurity. CEO Alex Thompson explained, "Our goal is to create a seamless platform where businesses can easily donate excess food, ensuring it reaches those who need it most." Since its launch, the app has partnered with over 100 eateries and 25 charities, redistributing thousands of meals that would have otherwise gone to waste. Users can track donations, receive notifications about available food, and access resources on sustainable practices.', 
    3, 
    '2025-03-01', 
    '2025-03-02', 
    'https://picsum.photos/200'
),
(
    'Historic Theater Reopens After Major Renovations', 
    'After two years of extensive renovations, the Grand Palace Theater has reopened its doors, much to the delight of art enthusiasts and historians alike. The restoration project aimed to preserve the theater''s rich history while incorporating modern amenities. Architectural historian, Dr. Emily Carter, noted, "The Grand Palace is a testament to our cultural heritage. Its revival ensures that future generations can experience its grandeur." The theater now boasts state-of-the-art sound and lighting systems, improved seating, and enhanced accessibility features. The inaugural performance, a sold-out classical concert, received rave reviews from attendees. Upcoming events include a mix of theatrical productions, musical performances, and community gatherings, solidifying the theater''s role as a cultural hub.', 
    5, 
    '2025-01-20', 
    '2025-01-21', 
    'https://picsum.photos/200'
);
