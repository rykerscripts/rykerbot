require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

const badWords = ['f***', 's***', 'nude', 'porn', 'sex', 'nsfw'];

client.once('ready', () => {
  console.log(`✅ RykerBot is online as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  const content = message.content.toLowerCase();

  if (badWords.some(word => content.includes(word))) {
    try {
      await message.delete();
      await message.member.ban({ reason: 'Inappropriate content' });
      console.log(`🚫 Banned ${message.author.tag}`);
    } catch (err) {
      console.error(`❌ Could not ban ${message.author.tag}`, err);
    }
  }
});

client.login(process.env.TOKEN);
