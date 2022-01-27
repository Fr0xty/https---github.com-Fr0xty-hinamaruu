const { MessageEmbed } = require('discord.js');
const { hinaColor } = require('../res/config');
const pjson = require('../package.json');
const { convertSeconds, convertMention, convertFlags, convertPresence, convertPermissions } = require('../utils/convert.js');


module.exports = [
    
    {
        name: 'run',
        description: 'Running code snippets in a sandbox.',
        async execute(client, msg, args) {
            
            args = args.replaceAll('```', '');
            let lang = args.split('\n')[0];
            args.split('\n').shift();
            
            const pistonClient = piston({server: "https://emkc.org"});
            const runtimes = await pistonClient.runtimes();
            const result = await pistonClient.execute(lang, args);
            await msg.channel.send(result);
        }
    },



    {
        name: 'appinfo',
        description: 'Get my information!',
        async execute(client, msg, args) {

            const djsVer = pjson.dependencies['discord.js'];
            const nodeVer = pjson.devDependencies['node'];
            const uptime = convertSeconds(client.uptime / 1000);
            
            const embed = new MessageEmbed()
                .setDescription(`
                    discord.js: \`${djsVer}\`
                    Node JS: \`${nodeVer}\`

                    bot latency: \`${Date.now() - msg.createdTimestamp}ms\`
                    websocket latency: \`${Math.round(client.ws.ping)}ms\`
                    bot uptime: \`${uptime}\`
                    `
                )
                .setAuthor({name: client.user.tag, iconURL: client.user.avatarURL({size:4096})})
                .setColor(hinaColor)
                .setTitle(`Hina's Application Info`)
                .setThumbnail(client.user.avatarURL({size: 4096}))
                .setTimestamp()
                .setFooter({text: `Requested by: ${msg.author.tag}`, iconURL: msg.author.avatarURL({size:4096})});
            await msg.channel.send({ embeds: [embed] });
        }
    },



    {
        name: 'userinfo',
        description: 'get all user information',
        async execute(client, msg, args) {

            if (args.length == 0) { var member = msg.member }
            else { 
                try {
                    var member = await msg.guild.members.fetch(args[0].match(/[0-9]+/)[0]);
                } catch (e) {
                    
                };
            };
            if (member == undefined) return console.log(args[0].match(/[0-9]+/)[0]);

            const flags = convertFlags(member.user.flags.bitfield);

            if (member.nickname) { var nickname = member.nickname }
            else { var nickname = 'None' };

            const presence = convertPresence(member.presence.clientStatus);
            const permissions = convertPermissions(member.permissions.bitfield);

            if (!member.roles.highest) {var roles = 'None'}
            else {var roles = `highest: ${member.roles.highest}\nhoist: ${member.roles.hoist}`};


            const embed = new MessageEmbed()
                .setAuthor({name: `${member.displayName}'s User Info`, iconURL: member.user.avatarURL({size:4096})})
                .setTitle(member.user.tag)
                .setColor(member.displayHexColor)
                .setThumbnail(member.user.avatarURL({size:4096}))
                .setTimestamp()
                .setFooter({text: `Requested by: ${msg.author.tag}`, iconURL: msg.author.avatarURL({size:4096})})
                .addFields(
                    {name: 'nickname', value: nickname, inline: true},
                    {name: 'mention', value: member.toString(), inline: true},

                    {name: 'status', value: presence, inline: true},
                    {name: 'joined at', value: `<t:${Math.round(member.joinedTimestamp / 1000)}>`, inline: true},
                    {name: 'created at', value: `<t:${Math.round(member.user.createdTimestamp / 1000)}>`, inline: true},
                    {name: 'badges', value: flags},
                    {name: 'roles', value: roles},
                    {name: `permissions [${permissions.length}]`, value: `${permissions.perms}\n[for more info...](https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags)`}
                );
            await msg.channel.send({ embeds: [embed] });
        }
    },



    {
        name: 'stuff',
        description: 'testing stuff',
        async execute(client, msg, args) {
            await msg.channel.send(`the stuff is ${msg.member.permissions.bitfield}`);
        }
    }

];