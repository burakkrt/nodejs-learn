## Express ile Basit Bir API Oluşturma

Bu belge, Express kullanarak basit bir API oluşturmayı ve bu API'nin farklı durumlara göre nasıl yanıt vereceğini açıklamaktadır.

### Gereksinimler

- Node.js
- Express.js

### Kod Açıklaması

Aşağıdaki kod, Express kullanarak basit bir API oluşturur. Bu API, ana rotaya yapılan GET isteğine farklı durumlara göre yanıt verir:

```javascript
const express = require("express");
const app = express();
const port = 4000;

app.get("/", (req, res) => {
  if (true) {
    res.status(200).json({
      message: "hello world",
      statusCode: 200,
    });
  } else {
    res.status(404).json({
      message: "Böyle bir sayfa mevcut değil.",
      statusCode: 404,
    });
  }
});

app.listen(port, () => {
  console.log("server start");
});
```

### Kodun Detaylı Açıklaması

#### Express ve Ana Rota Tanımlaması

```javascript
const express = require("express");
const app = express();
const port = 4000;
```

Bu satırlar, Express framework'ünü ve bir Express uygulaması oluşturmayı sağlar. Ayrıca, sunucunun çalışacağı port numarasını belirtir.

#### Ana Rota İşleme

```javascript
app.get("/", (req, res) => {
  if (true) {
    res.status(200).json({
      message: "hello world",
      statusCode: 200,
    });
  } else {
    res.status(404).json({
      message: "Böyle bir sayfa mevcut değil.",
      statusCode: 404,
    });
  }
});
```

Bu middleware, ana rota (`/`) için GET isteklerini işler. İsteğin durumuna göre, ya "hello world" mesajı ve 200 HTTP durum koduyla bir yanıt gönderir ya da "Böyle bir sayfa mevcut değil." mesajı ve 404 durum koduyla bir yanıt gönderir. Bu kodun şu anki hali her zaman `true` olduğu için ilk koşul her zaman çalışır.

#### Sunucunun Başlatılması

```javascript
app.listen(port, () => {
  console.log("server start");
});
```

Bu satır, Express uygulamasının belirtilen portta (`4000`) dinlemeye başlamasını sağlar. Sunucu başladığında, konsola "server start" mesajı yazdırılır.

### Çalıştırma

Sunucuyu başlatmak için terminalde aşağıdaki komutu kullanın:

```sh
node server.js
```

Sunucu başlatıldığında, konsola "server start" mesajı yazdırılır. Tarayıcınızda `http://localhost:4000` adresine giderek API'nin çalışıp çalışmadığını kontrol edebilirsiniz.

### Sonuç

Bu örnek, Express.js kullanarak basit bir API oluşturmayı göstermektedir. API, farklı durumlara göre istemcilere farklı yanıtlar gönderebilir. Bu tür bir yapı, basit web servisleri veya API'lar oluşturmak için kullanılabilir.
