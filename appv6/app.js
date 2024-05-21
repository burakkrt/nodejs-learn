const Events = require("events");

class MyEmitter extends Events {}

// Event oluştur
const CustomEvent = new MyEmitter();

// Event içerisine fonksiyon ekle
CustomEvent.on("getName", (isim) => {
  console.log(isim);
});

// Event içerisine bakşa bir fonksiyon ekle
CustomEvent.on("sum", (sayi1, sayi2) => {
  console.log(sayi1 + sayi2);
});

// Event içerisindeki fonksiyonları kullan
CustomEvent.emit("getName", "Burak Fullstack");

CustomEvent.emit("sum", 15, 2);

// DETAYLAR İÇİN MARKDOWN DOSYASINI İNCELE.
