import { ApiPostRaw, ApiUserRaw, FeedPost, NovoPostPayload } from '../types/api';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const SAMPLE_IMAGES = [
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800',
  'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800',
  'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800',
];

async function req<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return (await response.json()) as T;
}

function mapToFeedPost(post: ApiPostRaw, usersMap: Map<number, ApiUserRaw>): FeedPost {
  const author = usersMap.get(post.userId);
  const username = author ? author.username.toLowerCase() : `utilizador_${post.userId}`;
  const imageIndex = post.id % SAMPLE_IMAGES.length;

  return {
    id: post.id,
    userId: post.userId,
    user: username,
    avatar: `https://i.pravatar.cc/150?u=${post.userId}`,
    postImage: SAMPLE_IMAGES[imageIndex],
    caption: `${post.title} — ${post.body.replace(/\n/g, ' ')}`,
    likes: (post.id * 17) % 350 + 12,
    time: `Há ${(post.id % 12) + 1} h`,
  };
}

export const api = {
  async buscarPosts(): Promise<FeedPost[]> {
    const [postsRaw, usersRaw] = await Promise.all([
      req<ApiPostRaw[]>('/posts?_limit=15'),
      req<ApiUserRaw[]>('/users'),
    ]);

    const usersMap = new Map<number, ApiUserRaw>(usersRaw.map((u) => [u.id, u]));
    return postsRaw.map((p) => mapToFeedPost(p, usersMap));
  },

  async buscarPostPorId(id: number): Promise<FeedPost> {
    const postRaw = await req<ApiPostRaw>(`/posts/${id}`);
    const userRaw = await req<ApiUserRaw>(`/users/${postRaw.userId}`);
    const usersMap = new Map<number, ApiUserRaw>([[userRaw.id, userRaw]]);
    return mapToFeedPost(postRaw, usersMap);
  },

  async criarPost(dados: NovoPostPayload): Promise<ApiPostRaw> {
    return req<ApiPostRaw>('/posts', {
      method: 'POST',
      body: JSON.stringify(dados),
    });
  },
};
