# Node.js Event Olayları Ne İçin Kullanılır?

Node.js, asenkron ve olay güdümlü yapısıyla bilinen bir JavaScript çalışma zamanıdır. Node.js'nin güçlü ve etkili olmasını sağlayan temel bileşenlerden biri de **Event** (olay) yapısıdır. Bu yazıda, Node.js'deki event olaylarının ne için kullanıldığını ve nasıl çalıştığını inceleyeceğiz.

## Event-Driven Architecture (Olay Güdümlü Mimari)

Node.js, olay güdümlü bir mimari üzerine kuruludur. Bu mimaride, uygulama çeşitli olaylar üretir ve bu olaylara uygun şekilde yanıt verir. Örneğin, bir HTTP sunucusu bir istek aldığında bir `request` olayı tetiklenir ve bu olaya bir yanıt vermek için belirli bir işlev çalıştırılır.

## EventEmitter Sınıfı

Node.js'de olayları yönetmek için kullanılan temel yapı taşı `EventEmitter` sınıfıdır. Bu sınıf, olayların tanımlanması, dinlenmesi ve tetiklenmesi gibi işlevleri sağlar. Aşağıda `EventEmitter` sınıfının temel kullanımına dair bir örnek bulunmaktadır:

```javascript
const EventEmitter = require("events");
const myEmitter = new EventEmitter();

// Bir olay tanımla
myEmitter.on("event", () => {
  console.log("Bir olay tetiklendi!");
});

// Olayı tetikle
myEmitter.emit("event");
```

Bu örnekte, `myEmitter` adlı bir `EventEmitter` örneği oluşturduk ve `event` adlı bir olayı dinleyerek bu olay tetiklendiğinde bir mesaj yazdırdık.

## Node.js Event Olaylarının Kullanım Alanları

### 1. HTTP Sunucuları

Node.js'de HTTP sunucusu oluştururken, gelen istekleri işlemek için olaylar kullanılır. Örneğin, `http` modülü bir HTTP sunucusu oluşturduğunda, her yeni istek için `request` olayı tetiklenir:

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

server.on("request", (req, res) => {
  console.log(`Request method: ${req.method}, URL: ${req.url}`);
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Sunucu http://127.0.0.1:3000 adresinde çalışıyor");
});
```

### 2. Dosya İşlemleri

Node.js, dosya sistemi işlemleri sırasında da olayları kullanır. Örneğin, bir dosya okuma işlemi tamamlandığında bir olay tetiklenir:

```javascript
const fs = require("fs");

fs.readFile("example.txt", (err, data) => {
  if (err) throw err;
  console.log(`Dosya içeriği: ${data}`);
});

fs.on("open", (fd) => {
  console.log(`Dosya açıldı: ${fd}`);
});
```

### 3. Yayınla-Abone Ol (Publish-Subscribe) Modeli

EventEmitter, yayınla-abone ol modelini uygulamak için de kullanılabilir. Bu modelde, belirli olaylar yayınlanır ve bu olaylara abone olan dinleyiciler tetiklenir:

```javascript
const EventEmitter = require("events");
const emitter = new EventEmitter();

const logData = (data) => {
  console.log(`Gelen veri: ${data}`);
};

emitter.on("data", logData);

emitter.emit("data", "Node.js EventEmitter örneği");
```

### 4. Zamanlayıcılar

Zamanlayıcılar (timers) da olay güdümlü mimarinin bir parçasıdır. `setTimeout`, `setInterval` gibi fonksiyonlar, belirli bir süre sonra veya düzenli aralıklarla olayları tetikleyebilir:

```javascript
setTimeout(() => {
  console.log("Bu mesaj 2 saniye sonra görüntülenecek");
}, 2000);
```

## Sonuç

Node.js'nin olay güdümlü yapısı, yüksek performanslı ve ölçeklenebilir uygulamalar geliştirmek için idealdir. `EventEmitter` sınıfı, çeşitli olayları yönetmek ve bu olaylara yanıt vermek için merkezi bir rol oynar. HTTP sunucularından dosya işlemlerine, yayınla-abone ol modelinden zamanlayıcılara kadar geniş bir kullanım yelpazesi sunar. Bu esneklik, Node.js'yi modern web geliştirmede güçlü bir araç haline getirir.
