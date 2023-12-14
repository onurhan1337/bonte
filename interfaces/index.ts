export type User = {
  name: string;
  picture: string;
  sub: string;
  email?: string;
};

export type Comment = {
  id: string;
  created_at: number;
  url: string;
  text: string;
  user: User;
};

export type Donation = {
  id: string;
  created_at: number;
  amount: number;
  is_anonymous: boolean;
  message?: string;
  foundation: Foundation;
  user: User;
};

export type Foundation = {
  slug?: string;
  title?: string;
  content?: string;
  image?: string;
  excerpt?: string;
  [key: string]: any;
};

export enum FOUNDATIONS {
  MehmetcikVakfi = "Mehmetçik Vakfı",
  Tema = "TEMA Vakfı",
  Losev = "LÖSEV",
  Tocev = "Toçev",
  TurkiyeKizilayi = "Türkiye Kızılayı",
  Darussafaka = "Darüşşafaka Cemiyeti",
  CagdasYasamiDesteklemeDernegi = "Çağdaş Yaşamı Destekleme Derneği",
  TurkiyeEgitimGonulluleriVakfi = "Türkiye Eğitim Gönüllüleri Vakfı",
  TurkiyeVeremSavasDernegi = "Türkiye Verem Savaş Derneği",
  TurkiyeKorunmayaMuhtacCocuklarVakfi = "Türkiye Korunmaya Muhtaç Çocuklar Vakfı",
  TurkiyeMilliKulturVakfi = "Türkiye Milli Kültür Vakfı",
  TurkiyeSporTotoVakfi = "Türkiye Spor Toto Vakfı",
}
