
const Discord = require("discord.js"); 
const colors = require("colors");
const fs = require("fs"); 
const DisTube = require('distube');
const { MessageEmbed } = require('discord.js');
const ee = require("./botconfig/embed.json");

const client = new Discord.Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  disableEveryone: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});


client.commands = new Discord.Collection(); 
client.aliases = new Discord.Collection(); 
client.categories = fs.readdirSync("./commands/"); 
client.cooldowns = new Discord.Collection(); 


["command", "events"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.login(require("./botconfig/config.json").token);


client.distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true });
client.distube
    .on("playSong", (message, queue, song) => {
        const messagePlaySong = new MessageEmbed().setColor(ee.color)
            .setTitle(`Playing now 🎶`)
            .setDescription(`${song.name}\n Requested by:${song.user}`)
            .setFooter(`Duration: ${song.formattedDuration}`);
        message.channel.send(messagePlaySong);
    })
    .on("addSong", (message, queue, song) => {
        const messageAddSong = new MessageEmbed().setColor(ee.color)
            .setTitle(`Added now 🎼`)
            .setDescription(`${song.name}\n To the queue by:${song.user}`)
            .setFooter(`Duration: ${song.formattedDuration}`);
        message.channel.send(messageAddSong);
    })
    .on("playList", (message, queue, playlist, song) => {
        const messagePlayList = new MessageEmbed().setColor(ee.color)
            .setTitle(`Play 🔊`)
            .setDescription(`${playlist.name}\n Playlist (${playlist.songs.length} songs)`)
            .addFields(
                {
                    name: "Now playing",
                    value: `${song.name}`,
                    inline: true
                },
                {
                    name: "Requested by",
                    value: `${song.user}`,
                    inline: true
                },
                {
                    name: "Status",
                    value: `${status(queue)}`,
                    inline: true
                }
            )
            .setFooter(`Duration: ${song.formattedDuration}`);
        message.channel.send(messagePlayList);
    })
    .on("addList", (message, queue, playlist) => {
        const messageAddlist = new MessageEmbed().setColor(ee.color)
            .setTitle("Added 📜")
            .setDescription(`${playlist.name} \n Playlist (${playlist.songs.length} songs) to queue ${status(queue)}`)
        message.channel.send(messageAddlist)
    })
    .on("searchResult", (message, result) => {
        let i = 0;
        const messageSearchResult = new MessageEmbed().setColor(ee.color)
            .setTitle("OPTIONS 🎐")
            .setDescription(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")} \n*Enter anything else or wait 60 seconds to cancel*`)
        message.channel.send(messageSearchResult);
    })
    .on("searchCancel", (message) => {
        const messageSearchCancel = new MessageEmbed().setColor(ee.color)
            .setTitle("❌ Searching canceled ❌")
        message.channel.send(messageSearchCancel)
    })
    .on("error", (message, e) => {
        console.error(e)
        message.channel.send("An error encountered: " + e);
    });