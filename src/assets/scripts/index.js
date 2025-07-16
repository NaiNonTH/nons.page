(function() {
    function inTheRangeOf(value, a, b) {
        return value >= a && value <= b
    }

    const casualSplashes = [
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
        "<a href='/blog/my-pc-froze-and-couldn-t-turn-back-on/'>this is what would happen if I played Minecraft with RTX on.</a>",
        "THE SITE PREVIEW ACTUALLY WORKS, LET'S GOOO!!!",
        "has the AI trend gone way too far?",
        "this website is built with <a href='https://11ty.dev' target='_blank'>11ty</a>.",
        "<a href='https://saerasoft.com/caesium' target='_blank'>Caesium</a> is great.",
        "the internet was fun until big corporations ruined everything.",
        "the quick brown fox jumps over the lazy dog.",
        "you actually don't need JavaScript for this website.",
        "should I move to Linux?",
        "I did <a target='_blank' href='/blog/two-projects-in-a-month/#numerical-method-webapp-project'>this</a> for nothing but a tick.",
        "moo-deng.",
    ];

    const christmasSplashes = [
        "I wish you a Merry X-mas!",
        "Merry Christmas!",
        "Feliz Navidad!",
        "it's that time of the year again, isn't it?",
        "time flies..."
    ]

    const newYearSplashes = [
        "Happy New Year!",
        "congratulations! You've just survived 2024.",
        "thank god, I'm still alive at this point...",
        "it's that time of the year again, isn't it?"
    ]
    
    const splashOut = document.getElementById("splash");
    const rerandomSplash = document.getElementById("random-splash")
    rerandomSplash.addEventListener("click", randomSplash);

    const date = new Date();
    let splash;
    
    if (inTheRangeOf(date.getDate(), 24, 25) && date.getMonth() === 11)
        splash = christmasSplashes;
    else if (inTheRangeOf(date.getDate))
        splash = newYearSplashes;
    else
        splash = casualSplashes;
    
    randomSplash();
    
    function randomSplash() {
        splashOut.innerHTML = splash[Math.trunc(Math.random() * splash.length)];
    }
})();