$(function() {

    var audio = new Audio('./assets/sounds/card1.ogg');

    const $gridContainer = $('#grid-container');

    const backImageUrl = `./assets/images/back.png`;

    let count = 0;

    const jokerList = [
        "Joker", "Greedy Joker", "Lusty Joker", "Wrathful Joker", "Gluttonous Joker", "Jolly Joker", "Zany Joker", "Mad Joker", "Crazy Joker", "Droll Joker",
        "Sly Joker", "Wily Joker", "Clever Joker", "Devious Joker", "Crafty Joker", "Half Joker", "Joker Stencil", "Four Fingers", "Mime", "Credit Card",
        "Ceremonial Dagger", "Banner", "Mystic Summit", "Marble Joker", "Loyalty Card", "8 Ball", "Misprint", "Dusk", "Raised Fist", "Chaos the Clown",
        "Fibonacci", "Steel Joker", "Scary Face", "Abstract Joker", "Delayed Gratification", "Hack", "Pareidolia", "Gros Michel", "Even Steven", "Odd Todd",
        "Scholar", "Business Card", "Supernova", "Ride the Bus", "Space Joker", "Egg", "Burglar", "Blackboard", "Runner", "Ice Cream", "DNA", "Splash", "Blue Joker",
        "Sixth Sense", "Constellation", "Hiker", "Faceless Joker", "Green Joker", "Superposition", "To Do List", "Cavendish", "Card Sharp", "Red Card", "Madness",
        "Square Joker", "Séance", "Riff-Raff", "Vampire", "Shortcut", "Hologram", "Vagabond", "Baron", "Cloud 9", "Rocket", "Obelisk", "Midas Mask", "Luchador",
        "Photograph", "Gift Card", "Turtle Bean", "Erosion", "Reserved Parking", "Mail-In Rebate", "To the Moon", "Hallucination", "Fortune Teller", "Juggler",
        "Drunkard", "Stone Joker", "Golden Joker", "Lucky Cat", "Baseball Card", "Bull", "Diet Cola", "Trading Card", "Flash Card", "Popcorn", "Spare Trousers",
        "Ancient Joker", "Ramen", "Walkie Talkie", "Seltzer", "Castle", "Smiley Face", "Campfire", "Golden Ticket", "Mr. Bones", "Acrobat", "Sock and Buskin",
        "Swashbuckler", "Troubadour", "Certificate", "Smeared Joker", "Throwback", "Hanging Chad", "Rough Gem", "Bloodstone", "Arrowhead", "Onyx Agate", "Glass Joker",
        "Showman", "Flower Pot", "Blueprint", "Wee Joker", "Merry Andy", "Oops! All 6s", "The Idol", "Seeing Double", "Matador", "Hit the Road", "The Duo", "The Trio",
        "The Family", "The Order", "The Tribe", "Stuntman", "Invisible Joker", "Brainstorm", "Satellite", "Shoot the Moon", "Driver's License", "Cartomancer",
        "Astronomer", "Burnt Joker", "Bootstraps", "Canio", "Triboulet", "Yorick", "Chicot", "Perkeo"
    ];

    const yourJoker = Math.floor(Math.random() * 150);
    const yourJokerImageUrl = './assets/images/joker_' + (yourJoker + 1) + '.png';

    $('#your-joker img').attr('src', yourJokerImageUrl);
    $('#your-joker-url').text(jokerList[yourJoker]);
    $('#your-joker-url').attr('href', 'https://balatrowiki.org/w/' + jokerList[count].replaceAll(' ', '_'));

    if ($gridContainer.length) {

        for (let i = 0; i < 15; i++) {

            const $row = $('<div>').addClass('row g-3 mb-3');

            for (let j = 0; j < 10; j++) {

                if (count >= 150) break;

                const $col = $('<div>').addClass('col');
                const $flipper = $('<div>').addClass('card-flipper');
                const $front = $('<div>').addClass('card-front');
                const $back = $('<div>').addClass('card-back');

                const $frontImg = $('<img>').attr({
                    'src': './assets/images/joker_' + (count + 1) + '.png',
                    'alt': jokerList[count]
                });

                const $label = $('<a>')
                    .addClass('joker-label')
                    .text(jokerList[count])
                    .attr('href', 'https://balatrowiki.org/w/' + jokerList[count].replaceAll(' ', '_'))
                    .attr('target', '_blank');

                $front.append($frontImg).append($label);


                const $backImg = $('<img>').attr({
                    'src': backImageUrl,
                    'alt': 'Back of card'
                });
                $back.append($backImg);

                $flipper.on('click', function() {
                    $(this).toggleClass('is-flipped');
                    audio.currentTime = 0;
                    audio.play();
                });

                $flipper.append($front).append($back);
                $col.append($flipper);
                $row.append($col);

                count++;
            }

            $gridContainer.append($row);
        }
    }
});

$('#search').on('keyup', function() {
    let searchTerm = $(this).val().toLowerCase();

    $('#grid-container .col').each(function() {
        let jokerName = $(this).find('.joker-label').text().toLowerCase();

        if (jokerName.includes(searchTerm)) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
});