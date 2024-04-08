module.exports = {
    name: 'reroll-gw',
    description: 'Relancer un giveaway',
    type: 1,
    options: [
        {
            name: 'giveaway',
            description: 'Le giveaway à relancer (ID du message ou prix)',
            type: 3,
            required: true
        }
    ],
    go: async (client, db, config, interaction, args) => {
 
        if (!db.get(`Owner_${interaction.guild.id}-${interaction.user.id}`) && !config.owners.includes(interaction.user.id) && interaction.user.id !== interaction.guild.ownerId) {
            return interaction.reply({ content: '`❌` Tu n\'as pas les permissions pour effectuer cette commande !', ephemeral: true });
        }
    
        const query = interaction.options.getString('giveaway');
        const giveaway = 
          
            client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) ||
   
            client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);
    

        if (!giveaway) {
            return interaction.reply({
                content: 'Impossible de trouver un giveaway pour `'+ query + '`.',
                ephemeral: true
            });
        }
    
        if (!giveaway.ended) {
            return interaction.reply({
                content: 'Le giveaway n\'est pas encore terminé.',
                ephemeral: true
            });
        }

        client.giveawaysManager.reroll(giveaway.messageId)
        .then(() => {
            interaction.reply('Giveaway relancé !');
        })
        .catch((e) => {
            interaction.reply({
                content: e,
                ephemeral: true
            });
        });
    }
};
