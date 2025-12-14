export default function Certificates() {
  return (
    <div id='certificates' className="mt-10 container">
      <h3 className="font-lato font-semibold text-3xl text-center mb-5.5 md:text-[42px] lg:text-[80px]">
        Турбота, яку можна подарувати
      </h3>
      <p className="font-medium font-lato text-[22px] text-center md:text-2xl lg:font-semibold">
        Подарунковий сертифікат <br className="lg:hidden" />
        <span className="italic font-normal text-lg md:text-[26px] lg:not-italic lg:font-semibold  lg:leading-[150%] lg:tracking-[0.01em]">
          Science Be Beautiful{" "}
        </span>
        <br className="md:hidden" />
        <span className="font-normal text-lg md:text-xl">
          — це не просто презент. Це запрошення до світу краси, науки та ніжного
          догляду.
        </span>
      </p>
      <p className="my-10 font-roboto font-light text-lg text-center md:text-xl md:font-medium">
        Оберіть суму — решту зробимо ми.
      </p>
      <button className="border hidden md:block  my-10 border-[#2d2d2d] rounded-sm text-lg font-inter w-[434px] mx-auto h-14">
        Детальніше
      </button>
      <div className="flex flex-col gap-3 md:flex-row md:flex-wrap">
        <div className="certificate-bg">
          <p className="certificate-text">500</p>
        </div>
        <div className="certificate-bg">
          <p className="certificate-text">1000</p>
        </div>
        <div className="certificate-bg">
          <p className="certificate-text">1500</p>
        </div>
        <div className="certificate-bg">
          <p className="certificate-text">2000</p>
        </div>
      </div>
      <button className="border block md:hidden   my-10 border-[#2d2d2d] rounded-sm text-lg font-inter w-full h-14">
        Детальніше
      </button>
    </div>
  );
}
