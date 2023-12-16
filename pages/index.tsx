import DonationFormDialog from "../components/donation/dialog";
import Container from "../components/container";
import Globe from "@/components/shared/globe";
import FaqSection from "@/components/layout/faq";
import StatsSection from "@/components/layout/stats";

function HomePage() {
  return (
    <Container>
      <section className="w-full pt-16 md:pt-28 lg:pt-36 ">
        <div className="space-y-12 xl:space-y-20">
          <div className="grid max-w-[1300px] mx-auto gap-6 md:gap-10 md:grid-cols-2">
            <div className="space-y-3 ">
              <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-center md:text-left">
                Bonte'ye Hoşgeldiniz
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 text-center md:text-left">
                Bağışları daha kolay ve şeffaf hale getirmeye adanmış bir
                platform. Fark yaratmak için misyonumuza katılın.
              </p>
              <div className="space-x-4 mt-4 grid place-content-center md:place-content-start">
                <DonationFormDialog label="Şimdi Bağış Yap" />
              </div>
            </div>
            <div>
              <img
                alt="Bonte Banner"
                className="w-full aspect-[5/3]"
                height="300"
                src="/world.svg"
                width="500"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full pt-36 pb-12 px-3 sm:px-6">
        <div className="container flex flex-col items-center space-y-8 px-6 md:px-8">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Etkimizi Görün
            </h2>
            <p className="mx-auto max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Bağışlarınızın dünya genelindeki topluluklarda nasıl bir fark
              yarattığını görün. Aşağıdaki haritada bağışçılarımızın yaptığı
              bağışları görebilirsiniz.
            </p>
          </div>
          <Globe />
        </div>
      </section>
      <section className="w-full py-12 px-3">
        <StatsSection />
      </section>
      <section className="w-full py-12 px-3 sm:px-6">
        <FaqSection />
      </section>
    </Container>
  );
}

export default HomePage;
