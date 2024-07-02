const splashes = [
    "this website is hosted on <a href='https://nekoweb.org' target='_blank'>the internet for the cats :3</a>",
    "why is our world getting worse?",
    "I hate the minor me.",
    "I don't like using <a href='https://react.dev' target='_blank'>React</a>.",
    "I think that the modern web is broken.",
    "I think that iPhone is pretty mid.",
    "I think no one should die by someone.",
    "I wish everyone can live together in peace.",
    "I wish the internet was simpler.",
    "I wish I could experience the 2000's internet.",
    "I am from Thailand.",
    "<a href='/blog/my-pc-froze-and-couldn-t-turn-back-on/'>this is what happened after I played Minecraft with RTX on.</a>",
    "THE SITE PREVIEW ACTUALLY WORKS, LET'S GOOO!!!",
    "has the AI trend gone way too far?",
    "this website is built with <a href='https://11ty.dev' target='_blank'>11ty</a>.",
    "<a href='https://saerasoft.com/caesium' target='_blank'>Caesium</a> is great.",
    "Minecraft has changed forever. (still love it, though)",
    "<em><a href='https://www.youtube.com/watch?v=VxXqiU34PsM' target='_blank'>it's butterbear</a></em>",
    "the quick brown fox jumps over the lazy dog.",
    "you actually don't need JavaScript for this website."
]

const splashOut = document.getElementById("splash");
splashOut.innerHTML = splashes[Math.trunc(Math.random() * splashes.length)];