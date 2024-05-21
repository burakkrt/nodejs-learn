## Node.js ile HTTP Sunucusu Oluşturma ve Modül Kullanımı

Bu belge, Node.js kullanarak bir HTTP sunucusu oluşturmayı ve harici bir modülü (`modulSecond`) kullanarak sunucu tarafında işlem yapmayı açıklamaktadır.

### Gereksinimler

- Node.js

### Kod Açıklaması

Aşağıda, HTTP sunucusunu oluşturmayı ve istemcilere bir HTML yanıtı göndermeyi sağlayan örnek bir Node.js kodu bulunmaktadır:

```javascript
const http = require("http");
const modulSecond = require("./modules/modulSecond");

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/html",
    Sender: "Burak",
  });
  res.write("" + modulSecond.getFullName("Burak", "Fullstack"));
  res.end();
});

server.listen(4000, () => {
  console.log("success");
});
```

### Kodun Detaylı Açıklaması

#### Modüllerin Yüklenmesi

`http` modülünü HTTP sunucusu oluşturmak için, `modulSecond` adlı özel bir modülü kullanmak için de `require` komutunu kullanıyoruz:

```javascript
const http = require("http");
const modulSecond = require("./modules/modulSecond");
```

`modulSecond` modülü, başka bir dosyada (`modulSecond.js`) tanımlanmıştır ve bu dosya sunucu koduyla aynı dizinde bulunmalıdır.

#### HTTP Sunucusunun Oluşturulması

HTTP sunucusunu oluşturmak için `http.createServer` fonksiyonunu kullanıyoruz. Bu fonksiyon, her bir istek için bir geri çağrı fonksiyonu alır:

```javascript
const server = http.createServer((req, res) => {
  // İsteklerin işlenmesi burada yapılır
});
```

#### Yanıtın Hazırlanması ve Gönderilmesi

Sunucu, her istek aldığında `res.writeHead` ve `res.write` ile istemciye yanıt gönderir ve `res.end` ile işlemi tamamlar:

```javascript
res.writeHead(200, {
  "Content-Type": "text/html",
  Sender: "Burak",
});
res.write("" + modulSecond.getFullName("Burak", "Fullstack"));
res.end();
```

`res.writeHead` ile yanıtın başlığını belirleriz. Burada, `Content-Type` HTML olarak ayarlanmıştır. Ayrıca, özel bir başlık olan `Sender` da belirtilmiştir.

`res.write` ile, `modulSecond` modülünden alınan bir fonksiyonun çıktısını yazdırırız.

#### Sunucunun Dinlemesi

Sunucu, belirtilen bir portta (`4000`'de) dinlenir:

```javascript
server.listen(4000, () => {
  console.log("success");
});
```

### Modül Kullanımı

`modulSecond` modülü, bir isim ve bir unvan alarak tam bir ad döndüren basit bir fonksiyon içerir. Bu fonksiyon, sunucu tarafından çağrılır ve HTML yanıtının bir parçası olarak istemciye gönderilir.

### Çalıştırma

Sunucuyu başlatmak için terminalde aşağıdaki komutu kullanın:

```sh
node server.js
```

Sunucu başlatıldığında, `success` mesajı görünür. Tarayıcınızda `http://localhost:4000` adresine giderek sunucunun çalışıp çalışmadığını kontrol edebilirsiniz.

### Sonuç

Bu örnek, Node.js kullanarak basit bir HTTP sunucusu oluşturmayı ve harici bir modülü sunucu kodunda nasıl kullanabileceğinizi göstermektedir. Bu tür bir yapı, dinamik web sayfaları oluşturmak için yaygın olarak kullanılır.
