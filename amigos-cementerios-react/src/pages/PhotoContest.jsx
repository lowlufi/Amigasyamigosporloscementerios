import { useState } from 'react';
import { CameraIcon, TrophyIcon, CalendarIcon, UserIcon, HeartIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
const StatusBadge = ({ status }) => {
  switch (status) {
    case 'active':
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">Activo</span>;
    case 'finished':
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">Finalizado</span>;
    case 'upcoming':
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">Próximamente</span>;
    default:
      return null;
  }
};

const ContestCard = ({ contest }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">{contest.title}</h3>
        <StatusBadge status={contest.status} />
      </div>
      <p className="text-gray-600 mb-4 h-12 line-clamp-2">{contest.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-sm text-gray-500">Inicio</div>
          <div className="font-medium">{new Date(contest.startDate).toLocaleDateString('es-ES')}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Fin</div>
          <div className="font-medium">{new Date(contest.endDate).toLocaleDateString('es-ES')}</div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <TrophyIcon className="h-5 w-5 text-primary" />
          <span className="font-medium text-primary">{contest.prize}</span>
        </div>
        <div className="flex items-center space-x-2">
          <UserIcon className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-600">{contest.participantsCount} participantes</span>
        </div>
      </div>

      {contest.winner && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <TrophyIcon className="h-5 w-5 text-yellow-600" />
            <span className="font-medium text-yellow-800">Ganador: {contest.winner}</span>
          </div>
          {contest.winnerPhoto && (
            <img
              src={contest.winnerPhoto}
              alt="Fotografía ganadora"
              className="w-full h-32 object-cover rounded-lg"
            />
          )}
        </div>
      )}

      {contest.rules && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Bases del concurso:</h4>
          <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
            {contest.rules.slice(0, 2).map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
            {contest.rules.length > 2 && <li>...y más.</li>}
          </ul>
        </div>
      )}

      <div className="flex space-x-3 mt-6">
        {contest.status === 'active' && (
          <button className="flex-1 btn-primary">
            Participar
          </button>
        )}
        <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
          Ver Detalles
        </button>
      </div>
    </div>
  </div>
);


const PhotoContestPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const contests = [
    {
      id: 1,
      title: 'Concurso Fotográfico Blanco y Negro 2024',
      description: 'Captura la esencia del patrimonio funerario en fotografía blanco y negro.',
      startDate: '2024-02-01',
      endDate: '2024-03-31',
      status: 'active',
      prize: '$100.000 CLP',
      category: 'blanco-negro',
      rules: [
        'Solo fotografías en blanco y negro',
        'Tema: Patrimonio funerario de Valparaíso',
        'Máximo 3 fotografías por participante',
        'Resolución mínima: 2048x2048 píxeles'
      ],
      jury: ['Eduardo Vergara', 'Aref Cosma', 'Patricia Cortez'],
      participantsCount: 45
    },
    {
      id: 2,
      title: 'Miradas del Cementerio Nº1',
      description: 'Fotografías que resalten la arquitectura y arte del Cementerio Nº1.',
      startDate: '2024-01-15',
      endDate: '2024-02-28',
      status: 'finished',
      prize: '$75.000 CLP',
      category: 'arquitectura',
      winner: 'María González',
      winnerPhoto: '/img/portfolio/cementerio1/La pietá cementerio n°1.jpg',
      participantsCount: 32
    },
    {
      id: 3,
      title: 'Cementerio Disidentes: Historia Viva',
      description: 'Concurso especial dedicado al patrimonio del Cementerio de Disidentes.',
      startDate: '2024-04-01',
      endDate: '2024-05-31',
      status: 'upcoming',
      prize: '$120.000 CLP',
      category: 'historia',
      rules: [
        'Fotografías del Cementerio de Disidentes',
        'Pueden ser en color o blanco y negro',
        'Incluir descripción histórica de la fotografía',
        'Máximo 5 fotografías por participante'
      ],
      participantsCount: 0
    }
  ];

  const submissions = [
    {
      id: 1,
      contestId: 1,
      title: 'Silencio Eterno',
      author: 'Ana Martínez',
      image: '/img/portfolio/cementerio1/cem-n1-hor1.jpg',
      likes: 23,
      description: 'La solemnidad de una tumba antigua en el Cementerio Nº1.'
    },
    {
      id: 2,
      contestId: 1,
      title: 'Memorias de Piedra',
      author: 'Carlos Rodríguez',
      image: '/img/portfolio/cementerio2/cem-n2-hor1.jpg',
      likes: 18,
      description: 'Los detalles arquitectónicos cuentan historias del pasado.'
    },
    {
      id: 3,
      contestId: 1,
      title: 'Jardín de Recuerdos',
      author: 'Sofía López',
      image: '/img/portfolio/cementerio1/cem-n1-ver1.jpg',
      likes: 31,
      description: 'La naturaleza abraza las memorias en el cementerio.'
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos los concursos' },
    { id: 'blanco-negro', name: 'Blanco y Negro' },
    { id: 'arquitectura', name: 'Arquitectura' },
    { id: 'historia', name: 'Historia' },
    { id: 'naturaleza', name: 'Naturaleza' }
  ];

  const filteredContests = contests.filter(contest =>
    selectedCategory === 'all' || contest.category === selectedCategory
  );

  const activeContest = contests.find(c => c.status === 'active');

  const SubmissionCard = ({ submission }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <img
        src={submission.image}
        alt={submission.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-1">{submission.title}</h3>
        <p className="text-sm text-gray-600 mb-2">por {submission.author}</p>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{submission.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <HeartIcon className="h-5 w-5 text-red-400" />
            <span className="text-sm text-gray-600">{submission.likes}</span>
          </div>
          <Link to="#" className="text-primary hover:text-primary-hover text-sm font-medium">Ver más</Link>
        </div>
      </div>
    </div>
  );
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <CameraIcon className="mx-auto h-16 w-16 text-primary mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Concurso Fotográfico
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Captura la belleza y solemnidad del patrimonio funerario de Valparaíso
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Active Contest Highlight */}
        {activeContest && (
          <div className="mb-12 bg-gradient-to-r from-primary to-primary-hover rounded-lg p-8 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  {activeContest.title}
                </h2>
                <p className="text-lg mb-6">
                  {activeContest.description}
                </p>
                <div className="flex items-center space-x-6 mb-6">
                  <div className="flex items-center space-x-2">
                    <TrophyIcon className="h-5 w-5" />
                    <span>{activeContest.prize}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <UserIcon className="h-5 w-5" />
                    <span>{activeContest.participantsCount} participantes</span>
                  </div>
                </div>
                <button className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  Participar Ahora
                </button>
              </div>
              <div className="text-center">
                <CameraIcon className="mx-auto h-24 w-24 mb-4 opacity-50" />
                <p className="text-sm opacity-75">
                  Fecha límite: {new Date(activeContest.endDate).toLocaleDateString('es-ES')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Contests Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {filteredContests.map(contest => <ContestCard key={contest.id} contest={contest} />)}
        </div>

        {/* Recent Submissions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Participaciones Recientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {submissions.map(submission => <SubmissionCard key={submission.id} submission={submission} />)}
          </div>
        </div>

        {/* How to Participate */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">¿Cómo Participar?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Regístrate</h3>
              <p className="text-sm text-gray-600">Crea tu cuenta en nuestra plataforma</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Fotografía</h3>
              <p className="text-sm text-gray-600">Captura imágenes siguiendo las bases del concurso</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Sube tu Obra</h3>
              <p className="text-sm text-gray-600">Envía tus fotografías antes de la fecha límite</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">4</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">¡Gana!</h3>
              <p className="text-sm text-gray-600">Espera los resultados del jurado especializado</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoContestPage;