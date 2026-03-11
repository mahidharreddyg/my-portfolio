async function test() {
  const urls = [
      "https://cdn.simpleicons.org/docker/2496ED",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
      "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg"
  ];
  for(let u of urls) {
      try {
          let res = await fetch(u);
          console.log(u, res.status);
      } catch (e) {
          console.log(u, "ERROR");
      }
  }
}
test();
