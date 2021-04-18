const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "join",
    category: "Music",
    aliases: ["join","j","joinvc"],
    cooldown: 2,
    usage: "join",
    description: "The bot join in a Voice Channel",
    run: async (client, message, args, user, text, prefix) => {
        try {
            let canalvoz = message.member.voice.channel;

            if (!canalvoz || canalvoz.type !== 'voice') {
                const requireVC = new MessageEmbed().setColor(ee.color)
                    .setTitle("'¡You need to join a voice channel first!.'");
                message.channel.send(requireVC);
            } else if (message.guild.voiceConnection) {
                const AlreadyConnected = new MessageEmbed().setColor(ee.color)
                    .setTitle('I am already connected on a voice channel.');
                message.channel.send(AlreadyConnected);
            } else {
                let dm = ['Connecting...', 'Successfully connected.'];

                const connecting = new MessageEmbed().setColor(ee.color)
                    .setTitle(`${dm[0]}`);
                const Successfully = new MessageEmbed().setColor(ee.color)
                    .setTitle(`${dm[1]}`);

                message.channel.send(connecting).then(m => {
                    canalvoz.join().then(() => {
                        m.edit(Successfully).catch(error => console.log(error));
                    }).catch(error => console.log(error));
                }).catch(error => console.log(error));
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