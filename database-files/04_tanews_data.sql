
use TaNewsDB; 
SELECT 'Starting example data script' as message;

-- Ensure we're in strict SQL mode
SET SQL_MODE = "STRICT_ALL_TABLES";

INSERT INTO User (user_id, full_name, isAdmin) 
VALUES ('1', 'Naman Rusia', true);