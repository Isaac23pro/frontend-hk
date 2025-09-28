import { Memory, Department, CulturalEvent, Coordinates, Quiz, RankedUser } from '../types';

// --- MOCK DATA ---

const mockMemories: Memory[] = [
  // Page 1
  { id: '1', title: 'El Güegüense en Diriamba', description: 'Una de las tradiciones más antiguas...', author: { id: 'user1', name: 'Ana Pérez' }, createdAt: new Date(Date.now() - 2 * 86400000).toISOString(), mediaType: 'image', mediaUrl: 'https://via.placeholder.com/400x250/FEF001/000000?text=El+Güegüense', likes: 152, commentsCount: 12, coordinates: [11.8584, -86.2419] },
  { id: '2', title: 'La gigantona y el enano cabezón', description: 'Recorriendo las calles de León...', author: { id: 'user2', name: 'Carlos Ruiz' }, createdAt: new Date(Date.now() - 5 * 86400000).toISOString(), mediaType: 'video', mediaUrl: 'https://via.placeholder.com/400x250/FE42B3/FFFFFF?text=La+Gigantona', likes: 230, commentsCount: 25, coordinates: [12.4379, -86.8780] },
  { id: '3', title: 'El sabor del Vigorón Granadino', description: 'No hay nada como un auténtico vigorón...', author: { id: 'user3', name: 'Maria Lopez' }, createdAt: new Date(Date.now() - 10 * 86400000).toISOString(), mediaType: 'image', mediaUrl: 'https://via.placeholder.com/400x250/29A0D5/FFFFFF?text=Vigorón', likes: 310, commentsCount: 40, coordinates: [11.9344, -85.9560] },
  // Page 2
  { id: '4', title: 'Artesanías de Masaya', description: 'El mercado de artesanías es un lugar mágico.', author: { id: 'user4', name: 'Jules Verne' }, createdAt: new Date(Date.now() - 12 * 86400000).toISOString(), mediaType: 'image', mediaUrl: 'https://via.placeholder.com/400x250/4AFF80/000000?text=Artesanías', likes: 180, commentsCount: 15, coordinates: [11.9745, -86.0942] },
  { id: '5', title: 'Volcán Masaya de noche', description: 'El lago de lava es impresionante.', author: { id: 'user1', name: 'Ana Pérez' }, createdAt: new Date(Date.now() - 15 * 86400000).toISOString(), mediaType: 'image', mediaUrl: 'https://via.placeholder.com/400x250/FEF001/000000?text=Volcán+Masaya', likes: 450, commentsCount: 50, coordinates: [11.9841, -86.1610] },
  { id: '6', title: 'Isla de Ometepe', description: 'Los dos volcanes forman una isla increíble.', author: { id: 'user2', name: 'Carlos Ruiz' }, createdAt: new Date(Date.now() - 20 * 86400000).toISOString(), mediaType: 'image', mediaUrl: 'https://via.placeholder.com/400x250/FE42B3/FFFFFF?text=Ometepe', likes: 600, commentsCount: 80, coordinates: [11.5388, -85.5843] },
  // Page 3
  { id: '7', title: 'Cañón de Somoto', description: 'Una aventura acuática inolvidable.', author: { id: 'user3', name: 'Maria Lopez' }, createdAt: new Date(Date.now() - 25 * 86400000).toISOString(), mediaType: 'image', mediaUrl: 'https://via.placeholder.com/400x250/29A0D5/FFFFFF?text=Cañón+de+Somoto', likes: 320, commentsCount: 30, coordinates: [13.4768, -86.6780] },
  { id: '8', title: 'Corn Island', description: 'El paraíso caribeño de Nicaragua.', author: { id: 'user4', name: 'Jules Verne' }, createdAt: new Date(Date.now() - 30 * 86400000).toISOString(), mediaType: 'image', mediaUrl: 'https://via.placeholder.com/400x250/4AFF80/000000?text=Corn+Island', likes: 750, commentsCount: 100, coordinates: [12.1691, -83.0418] },
];

const mockDepartments: Department[] = [ /* ... existing data ... */ ];
const mockEvents: CulturalEvent[] = [ /* ... existing data ... */ ];
const mockQuizzes: Quiz[] = [ /* ... existing data ... */ ];
const mockRanking: RankedUser[] = [ /* ... existing data ... */ ];


// --- API FUNCTIONS ---

export const getFeedMemories = (page: number = 1, limit: number = 3): Promise<{ memories: Memory[], hasMore: boolean }> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginatedMemories = mockMemories.slice(start, end);
      resolve({
        memories: paginatedMemories,
        hasMore: end < mockMemories.length,
      });
    }, 500);
  });
};

export const getDepartments = (): Promise<Department[]> => Promise.resolve(mockDepartments);
export const getEventsForDepartment = (departmentId: string): Promise<CulturalEvent[]> => Promise.resolve(mockEvents.filter(event => event.departmentId === departmentId));
export const getContentForMap = (): Promise<(Memory | CulturalEvent)[]> => Promise.resolve([...mockMemories, ...mockEvents]);
export const getQuizzes = (): Promise<Omit<Quiz, 'questions'>[]> => Promise.resolve(mockQuizzes.map(({ questions, ...rest }) => rest));
export const getQuizById = (id: string): Promise<Quiz | undefined> => Promise.resolve(mockQuizzes.find(quiz => quiz.id === id));
export const getRanking = (): Promise<RankedUser[]> => Promise.resolve(mockRanking);