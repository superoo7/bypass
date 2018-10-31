const openIndex = (url: string) => {
  chrome.tabs.create({ active: true, url: url });
};

document.addEventListener("DOMContentLoaded", () => {
  // Setup links with a:href
  const links: NodeListOf<HTMLAnchorElement> = document.querySelectorAll("a.link");
  links.forEach(link => {
    link.addEventListener("click", _e => {
      openIndex(link.href);
    });
  });

  // Routing
  const about = <Element>document.querySelector("#about");
  const credit = <Element>document.querySelector("#credit");
  const aboutRoute = <Element>document.querySelector("#route_about");
  const creditRoute = <Element>document.querySelector("#route_credit");

  creditRoute.className = "hidden";

  about.addEventListener("click", () => {
    about.className = "is-active";
    credit.className = "";
    aboutRoute.className = "";
    creditRoute.className = "hidden";
  });
  credit.addEventListener("click", () => {
    about.className = "";
    credit.className = "is-active";
    aboutRoute.className = "hidden";
    creditRoute.className = "";
  });
});
