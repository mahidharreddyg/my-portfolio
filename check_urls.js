const urls = [
  "https://cdn.simpleicons.org/docker/2496ED",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
  "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg"
];

Promise.all(urls.map(url => fetch(url).then(r => console.log(url, r.status)))).then(() => console.log("Done"));
