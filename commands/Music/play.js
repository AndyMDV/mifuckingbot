const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "play",
    category: "Music",
    aliases: ["play", "p"],
    cooldown: 2,
    usage: "play",
    description: "The bot Play a music in the Voice Channel",
    run: async (client, message, args, user, text, prefix) => {
        try {
            let vc = message.member.voice.channel;
            if (!vc) {
                const unirse_a_canal_de_voz = new MessageEmbed()
                    .setColor(ee.color)
                    .setTitle("Join a voice chat first");
                message.channel.send(unirse_a_canal_de_voz);
            } else {
                if (!args[0]) {
                    const SinBusquedas = new MessageEmbed().setColor(ee.color)
                        .setTitle(`Without results`)
                        .setDescription(`${message.author.toString()} you must add a search`)
                        .setFooter(`No search added`);
                    message.channel.send(SinBusquedas);
                }
                else {
                    const music = args.join(" ");

                    client.distube.play(message, music);
                }
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