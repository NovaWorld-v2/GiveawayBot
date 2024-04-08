const ms = require('ms');
const messages = require('../../utils/messages');

module.exports = {
    name: 'start-gw',
    description: 'Lancer un giveaway',
    type: 1,
    options: [
        {
            name: 'duree',
            description: 'Combien de temps doit durer le giveaway. Exemples : 1m, 1h, 1d',
            type: 3,
            required: true
        },
        {
            name: 'gagnants',
            description: 'Combien de gagnants le giveaway devrait avoir',
            type: 4,
            required: true
        },
        {
            name: 'lot',
            description: 'Quel sera le lot du giveaway',
            type: 3,
            required: true
        },
        {
            name: 'canal',
            description: 'Le canal où démarrer le giveaway',
            type: 7,
            required: true
        }
    ],
    go: async (client, db, config, interaction, args) => {
        // Si le membre n'a pas assez de permissions
        if (!db.get(`Owner_${interaction.guild.id}-${interaction.user.id}`) && !config.owners.includes(interaction.user.id) && interaction.user.id !== interaction.guild.ownerId) {
            return interaction.reply({ content: '`❌` Tu n\'as pas les permissions pour effectuer cette commande !', ephemeral: true });
        }
    
        const giveawayChannel = interaction.options.getChannel('canal');
        const giveawayDuration = interaction.options.getString('duree');
        const giveawayWinnerCount = interaction.options.getInteger('gagnants');
        const giveawayPrize = interaction.options.getString('lot');
        
        if (!giveawayChannel.isTextBased()) {
            return interaction.reply({
                content: ':x: Le canal sélectionné n\'est pas un canal textuel.',
                ephemeral: true
            });
        }
    
        // Lancer le giveaway
        client.giveawaysManager.start(giveawayChannel, {
            // La durée du giveaway
            duration: ms(giveawayDuration),
            // Le lot du giveaway
            prize: giveawayPrize,
            // Le nombre de gagnants du giveaway
            winnerCount: giveawayWinnerCount,
            // Messages
            messages
        });
    
        interaction.reply(`Giveaway lancé dans ${giveawayChannel} !`);
    } 
};