## Basit Bir HTTP Sunucusu ve Sayfa Yönlendirmesi

Bu belge, Node.js kullanarak basit bir HTTP sunucusu oluşturmayı ve istemcilere farklı sayfalar sunmayı açıklamaktadır.

### Gereksinimler

- Node.js

### Kod Açıklaması

Aşağıdaki kod, Node.js kullanarak basit bir HTTP sunucusu oluşturur. Bu sunucu, farklı URL'lere yapılan isteklere göre farklı yanıtlar gönderir:

```javascript
const http = require("http");
const url = require("url");
const fs = require("fs");
const { dirname } = require("path");

// index.html dosyasının okunması
const formv1Page = fs.readFileSync(`${__dirname}/index.html`, "utf-8");

// HTTP sunucusunun oluşturulması
const server = http.createServer((req, res) => {
  const pathName = req.url;

  switch (pathName) {
    case "/":
      res.end("Anasayfa");
      break;
    case "/formv1":
      // formv1 sayfasının HTML içeriğinin gönderilmesi
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(formv1Page);
      break;
  }
});

// Sunucunun belirtilen portta dinlemeye başlaması
server.listen(4000, () => {
  console.log("Server 4000 portunda çalışıyor.");
});
```

### Kodun Detaylı Açıklaması

#### Modüllerin Yüklenmesi

```javascript
const http = require("http");
const url = require("url");
const fs = require("fs");
const { dirname } = require("path");
```

- `http`: Node.js'nin HTTP modülü, HTTP sunucusu oluşturmak için kullanılır.
- `url`: URL'leri işlemek için kullanılır.
- `fs`: Node.js'nin dosya sistemi modülüdür, dosyaları okumak ve yazmak için kullanılır.
- `{ dirname }`: `path` modülünden, mevcut dosyanın dizinini almak için kullanılır.

#### index.html Dosyasının Okunması

```javascript
const formv1Page = fs.readFileSync(`${__dirname}/index.html`, "utf-8");
```

Bu satır, `index.html` adlı dosyanın okunmasını ve içeriğinin `formv1Page` değişkenine atanmasını sağlar.

#### HTTP Sunucusunun Oluşturulması

```javascript
const server = http.createServer((req, res) => {
  const pathName = req.url;

  switch (pathName) {
    case "/":
      res.end("Anasayfa");
      break;
    case "/formv1":
      // formv1 sayfasının HTML içeriğinin gönderilmesi
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(formv1Page);
      break;
  }
});
```

Bu kod parçası, bir HTTP sunucusu oluşturur. İstemci tarafından gönderilen URL'yi kontrol eder ve `/` URL'sine yapılan isteklere "Anasayfa" yanıtını, `/formv1` URL'sine yapılan isteklere ise `index.html` dosyasının içeriğini gönderir.

#### Sunucunun Başlatılması

```javascript
server.listen(4000, () => {
  console.log("Server 4000 portunda çalışıyor.");
});
```

Bu satır, sunucunun `4000` portunda dinlemeye başlamasını sağlar. Sunucu başladığında, konsola "Server 4000 portunda çalışıyor." mesajı yazdırılır.

### Çalıştırma

Sunucuyu başlatmak için terminalde aşağıdaki komutu kullanın:

```sh
node server.js
```

Sunucu başlatıldığında, konsola "Server 4000 portunda çalışıyor." mesajı yazdırılır. Tarayıcınızda `http://localhost:4000` adresine giderek sunucunun çalışıp çalışmadığını kontrol edebilirsiniz.

### Sonuç

Bu örnek, Node.js kullanarak basit bir HTTP sunucusu oluşturmayı ve istemcilere farklı sayfalar sunmayı göstermektedir. Bu tür bir yapı, basit web uygulamaları veya servisler oluşturmak için kullanılabilir.
