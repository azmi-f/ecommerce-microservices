# 🛍️ E-Commerce Microservices

Proyek ini merupakan implementasi arsitektur microservice untuk aplikasi e-commerce. Dibangun menggunakan:

- Node.js (Express)
- PostgreSQL
- Docker & Docker Compose
- Redis (opsional cache)
- WebSocket (untuk notifikasi real-time)
- Traefik (API Gateway)
- Prometheus + Grafana + cAdvisor (Monitoring)

---

## 📦 Services

| Service               | Deskripsi                                    |
|-----------------------|----------------------------------------------|
| `api-gateway`         | Mengelola lalu lintas API berbasis Traefik   |
| `user-service`        | Registrasi, login, dan autentikasi JWT       |
| `product-service`     | Manajemen katalog produk                     |
| `cart-service`        | Menyimpan keranjang belanja per pengguna     |
| `order-service`       | Pemrosesan pesanan                           |
| `payment-service`     | Simulasi pembayaran pesanan                  |
| `inventory-service`   | Manajemen stok barang                        |
| `notification-service`| WebSocket server untuk push notifikasi       |
| `db`                  | PostgreSQL (digunakan oleh user-service)     |
| `adminer`             | GUI untuk PostgreSQL                         |
| `redis`               | Cache (opsional)                             |
| `mailhog`             | Simulasi pengiriman email                    |
| `prometheus`          | Monitoring metrics                           |
| `grafana`             | Visualisasi monitoring                       |
| `cadvisor`            | Monitoring host dan container Docker         |

---

## 🚀 Cara Menjalankan

```bash
docker-compose up --build

Kemudian akses melalui:

* 🌐 Traefik Dashboard: `http://localhost:8081`
* 👤 User API: `http://localhost/users`
* 🔔 Notifikasi (WebSocket): `ws://localhost:3003`
* 📊 Grafana: `http://localhost:3000` (admin/admin)
* 📬 Mailhog: `http://localhost:8025`
* 🧾 Adminer: `http://localhost:8082`

---

## 🔐 Autentikasi JWT (User Service)

### 🔹 Register

`POST /users/register`

```json
{
  "name": "Azmi",
  "email": "azmi@mail.com",
  "password": "rahasia123"
}
```

### 🔹 Login

`POST /users/login`

```json
{
  "email": "azmi@mail.com",
  "password": "rahasia123"
}
```

Response:

```json
{
  "token": "<jwt_token>"
}
```

### 🔹 Akses Endpoint Terproteksi

Gunakan header:

```
Authorization: Bearer <jwt_token>
```

Contoh endpoint: `GET /users/profile`

---

## 🔔 WebSocket Notifikasi

* Endpoint: `ws://localhost:3003`
* Setiap 10 detik akan dikirimkan pesan simulasi:

```json
{
  "message": "🔔 Notifikasi baru: Pesanan Anda sedang dikemas!"
}
```

---

## 📊 Monitoring & Observability

| Tool       | Port    | Deskripsi                        |
| ---------- | ------- | -------------------------------- |
| Grafana    | `:3000` | Visualisasi metrics              |
| Prometheus | `:9090` | Scraping service metrics         |
| cAdvisor   | `:8080` | Monitor resource usage container |

---

## 📐 Arsitektur Sistem (Deskriptif)

```
         [ Client Frontend ]
                 |
                 v
      [ Traefik API Gateway ]
        |       |       |
        v       v       v
     [user]  [order]  [product] ...
        |                |
  [PostgreSQL]        [Inventory]
        |
     [Redis], [Mailhog], [Monitoring]
```

---

## 📁 Struktur Direktori

```
ecommerce-microservices/
├── user-service/
│   └── src/
├── product-service/
├── notification-service/
├── docker-compose.yml
├── README.md
└── ...
```

---

## ✅ Status Fitur

* [V] Microservice architecture
* [V] 10+ container (Traefik, monitoring, dsb)
* [V] REST API
* [V] WebSocket (notification)
* [V] JWT authentication
* [V] Monitoring host & container
* [V] Traefik gateway
* [V] Dokumentasi lengkap

---

## 🧠 Catatan Lanjutan

* Bisa ditambahkan service otentikasi terpusat (auth-service)
* Komunikasi antar service bisa ditingkatkan ke async (RabbitMQ, Kafka)
* Gunakan volume eksternal untuk produksi