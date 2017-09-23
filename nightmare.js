const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const creds = require('./creds');
const jquery = require('jquery');
const colors = require('colors');



// console.log(jquery);

nightmare
    .goto('https://www.google.pt/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=0ahUKEwiYjJG_-7TWAhUIExoKHV-gD0kQFggoMAA&url=https%3A%2F%2Fwww.youtube.com%2Fdashboard&usg=AFQjCNGHzjyvORIHp7op1c2VI3Um0x8idw')
    .wait()
    .type('#Email', creds.username)
    .click('#next')
    .wait(2000)
    .click('input[type="password"]')
    .type('input[type="password"]', creds.password)
    .click('#signIn')
    .wait('#logo-container')
    .click('#logo-container')
    // .goto('https://youtube.com')
    .wait(3000)
    .scrollTo(2383, 0)
    .wait(3000)
    // .then(function() {
    //     console.log("url -> ", nightmare.url() .cyan)
    // })
    .inject('js', './node_modules/jquery/dist/jquery.min.js')
    .evaluate(function() {
        let list = [];
        $('.yt-shelf-grid-item').each(function() {
            let video = {};
            video["title"] = $(this).find('a').text();
            video["url"] = 'https://youtube.com' + $(this).find('a').attr('href');
            video["img"] = $(this).find('img').attr('src');
            console.log('|| log -> ', video);
            list.push(video);

        })
        return list;
    })
    .then(function(list) {
        return console.log(list);
    })
    // .end()
    .then(console.log)
    .catch((error) => {
        console.error('Search failed:', error);
    })