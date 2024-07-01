const splashes = [
    "this website is hosted on <a href='https://nekoweb.org' target='_blank'>the internet for the cats :3</a>",
    "why is our world getting worse?",
    "I hate the minor me.",
    "I think that <a href='https://svelte.dev'>Svelte</a> is better than <a href='https://react.dev'>React</a>.",
    "I think that the modern web is broken.",
    "I think that iPhone is pretty mid.",
    "I think no one should die by someone.",
    "I wish everyone can live together in peace.",
    "I wish the internet was simpler.",
    "I wish I could experience the 2000's internet.",
    "I am from Thailand.",
]

const splashOut = document.getElementById("splash");
splashOut.innerHTML = splashes[Math.trunc(Math.random() * splashes.length)];