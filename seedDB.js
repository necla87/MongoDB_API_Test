import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import config from './config.js';
import Event from './models/Event.js';
import Guest from './models/Guest.js';
import Venue from './models/Venue.js';
import Marketing from './models/Marketing.js';

const mongodbUri = config.mongodbUri;

mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

const createFakeData = async () => {
  for (let i = 0; i < 50; i++) {
    const event = new Event({
      name: faker.lorem.words(),
      date: faker.date.future(),
      location: faker.address.city(),
      description: faker.lorem.sentence(),
      attendees: faker.datatype.number({ min: 10, max: 500 })
    });
    await event.save();

    const guest = new Guest({
      name: faker.name.findName(),
      email: faker.internet.email(),
      event: event._id
    });
    await guest.save();

    const venue = new Venue({
      name: faker.company.companyName(),
      location: faker.address.city(),
      capacity: faker.datatype.number({ min: 50, max: 500 }),
      availability: [faker.date.future(), faker.date.future()]
    });
    await venue.save();

    const marketing = new Marketing({
      campaignName: faker.company.catchPhrase(),
      event: event._id,
      channels: [faker.internet.domainWord(), faker.internet.domainWord()],
      budget: faker.datatype.number({ min: 1000, max: 10000 }),
      startDate: faker.date.future(),
      endDate: faker.date.future()
    });
    await marketing.save();
  }
  console.log('50 fake data sets created');
};

createFakeData().then(() => mongoose.disconnect());
