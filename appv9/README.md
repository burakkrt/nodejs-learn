## Kurulum

1. Projeyi klonlayın.
2. Terminalde projenin bulunduğu dizine gidin.
3. `npm install` komutunu çalıştırarak bağımlılıkları yükleyin.
4. MongoDB veritabanını başlatın.
5. `node app.js` komutu ile projeyi başlatın.

---

## Kullanım

- Tüm verileri almak için `GET /api` endpoint'ini kullanın.
- Yeni bir kitap eklemek için `POST /api` endpoint'ini kullanın.
- Bir kitabı silmek için `DELETE /api/:id` endpoint'ini kullanın.
- Bir kitabın bilgilerini getirmek için `GET /api/:id` endpoint'ini kullanın.
- Bir kitabın bilgilerini güncellemek için `PATCH /api/:id` endpoint'ini kullanın.

---

## Örnek Kullanım

### Tüm Verileri Almak

```
GET /api
```

### Yeni Kitap Eklemek

```
POST /api
Content-Type: application/json

{
  "title": "Yeni Kitap",
  "author": "Yazar Adı",
  "year": 2024
}
```

### Kitap Silmek

```
DELETE /api/:id
```

### Kitap Bilgilerini Getirmek

```
GET /api/:id
```

### Kitap Bilgilerini Güncellemek

```
PATCH /api/:id
Content-Type: application/json

{
  "title": "Güncellenmiş Kitap Adı"
}
```

---

Bu dosya, projenin temel işlevlerini ve kullanımını açıklar. Detaylı bilgi için ilgili endpoint'lerin kodlarını inceleyebilirsiniz.
