$(function() {

    const audio = new Audio('./assets/sounds/card1.ogg');
    const images_location = './assets/images/';
    const back_card = images_location + 'back.png';

    let count = 0;
    const cols = 10;
    const rows = 15;

    const random_joker = Math.floor(Math.random() * (cols * rows));

    $('#your-joker img').attr('src', images_location + joker_list[random_joker].imageFile);
    $('#your-joker-url').text(joker_list[random_joker].name);
    $('#your-joker-url').attr('href', 'https://balatrowiki.org/w/' + joker_list[random_joker].name.replaceAll(' ', '_')).attr('target', '_blank');

    if ($('#grid-container').length) {

        for (let i = 0; i < rows; i++) {

            const row = $('<div>').addClass('row g-3 mb-3');

            for (let j = 0; j < cols; j++) {

                if (count >= joker_list.length) break;

                const joker = joker_list[count];
                const col = $('<div>').addClass('col');
                const flipper = $('<div>').addClass('card-flipper').attr({
                    'data-rarity': joker.rarity,
                    'data-type': joker.type
                });
                const front = $('<div>').addClass('card-front');
                const back = $('<div>').addClass('card-back');

                const front_image = $('<img>').attr({
                    'src': images_location + joker.imageFile,
                    'alt': joker.name
                });

                const label = $('<a>')
                    .addClass('joker-label')
                    .text(joker.name)
                    .attr('href', 'https://balatrowiki.org/w/' + joker.name.replaceAll(' ', '_'))
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
            if (count >= joker_list.length) break;
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
        const isFlipped = card.hasClass('is-flipped');
        const baseRotateY = isFlipped ? 180 : 0;
        card.css('transition', 'transform 0.5s ease-out');
        card.css('transform', `perspective(1000px) rotateX(0deg) rotateY(${baseRotateY}deg) scale(1)`);
    });

    $('.is-flipped').on('click', function(e) {
        e.preventDefault();
    });

    const allJokers = $('#grid-container .col');

    $('#search').on('keyup', function() {
        let search = $(this).val().toLowerCase();

        let filteredJokers = allJokers.filter(function() {
            let jokerName = $(this).find('.joker-label').text().toLowerCase();
            return jokerName.includes(search);
        });

        $('#grid-container').empty();

        let currentRow;
        filteredJokers.each(function(index) {
            if (index % cols === 0) {
                currentRow = $('<div>').addClass('row g-3 mb-3');
                $('#grid-container').append(currentRow);
            }
            currentRow.append(this);
        });
    });

    // --- Attribute Button Functionality ---

    const handleAttributeFlip = (attribute, value) => {
        // MODIFIED: Selector now targets cards that DO NOT have the attribute
        const selector = `.card-flipper:not([data-${attribute}="${value}"])`;
        const targetCards = $('#grid-container').find(selector);

        if (targetCards.length === 0) return;

        const cardsToFlipUp = targetCards.not('.is-flipped');

        if (cardsToFlipUp.length > 0) {
            // If there are any unflipped cards among the non-matching set, flip them all up
            cardsToFlipUp.addClass('is-flipped');
            audio.currentTime = 0;
            audio.play();
        } else {
            // If all non-matching cards are already flipped up, flip them all down
            targetCards.removeClass('is-flipped');
            audio.currentTime = 0;
            audio.play();
        }
    };

    const createFilterButtons = (containerId, attributeName, items, btnClass) => {

        const container = $(containerId);
        var style = '';

        items.forEach(item => {
            switch (item) {
                case 'Common':
                case 'Chips':
                    style = 'btn-primary';
                    break;
                case 'Uncommon':
                case 'Retrigger':
                    style = 'btn-success';
                    break;
                case 'Rare':
                case 'AddtiveMult':
                case 'MultiplicativeMult':
                    style = 'btn-danger';
                    break;
                case 'Legendary':
                case 'Money':
                    style = 'btn-warning';
                    break;
                case 'Effect':
                    style = 'btn-info';
                    break;
                case 'ChipsMult':
                    style = 'btn-light';
            }
            const button = $('<button>')
                .addClass(`btn ${style} m-1`)
                .text(item)
                .on('click', () => handleAttributeFlip(attributeName, item));
            container.append(button);
        });
    };

    const rarities = [...new Set(joker_list.map(joker => joker.rarity))].sort((a, b) => {
        const order = {
            "Common": 1,
            "Uncommon": 2,
            "Rare": 3,
            "Legendary": 4
        };
        return (order[a] || 99) - (order[b] || 99);
    });
    const types = [...new Set(joker_list.map(joker => joker.type))].sort();

    createFilterButtons('#rarity-buttons', 'rarity', rarities, 'btn-outline-light');
    createFilterButtons('#type-buttons', 'type', types, 'btn-outline-info');
});