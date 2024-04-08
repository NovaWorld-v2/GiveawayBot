const config = require('./config.json');

module.exports = {
    giveaway: (config.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **GIVEAWAY** 🎉🎉",
    giveawayEnded: (config.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **GIVEAWAY FINI** 🎉🎉",
    title: '{this.prize}',
    inviteToParticipate: 'Réagit avec 🎉 pour participé!',
    winMessage: 'Bravo, {winners}! Vous avez gagné **{this.prize}**!',
    drawing: 'Temps Restant: {timestamp}',
    dropMessage: 'Le premiers qui réagit 🎉 !',
    embedFooter: '{this.winnerCount} gagnants',
    noWinner: 'Giveaway Annulé.',
    winners: 'Gagnant(s):',
    endedAt: 'Terminé le',
    hostedBy: 'Lancé par : {this.hostedBy}'
};