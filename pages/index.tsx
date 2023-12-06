import Container from "../components/container";

// TODO: Add here all the donations of the user.

function HomePage() {
  return (
    <>
      <Container>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-center">BONTE</h1>
          <p>
            Bonte, bir bağış platformudur. Bu platformda bağış yapabilir,
            kurumları değerlendirebilir ve kurumlar hakkında yorum
            yapabilirsiniz. Ayrıca kurumlar hakkında bilgi edinebilir ve kurum
            ile iletişime geçebilirsiniz.
          </p>
        </div>
      </Container>
    </>
  );
}

export default HomePage;
