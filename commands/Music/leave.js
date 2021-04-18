const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "leave",
    category: "Music",
    aliases: ["leave", "l", "leavevc"],
    cooldown: 2,
    usage: "leave",
    description: "The bot leaves a Voice Channel.",
    run: async (client, message, args, user, text, prefix) => {
        try {
            let canalvoz = message.member.voice.channel;

            if (!canalvoz || canalvoz.type !== 'voice') {
                const requireVC = new MessageEmbed().setColor(ee.color)
                    .setTitle("¡You are not in Voice Channel!.");
                message.channel.send(requireVC);
            } else {
                let queue = await client.distube.getQueue(message);

                if (queue) {
                    client.distube.stop(message);
                } else if (!queue) {
                    return
                };

                let dm = ['Disconecting...', 'Totally disconnected...'];

                const Successfully = new MessageEmbed().setColor(ee.color)
                    .setTitle(`${dm[1]}`);

                message.channel.send(Successfully).then(() => {
                    canalvoz.leave();
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