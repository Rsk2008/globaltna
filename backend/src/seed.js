require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const mongoose = require('mongoose');
const JobRequest = require('./models/JobRequest');

const sampleJobs = [
  { title: 'Leaking kitchen tap needs fixing', description: 'My kitchen tap has been dripping for a week. Looking for a plumber to fix it ASAP.', category: 'Plumbing', location: 'Glasgow', contactName: 'Sarah Mitchell', contactEmail: 'sarah.mitchell@example.com', status: 'Open' },
  { title: 'Faulty consumer unit replacement', description: 'Consumer unit is tripping repeatedly. Need a qualified electrician to replace it.', category: 'Electrical', location: 'Edinburgh', contactName: 'James Henderson', contactEmail: 'james.h@example.com', status: 'Open' },
  { title: 'Full house interior painting', description: 'Need a painter to repaint the entire interior of a 3-bed semi. Neutral colours preferred.', category: 'Painting', location: 'Manchester', contactName: 'Priya Sharma', contactEmail: 'priya.sharma@example.com', status: 'In Progress' },
  { title: 'Bespoke wardrobe installation', description: 'Looking for a joiner to build and fit a bespoke fitted wardrobe in the master bedroom.', category: 'Joinery', location: 'Leeds', contactName: 'Tom Walsh', contactEmail: 'tom.walsh@example.com', status: 'Open' },
  { title: 'Bathroom tap and shower replacement', description: 'Both bathroom taps and the shower unit need replacing. Prefer mixer taps.', category: 'Plumbing', location: 'Birmingham', contactName: 'Linda Osei', contactEmail: 'linda.osei@example.com', status: 'Closed' },
  { title: 'Garden shed electrics installation', description: 'Need an electrician to run power to my garden shed — sockets and lighting.', category: 'Electrical', location: 'Bristol', contactName: 'Mark Doyle', contactEmail: 'mark.doyle@example.com', status: 'Open' },
  { title: 'External fence panels replaced', description: 'Six fence panels blown down in the storm. Need a joiner to replace them.', category: 'Joinery', location: 'Glasgow', contactName: 'Fiona McGregor', contactEmail: 'fiona.mcg@example.com', status: 'Open' },
  { title: 'Exterior walls painting', description: 'Two-storey house exterior needs a fresh coat of masonry paint. Scaffolding may be required.', category: 'Painting', location: 'Cardiff', contactName: 'Rhys Evans', contactEmail: 'rhys.evans@example.com', status: 'Open' },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    await JobRequest.deleteMany({});
    console.log('Cleared existing jobs');
    await JobRequest.insertMany(sampleJobs);
    console.log(`Inserted ${sampleJobs.length} sample jobs`);
    await mongoose.disconnect();
    console.log('Done.');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
};

seed();