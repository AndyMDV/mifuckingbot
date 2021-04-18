module.exports = {
    name: "skip",
    aliases: ["s"],
    description: "The bot skips a music in playlist",
    category: "Music",
    guildOnly: true,
    cooldown: 2,
    usage: "p!skip",
    async execute(client, message, args) {
        let vc = message.member.voice.channel;
        if (!vc) {
            const unirse_a_canal_de_voz = new MessageEmbed()
                .setColor(ee.color)
                .setTitle("Join a voice chat first");
            message.channel.send(unirse_a_canal_de_voz);
        } else {
            let queue = await client.distube.getQueue(message);

            if (queue) {
                client.distube.skip(message);
                const musicSkip = new MessageEmbed().setColor(ee.color)
                    .setTitle("skipped music !");
                message.channel.send(musicSkip);
            } else if (!queue) {
                return
            };
        }
    },
};
const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "ping",
    category: "Information",
    aliases: ["latency"],
    cooldown: 2,
    usage: "ping",
    description: "Gives you information on how fast the Bot can respond to you",
    run: async (client, message, args, user, text, prefix) => {
    try{
      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`🏓 Pinging....`)
      ).then(msg=>{
        msg.edit(new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`🏓 Ping is \`${Math.round(client.ws.ping)}ms\``)
        );
      })
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