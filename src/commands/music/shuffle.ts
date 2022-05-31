import { Message } from 'discord.js';
import { BaseCommand } from 'hina';
import Hina from '../../res/HinaClient.js';

export default class shuffle implements BaseCommand {
    name: String;
    description: String;

    constructor() {
        this.name = 'shuffle';
        this.description = 'shuffle current queue.';
    }

    async execute(msg: Message, args: string[]) {
        const queue = Hina.player.getQueue(msg.guild!);
        if (!queue) return await msg.reply("I'm not currently playing in this server.");

        const npMusic = queue.nowPlaying();
        if (!npMusic) return await msg.reply("I'm not currently playing any songs.");

        queue.shuffle();
        await msg.react(Hina.okEmoji);
    }
}