export const PAGE_SIZE = 10;

export const siteConfig = {
  // 网站基本信息
  title: "Introl's Blog",
  author: "Introl",
  description: "一个OIer的OI弱相关博客",
  url: "https://blog.introl.top", // 站点地址，请修改为你的实际域名
  avatar: "/avatar.jpg", // 站点头像，可选

  // 导航链接
  nav: [
    { name: "文章", href: "/" },
    { name: "归档", href: "/archive" },
    { name: "随笔", href: "/thoughts" },
    { name: "友链", href: "/friends" },
    { name: "关于", href: "/about" },
  ],

  // 社交链接
  social: [
    { name: "Email", href: "mailto:introl@foxmail.com", icon: "mail", label: "introl@foxmail.com" },
    { name: "GitHub", href: "https://github.com/Introl-ljl", icon: "github" ,label: "Github" },
    { name: "Codeforces", href: "https://codeforces.com/profile/introl", icon: "codeforces", label: "Codeforces" },
    // { name: "WeChat", href: "#", icon: "wechat", label: "微信: Introl-ljl" },
    // { name: "QQ", href: "#", icon: "qq", label: "QQ: 3226749226" },
    { name: "RSS", href: "/rss.xml", icon: "rss" ,label: "RSS" },
    // { name: "Linux.Do", href: "https://linux.do/u/introl/", icon: "linuxdo", label: "LINUX DO" },
  ],

  // 版权信息
  copyright: "2026",

  // 友情链接
  friends: [
    {
      name: "Alcaid's Blog",
      url: "https://liuminhaocn.github.io/",
      avatar: "https://liuminhaocn.github.io/image/ava.png",
      description: "一个偏学术性的博客"
    },
    {
      name: "时歌的博客",
      url: "https://www.lapis.cafe",
      avatar: "https://www.lapis.cafe/avatar.webp",
      description: "理解以真实为本，但真实本身并不会自动呈现"
    },
    {
      name: "LANSGANBS's Blog",
      url: "https://www.lansganbs.cn/",
      avatar: "https://www.lansganbs.cn/images/friends/lansganbs.png",
      description: "红叶最多情，一舞寄相思。"
    },
  ],

  // 主题配置
  theme: {
    // 可以在这里添加更多主题相关配置
  }
};
