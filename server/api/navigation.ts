export default defineEventHandler(() => {
  return {
    mainNav: [
      {
        id: 1,
        label: "LỊCH TRỰC TIẾP",
        href: "/",
        icon: "home.png",
        dropdown: [
          {
            id: 1,
            title: "BÓNG ĐÁ",
            img: "ani_soccer.gif",
            href: "",
          },
          { id: 2, title: "ĐUA BI", img: "ani_duabi.gif", href: "/" },
          { id: 3, title: "BÓNG RỔ", img: "ani_basketball.gif", href: "/" },
          { id: 4, title: "E-SPORT", img: "ani_gamepad.gif", href: "/" },
          { id: 5, title: "CASINO", img: "ani_casino.gif", href: "/" },
        ],
      },
      {
        id: 2,
        label: "LỊCH THI ĐẤU",
        href: "/",
        icon: "home.png",
        dropdown: [
          {
            id: 1,
            title: "BÓNG ĐÁ",
            img: "ani_soccer.gif",
            href: "",
          },
          { id: 2, title: "ĐUA BI", img: "ani_duabi.gif", href: "/" },
          { id: 3, title: "BÓNG RỔ", img: "ani_basketball.gif", href: "/" },
          { id: 4, title: "E-SPORT", img: "ani_gamepad.gif", href: "/" },
          { id: 5, title: "CASINO", img: "ani_casino.gif", href: "/" },
        ],
      },
      {
        id: 3,
        label: "TỶ LỆ KÈO",
        href: "/",
        icon: "home.png",
        dropdown: [
          {
            id: 1,
            title: "BÓNG ĐÁ",
            img: "ani_soccer.gif",
            href: "",
          },
          { id: 2, title: "ĐUA BI", img: "ani_duabi.gif", href: "/" },
          { id: 3, title: "BÓNG RỔ", img: "ani_basketball.gif", href: "/" },
          { id: 4, title: "E-SPORT", img: "ani_gamepad.gif", href: "/" },
          { id: 5, title: "CASINO", img: "ani_casino.gif", href: "/" },
        ],
      },
      {
        id: 4,
        label: "KẾT QUẢ",
        href: "/",
        icon: "home.png",
        dropdown: [
          {
            id: 1,
            title: "BÓNG ĐÁ",
            img: "ani_soccer.gif",
            href: "",
          },
          { id: 2, title: "ĐUA BI", img: "ani_duabi.gif", href: "/" },
          { id: 3, title: "BÓNG RỔ", img: "ani_basketball.gif", href: "/" },
          { id: 4, title: "E-SPORT", img: "ani_gamepad.gif", href: "/" },
          { id: 5, title: "CASINO", img: "ani_casino.gif", href: "/" },
        ],
      },
      {
        id: 5,
        label: "PHÒNG CHAT",
        href: "/",
        icon: "home.png",
        dropdown: [
          {
            id: 1,
            title: "BÓNG ĐÁ",
            img: "ani_soccer.gif",
            href: "",
          },
          { id: 2, title: "ĐUA BI", img: "ani_duabi.gif", href: "/" },
          { id: 3, title: "BÓNG RỔ", img: "ani_basketball.gif", href: "/" },
          { id: 4, title: "E-SPORT", img: "ani_gamepad.gif", href: "/" },
          { id: 5, title: "CASINO", img: "ani_casino.gif", href: "/" },
        ],
      },
      {
        id: 6,
        label: "TIN TỨC",
        href: "/",
        icon: "home.png",
        dropdown: [
          {
            id: 1,
            title: "BÓNG ĐÁ",
            img: "ani_soccer.gif",
            href: "",
          },
          { id: 2, title: "ĐUA BI", img: "ani_duabi.gif", href: "/" },
          { id: 3, title: "BÓNG RỔ", img: "ani_basketball.gif", href: "/" },
          { id: 4, title: "E-SPORT", img: "ani_gamepad.gif", href: "/" },
          { id: 5, title: "CASINO", img: "ani_casino.gif", href: "/" },
        ],
      },
    ],
    subNav: [
      { id: 1, label: "Tin tức", icon: "message.png" },
      { id: 2, label: "Khuyến mãi", icon: "reels.png" },
      { id: 3, label: "Sự kiện", icon: "highlight.png" },
      { id: 4, label: "Tuyển dụng", icon: "feedback.png" },
      { id: 5, label: "Sự kiện", icon: "movie.png" },
      { id: 6, label: "Tuyển dụng", icon: "book.png" },
    ],
    useracc: [
      {
        title: "Trung tâm Tài khoản",
        icon: "/icons/user.png",
        href: "/",
      },
      {
        title: "Trang cá nhân",
        icon: "/icons/home.png",
        href: "/",
      },
      {
        title: "Trung tâm Tài khoản",
        icon: "/icons/nvu.png",
        href: "/",
      },
      {
        title: "Trang cá nhân",
        icon: "/icons/valet.png",
        href: "/",
      },
      {
        title: "Trung tâm Tài khoản",
        icon: "/icons/chart.png",
        href: "/",
      },
      {
        title: "Trang cá nhân",
        icon: "/icons/logout.png",
        href: "/",
      },
    ],
    userMenu: [
      { title: "Profile", href: "/profile", icon: "/icons/user.png" },
      { title: "Settings", href: "/settings", icon: "/icons/settings.png" },
      { title: "Logout", href: "/logout", icon: "/icons/logout.png" },
    ],
    coinOptions: [
      { id: 1, value: 20000, icon: "/icons/silver-coin.png" },
      { id: 2, value: 20000, icon: "/icons/kg.png" },
    ],
    mobileicons: [
      { id: 1, img: "ani_soccer.gif", href: "/" },
      { id: 2, img: "ani_basketball2.gif", href: "/" },
      { id: 2, img: "ani_gamepad.gif", href: "/" },
    ],
  };
});
