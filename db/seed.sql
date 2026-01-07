-- Seed data for boilerplate-nestjs (PostgreSQL)
-- Optional cleanup:
-- TRUNCATE TABLE permissions, menus, roles, users, categories, notifications RESTART IDENTITY CASCADE;

INSERT INTO roles (id, title, description) VALUES
    ('7a9a20af-b268-45b0-9e1b-d7effefc9adb', 'admin', 'Administrator role'),
    ('a0384f60-e24d-4e0f-9cfd-8624e1837cb8', 'user', 'Standard user role');

INSERT INTO users (id, name, phone, password, role, email, is_active) VALUES
    ('19d9ac48-778f-45d3-bcc9-e652245a0718', 'Admin User', '081111111111', '$2b$10$CwTycUXWue0Thq9StjUM0uJ8Y1F5xq8YlqTg3oKzA6N5z8rQm1qf6', 'admin', 'admin@example.com', 1),
    ('779b4828-9264-4290-afc0-506045bf0c90', 'Regular User', '082222222222', '$2b$10$CwTycUXWue0Thq9StjUM0uJ8Y1F5xq8YlqTg3oKzA6N5z8rQm1qf6', 'user', 'user@example.com', 1);

INSERT INTO menus (id, title, icon, url, status) VALUES
    ('d80e56fd-c48d-4799-9e43-626ec41c9e3a', 'Dashboard', 'dashboard', '/dashboard', 'active'),
    ('2bf361c0-85ac-4520-96d7-a4cbe3f62c63', 'Users', 'users', '/users', 'active'),
    ('83b06b5e-46c3-4ce6-8b48-ab74efe2ee02', 'Roles', 'shield', '/roles', 'active'),
    ('dcecf200-6d31-4496-80e6-022eccfdc366', 'Permissions', 'lock', '/permissions', 'active'),
    ('a261e8d2-cd63-414a-8faf-f957863da6d4', 'Menus', 'menu', '/menus', 'active');

INSERT INTO permissions (id, menu_id, role_id, "create", "read", "update", "delete", approve) VALUES
    ('eefc1ed0-face-4937-bac6-8bcdd050f683', 'd80e56fd-c48d-4799-9e43-626ec41c9e3a', '7a9a20af-b268-45b0-9e1b-d7effefc9adb', 1, 1, 1, 1, 1),
    ('3dfb6b87-489c-455e-b7c6-21cc05bbff25', '2bf361c0-85ac-4520-96d7-a4cbe3f62c63', '7a9a20af-b268-45b0-9e1b-d7effefc9adb', 1, 1, 1, 1, 1),
    ('d660edab-d23b-49f5-8cfa-b1b0941093ce', '83b06b5e-46c3-4ce6-8b48-ab74efe2ee02', '7a9a20af-b268-45b0-9e1b-d7effefc9adb', 1, 1, 1, 1, 1),
    ('c2fb7e6b-591a-46ca-bcba-feb96d75c28c', 'dcecf200-6d31-4496-80e6-022eccfdc366', '7a9a20af-b268-45b0-9e1b-d7effefc9adb', 1, 1, 1, 1, 1),
    ('7d5ef929-bc41-44aa-85d0-edcae684e9c8', 'a261e8d2-cd63-414a-8faf-f957863da6d4', '7a9a20af-b268-45b0-9e1b-d7effefc9adb', 1, 1, 1, 1, 1),
    ('f754ac08-95d7-4069-bc8c-fa27b8849a32', 'd80e56fd-c48d-4799-9e43-626ec41c9e3a', 'a0384f60-e24d-4e0f-9cfd-8624e1837cb8', 0, 1, 0, 0, 0),
    ('93aa78a3-a2ce-4b70-ac51-2712e5c3f7ab', '2bf361c0-85ac-4520-96d7-a4cbe3f62c63', 'a0384f60-e24d-4e0f-9cfd-8624e1837cb8', 0, 1, 0, 0, 0),
    ('0ab28163-7aa1-41e4-9bf0-a1b7c768f0da', '83b06b5e-46c3-4ce6-8b48-ab74efe2ee02', 'a0384f60-e24d-4e0f-9cfd-8624e1837cb8', 0, 1, 0, 0, 0),
    ('75e0e5b7-c914-49f5-a25a-9ff910a5925e', 'dcecf200-6d31-4496-80e6-022eccfdc366', 'a0384f60-e24d-4e0f-9cfd-8624e1837cb8', 0, 1, 0, 0, 0),
    ('cb903797-b026-4e38-89e7-051ee4e3a639', 'a261e8d2-cd63-414a-8faf-f957863da6d4', 'a0384f60-e24d-4e0f-9cfd-8624e1837cb8', 0, 1, 0, 0, 0);

INSERT INTO categories (id, type, sub_category, label, value, status) VALUES
    ('3c49eec3-ad8a-499b-9800-b583eb69125d', 'user_status', 'account', 'Active', 'active', 'active'),
    ('f4eed33b-4eaa-4d30-a9e9-6a6e8e7472f6', 'user_status', 'account', 'Inactive', 'inactive', 'active'),
    ('0b85386c-5f53-4058-ba48-54fc784ae542', 'menu_status', 'ui', 'Active', 'active', 'active'),
    ('8cb6a28c-2c43-4b4a-a2cc-d142091bc3a1', 'menu_status', 'ui', 'Inactive', 'inactive', 'active');

INSERT INTO notifications (id, title, message, icon, type, url, is_read, user_id) VALUES
    ('f2cdd1c9-9f9d-4c80-9a19-3577b928912c', 'Welcome', 'Welcome admin!', 'info', 'system', '/dashboard', 0, '19d9ac48-778f-45d3-bcc9-e652245a0718'),
    ('ed2a4471-8de7-48e1-ab24-b15c22e13d96', 'Welcome', 'Welcome user!', 'info', 'system', '/dashboard', 0, '779b4828-9264-4290-afc0-506045bf0c90');
