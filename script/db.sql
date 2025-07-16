-- Database schema for a resource management system

-- RESOURCE TABLE
CREATE TABLE resources (
                           id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                           title TEXT NOT NULL,
                           title_nepali TEXT NOT NULL,
                           description TEXT,
                           description_nepali TEXT,
                           tags TEXT,
                           category_id uuid REFERENCES categories(id),
                           format_id uuid REFERENCES formats(id),
                           difficulty_id uuid REFERENCES difficulties(id),
                           is_public BOOLEAN DEFAULT FALSE,
                           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CATEGORY TABLE
CREATE TABLE categories (
                            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),                            name VARCHAR(100) UNIQUE NOT NULL
);

-- FORMAT TABLE
CREATE TABLE formats (
                         id UUID PRIMARY KEY DEFAULT gen_random_uuid(),                         name VARCHAR(100) UNIQUE NOT NULL
);

-- DIFFICULTY TABLE
CREATE TABLE difficulties (
                              id UUID PRIMARY KEY DEFAULT gen_random_uuid(),                              level VARCHAR(50) UNIQUE NOT NULL -- e.g., Beginner, Intermediate, Advanced
);

-- RESOURCE FILES TABLE (multiple files per resource)
CREATE TABLE resource_files (
                                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                resource_id uuid REFERENCES resources(id) ON DELETE CASCADE,
                                file_url TEXT NOT NULL, -- File storage path or URL
                                file_name TEXT NOT NULL,
                                file_type VARCHAR(20), -- e.g., 'pdf', 'docx', 'mp4'
                                uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
--add data to catogories table
INSERT INTO categories (name) VALUES
                                  ('Business Planning'),
                                  ('Marketing'),
                                  ('Finance'),
                                  ('Legal'),
                                  ('Operations'),
                                  ('Leadership');
-- add data to difficulties table
INSERT INTO formats (name) VALUES
                               ('PDF'),
                               ('Video'),
                               ('Article'),
                               ('Template'),
                               ('Tool');

-- add data to difficulties table
INSERT INTO difficulties (level) VALUES
                                     ('Beginner'),
                                     ('Intermediate'),
                                     ('Advanced');

ALTER TABLE resource_files ADD COLUMN downloads INTEGER DEFAULT 0;


CREATE TABLE learning_paths (
                                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                name VARCHAR(255) NOT NULL,
                                category VARCHAR(100),
                                description TEXT,
                                estimated_time INTERVAL, -- or use INT for minutes
                                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE learning_path_resources (
                                         id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                         learning_path_id UUID REFERENCES learning_paths(id) ON DELETE CASCADE,
                                         resource_id UUID REFERENCES resources(id) ON DELETE CASCADE,
                                         order_index INTEGER, -- Optional: order of resources
                                         added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




