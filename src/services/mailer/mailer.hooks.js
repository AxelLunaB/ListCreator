const { disallow } = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [
      async context => {
        const { data } = context;

        // Encode Buffer String to Base64
        const bufferData = data.buffer;
        const base64Data = Buffer.from(bufferData, 'base64');

        const emailTo = data.to;
        const filename = data.filename;

        const email = {
          from: 'noreply@ar3d.net',
          to: emailTo,
          subject: 'Información Sibaria',
          text: 'Información de tu residencia Sibaria\nConsulta a tu asesor para más información.',
          attachments: [{
            filename: filename,
            content: base64Data
          }]
        };
          console.log(data.filename);
        // Format data to be in correct syntax
        context.data = email;
        return context;
      }

    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
