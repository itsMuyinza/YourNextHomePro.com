
import { Pro, Thread } from './types';

export const MOCK_PROS: Pro[] = [
  {
    id: '1',
    name: 'Kasirye & Mosquera',
    businessName: 'The Founders\' Selection',
    service: 'Full-Service Renovation & Design',
    rating: 5.0,
    reviewCount: 42,
    location: 'South Portland, ME',
    distance: 1.2,
    availability: 'today',
    verified: true,
    licenseStatus: 'verified',
    licenseDetails: {
      number: 'FOUNDERS-001',
      state: 'ME',
      type: 'Curated Marketplace',
      expiry: '2030-01-01'
    },
    claimed: true,
    yearsInBusiness: 3,
    description: 'Born from a personal struggle to find reliable help, we connect homeowners with Maine\'s finest local craftsmen. One founder from Uganda, the other from Argentina—brought together by a shared belief that your home deserves the best local soul.',
    imageUrl: 'https://images.unsplash.com/photo-1556912177-c54034b7971d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    priceRange: '$$$',
    phone: '(207) 555-0100',
    email: 'hello@yournexthomepro.com',
    tags: ['Founder Curated', 'Master Craft', 'Maine Local'],
    attributes: [
      { label: 'Philosophy', value: 'Community First', subtext: 'Turning strangers into friends', icon: 'Sparkles' },
      { label: 'Expertise', value: 'Global Aesthetics', subtext: 'Hollywood vision, local heart', icon: 'Award' },
      { label: 'Network', value: 'Top 5% Vetted', subtext: 'Strict verification standards', icon: 'Shield' },
      { label: 'Response', value: 'Immediate Concierge', subtext: 'Personalized project matching', icon: 'Clock' }
    ],
    team: [
      {
        id: 'muyinza',
        name: 'Muyinza Kasirye',
        role: 'Founder & Curator',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
        bio: 'Born in Kenya, raised across Uganda, Canada, and Boston. A global media producer with a Hollywood eye, Muyinza moved to Maine to raise his son. His journey navigating specialized care inspired him to build a bridge for others searching for local excellence.'
      },
      {
        id: 'anthony',
        name: 'Anthony H. Mosquera',
        role: 'Founder & Business Development',
        imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
        bio: 'A Northeastern graduate with Argentinian roots and a passion for community. From firefighting to high-stakes private banking and countertop industry expansion, Anthony specializes in optimizing operations and turning every client into a lifelong partner.'
      }
    ],
    reviews: [
      { id: 'r1', author: 'Mark D.', rating: 5, date: '1 month ago', text: 'This platform saved my kitchen remodel. The founders actually care about who they recommend.' }
    ]
  },
  {
    id: '2',
    name: 'Mike Johnson',
    businessName: 'Reliable Rooter & Plumbing',
    service: 'Plumber',
    rating: 4.9,
    reviewCount: 128,
    location: 'Austin, TX',
    distance: 3.2,
    availability: 'today',
    verified: true,
    licenseStatus: 'verified',
    claimed: true,
    yearsInBusiness: 12,
    description: 'A standout plumbing experience in Austin, specializing in emergency repairs and leak detection.',
    imageUrl: 'https://picsum.photos/id/64/200/200',
    coverUrl: 'https://images.unsplash.com/photo-1581241309613-7be59d86fc53?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    priceRange: '$$',
    phone: '(512) 555-0123',
    email: 'mike@reliablerooter.com',
    tags: ['Emergency Service', 'Licensed'],
    reviews: []
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    businessName: 'Spark Electric Solutions',
    service: 'Electrician',
    rating: 4.7,
    reviewCount: 84,
    location: 'Austin, TX',
    distance: 8.5,
    availability: 'tomorrow',
    verified: true,
    licenseStatus: 'pending',
    claimed: false, 
    yearsInBusiness: 5,
    description: 'Residential and commercial electrical services. Smart home installations and panel upgrades.',
    imageUrl: 'https://picsum.photos/id/338/200/200',
    coverUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    priceRange: '$$$',
    phone: '(512) 555-0987',
    email: 'contact@sparkelectric.com',
    tags: ['Smart Home'],
    reviews: []
  }
];

export const MOCK_THREADS: Thread[] = [
    {
        id: 't1',
        customerName: 'Sarah Miller',
        customerAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        serviceRequest: 'Water Heater Replacement',
        lastMessage: 'Does that price include haul away?',
        lastActive: '10m ago',
        unread: true,
        messages: [
            { id: 'm1', sender: 'user', text: 'Hi, I need a quote for a 50 gallon water heater replacement.', timestamp: '10:30 AM' },
            { id: 'm2', sender: 'pro', text: 'Sure Sarah! I can do a Bradford White model installed for $1400.', timestamp: '10:45 AM' },
            { id: 'm3', sender: 'user', text: 'Does that price include haul away?', timestamp: '10:52 AM' }
        ]
    }
];
