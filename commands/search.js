let Discord = require('discord.js')
let moment = require('moment')
require('moment-duration-format');
let ytdl = require('ytdl-core')
module.exports = {
  name: 'search',
  description: 'Searches a song for you to play.',
  usage: ' <song>',
  category: 'music',
  execute: async (client, message, args) => {
    
    
    client.handleVideo = async (video, message, vc, playlist = false) => {
    let queue = client.queue.get(message.guild.id);
    let music = {
      id: video.id,
      title: video.title,
      url: `https://www.youtube.com/watch?v=${video.id}`,
      thumbnail: `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`,
      duration: video.duration,
      ct: video.channel.title,
      channel: video.channel.id,
      published: video.publishedAt,
      channelURL: `https://www.youtube.com/channel/${video.channel.id}`
    };

    if (!queue) {
      let queueConstruct = {
        textChannel: message.channel,
        voiceChannel: vc,
        connection: null,
        musics: [],
        volume: 100,
        playing: true,
        loop: false
      };
      let voteConstruct = {
        votes: 0,
        voters: []
      };

      client.queue.set(message.guild.id, queueConstruct);
      client.votes.set(message.guild.id, voteConstruct);
      queueConstruct.musics.push(music);

      try {
        var connection = await vc.join();
        queueConstruct.connection = connection;
        client.play(message.guild, queueConstruct.musics[0]);
      } catch (err) {
        client.queue.delete(message.guild.id);
        console.error(`**I could not join your voice channel!** : (${err})`);
      }
    } else {
      queue.musics.push(music);
      let embed3 = new Discord.RichEmbed();
      if (playlist) return;
      else
        return message.channel.send(
          embed3
            .setColor(client.color)
            .setAuthor("Added To Queue", client.user.displayAvatarURL)
            .addField("Song Title", `**[${music.title}](${music.url})**`)
            .addField("Song Channel", `**[${music.ct}](${music.channelURL})**` , true)
            .addField(
              "Song Duration",
              `**${moment.duration(music.duration).format('DD:HH:mm:ss')}**`, true
            )

            .setThumbnail(music.thumbnail)

            .setTimestamp(Date.now())
        );
    }
    return;
  };

  client.play = (guild, music) => {
    let queue = client.queue.get(guild.id);
    let votes = client.votes.get(guild.id);
    let embed2 = new Discord.RichEmbed();
    if (!music) {
      queue.voiceChannel.leave();
      client.queue.delete(guild.id);
      client.votes.delete(guild.id);
      return queue.textChannel.send(
        embed2.setTitle("Queue Has Ended").setColor(client.color)
      );
    }

     let dispatcher = queue.connection.playStream(ytdl(music.url, {
              filter: 'audioonly'
            }, {quality: 'highestaudio'}), {
              bitrate: 384000,
              volume: queue.volume / 100,
              highWaterMark: 1024 * 1024 * 10
            })
      .on("end", reason => {
        if (reason === "Stream is not generating quickly enough.")
          console.log("Song ended.");
        else console.log(reason);

        if (queue.loop === true) queue.musics.push(queue.musics.shift());
        else queue.musics.shift();
        client.play(guild, queue.musics[0]);
      })
      .on("error", err => console.error(err));
    dispatcher.setVolumeLogarithmic(queue.volume / 100);
    let embed1 = new Discord.RichEmbed();
    queue.textChannel.send(
      embed1
        .setColor(client.color)
        .setAuthor(" Now Playing", client.user.displayAvatarURL)
        .addField("Song Title", `**[${music.title}](${music.url})**`)
        .addField("Song Channel", `**[${music.ct}](${music.channelURL})**` , true)
        .addField(
          "Song Duration",
          `**${moment.duration(music.duration).format('DD:HH:mm:ss')}**` , true
        )

        .setThumbnail(music.thumbnail)

        .setTimestamp(Date.now())
    );
  };
    
    
    
    let VC = message.member.voiceChannel;
  if (!VC)
    return message.channel.send(':x: | Please connect to a vouce channel!')

  let url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
  let pl = /^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/;

  let searchString = args.join(" ");
  if (!url || !searchString)
     return message.channel.send(':x: | Please enter a valid url/song name!')
  let perms = VC.permissionsFor(message.client.user);
  if (!perms.has("CONNECT"))
    return message.channel.send(':x: | Sorry, but i cannot connect to the channel!')
  if (!perms.has("SPEAK"))
    return message.channel.send(':x: | Sorry, but i cannot speak in this channel!')

  if (url.match(pl)) {
    let playlist = await client.youtube.getPlaylist(url);
    let videos = await playlist.getVideos();

    for (const vid of Object.values(videos)) {
      let video = await client.youtube.getVideoByID(vid.id);
      await client.handleVideo(video, message, VC, true);
    }

    return message.channel.send(
      `🎵 **${playlist.title}** has been added to queue.`
    );
  } else {
    try {
      var video = await client.youtube.getVideo(url);
    } catch (err) {
      if (err) undefined;
      try {
        var videos = await client.youtube.searchVideos(searchString, 10);
        let index = 0;

        let embed = new Discord.RichEmbed()
          
          .setThumbnail(client.user.avatarURL)
          .setDescription(
            `**Results**\n${videos
              .map(video => `**${++index} -** [${video.title}](${video.url})`)
              .join(
                "\n"
              )}`
          )
          .setColor(client.color)
          .setFooter("Choose a Song from 1 to 10 from the List Above");

        message.channel.send(embed);

        try {
          var response = await message.channel.awaitMessages(
            msg => msg.content > 0 && msg.content < 11,
            {
              maxMatches: 1,
              time: 10000,
              errors: ["time"]
            }
          );
        } catch (err) {
          if (err) undefined;
          return message.channel.send(
            
              ":x: | You have exceeded the 10 seconds selection time",
              
          );
        }
        const videoIndex = parseInt(response.first().content);
        var video = await client.youtube.getVideoByID(videos[videoIndex - 1].id);
      } catch (err) {
        console.error(err);
        return message.channel.send(':x: | I cannot find any videos!')
      }
    }
    return client.handleVideo(video, message, VC);
  }
  }
}