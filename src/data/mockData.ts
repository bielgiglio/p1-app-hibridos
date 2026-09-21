export interface Story {
  id: string;
  user: string;
  image: string;
}

export interface Post {
  id: string;
  user: string;
  avatar: string;
  postImage: string;
  likes: number;
  caption: string;
  time: string;
}

export interface NotificationItem {
  id: string;
  user: string;
  action: string;
  time: string;
}

export const STORIES: Story[] = [
  { id: '1', user: 'O teu story', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200' },
  { id: '2', user: 'lucas_dev', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200' },
  { id: '3', user: 'mari.tech', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200' },
  { id: '4', user: 'react_brasil', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
  { id: '5', user: 'pedro_s', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200' },
];

export const POSTS: Post[] = [
  {
    id: '1',
    user: 'mari.tech',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    postImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
    likes: 124,
    caption: 'Desenvolvendo interfaces no Expo com React Native! 🚀💻',
    time: 'Há 2 horas'
  },
  {
    id: '2',
    user: 'lucas_dev',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200',
    postImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800',
    likes: 89,
    caption: 'Momento de pausa para o café ☕',
    time: 'Há 5 horas'
  }
];

export const NOTIFICATIONS: NotificationItem[] = [
  { id: '1', user: 'lucas_dev', action: 'gostou da tua publicação.', time: '1h' },
  { id: '2', user: 'react_brasil', action: 'começou a seguir-te.', time: '3h' },
  { id: '3', user: 'mari.tech', action: 'mencionou-te num comentário.', time: '1d' }
];