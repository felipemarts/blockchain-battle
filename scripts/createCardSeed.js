const fs = require('fs');
const fetch = require('node-fetch');
require('dotenv').config();

const seeds = JSON.parse(fs.readFileSync('../assets/seed.json', 'utf-8'));

const getRandomSeed = () => {
    let seed = '';
    for (let i = 0; i < 3; i++) {
        seed += seeds[Math.floor(Math.random() * seeds.length)] + ' ';
    }
    seed = seed.trim();
    return seed;
}
const getDescription = async (seed) => {
    const params = new URLSearchParams();
    params.append('text', seed);
    let req = await fetch('https://api.deepai.org/api/text-generator', {
        method: 'POST',
        body: params,
        headers: {
            'api-key': process.env.API_KEY_DEEPIA
        }
    })
    let description = (await req.json()).output;
    if(!description.endsWith('.')) {
        description += '.';
    }
    return description;
}

(async () => {
    let seed = getRandomSeed();
    console.log('seed', seed);
    //let description = getDescription(seed);
    //console.log('description', description);
    
})();