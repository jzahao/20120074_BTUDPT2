**CÀI ĐẶT MÔI TRƯỜNG CHẠY DỰ ÁN**

- Download NodeJS version 20.0.0 tại link:
https://nodejs.org/en/blog/release/v20.0.0
- Sau khi tải về thì tiến hành cài đặt Node vào máy
- Kiểm tra NodeJS đã được cài vào máy hay chưa: Mở Command Prompt hoặc PowerShell, gõ node -v

=======================================================================================================================
**DATABASE**

- Sử dụng MySQL
- Mở MySQL và thực thi các dòng lệnh sau để tạo database:

CREATE DATABASE task_management;

USE task_management;

CREATE TABLE tasks (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(50) NOT NULL,
description TEXT,
start_date VARCHAR(10) NOT NULL,
due_date VARCHAR(10) NOT NULL,
finished_date VARCHAR(10),
status VARCHAR(20) NOT NULL,
category_id INT(6) UNSIGNED NOT NULL);

CREATE TABLE categories (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(50) NOT NULL,
date_created VARCHAR(10) NOT NULL)

=======================================================================================================================
**BACKEND**
- Mở thư mục back-end trong VSCode, vào file .env sau đó điều chỉnh các tham số môi trường tương ứng.
- Sau khi điều chỉnh các tham số, mở terminal và gõ lệnh npm install để install các package.
- Sau khi cài đặt các package, gõ npm start để chạy server (đảm bảo rằng đã mở db trước khi chạy server).

=======================================================================================================================
**FRONTEND**
- Mở thư mục front-end trong VSCode, vào file backendURL.js trong thư mục src, sau đó điều chỉnh url back-end tương ứng
- Sau khi điều chỉnh, mở terminal và gõ lệnh npm install để install các package.
- Sau khi cài đặt các package, gõ npm start để chạy server (đảm bảo rằng đã mở db trước khi chạy server).

=======================================================================================================================
**TỔNG KẾT**
- Làm được hết các chức năng yêu cầu trừ phân trang.