const { MongoClient } = require("mongodb"); // MongoDB client library'yi import ediyorum.

let dbConnection; // dbConnection adında bir değişken tanımlıyorum.

// export edeceğim fonksiyonları tanımlıyorum
// Bu fonksiyon, MongoDB'ye bağlanıp, bağlantıyı bir callback fonksiyona iletecek
const connectToDb = (callback) => {
  // MongoDB'ye bağlanmak için gerekli olan bağlantı string'ini kullanıyorum
  MongoClient.connect("mongodb://localhost:27017/kutuphane")
    .then((client) => {
      // Bağlantı başarılı olursa, client üzerinden veritabanına erişiyorum
      dbConnection = client.db("kutuphane");
      return callback(); // eğer db erişimi başarılı ise callback boş değer alıyor.
    })
    .catch((err) => {
      console.log(err); // Eğer bir hata oluşursa, hatayı konsola yazdırıyorum
      return callback(err); // eğer db erişimi başarısız ise callback error alıyor.
    });
};

// connectToDb çalışınca dbConnection'ın içini dolduruyorum ve getDb çağırınca
// dolu olan dbConnection'ı döndürüyorum.
const getDb = () => dbConnection; // Veritabanı bağlantısını döndüren fonksiyon

// connectToDb ve getDb fonksiyonlarını dışa aktarıyorum
module.exports = { connectToDb, getDb };
