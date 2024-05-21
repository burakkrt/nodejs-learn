## Express ile JSON Verileri Sunma

Bu belge, Express kullanarak bir JSON dosyasından veri okuyan ve istemcilere bu veriyi sunan bir HTTP sunucusu oluşturmayı açıklamaktadır.

### Gereksinimler

- Node.js
- Express.js

### Kod Açıklaması

Aşağıdaki kod, Express kullanarak bir JSON dosyasından veri okuyan ve bu veriyi bir HTTP GET isteğine yanıt olarak döndüren basit bir Node.js uygulamasıdır:

```javascript
const express = require("express");
const app = express();
const port = 4000;
const fs = require("fs");

// JSON dosyasından verilerin okunması
const db = JSON.parse(fs.readFileSync(`${__dirname}/data.json`));

// Ana rotaya GET isteği işleyen middleware
app.get("/", (req, res) => {
  res.status(200).json({
    statusCode: req.res.statusCode,
    data: db,
  });
});

// Sunucunun belirtilen portta dinlenmesi
app.listen(port, () => {
  console.log("server start");
});
```

### Kodun Detaylı Açıklaması

#### Modüllerin Yüklenmesi

```javascript
const express = require("express");
const fs = require("fs");
```

- `express`: Express.js framework'ünü kullanmak için gereklidir.
- `fs`: Node.js'nin dosya işlemleri yapmak için kullandığı modüldür.

#### JSON Verisinin Okunması

```javascript
const db = JSON.parse(fs.readFileSync(`${__dirname}/data.json`));
```

Bu satır, `data.json` adlı bir dosyayı okur ve içeriğini JSON formatına dönüştürür. `__dirname` değişkeni, dosyanın bulunduğu dizini sağlar.

#### Ana Rota İşleme

```javascript
app.get("/", (req, res) => {
  res.status(200).json({
    statusCode: req.res.statusCode,
    data: db,
  });
});
```

Bu middleware, ana rota (`/`) için GET isteklerini işler. İstek geldiğinde, HTTP durum kodunu (`statusCode`) ve JSON verisini içeren bir yanıt gönderir.

#### Sunucunun Başlatılması

```javascript
app.listen(port, () => {
  console.log("server start");
});
```

Bu satır, Express uygulamasını belirtilen `port` üzerinde dinlemeye başlar. Sunucu başlatıldığında, konsola "server start" mesajı yazdırılır.

### Çalıştırma

Sunucuyu başlatmak için terminalde aşağıdaki komutu kullanın:

```sh
node server.js
```

Sunucu başlatıldığında, konsola "server start" mesajı yazdırılır. Tarayıcınızda `http://localhost:4000` adresine giderek sunucunun çalışıp çalışmadığını kontrol edebilirsiniz.

### Sonuç

Bu örnek, Express.js kullanarak basit bir JSON dosyasından veri okuyan ve istemcilere bu veriyi sunan bir HTTP sunucusu oluşturmayı göstermektedir. Bu tür bir yapı, basit API'lar oluşturmak veya istemcilere veri sunmak için kullanılabilir.
