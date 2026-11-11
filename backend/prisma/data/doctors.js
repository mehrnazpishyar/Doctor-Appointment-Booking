const [
  doc1, doc2, doc3, doc4, doc5, doc6,
  doc7, doc8, doc9, doc10, doc11, doc12,
  doc13, doc14, doc15, doc16, doc17, doc18,
  doc19, doc20, doc21, doc22,
] = Array.from(
  { length: 22 },
  (_, index) => `/doctors/doc${index + 1}.png`
);

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Leonardo Larson',
        image: doc1,
        specialty: 'General physician',
        degree: 'MBBS',
        experience: '6 Years',
        about: 'Dr. Leonardo has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: 'Werner, Schroeder',
            line2: 'Louise, Hans, Deutschland'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Elena Cros',
        image: doc2,
        specialty: 'Gynecologist',
        degree: 'MD',
        experience: '23 Years',
        about: 'Dr. Elena has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address: {
                line1: 'Werner, Schroeder',
            line2: 'Louise, Hans, Deutschland'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Christoph Eger',
        image: doc3,
        specialty: 'Dermatologist',
        degree: 'DO',
        experience: '16 Years',
        about: 'Dr. Christoph has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: {
              line1: 'Werner, Schroeder',
            line2: 'Louise, Hans, Deutschland'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Anna Lee',
        image: doc4,
        specialty: 'General physician',
        degree: 'PhD',
        experience: '30 Years',
        about: 'Dr. Anna has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 40,
        address: {
               line1: 'Werner, Schroeder',
            line2: 'Louise, Hans, Deutschland'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Andrew Bak',
        image: doc5,
        specialty: 'Neurologist',
        degree: 'MBBS',
        experience: '18 Years',
        about: 'Dr. Andrew has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
                 line1: 'Werner, Schroeder',
            line2: 'Louise, Hans, Deutschland'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Max Williams',
        image: doc6,
        specialty: 'Neurologist',
        degree: 'FRCS ',
        experience: '4 Years',
        about: 'Dr. Max has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: 'Werner, Schroeder',
            line2: 'Louise, Hans, Deutschland'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Rose Davis',
        image: doc7,
        specialty: 'General physician',
        degree: 'MBBS',
        experience: '7 Years',
        about: 'Dr. Rose has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
               line1: 'Werner, Schroeder',
            line2: 'Louise, Hans, Deutschland'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Barat White',
        image: doc8,
        specialty: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Barat has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address: {
            line1: 'Werner, Schroeder',
            line2: 'Louise, Hans, Deutschland'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Ava Phinobi',
        image: doc9,
        specialty: 'Dermatologist',
        degree: 'MBBS',
        experience: '5 Years',
        about: 'Dr. Ava has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: {
            line1: 'Werner, Schroeder',
            line2: 'Louise, Hans, Deutschland'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Paula King',
        image: doc10,
        specialty: 'Dermatologist',
        degree: 'DGO ',
        experience: '9 Years',
        about: 'Dr. Paula has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 40,
        address: {
               line1: 'Werner, Schroeder',
            line2: 'Louise, Hans, Deutschland'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Mohanna Kelly',
        image: doc11,
        specialty: 'General physician',
        degree: 'MBBS',
        experience: '29 Years',
        about: 'Dr. Mohanna has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: 'Werner, Schroeder',
            line2: 'Louise, Hans, Deutschland'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Juseph Harris',
        image: doc12,
        specialty: 'Pediatricians',
        degree: 'FRCS',
        experience: '4 Years',
        about: 'Dr. Juseph has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address: {
           line1: 'Werner, Schroeder',
            line2: 'Louise, Hans, Deutschland'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Dora Hamis',
        image: doc13,
        specialty: 'Gastroenterologist',
        degree: 'FRCS',
        experience: '24 Years',
        about: 'Dr. Dora has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
           line1: 'Werner, Schroeder',
            line2: 'Louise, Hans, Deutschland'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Bernard Hamington',
        image: doc14,
        specialty: 'Neurologist',
        degree: 'FRCS',
        experience: '30 Years',
        about: 'Dr. Bernard has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: {
           line1: 'Werner, Schroeder',
            line2: 'Louise, Hans, Deutschland'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Camella Bergman',
        image: doc15,
        specialty: 'General physician',
        degree: 'FRCS',
        experience: '8 Years',
        about: 'Dr. Camella has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
           line1: 'Werner, Schroeder',
            line2: 'Louise, Hans, Deutschland'
        }
    },
    {
        _id: 'doc16',
        name: 'Dr. Donald Pacho',
        image: doc16,
        specialty: 'Gastroenterologist',
        degree: 'FRCS',
        experience: '14 Years',
        about: 'Dr. Donald has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 40,
        address: {
           line1: 'Werner, Schroeder',
            line2: 'Louise, Hans, Deutschland'
        }
    },
    {
        _id: 'doc17',
        name: 'Dr. Adam Max',
        image: doc17,
        specialty: 'Gynecologist',
        degree: 'FRCS',
        experience: '4 Years',
        about: 'Dr. Adam has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 20,
        address: {
           line1: 'Werner, Schroeder',
            line2: 'Louise, Hans, Deutschland'
        }
    },
    {
        _id: 'doc18',
        name: 'Dr. Nicolla Schmidt',
        image: doc18,
        specialty: 'Gastroenterologist',
        degree: 'FRCS',
        experience: '28 Years',
        about: 'Dr. Nicolla has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address: {
           line1: 'Werner, Schroeder',
            line2: 'Louise, Hans, Deutschland'
        }
    },
    {
        _id: 'doc19',
        name: 'Dr. Tom Coloni',
        image: doc19,
        specialty: 'Neurologist',
        degree: 'FRCS',
        experience: '13 Years',
        about: 'Dr. Tom has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
           line1: 'Werner, Schroeder',
            line2: 'Louise, Hans, Deutschland'
        }
    },
    {
        _id: 'doc20',
        name: 'Dr. Nansi Boschcat',
        image: doc20,
        specialty: 'Pediatricians',
        degree: 'FRCS',
        experience: '6 Years',
        about: 'Dr. Nansi has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 40,
        address: {
           line1: 'Werner, Schroeder',
            line2: 'Louise, Hans, Deutschland'
        }
    },
    {
        _id: 'doc21',
        name: 'Dr. Kate Parson',
        image: doc21,
        specialty: 'Dermatologist',
        degree: 'FRCS',
        experience: '5 Years',
        about: 'Dr. Kate has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
           line1: 'Werner, Schroeder',
            line2: 'Louise, Hans, Deutschland'
        }
    },
    {
        _id: 'doc22',
        name: 'Dr. Samanta Elvis',
        image: doc22,
        specialty: 'Pediatricians',
        degree: 'FRCS',
        experience: '9 Years',
        about: 'Dr. Samanta has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: {
           line1: 'Werner, Schroeder',
            line2: 'Louise, Hans, Deutschland'
        }
    },
    
]