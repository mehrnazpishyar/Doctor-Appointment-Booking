import close_icon from './close_icon.png';
import dropdown_icon from './dropdown_icon.svg';
import logo from './logo.svg';
import menu_icon from './menu_icon.svg';
import profilePic from './profilePic.png';
import team from './team.png'
import arrow_icon from './arrow_icon.svg'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'
import happy_doctor from './happy_doctor.png'
import info_icon from './info_icon.svg'
import verified_icon from './verified_icon.svg'
import about from './about.jpg'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import doc16 from './doc16.png'
import doc17 from './doc17.png'
import doc18 from './doc18.png'
import doc19 from './doc19.png'
import doc20 from './doc20.png'
import doc21 from './doc21.png'
import doc22 from './doc22.png'


export const assets = {
    close_icon ,
    dropdown_icon,
    logo,
    menu_icon,
    profilePic,
    team,
    arrow_icon,
    happy_doctor,
    info_icon,
    verified_icon,
    about
}

export const specialtyData = [
    {
        specialty: 'Gynecologist',
        image: Gynecologist
    },
    {
        specialty: 'Dermatologist',
        image: Dermatologist
    },
    {
        specialty: 'Neurologist',
        image: Neurologist
    },
    {
        specialty: 'General physician',
        image: General_physician
    },
   
 
    {
        specialty: 'Gastroenterologist',
        image: Gastroenterologist
    },
    {
        specialty: 'Pediatricians',
        image: Pediatricians
    },
]


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