const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "queue",
    category: "Music",
    aliases: ["queue","q"],
    cooldown: 2,
    usage: "queue",
    description: "The bot give you the playlist songs of the moment",
    run: async (client, message, args, user, text, prefix) => {
        try {
            let vc = message.member.voice.channel;
            if (!vc) {
                const unirse_a_canal_de_voz = new MessageEmbed()
                    .setColor(ee.color)
                    .setTitle("Join a voice chat first");
                message.channel.send(unirse_a_canal_de_voz);
            } else {
                let queue = await client.distube.getQueue(message);

                if (queue) {
                    var songs = queue.songs.map((song, id) => `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``).slice(0, 10).join("\n");
                    const queuelist = new MessageEmbed().setColor(ee.color)
                        .setTitle("Here is the list !")
                        .setDescription(songs);
                    message.channel.send(queuelist);
                } else if (!queue) {
                    return
                };
            }
        } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`❌ ERROR | An error occurred`)
                .setDescription(`\`\`\`${e.stack}\`\`\``)
            );
        }
    }
}