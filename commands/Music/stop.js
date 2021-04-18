const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "stop",
    category: "Music",
    aliases: ["latency"],
    cooldown: 2,
    usage: "stop",
    description: "The bot stop the playlist",
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
                    client.distube.stop(message);
                    const musicStop = new MessageEmbed().setColor(ee.color)
                        .setTitle("Okay! Music stopped")
                    message.channel.send(musicStop);
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