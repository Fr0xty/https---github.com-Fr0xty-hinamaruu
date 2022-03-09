import { Message } from 'discord.js';
import { BaseCommand } from 'hina';
import { Hina } from '../../res/config.js';

export default class skip implements BaseCommand {
    name: String;
    description: String;

    constructor() {
        this.name = 'skip';
        this.description = 'clear server song queue.';
    }

    async execute(msg: Message, args: string[]) {
        const queue = Hina.player.getQueue(msg.guild!);

        if (!queue) await msg.reply("I'm not currently playing in this server.");
        queue.skip();
    }
}
