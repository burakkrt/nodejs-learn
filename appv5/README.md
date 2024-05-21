## Node.js ve Express ile URL Parse İşlemi

Bu doküman, Node.js ve Express kullanarak bir URL'nin nasıl parse (ayrıştırma) edileceğini ve bu bilgilerin nasıl kullanılacağını açıklayan örnek bir kodun üzerinden geçmektedir.

### Gereksinimler

- Node.js
- Express.js

### Kurulum

1. Node.js ve npm'in bilgisayarınızda kurulu olduğundan emin olun.
2. Proje klasörünüzde Express'i kurun:
   ```sh
   npm install express
   ```

### Kod Açıklaması

Aşağıda, Node.js ve Express kullanarak URL'nin parse edilmesi ve elde edilen bilgilerin bir HTTP isteğine cevap olarak gönderilmesini gösteren örnek bir kod bulunmaktadır:

```javascript
const express = require("express");
const app = express();
const url = require("url");

let path = "localhost:4000/sepet.html?siparisTutari=50&siparisAdet=3";
// URL'yi parse etmemiz gerekiyor ki query parametrelerini kullanabilelim.
const parsePath = url.parse(path, true);

app
  .get("/", (req, res) => {
    res.status(200).send({
      port: parsePath.host,
      pathname: parsePath.pathname,
      url: parsePath.href,
      search: parsePath.search,
      protocol: parsePath.protocol,
      siparisTutari: parsePath.query.siparisTutari,
      siparisAdeti: parsePath.query.siparisAdet,
    });
  })
  .listen(4000, () => {
    console.log("server start");
  });
```

### Kodun Detaylı Açıklaması

#### Modüllerin Yüklenmesi

Öncelikle, gerekli modülleri yüklüyoruz:

- `express`: Node.js için minimalist web framework.
- `url`: URL'leri parse etmek için yerleşik Node.js modülü.

```javascript
const express = require("express");
const app = express();
const url = require("url");
```

#### URL'nin Parse Edilmesi

Parse edilmesi gereken URL'yi tanımlıyoruz ve `url.parse` fonksiyonunu kullanarak parse ediyoruz:

```javascript
let path = "localhost:4000/sepet.html?siparisTutari=50&siparisAdet=3";
const parsePath = url.parse(path, true);
```

`url.parse` fonksiyonunun ikinci parametresi `true` olduğunda, query string otomatik olarak bir nesneye dönüştürülür.

#### Express Sunucusunun Ayarlanması

Express sunucusunu başlatıyoruz ve bir GET isteği için yanıt tanımlıyoruz:

```javascript
app
  .get("/", (req, res) => {
    res.status(200).send({
      port: parsePath.host,
      pathname: parsePath.pathname,
      url: parsePath.href,
      search: parsePath.search,
      protocol: parsePath.protocol,
      siparisTutari: parsePath.query.siparisTutari,
      siparisAdeti: parsePath.query.siparisAdet,
    });
  })
  .listen(4000, () => {
    console.log("server start");
  });
```

Bu kod, sunucuya gelen bir GET isteğine yanıt olarak parse edilen URL'nin çeşitli parçalarını JSON formatında döner.

### Çalıştırma

Sunucuyu çalıştırmak için aşağıdaki komutu kullanın:

```sh
node app.js
```

Sunucu, `localhost:4000` adresinde çalışacaktır ve tarayıcınızda bu adrese gittiğinizde JSON formatında URL bilgilerini göreceksiniz.

### Sonuç

Bu örnek, bir URL'nin nasıl parse edileceğini ve Express ile bu bilgilerin nasıl işlenip geri döndürüleceğini göstermektedir. Bu yöntem, URL içeriğini çözümlemek ve bu verilere dayalı işlemler yapmak için faydalıdır.
