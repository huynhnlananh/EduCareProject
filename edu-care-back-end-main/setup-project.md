# Hướng Dẫn Setup Dự Án

## 1. Chuẩn Bị

- Clone repo backend (BE) về máy.
- Cài đặt [Docker Desktop](https://www.docker.com/products/docker-desktop).
- Cài đặt [DBeaver](https://dbeaver.io/download/).

## 2. Chạy Docker

- Mở terminal tại thư mục chứa repo BE.
- Chạy lệnh sau để khởi chạy Docker:
  ```bash
  docker compose up --build
  ```

## 3. Kết Nối Cơ Sở Dữ Liệu (DB)

- Sau khi kết nối thành công, tạo một file `.env` trong thư mục dự án.
- Copy toàn bộ nội dung từ file `.example.env` vào file `.env`.

- Mở DBeaver.
- Tạo một **connection** mới với thông tin sau:

  - **Database**: `edu-care`
  - **Password**: `secret`

  (Thông tin chi tiết có thể tham khảo trong file `.example.env`.)

- Click **Test Connection**. Nếu xuất hiện lỗi liên quan đến key:

  1. Mở tab **Driver Properties**.
  2. Set `allowPublicKeyRetrieval` = `true`.
  3. Test lại connection và click **Finish**.

- Nếu gặp lỗi khác, liên hệ `huu-thien` để được hỗ trợ.

## 4. Chuẩn Bị Dữ Liệu Database

- Trong terminal của repo, lần lượt chạy các lệnh sau:
  ```bash
  npm i                  # Cài đặt thư viện
  npm run generate:migration # Tạo migration cho DB
  npm run apply:migration    # Apply migration cho DB
  npm run seed:db            # Seed data cho DB
  ```
- Sau khi chạy xong, mở DBeaver, refresh lại để kiểm tra dữ liệu.

## 5. Chạy Dự Án

- Chạy lệnh:
  ```bash
  npm run start:dev
  ```
- Sau đó, sử dụng Postman để test các API.

## 6. Các API Đã Bàn Giao

### 6.1. Lấy thông tin người dùng theo ID

- **Method**: `GET`
- **Endpoint**: `localhost:3000/api/users/:id`

---

### 6.2. Cập nhật thông tin người dùng

- **Method**: `PATCH`
- **Endpoint**: `localhost:3000/api/users/:id`
- **Body**:
  ```json
  {
    "phoneNumber": "99999999",
    "name": "Thien"
  }
  ```

---

### 6.3. Tạo nhiều phản hồi

- **Method**: `POST`
- **Endpoint**: `localhost:3000/api/phq9-responses`
- **Body**:
  ```json
  {
    "userId": 1,
    "surveyId": 2,
    "answers": [
      {
        "questionId": 1,
        "answerValue": 2
      },
      {
        "questionId": 2,
        "answerValue": 3
      },
      {
        "questionId": 3,
        "answerValue": 0
      }
    ]
  }
  ```

---

### 6.4. Tạo khảo sát

- **Method**: `POST`
- **Endpoint**: `localhost:3000/api/surveys`
- **Body**:
  ```json
  {
    "userId": 1,
    "totalScore": 2,
    "depressionLevel": "no_depression"
  }
  ```

---

### 6.5. Lấy câu hỏi ngẫu nhiên

- **Method**: `GET`
- **Endpoint**: `localhost:3000/api/phq9-questions/random`
