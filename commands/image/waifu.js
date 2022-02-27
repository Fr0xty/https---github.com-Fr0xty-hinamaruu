import { MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';

import { paginator } from '../../utils/paginator.js';
import { prefix, hinaColor, hinaImageOption } from '../../res/config.js';


export default {

    name: 'waifu',
    aliases: ['uniform', 'maid', 'marin-kitagawa', 'mori-calliope', 'raiden-shogun', 'selfies', 'random', 'ass', 'ecchi', 'ero', 'hentai', 'milf', 'oral', 'paizuri', 'breast', 'nsfwmaid', 'nsfwuniform', 'nsfwwaifu', 'nsfwselfies', 'nsfwrandom'],
    description: 'get nice pictures.',





    async execute(Hina, msg, args) {
        
        // amount
        let num;
        if (!args.length) num = 1;
        else if (args[0] > 0 && args[0] < 31) { num = args[0] }
        else return await msg.reply('Invalid number! Please provide 0 < __num__ < 31.');

        // tag
        const tag = msg.content.slice(prefix.length).split(' ').shift().toLowerCase();
        let url;
        switch (tag) {
            // sfw
            case ('uniform'):
                url = 'https://api.waifu.im/random/?selected_tags=uniform&is_nsfw=false&many=true';
                break;
            case ('maid'):
                url = 'https://api.waifu.im/random/?selected_tags=maid&is_nsfw=false&many=true';
                break;
            case ('waifu'):
                url = 'https://api.waifu.im/random/?selected_tags=waifu&is_nsfw=false&many=true';
                break;
            case ('marin-kitagawa'):
                url = 'https://api.waifu.im/random/?selected_tags=marin-kitagawa&is_nsfw=false&many=true';
                break;
            case ('mori-calliope'):
                url = 'https://api.waifu.im/random/?selected_tags=mori-calliope&is_nsfw=false&many=true';
                break;
            case ('raiden-shogun'):
                url = 'https://api.waifu.im/random/?selected_tags=raiden-shogun&is_nsfw=false&many=true';
                break;
            case ('selfies'):
                url = 'https://api.waifu.im/random/?selected_tags=selfies&is_nsfw=false&many=true';
                break;
            case ('random'):
                url = 'https://api.waifu.im/random/?is_nsfw=false&many=true';
                break;
            // nsfw
            case ('ass'):
                url = 'https://api.waifu.im/random/?selected_tags=ass&is_nsfw=true&many=true';
                break;
            case ('ecchi'):
                url = 'https://api.waifu.im/random/?selected_tags=ecchi&is_nsfw=true&many=true';
                break;
            case ('ero'):
                url = 'https://api.waifu.im/random/?selected_tags=ero&is_nsfw=true&many=true';
                break;
            case ('hentai'):
                url = 'https://api.waifu.im/random/?selected_tags=hentai&is_nsfw=true&many=true';
                break;
            case ('milf'):
                url = 'https://api.waifu.im/random/?selected_tags=milf&is_nsfw=true&many=true';
                break;
            case ('oral'):
                url = 'https://api.waifu.im/random/?selected_tags=oral&is_nsfw=true&many=true';
                break;
            case ('paizuri'):
                url = 'https://api.waifu.im/random/?selected_tags=paizuri&is_nsfw=true&many=true';
                break;
            case ('breast'):
                url = 'https://api.waifu.im/random/?selected_tags=breast&is_nsfw=true&many=true';
                break;
            case ('nsfwmaid'):
                url = 'https://api.waifu.im/random/?selected_tags=maid&is_nsfw=true&many=true';
                break;
            case ('nsfwuniform'):
                url = 'https://api.waifu.im/random/?selected_tags=uniform&is_nsfw=true&many=true';
                break;
            case ('nsfwwaifu'):
                url = 'https://api.waifu.im/random/?selected_tags=waifu&is_nsfw=true&many=true';
                break;
            case ('nsfwselfies'):
                url = 'https://api.waifu.im/random/?selected_tags=selfies&is_nsfw=true&many=true';
                break;
            case ('nsfwrandom'):
                url = 'https://api.waifu.im/random/?is_nsfw=true&many=true';
                break;
        };
        let result = await fetch(url);
        result = await result.json();
        if (result.code === 404) return await msg.reply(JSON.stringify(result));

        const images = result.images;

        let pages = [];
        let _ = 1;
        for (let i = 0; i < num; i++) {

            const embed = new MessageEmbed()
                .setAuthor({name: `${Hina.user.username} Page ${_++} / ${num}`})
                .setColor(images[i].dominant_color)
                .setTitle(tag)
                .setDescription(`[source](${images[i].source})`)
                .setImage(images[i].url)
                .setFooter({text: `Requested by: ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL(hinaImageOption)})
                .setTimestamp();

            pages.push(embed);
        };

        await paginator(msg, pages, 120_000);
    },





    async slashExecute(Hina, interaction) {
        return;
    },
};