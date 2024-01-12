export type User = {
  id: string;
  name?: string;
  email?: string;
  image?: string;
};

export type Comment = {
  id: string;
  created_at: number;
  url: string;
  text: string;
  rating: number;
  user: User;
};

export type Donation = {
  id: string;
  name: string;
  email: string;
  amount: number;
  isAnonymous: boolean;
  foundation: FOUNDATIONS;
  message?: string;
  created_at?: number;
  user?: {
    id?: string;
    name?: string;
    email?: string;
  };
};

export type Foundation = {
  id: number;
  name: string;
  excerpt: string;
  description: string;
  image: string;
  slug: string;
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
  engelsizYasamVakfi = "Engelsiz Yaşam Vakfı",
}
