// Dependencies
const { MessageEmbed, Message } = require('discord.js');
const fs = require('fs');
const os = require('os');
const config = require('../config.json');
const CatLoggr = require('cat-loggr');

// Functions
const log = new CatLoggr();

module.exports = {
	name: 'stokekle', // Command name (can be different from the file name)
	description: 'BİR HESAP EKLEYİN', // Command description displays in the help command

    /**
     * Command exetute
     * @param {Message} message The message sent by user
     * @param {Array} args Arguments splitted by spaces after the command name
     */
	execute(message, args) {
        // Parameters
        const service = args[0];
        const account = args[1];

        // If the "service" parameter is missing
        if (!service) {
            return message.channel.send(
                new MessageEmbed()
                .setColor(config.color.red)
                .setTitle('Eksik Değer!')
                .setDescription('Bir hizmet belirtmeniz gerekiyor!')
                .addField('Örneğin', `${config.prefix}${this.name} **üç** elma`)
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 64 }))
                .setTimestamp()
            );
            // YOU NEED THE RETURN STATEMENT TO STOP THIS FUNCTION (if you remove the "return" statement, all of the functions below will be executed and breaks the command)
        };

        // If the "account" parameter is missing
        if (!account) {
            return message.channel.send(
                new MessageEmbed()
                .setColor(config.color.red)
                .setTitle('Eksik Değer!')
                .setDescription('Bir hesap belirtmeniz gerekiyor!')
                .addField('Örneğin', `${config.prefix}${this.name} üç **elma**`)
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 64 }))
                .setTimestamp()
            );            
        };

        const filePath = `${__dirname}/../stok/${args[0]}.txt`; // Searching for the stock

        // Append data to the file
        fs.appendFile(filePath, `${os.EOL}${args[1]}`, function (error) {
            if (error) return log.error(error); // If an error occured or the stock not found, log to console

            message.channel.send(
                new MessageEmbed()
                .setColor(config.color.green)
                .setTitle('Hesap eklendi!')
                .setDescription(`Başarıyla eklendi \`${args[1]}\` hesabı \`${args[0]}\` servisine`)
                .setFooter(message.author.tag, message.author.displayAvatarURL())
                .setTimestamp()
            ).then(message => message.delete({ timeout: 5000 })); // Automatically delete the message after 5 seconds
        });
    }
};
