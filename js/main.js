$(function() {

    const audio = new Audio('./assets/sounds/card1.ogg');
    const images_location = './assets/images/';
    const back_card = images_location + 'back.png';

    let count = 0;
    const cols = 10;
    const rows = 15;

    const joker_list = [
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

    const random_joker = Math.floor(Math.random() * (cols * rows));

    $('#your-joker img').attr('src', images_location + 'joker_' + (random_joker + 1) + '.png');
    $('#your-joker-url').text(joker_list[random_joker]);
    $('#your-joker-url').attr('href', 'https://balatrowiki.org/w/' + joker_list[random_joker].replaceAll(' ', '_')).attr('target', '_blank');

    if ($('#grid-container').length) {

        for (let i = 0; i < rows; i++) {

            const row = $('<div>').addClass('row g-3 mb-3');

            for (let j = 0; j < cols; j++) {

                const col = $('<div>').addClass('col');
                const flipper = $('<div>').addClass('card-flipper');
                const front = $('<div>').addClass('card-front');
                const back = $('<div>').addClass('card-back');

                const front_image = $('<img>').attr({
                    'src': images_location + 'joker_' + (count + 1) + '.png',
                    'alt': joker_list[count]
                });

                const label = $('<a>')
                    .addClass('joker-label')
                    .text(joker_list[count])
                    .attr('href', 'https://balatrowiki.org/w/' + joker_list[count].replaceAll(' ', '_'))
                    .attr('target', '_blank');

                front.append(front_image).append(label);


                const back_image = $('<img>').attr({
                    'src': back_card,
                    'alt': 'Back of card'
                });

                back.append(back_image);

                flipper.on('click', function() {
                    $(this).toggleClass('is-flipped');
                    audio.currentTime = 0;
                    audio.play();
                });

                flipper.append(front).append(back);
                col.append(flipper);
                row.append(col);

                count++;
            }

            $('#grid-container').append(row);
        }
    }

    $('#grid-container').on('mousemove', '.card-flipper', function(e) {
        const card = $(this);
        const rect = this.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const intensity = 15;

        const rotateX = -(y / (rect.height / 2)) * intensity;
        const rotateY = (x / (rect.width / 2)) * intensity;

        const isFlipped = card.hasClass('is-flipped');
        const baseRotateY = isFlipped ? 180 : 0;

        card.css('transition', 'transform 0.05s linear');
        card.css('transform', `perspective(1000px) rotateX(${rotateX}deg) rotateY(${baseRotateY + rotateY}deg) scale(1.1)`);

    }).on('mouseleave', '.card-flipper', function() {
        const card = $(this);
        card.css('transition', 'transform 0.5s ease-out');
        card.css('transform', '');
    });
});

$('#search').on('keyup', function() {
    let search = $(this).val().toLowerCase();

    $('#grid-container .col').each(function() {
        let joker = $(this).find('.joker-label').text().toLowerCase();

        if (joker.includes(search)) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
});