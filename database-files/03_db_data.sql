use db;

SELECT 'Starting example data script' as message;

-- Ensure we're in strict SQL mode
SET SQL_MODE = "STRICT_ALL_TABLES";

-- Insert some text into the table
INSERT INTO example_table (some_text) VALUES (
    'example text'
);


SELECT 'Example data script completed successfully' as message;






