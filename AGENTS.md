# AGENTS.md

Panduan ini ditujukan untuk agent yang bekerja di repository `boilerplate-nestjs`.

## Tujuan Repo

Ini adalah boilerplate backend NestJS berbasis Fastify untuk REST API modular dengan:

- TypeORM + PostgreSQL
- JWT authentication
- RBAC berbasis role/permission
- use case per domain
- dokumentasi Swagger/RapiDoc
- beberapa integrasi library seperti Redis, RabbitMQ, Kafka, SMTP, MinIO, dan Telegram

Fokus utama repo ini adalah CRUD backend dan auth flow untuk aplikasi internal/admin.

## Struktur Utama

- `src/main.ts`: bootstrap aplikasi Fastify, global validation pipe, docs auth, multipart, CORS, versioning
- `src/app.module.ts`: wiring module utama dan konfigurasi TypeORM
- `src/modules/*`: domain modules
- `src/modules/*/usecases/*`: business logic per use case
- `src/entities/*`: TypeORM entities
- `src/guards/*`: auth dan role-based guard
- `src/libraries/*`: helper/integration layer
- `src/common/*`: constants, message map, utils, DTO umum

## Aturan Implementasi

- Pertahankan pola modular yang sudah ada: `controller -> usecase -> entity/repository`.
- Jika menambah fitur baru, utamakan menambah use case baru daripada menumpuk logic di controller.
- Ikuti konvensi domain yang ada di `src/modules/<domain>/`.
- Gunakan DTO untuk input request. Validasi sebaiknya tetap lewat `class-validator`.
- Jangan memperkenalkan service layer baru kecuali memang ada alasan arsitektural yang jelas; repo ini saat ini lebih condong ke pola use case langsung.

## Karakter Teknis Repo

- HTTP adapter yang dipakai adalah Fastify, bukan Express.
- Global auth dipasang lewat `APP_GUARD` menggunakan [`src/guards/jwt-auth.guard.ts`](/Users/kiki/Documents/GITHUB/boilerplate-nestjs/src/guards/jwt-auth.guard.ts).
- Banyak controller masih memakai `@Res()` dan `res.locals.logged`. Saat mengubah controller, jangan memutus pola ini tanpa memastikan guard/auth context tetap kompatibel.
- Role protection umumnya memakai `@UseGuards(RolesGuard)` dan `@Roles(...)`.
- Response banyak endpoint dibungkus helper `respond(...)` dari `src/libraries/respond`.

## Saat Mengubah Kode

- Utamakan perubahan minimal dan lokal, jangan refactor lintas modul tanpa diminta.
- Jika menyentuh auth, periksa dampaknya ke `login`, `logout`, `jwt-auth.guard`, dan controller yang membaca `res.locals`.
- Jika menyentuh entity, cek relasi TypeORM, DTO terkait, dan use case yang mengandalkannya.
- Jika menyentuh konfigurasi, cek konstanta di `src/common/constant` dan bootstrap di `src/main.ts` serta `src/app.module.ts`.
- Hati-hati dengan perubahan yang mengasumsikan Express API; Fastify punya perbedaan pada request/response lifecycle.

## Testing dan Verifikasi

Gunakan perintah berikut setelah perubahan yang relevan:

- `npm run lint:check`
- `npm run test`
- `npm run build`

Jika perubahan hanya dokumentasi, cukup verifikasi isi file dan konsistensi referensi.

## Hal yang Perlu Diketahui

- `synchronize: true` masih aktif di [`src/app.module.ts`](/Users/kiki/Documents/GITHUB/boilerplate-nestjs/src/app.module.ts). Jangan mengandalkan ini sebagai strategi migrasi production.
- Default secret/config di repo ini masih longgar. Jangan menambah fallback sensitif baru tanpa alasan kuat.
- README dan implementasi tidak selalu 100% sinkron. Saat ragu, percayai source code yang berjalan.
- Beberapa area masih memakai `any`. Jangan memperluas pemakaian `any` bila tipe yang lebih jelas bisa ditulis dengan biaya rendah.

## Prioritas Kualitas

Kalau diminta meningkatkan kualitas repo, urutan prioritas yang aman:

1. Perkuat type safety.
2. Kurangi duplikasi controller secara bertahap.
3. Rapikan konfigurasi dan validasi environment.
4. Kurangi coupling ke `@Res()` dan `res.locals` hanya jika dilakukan secara konsisten.

## Gaya Kerja

- Jangan melakukan perubahan destruktif ke file lain yang tidak terkait.
- Jangan mengubah pola respons API publik tanpa alasan jelas.
- Jika menemukan inkonsistensi dokumentasi vs implementasi, catat di hasil kerja atau perbarui dokumentasi jika memang bagian dari task.
- Untuk file baru, ikuti style TypeScript/NestJS yang sudah dipakai repo ini, walaupun belum sepenuhnya seragam.
